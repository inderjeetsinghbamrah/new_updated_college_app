import express from "express"
import { deleteUser, getAdminUser } from "../controllers/adminController.js"
import { isAdmin } from "../middlewares/authMiddleware.js"
import { changePassword } from "../controllers/commonController.js"

const router = express.Router()

//Admin Page
router.get('/getAdminUser', isAdmin, getAdminUser)
router.get('/deleteUser/:id',isAdmin,deleteUser)

//Staff Page
router.get('/teacher', (req, res) => {
    res.send('Teacher page')
})

//Student Page

router.get('/student', (req, res) => {
    res.send('Student page')
})

//Common Routes
router.post('/changePassword', changePassword)

export default router
