import { NextRequest, NextResponse } from "next/server";
import { ICartItem } from "../../../../../types/ProductsTypes";
import Stripe from "stripe";
import { urlForImage } from "../../../../../sanity/lib/image";



export async function POST(request: NextRequest) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })
        const data: { cartItems: ICartItem[] } = await request.json()
        console.log(data.cartItems)
        const cartDataForCheckOut = data.cartItems.map((item: ICartItem) => {
            const image = urlForImage(item.image).url()
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [image],
                        description: `Size: ${item.size.toUpperCase()}`,
                        metadata: {
                            _id: item._id,
                            image: image,
                            productId: item.productId,
                            quantity: item.quantity,
                            size: item.size,
                            type: item.type,
                            name: item.title,
                        }
                    },
                    unit_amount: item.price * 100, //*100 because unit amounts has to be in cents
                },
                quantity: item.quantity

                // size: 'XL'
            };
        });
        const session = await stripe.checkout.sessions.create({
            line_items: cartDataForCheckOut,
            mode: 'payment',
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            metadata: {
                data: JSON.stringify(data.cartItems)
            },
            shipping_address_collection: {
                allowed_countries: ['PK'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            success_url: `${request.nextUrl.origin}/successpayment`,
            cancel_url: `${request.nextUrl.origin}/failedpayment`
        })
        return NextResponse.json({ url: session.url })
    }
    catch {
        return NextResponse.json({ message: "error" })
    }

}