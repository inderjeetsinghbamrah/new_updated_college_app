import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body
    const prisma = new PrismaClient()
    const token = req.cookies.token
    !token && res.status(401).json({ message: "Unauthorized: No token provided" })

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const userInfo = await prisma.user.findUnique({
        where: {
            id
        }
    })
    !userInfo &&
        res.status(401).json({ message: "User not found" })
    
    const isPasswordMatch = await bcrypt.compare(currentPassword, userInfo.password)

    !isPasswordMatch && res.status(401).json({message:"Current Password is Wrong"})

    // (currentPassword=='' || newPassword=='' || confirmPassword=='')  &&
    //     res.status(401).json({ message: "Current Password and New Password are required" })

    newPassword != confirmPassword &&
        res.status(401).json({ message: "New Password not matches" })

    const newHashedPassword= await bcrypt.hashSync(newPassword,10)

    const updatePassword = await prisma.user.update({
        where: {
            id
        },
        data: {
            password:newHashedPassword
        }
    })

    !updatePassword ?
        res.status(401).json({ message: "Password update failed" }) :
        res.status(200).json({ message: "Password Updated Successfully" })
}

export {changePassword}
