import { PrismaClient } from "@prisma/client"

const getAdminUser = async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const getAllUsers = await prisma.user.findMany()
        //Fetch users except Admin
        const filteredUsers = getAllUsers.filter((user) => {
            return user.role!='Admin'
        })
        res.status(200).json({message:"Users listed",filteredUsers})
    } catch (error) {
        res.status(500).json({ message: "Something bad happened" })
        console.log(error)
    }
}

const deleteUser= async (req,res) => {
    const prisma = new PrismaClient()
    try {
        const userId = parseInt(req.params.id)
        const checkAdmin = await prisma.user.findUnique({
            where: {
                id:userId
            }
        })
        checkAdmin && res.status(200).json({message:"You cannot delete yourself"})
        const deleteUser = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        deleteUser?res.status(200).json({ message: "User deleted" }):res.status(404).json({ message: "User not found" })
    } catch (error) {
        res.status(500).json({ message: "Something bad happened" })
    }
}

export {getAdminUser, deleteUser}
