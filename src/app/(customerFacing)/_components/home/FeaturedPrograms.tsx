import { Product } from "@prisma/client";
import { cache } from "@/lib/cache";
import db from "@/db/db";

import AvailableProgramsHeader from "./AvailableProgramsHeader";
import { Suspense } from "react";
import { ProductCardSkeleton, ProductCard } from "../ProductCard";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

export default function FeaturedPrograms() {
  return (
    <section className="px-4 md:px-12 lg:px-20 pt-32  md:pt-64 pb-36">
      <AvailableProgramsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={getMostPopularProducts} />
        </Suspense>
      </div>
    </section>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
