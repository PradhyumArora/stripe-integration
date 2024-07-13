import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import {
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from "@/lib/utils";

export async function POST(req: Request, res: Response) {
  console.log("WEBHOOK CALLED");

  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (!event) return;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const productId = session.metadata?.productId;
    const customerEmail = session.metadata?.customerEmail;

    if (!productId || !customerEmail)
      return new NextResponse("Product id & Customer Email are required", {
        status: 400,
      });

    // CREATE ORDER IN DB
    // await db.order.create({
    //   data: {
    //     productId: parseInt(productId),
    //     email: customerEmail,
    //   },
    // });
  } else {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
  return new NextResponse(null, { status: 200 });
}
