import { CustomError } from "@/errors/customerror";
import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/sendotp/sendotp";




export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        if (!data.email) {
            throw new CustomError('Email is required', 404)
        }
        await sendOtp(data.email)
        return NextResponse.json({ message: 'OTP sent successfully', status: "success" }, { status: 200 })
    }

    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}