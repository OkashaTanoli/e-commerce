import { CustomError } from "@/errors/customerror";
import { db } from "@/lib/drizzle";
import { NewUser, Users } from "@/lib/schemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";




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

        const allMatchingUsers = await db.select().from(Users).where(eq(Users.email, data.email))
        if (allMatchingUsers.length) {
            throw new CustomError('User already exists with this email', 409)
        }

        const hashedPass = await bcrypt.hash(data.password, 10)

        const newUser: NewUser = {
            name: data.name,
            email: data.email,
            password: hashedPass,
            id: uuidv4()
        }

        const user = await db.insert(Users).values(newUser)
        
        return NextResponse.json({ message: 'User registered successfully', status: "success" }, { status: 200 })
    }

    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}