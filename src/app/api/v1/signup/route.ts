import { CustomError } from "@/errors/customerror";
import { db } from "@/lib/drizzle";
import { NewUser, Users } from "@/lib/schemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
import { Otp } from "@/lib/schemas/otp";
import { sendOtp } from "@/sendotp/sendotp";




export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        if (!data.email) {
            throw new CustomError('Email is required', 404)
        }
        if (!data.password) {
            throw new CustomError('Password is required', 404)
        }
        if (!data.name) {
            throw new CustomError('Full Name is required', 404)
        }

        const hashedPass = await bcrypt.hash(data.password, 10)
        const allMatchingUsers = await db.select().from(Users).where(eq(Users.email, data.email))
        console.log("BEFORE error=================")
        console.log(allMatchingUsers)
        if (allMatchingUsers.length) {
            if (!allMatchingUsers[0].is_verified) {
                await db.update(Users).set({ name: data.name, password: hashedPass, created_at: new Date() }).where(eq(Users.email, data.email))
                return NextResponse.json({ message: 'User registered successfully', status: "success" }, { status: 200 })
            }
            throw new CustomError('User already exists with this email', 409)
        }

        console.log("after error=================")

        const newUser: NewUser = {
            name: data.name,
            email: data.email,
            password: hashedPass,
            id: uuidv4(),
            is_verified: false,
            created_at: new Date()
        }

        await db.insert(Users).values(newUser)

        await sendOtp(data.email)

        return NextResponse.json({ message: 'User registered successfully', status: "success" }, { status: 200 })
    }

    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}