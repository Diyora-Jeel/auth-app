import { NextResponse } from "next/server";
import prisma from "@/dbConfig/dbConfig.js";
import bcrypt from "bcryptjs";

export async function POST(req)
{
    try {
        const { token , password } = await req.json()

        const user = await prisma.user.findFirst({
            where : {
                forgot_password_token : token,
                forgot_password_token_expiry : {
                    gt : new Date()
                }
            }
        })

        if(!user)
        {
            return NextResponse.json({error : "Invalid Token"}, {status : 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                password : hashedPassword,
                forgot_password_token : null,
                forgot_password_token_expiry : null
            }
        })

        return NextResponse.json({message : "forgot password successfully", success : true}, {status : 200})

    } catch (error) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}