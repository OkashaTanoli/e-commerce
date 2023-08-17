import { CustomError } from "@/errors/customerror";
import { db } from "@/lib/drizzle";
import { Users } from "@/lib/schemas/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        if (!data.email) {
            throw new CustomError('Email is required', 404)
        }
        if (!data.password) {
            throw new CustomError('Password is required', 404)
        }
        const user = await db.select().from(Users).where(eq(Users.email, data.email))
        if (!user.length) {
            throw new CustomError('No user found with this email', 401)
        }
        const match = await bcrypt.compare(user[0].password, data.password)
        if (!match) {
            throw new CustomError('Incorrect password', 401)
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                email: user[0].email,
                name: user[0].name
            },
            process.env.JWT_SECRET!,
            {expiresIn:'1d'}
        )
        const response = NextResponse.json({
            success: true,
            message: "Login successfully"
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}