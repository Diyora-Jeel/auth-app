import prisma from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function POST(req)
{
    try {
        const {email, password} = await req.json()

        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if(!user)
        {
            return NextResponse.json({error : "User dose not exists"} , {status : 400})
        }

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword)
        {
            return NextResponse.json({error : "Check your credentials"} , {status : 400})
        }
        
        const tokenData = {
            id : user.id,
            username : user.user_name,
            email : user.email
        }

        const token = await jwt.sign(tokenData,process.env.JWT_TOKEN,{expiresIn : '1d'})

        const response = NextResponse.json({
            message : "Logged In Success",
            success : true,
            user
        })

        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response


    } catch (error) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}