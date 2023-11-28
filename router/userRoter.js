import express from 'express';
import { compairPassword, hashPassWord } from '../utils/bcrypt.js';
import { createUser, getUserByEmail } from '../model/UserModel.js';
import { loginValidation } from '../middlewares/joiValidation.js';

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

        if (user?._id) {
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
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "Email already existing";
            error.errorCode = 200;
        }
        next(error);
    }
})

router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //get user by email
        const user = await getUserByEmail(email);
        console.log(user);

        if (user?._id) {
            const isMatched = compairPassword(password, user.password)
            if (isMatched) {
                return res.json({
                    status: "success",
                    message: "Login successful"
                })
            }
        }
        //check if password from db and plaintext matches

        // jwts
        res.json({
            status: "error",
            message: "Invalid login details"
        });
    } catch (error) {
        next(error)
    }
})

export default router;