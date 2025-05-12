import { NextResponse } from "next/server";

export function middleware(req)
{
    const path = req.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpassword'
    const token = req.cookies.get('token') || ''
    console.log(token)

    if(isPublicPath && token)
    {
        return NextResponse.redirect(new URL('/',req.url))
    }
    if(!isPublicPath && !token)
    {
        return NextResponse.redirect(new URL('/login',req.url))
    }
}

export const config = {
    matcher : [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail'
    ]
}