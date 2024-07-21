"use client";

import { emailOrderHistory } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";

export default function MyOrdersPage() {
  const [data, action] = useFormState(emailOrderHistory, {});
  return (
    <div className="px-4 md:px-12 pt-[5vh] md:pt-[8vh] lg:px-20 ">
      <h2 className="tracking-tighter mt-8 text-3xl w-full font-semibold capitalize text-neutral-900 md:text-4xl lg:text-5xl">
        Unable to find your programs?
      </h2>
      <form className="mt-12 max-w-4xl" action={action}>
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>
              Enter your email and we will email you your order history and
              download links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" required name="email" id="email" />
              {data.error && (
                <div className="text-destructive">{data.error}</div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {data.message ? <p>{data.message}</p> : <SubmitButton />}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
