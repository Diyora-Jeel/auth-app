import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const jwtTokenVerify = (req) =>{
     try {
        const token = req.cookies.get("token").value || ""
        const decocdeToken = jwt.verify(token,process.env.JWT_TOKEN)
        return decocdeToken.id
     } catch (error) {
        throw new Error(error.message)
     }
}