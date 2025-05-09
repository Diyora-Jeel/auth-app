import prisma from "@/dbConfig/dbConfig.js";
import {NextResponse } from "next/server";

export async function POST(req)
{
    try {
        const {token} =  await req.json();
        console.log(token)

        const user = await prisma.user.findFirst({
            where : {
                verify_token: token,
                verify_token_expiry : {
                    gt: new Date()
                } 
            }
        })

        if(!user)
        {
            return NextResponse.json({error : "Invalid token"},{status : 400})
        }
        console.log(user)

        await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                is_verified : true,
                verify_token : null,
                verify_token_expiry : null
            }
        })

        return NextResponse.json({message : "Email verified successfully" , success : true}, {status : 200})

    } catch (error) {
        return NextResponse.json({error : error.message} ,{status : 500})
    }
}
