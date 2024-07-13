"use client";
import { Button } from "@/components/ui/button";
import {
  cancelSubscription,
  getCheckoutSession,
  getSubscriptionSession,
} from "./actions/stripe";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const placeOrder = async () => {
    const redirectUrl = await getCheckoutSession({
      name: "Product Name",
      amount: 100,
      id: 1,
      email: "pradhyum@gmail.com",
    });
    console.log(redirectUrl);

    if (!redirectUrl.url) return;
    router.push(redirectUrl.url);
  };

  const subscribeNow = async () => {
    const redirectUrl = await getSubscriptionSession({
      name: "Premium Plan",
      amount: 9.99,
      id: 1,
      email: "pradhyum@gmail.com",
    });
    console.log(redirectUrl);

    if (!redirectUrl.url) return;
    router.push(redirectUrl.url);
  };

  const handleCancellation = async () => {
    const response = await cancelSubscription("sub_1Pc0H6SDsaIRkJC49d6ihzyr");
    console.log(response);
  };

  return (
    <div className="flex gap-4 items-center justify-center min-h-screen">
      <Button onClick={placeOrder}>Order Now</Button>
      <Button onClick={subscribeNow}>Subscribe Now</Button>
      <Button onClick={handleCancellation}>Cancel Subscription</Button>
    </div>
  );
}
