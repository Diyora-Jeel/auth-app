import { jwtTokenVerify } from "@/helpers/jwtTokenVerify";
import prisma from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userId = await jwtTokenVerify(req);
    const user = await prisma.user.findFirst({ where: { id : userId } });
    if (!user) {
      return NextResponse.json({ error: "Invalide Token" }, { status: 400 });
    }
    return NextResponse.json({
      msg: "User found successfully",
      success: true,
      user: user,
    }, {status : 200});
  } catch (error) {
    return NextResponse.json({error : error.message} ,{status : 500})
  }
}
