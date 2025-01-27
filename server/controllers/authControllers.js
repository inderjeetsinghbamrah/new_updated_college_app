import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const register = async (req, res) => {
    const { username, password, role, email, mobile } = req.body
    const prisma = new PrismaClient()
    const hashedPassword= await bcrypt.hashSync(password,10)
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role,
                email,
                mobile
            }
        })

        res.status(200).json({message:"User Created Successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"User creation failed "})
    }
}

const login = async(req,res) => {
    const prisma = new PrismaClient()
    const { username, password } = req.body

    try {
        const { id, role, ...user } = await prisma.user.findUnique({
            where: {
                username,
            }
        })
        //compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign(
            { id, role },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1h"}
        )
        isPasswordMatch ? res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge:3600000
        }).status(200).json({ message: "User found", token, role, username }) : res.status(400).json({ message: "Invalid Credentials" })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"user login failed"})
    }

}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({message:"User Logged out Successfully"})
    } catch (error) {
        res.status(500).json({message:"user logout failed"})
    }
}

export {register, login, logout}
