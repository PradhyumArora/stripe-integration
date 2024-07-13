"use server";

import { stripe } from "@/lib/stripe";

export const getCheckoutSession = async ({
  name,
  amount,
  id,
  email,
}: {
  name: string;
  amount: number;
  id: number;
  email: string;
}) => {
  if (!name || !amount || !id || !email) {
    return { error: "Name, amount, id and email are required" };
  }
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
            // Add other product details here if needed
          },
          unit_amount: amount * 100, // Make sure the amount is in the smallest currency unit (e.g., cents for USD)
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3001/thank-you",
    cancel_url: "http://localhost:3001/",
    mode: "payment",
    metadata: {
      customerEmail: email,
      productId: id,
    },
  });
  return { url: stripeSession.url };
};

export const getSubscriptionSession = async ({
  name,
  amount,
  id,
  email,
}: {
  name: string;
  amount: number;
  id: number;
  email: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount * 100, // $9.99 per month
          recurring: {
            interval: "month",
          },
          product_data: {
            name,
            description: "Access to premium features",
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {
      customerEmail: email,
      productId: id,
    },
    success_url: `http://localhost:3001/thank-you`,
    cancel_url: `http://localhost:3001/cancel`,
  });
  return { url: session.url };
};

export const cancelSubscription = async (subscriptionId: string) => {
  if (!subscriptionId) {
    return { error: "Subscription ID is required" };
  }

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return {
      status: "success",
      message: "Subscription cancelled successfully",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
