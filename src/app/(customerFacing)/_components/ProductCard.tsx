"use client";
import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

const basicsTags = [
  "Beginner-Friendly",
  "Full Body Workouts",
  "Cardio + Strength",
];

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <div className="flex bg-gradient-to-r pb-4 from-neutral-100 via-white to-neutral-100 rounded-md overflow-hidden flex-col">
      <div className="h-auto mb-6 w-auto">
        <Image
          src={imagePath}
          alt={name}
          className="rounded-t-md"
          layout="responsive"
          width={100}
          height={100}
          objectFit="cover"
        />
      </div>
      <div className="px-4">
        <div className="flex mb-4 justify-between items-center">
          <h3 className="text-xl">{name}</h3>
          <p className="text-xl">{formatCurrency(priceInCents / 100)}</p>
        </div>
        <div className="flex-grow mt-3">
          <p className="line-clamp-4">{description}</p>
        </div>
      </div>
      <div className="px-4 mt-auto">
        <div className="flex gap-2 mt-4 flex-wrap mb-4 pb-4">
          {basicsTags.map((tag) => (
            <div
              className="font-inter border rounded-full bg-neutral-50 px-4 py-2 uppercase tracking-wider text-xs font-semibold leading-6 text-neutral-700"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Buy Program</Link>
        </Button>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
