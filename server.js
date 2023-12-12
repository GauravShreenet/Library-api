import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// DB connection
import { connectMongoDb } from './config/dbConfig.js';
connectMongoDb();

//api endpoint
import userRouter from './router/userRoter.js';
app.use("/api/v1/users", userRouter);
import bookRouter from './router/bookRouter.js';
import { userAuth } from './middlewares/authMiddleware.js';
import burrowRouter from './router/burrowRouter.js';
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/burrows", userAuth, burrowRouter);


app.get("/", (req,res)=>{
    res.json({
        status: 'success',
        message: 'server is live'
    })
})
app.use("*", (req, res, next)=>{
    const obj = {
        message: "404 page not found",
        errorCode: 404
    }
    next(obj)
})

app.use((error, req, res, next)=>{
    console.log(error)

    const errorCode = error.errorCode || 500

    res.status(errorCode).json({
        status: 'error',
        message: error.message,
    })
})

app.listen(PORT, error=>{
    error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
})