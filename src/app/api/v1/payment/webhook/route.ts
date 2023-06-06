import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import { buffer } from 'micro'


// const endpointSecret = "whsec_BDAkEBaBl0cUYXfigkzFMwsqO4zBkV1g";
const endpointSecret = "whsec_4f14af6e4fb267bf7eed082ff3bca7ed5efb7df5ec120a155ef2781de798a549";


// export const config = { api: { bodyParser: false } }

export async function POST(request: NextRequest) {
    // console.log("hello man")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

    const sig = request.headers.get('stripe-signature')!;
    // console.log(sig)
    const data = await request.text()
    let event;
    try {
        event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
    } catch (err: any) {
        // console.log("error =========================>>>>>>>>>>>>>>>>>>>>>>>>", err)
        return NextResponse.json(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const paymentIntentSucceeded = event.data.object;
        console.log("paymentIntentSucceeded =====================>>>>>>>>>>>>>>>>> ", paymentIntentSucceeded)
    }
    return NextResponse.json({ message: "done" })
}