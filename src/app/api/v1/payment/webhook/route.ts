import { db } from "@/lib/drizzle";
import { Orders, Order, NewOrder } from "@/lib/schemas/order";
import { Test } from "@/lib/schemas/test";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';


const endpointSecret = process.env.ENDPOINT_SECRET!;



export async function POST(request: NextRequest) {
    console.log(process.env.STRIPE_SECRET_KEY)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })
    const sig = request.headers.get('stripe-signature') || 'unknown';
    const data = await request.text()
    await db.insert(Test).values({ name: `signature ===== >>>>>>>> ${sig} ,,,,,,,,,,,,, data ======== >>>>>> ${data}` })
    console.log("Signature ==================== >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", sig)
    // console.log("Data ==================== >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.stringify(data))
    console.log("EndPoint ==================== >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", endpointSecret)
    let event;
    try {
        event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
        console.log("SUCCESSSSSSSSSSSSSS================>>>>>>>>>>")
    } catch (err: any) {
        console.log("ERROR================>>>>>>>>>>", err)
        return NextResponse.json({ messahe: `Webhook Error =======>>>>>>>>>> : ${err.message}` }, { status: 500 })
    }

    if (event.type === 'checkout.session.completed') {
        try {

            const data: any = event.data.object;
            const customer: any = await stripe.customers.retrieve(data.customer)
            // const listLineItems = await stripe.checkout.sessions.listLineItems(data.id)
            let newOrder: NewOrder = {
                id: uuidv4(),
                subtotal: data.amount_subtotal,
                total: data.amount_total,
                payment_intent_id: data.payment_intent,
                payment_status: data.payment_status,
                products: JSON.stringify(Object.values(customer.metadata).map((val: any) => JSON.parse(val))),
                shipping: JSON.stringify(data.customer_details),
            }
            const orders = await db.insert(Orders).values(newOrder).returning();
            console.log(orders)
        }
        catch (err) {
            console.log("error ========>>>>>>>>>", err)
        }
    }
    return NextResponse.json({ message: "done" })
}