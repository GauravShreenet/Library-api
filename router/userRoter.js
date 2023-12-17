import express from 'express';
import { compairPassword, hashPassWord } from '../utils/bcrypt.js';
import { createUser, getManyStudents, getUserByEmail, updateRefreshJWT } from '../model/UserModel.js';
import { loginValidation } from '../middlewares/joiValidation.js';
import { signAccessJWT, signJWTs } from '../utils/jwtHelper.js';
import { adminAuth, refreshAuth, userAuth } from '../middlewares/authMiddleware.js';
import { deleteSession } from '../model/session/SessionModel.js';

const router = express.Router()

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

//below this router should be private
router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //get user by email
        const user = await getUserByEmail(email);
        console.log(user);

        if (user?._id) {
            const isMatched = compairPassword(password, user.password)
            if (isMatched) {

                const jwts = signJWTs(user.email);

                return res.json({
                    status: "success",
                    message: "Login successful",
                    jwts
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

router.post("/logout", async (req, res, next) => {
    try {
        const { accessJWT, email } = req.body;

        accessJWT && (await deleteSession({ token: accessJWT }))
        
           email && (await updateRefreshJWT(email, ""))
        //get user by email
        return res.json({
            status: "success",
            message: "Logged out successful",
            jwts
        })

    } catch (error) {
        next(error)
    }
})

router.get("/", userAuth, (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'ToDo get',
            user: req.userInfo,
        })
    } catch (error) {
        next(error)
    }
})

router.get("/all-users", adminAuth, async (req, res, next) => {
    try {
        const users = await getManyStudents()
        res.json({
            status: 'success',
            message: 'ToDo get',
            users,
        })
    } catch (error) {
        next(error)
    }
})

router.get("/get-accessjwt", refreshAuth)

export default router;