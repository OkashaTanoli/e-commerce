import { db } from "@/lib/drizzle";
import { NewTest, Test } from "@/lib/schemas/test";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        let NewTest: NewTest = {
            name: 'okasha'
        }
        const test = await db.insert(Test).values(NewTest).returning();
        return NextResponse.json({ type: 'success', message: test })
        console.log(test)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ type: 'error', message: err })
    }
}


