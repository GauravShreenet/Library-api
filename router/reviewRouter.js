import express from 'express';
import { createBurrow, getManyBurrow, updateBurrow } from '../model/burrow/BurrowModel.js';
import { newBurrowValidation, newReviewValidation } from '../middlewares/joiValidation.js';
import { updateBookById } from '../model/book/BookModel.js';
import { adminAuth, userAuth } from '../middlewares/authMiddleware.js';
import { createReview, deleteReview, getManyReview, updateReview } from '../model/review/ReviewModel.js';

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {

        // const { role, _id } = req.userInfo;
        // if admin makes request, return all the burrow history, if loggedin user make requests then return their burrow only based on the userID in burrow table
        const reviews = await getManyReview()
        // burrows?.length ?
            res.json({
                status: 'success',
                message: "Here is the list of reviews hsitory",
                reviews,
            })
            // : res.json({
            //     status: 'error',
            //     message: "Unable to return burrow history, please contact administrator"
            // })
    } catch (error) {
        next(error)
    }
})


router.post("/", userAuth, newReviewValidation, async (req, res, next) => {
    try {
        
        const userId = req.userInfo._id;
        // if admin makes request, return all the burrow history, if loggedin user make requests then return their burrow only based on the userID in burrow table
        const result = await createReview({...req.body, userId})
        if (result?._id) {
            //update burrow table and add the reivew id to the burrow history

            await updateBurrow({_id: req.body.burrowHistoryId}, {reviewGiven: result._id});

            return res.json({
                status: 'success',
                message: "You have successfully given the review for the book, Admin will verify your review soon"
            })
        }
        res.json({
            status: 'error',
            message: "Unable to give your reivew for the book, please try again later"
        })
    } catch (error) {
        next(error)
    }
})

router.patch("/:_id", adminAuth, async(req, res, next) => {
    try {
        const {_id} = req.params
        const { status } = req.body
        
        if(['active', 'inactive'].includes(status)){
            const result = await updateReview({_id}, {status})
            if (result?._id){
                return res.json({
                    status: "success",
                    message: "The review has been updated",
                })
        }    
       }
       res.json({
        status: "error",
        message: "Something went wrong please contact administration",
    })
       
    } catch (error) {
        next(error)
    }
})
router.delete("/:_id", adminAuth, async(req, res, next) => {
    try {
        const {_id} = req.params
        
        
            const result = await deleteReview({_id})
            if (result?._id){
                return res.json({
                    status: "success",
                    message: "The review has been updated",
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