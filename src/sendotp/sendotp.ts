import { CustomError } from "@/errors/customerror";
import { db } from "@/lib/drizzle";
import { NewOtp, Otp } from "@/lib/schemas/otp";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'


let config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}
let transporter = nodemailer.createTransport(config);


export async function sendOtp(email: string) {
    const otp = Math.floor(Math.random() * 900000) + 100000
    let from = `"Okasha" <${process.env.EMAIL}>`
    let info = await transporter.sendMail({
        from: from, // sender address
        to: email, // ٖ list of receivers 
        subject: "Verify Your Email", // Subject line
        html: `<p>Here is your OTP for email :<h2>${otp}</h2></p>`, // html body
    });

    let oldOtp: Otp[] = await db.select().from(Otp).where(eq(Otp.email, email))
    if (oldOtp.length) {
        let modifiedDate = new Date(oldOtp[0].updated_at.setSeconds(oldOtp[0].updated_at.getSeconds() + 30))
        if (modifiedDate > new Date()) {
            let time_left = Math.round((modifiedDate.valueOf() - new Date().valueOf()) / 1000)
            throw new CustomError(`This feature will be available after ${time_left} seconds`, 500)
        }
        await db.update(Otp).set({ otp, updated_at: new Date() }).where(eq(Otp.email, email))
        return

    }


    let newOtp: NewOtp = {
        email: email,
        otp: otp,
        updated_at: new Date()
    }
    await db.insert(Otp).values(newOtp)


}