import express from 'express';
import { createBook, deleteBook, getABook, getAllBook, updateBookById } from '../model/book/BookModel.js';
import { adminAuth, getUserFromAccessJWT, userAuth } from '../middlewares/authMiddleware.js';
import { newBookValidation, updateBookValidation } from '../middlewares/joiValidation.js';

const router = express.Router()

router.get("/:_id?", async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        let filter={ status: 'active' }

        if(authorization){
            const user = await getUserFromAccessJWT(authorization)
            
            if(user?.role === 'admin'){
                filter = {}
            }
    
        }
        
        const {_id} = req.params;
        const books = _id 
        ? await getABook({...filter, _id})
        : await getAllBook(filter);


        res.json({
            status: 'success',
            message: 'Here are the books',
            books
        })
    } catch (error) {
        next(error)
    }
})

//private endpoint
router.post("/", userAuth, newBookValidation, async(req, res, next) => {
    try {

        if (req.userInfo.role !== "admin"){
            throw new Error("You do not have permission to this api")
        }
        const books = await createBook(req.body);
        
        books?._id ? (res.json({
            status: 'success',
            message: 'Your book is been added',
            books
        })) : (res.json({
            status: 'error',
            message: 'Unable to add New book, try again later',
            books
        }));
        
    } catch (error) {
        
        if(error.message.includes("E11000 duplicate key error collection")){
            error.message = "There is another book that has similar ISBN. Please change the isbn and try again"
            error.errorCode = 200;
        }
        next(error)
    }
})

router.put("/", adminAuth, updateBookValidation, async(req, res, next) => {
    try {

        const books = await updateBookById(req.body);
        
        books?._id ? (res.json({
            status: 'success',
            message: 'Your book has been updated',
            books,
        })) : (res.json({
            status: 'error',
            message: 'Unable to update book, try again later',
            books,
        }));
        
    } catch (error) {
        next(error)
    }
})
router.delete("/:_id", adminAuth, async(req, res, next) => {
    try {

        const {_id} = req.params;
        const books = await deleteBook(_id);
        
        books?._id ? (res.json({
            status: 'success',
            message: 'Your book has been deleted successfully',
            books,
        })) : (res.json({
            status: 'error',
            message: 'Unable to delete the book, try again later',
            books,
        }));
        
    } catch (error) {
        next(error)
    }
})

export default router;