import { CustomError } from "@/errors/customerror";
import { db } from "@/lib/drizzle";
import { Otp } from "@/lib/schemas/otp";
import { Users } from "@/lib/schemas/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        if (String(data.otp).length !== 6) {
            throw new CustomError('OTP must contain 6 numbers', 400)
        }
        if (!data.email.toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            throw new CustomError('Enter correct format of email', 400)
        }

        const otp = await db.select().from(Otp).where(eq(Otp.email, data.email))


        console.log("otp === >>> ", typeof (otp[0].otp))
        console.log("data.otp === >>> ", typeof (data.otp))
        if (!otp.length || otp[0].otp !== Number(data.otp)) {
            throw new CustomError('Invalid OTP entered', 404)
        }

        await db.update(Users).set({ is_verified: true }).where(eq(Users.email, data.email))
        return NextResponse.json({ message: 'Email verified successfully', status: "success" }, { status: 200 })


    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}


