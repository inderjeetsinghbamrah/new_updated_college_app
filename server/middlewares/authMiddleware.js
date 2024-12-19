import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"

const isAdmin = async (req, res, next) => {

    try {
        const token= req.cookies.token
        !token && res.status(401).json({ message: "Unauthorized: No token provided" })
        const prisma = new PrismaClient()
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const userInfo = await prisma.user.findUnique({
                where: {
                    id: decodedToken.id
                }
            })

        !userInfo && res.status(401).json({ message: "User not found" })
        userInfo.role !=="Admin" && res.status(403).json({ message: "Unauthorized: User not an Admin" })

        const {password, ...basicUserInfo} = userInfo
        req.userInfo = basicUserInfo
        next()

    } catch (error) {

    }
}

export {isAdmin}
