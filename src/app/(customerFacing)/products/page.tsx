import { ProductCard, ProductCardSkeleton } from "../_components/ProductCard";
import db from "@/db/db";
import cacheManager from "@/lib/cacheManager";
import { Suspense } from "react";

const CACHE_KEY = "getProducts";
const CACHE_TTL = 60 * 60 * 24 * 1000; // 24 hours in milliseconds

async function getProducts() {
  const cachedProducts = cacheManager.get(CACHE_KEY);
  if (cachedProducts) {
    return cachedProducts;
  }

  const products = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });

  cacheManager.set(CACHE_KEY, products, CACHE_TTL);
  return products;
}

export default function ProductsPage() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-20">
      <div className="flex w-full justify-between h-full flex-1 mb-8 flex-col items-start md:w-7/12 ">
        <div className="flex flex-1 flex-col items-start">
          <span className="font-inter rounded-full bg-neutral-100 px-4 py-3 uppercase tracking-wider text-xs font-semibold leading-6 text-neutral-900">
            Explore Programs
          </span>
          <h1 className="mb-4 mt-6 md:mt-8 w-full text-3xl font-semibold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl">
            Fitness and Nutrition Programs
          </h1>
          <div className="flex flex-col md:w-7/12">
            <p className="mt-2 text-md md:text-lg text-neutral-700">
              Dedicated to transforming lives through personalized fitness and
              nutrition programs. Here, we believe in fitness as a lifestyle,
              not a quick fix.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </section>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
