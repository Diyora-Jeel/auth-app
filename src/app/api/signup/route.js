import prisma from "@/dbConfig/dbConfig.js";
import {NextResponse} from 'next/server'
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer.js";

export async function POST(req){
    try {
        const {username , email, password } = await req.json();
        
        const userExists = await prisma.user.findUnique({ where : { email }});
        if(userExists)
        {
            return NextResponse.json({error : "User already exists"} , {status : 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data : {
                user_name : username,
                email : email,
                password : hashedPassword
            }
        })

        // send verification email
        await sendEmail(email, "VERIFY" , newUser.id)

        return NextResponse.json({msg : "User register successfully" , success : true , user : newUser})

    } catch (error) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}

