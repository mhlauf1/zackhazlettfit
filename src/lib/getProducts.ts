import { Product } from "@prisma/client";
import cacheManager from "@/lib/cacheManager";
import db from "@/db/db";

const CACHE_KEY = "getProducts";
const CACHE_TTL = 60 * 60 * 24 * 1000; // 24 hours in milliseconds

async function getProducts(): Promise<Product[]> {
    const cachedProducts = cacheManager.get<Product[]>(CACHE_KEY);
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

export default getProducts;
