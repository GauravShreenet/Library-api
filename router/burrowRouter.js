import express from 'express';
import { createBurrow, getManyBurrow, updateBurrow } from '../model/burrow/BurrowModel.js';
import { newBurrowValidation } from '../middlewares/joiValidation.js';
import { updateBookById } from '../model/book/BookModel.js';

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {

        const { role, _id } = req.userInfo;
        // if admin makes request, return all the burrow history, if loggedin user make requests then return their burrow only based on the userID in burrow table
        const burrows =
            role === 'admin'
                ? await getManyBurrow({})
                : getManyBurrow({ userId: _id })
        burrows?.length ?
            res.json({
                status: 'success',
                message: "Here is the list of burrow hsitory",
                burrows,
            })
            : res.json({
                status: 'error',
                message: "Unable to return burrow history, please contact administrator"
            })
    } catch (error) {
        next(error)
    }
})


router.post("/", newBurrowValidation, async (req, res, next) => {
    try {
        const numberOfDaysToReturn = 15;
        let dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + numberOfDaysToReturn)

        // if admin makes request, return all the burrow history, if loggedin user make requests then return their burrow only based on the userID in burrow table
        const result = await createBurrow({ ...req.body, dueDate })
        if (result?._id) {
            await updateBookById({
                _id: req.body.bookId,
                isAvailable: false,
                dueDate
            });

            return res.json({
                status: 'success',
                message: "You have successfully burrow the book, you can check your burrow history to find this information"
            })
        }
        res.json({
            status: 'error',
            message: "Unable to burrow the book, please contact administrator"
        })
    } catch (error) {
        next(error)
    }
})

router.patch("/:_id", async(req, res, next) => {
    try {
       const {_id} = req.params
       const userId = req.userInfo

       const filter = {_id, userId}

       const update = {
        isReturned: true,
        returnedDate: Date()
       }
       const result = await updateBurrow(filter, update)

       if (result?._id){
        //update the book
        const bookUpdate = {
            _id: result.bookId,
            isAvailable: true,
            dueDate: null
        }
        await updateBookById(bookUpdate)

        return res.json({
            status: "success",
            message: "You have successfully return the book. Thank you!",
        })
       }
       res.json({
        status: "error",
        message: "Something went wrong please contact administration",
    })
       
    } catch (error) {
        next(error)
    }
})
export default router;