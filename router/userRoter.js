import express from 'express';
import { hashPassWord } from '../utils/bcrypt.js';
import { createUser } from '../model/UserModel.js';

const router = express.Router()

router.get("/", (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'ToDo get'
        })
    } catch (error) {
        next(error)
    }
})

router.post("/", (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'ToDo new user'
        })
    } catch (error) {
        next(error)
    }
})

router.post("/admin-user", async (req, res, next) => {
    try {
        req.body.password = hashPassWord(req.body.password);
        
        req.body.role = "admin";
        const user = await createUser(req.body);

        if(user?._id){
        return res.json({
                status: 'success',
                message: 'The admin user has been created successfully',
            });
        }

        res.json({
            status: 'error',
            message: 'The admin user cannot be created',
        })
    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection")){
            error.message = "Email already existing";
            error.errorCode = 200;
        }
        next(error);
    }
})

export default router;