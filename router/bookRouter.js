import express from 'express';
import { createBook, getAllBook } from '../model/book/BookModel.js';
import { userAuth } from '../middlewares/authMiddleware.js';
import { newBookValidation } from '../middlewares/joiValidation.js';

const router = express.Router()

router.get("/", async(req, res, next) => {
    try {

        const books = await getAllBook()
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
            message: 'Here are the books',
            books
        })) : (res.json({
            status: 'error',
            message: 'Unable to add New book, try again later',
            books
        }));
        
    } catch (error) {
        next(error)
    }
})

export default router;