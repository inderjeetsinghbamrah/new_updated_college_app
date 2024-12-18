import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"

const getTokenExtracted=async(token)=> {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userInfo = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })

    return userInfo
}
const isAdmin = async (req, res, next) => {
    const prisma = new PrismaClient()
    try {
        const token= req.cookies.token
        !token && res.status(401).json({ message: "Unauthorized: No token provided" })

        const userInfo= getTokenExtracted(req.cookies.token)

        !userInfo && res.status(401).json({ message: "User not found" })
        userInfo.role !=="Admin" && res.status(403).json({ message: "Unauthorized: User not an Admin" })

        const {password, ...basicUserInfo} = userInfo
        req.userInfo = basicUserInfo
        next()

    } catch (error) {

    }
}

export {isAdmin,getTokenExtracted}
