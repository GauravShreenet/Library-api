import express from 'express';

const router = express.Router()

router.get("/", (req, res, next)=>{
    try {
      res.json({
        status: 'success',
        message: 'ToDo get'
      })  
    } catch (error) {
        next(error)
    }
})

router.post("/", (req, res, next)=>{
    try {
      res.json({
        status: 'success',
        message: 'ToDo new user'
      })  
    } catch (error) {
        next(error)
    }
})

router.post("/admin-user", (req, res, next)=>{
    try {
      res.json({
        status: 'success',
        message: 'ToDo creater admin user'
      })  
    } catch (error) {
        next(error)
    }
})

export default router;