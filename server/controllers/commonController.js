import {PrismaClient} from "prisma"
import { getTokenExtracted } from "../middlewares/authMiddleware"

const changePassword = (req,res)=>{
    const userId= getTokenExtracted(req.cookies.token)
}
