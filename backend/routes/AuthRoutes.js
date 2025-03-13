import express from 'express'
import protectedRoute from '../middlewares/AuthMiddleware.js'
import { registerController , loginController } from '../controllers/AuthController.js'


const router = express.Router()

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/profile', protectedRoute, (req, res) => {
    res.json({ success: true, message: "User authenticated", user: req.user });
});

router.get('/check', protectedRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
  })

export default router
