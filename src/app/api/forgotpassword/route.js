import { NextResponse } from "next/server";
import prisma from "@/dbConfig/dbConfig.js";
import { sendEmail } from "@/helpers/mailer.js";

export async function POST(req)
{
    try {
        
        const {email} = await req.json();
        console.log(email)

        const user = await prisma.user.findFirst({
            where : {
                email
            }
        })

        console.log(user)

        if(!user)
        {
            return NextResponse.json({message  : "User notfound"}, {status : 400})
        }

        await sendEmail(user.email, "RESET" , user.id)

        return NextResponse.json({message : "Email Send", status : true }, {status : 200})

    } catch (error) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}