import type {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';



const JWT_SECRET = process.env.SECRET_KEY || "secret_key"

export const signup = async (req: Request,res:Response)=>{
    const {firstName,lastName,email,password,role} = req.body
    try{
        const existingUser = await prisma.user.findUnique({where:{email}})
        if (existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await prisma.user.create({
            data:{

                firstName,
                lastName,
                email,
                password:hashedPassword,
                role
            }
        })
        return res.status(200).json({message:"User created successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export const login =async(req:Request,res:Response)=>{
    const {email,password}=req.body
    try{
        const existingUser=await prisma.user.findUnique({where:{email}})
    if (!existingUser){
        return res.status(400).json({message:"User do not Exist"})
    }
    const isPasswordValid=await bcrypt.compareSync(password,existingUser.password)
    if (!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({id:existingUser.id,email:existingUser.email},JWT_SECRET,{expiresIn:'1h'})

    return res.status(200).json({token,message:"Login successful"})



}catch(error){
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
}

}