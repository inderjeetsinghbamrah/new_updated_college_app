import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
dotenv.config()

const register = async (req, res) => {
    const { username, password, role } = req.body
    const prisma = new PrismaClient()
    const hashedPassword= await bcrypt.hashSync(password,10)
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role
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
        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        })

        //compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(user)
        isPasswordMatch?res.status(200).json({message:"User found"}):res.status(400).json({message:"Invalid Credentials"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"user login failed"})
    }

}

export {register, login}
