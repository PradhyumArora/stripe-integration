import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { stripe } from "./stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleSubscriptionCreated(subscription: any) {
  const customerId = subscription.customer;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const customer = await stripe.customers.retrieve(customerId);
  // const customerEmail = customer.;
  console.log("Customer Email:", customer);

  // TODO: Update your database with the subscription information
  console.log(
    `Subscription created: ${subscriptionId} for customer ${customerId}`
  );
}

export async function handleSubscriptionUpdated(subscription: any) {
  const customerId = subscription.customer;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const customer = (await stripe.customers.retrieve(customerId)) as any;
  // const customerEmail = customer.;
  console.log("Customer Email:", customer.email);

  // TODO: Update your database with the new subscription status
  console.log(
    `Subscription updated: ${subscriptionId} for customer ${customerId}`
  );
}

export async function handleSubscriptionDeleted(subscription: any) {
  const customerId = subscription.customer;
  const subscriptionId = subscription.id;

  // TODO: Update your database to reflect the cancelled subscription
  console.log(
    `Subscription deleted: ${subscriptionId} for customer ${customerId}`
  );
}
