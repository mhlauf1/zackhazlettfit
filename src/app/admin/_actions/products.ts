"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    // Ensure products directory in public exists
    await fs.mkdir("public/products", { recursive: true });

    // Store the file in the public/products directory
    const filePath = `/products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(`public${filePath}`, Buffer.from(await data.file.arrayBuffer()));

    // Store the image in the public/products directory
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    // Save to database with paths that are relative to the public directory
    await db.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath,
        },
    });

    revalidatePath("/");
    revalidatePath("/products");

    redirect("/admin/products");
}



const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export async function updateProduct(
    id: string,
    prevState: unknown,
    formData: FormData
) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const product = await db.product.findUnique({ where: { id } });

    if (product == null) return notFound();

    let filePath = product.filePath;
    if (data.file != null && data.file.size > 0) {
        // Delete the old file
        await fs.unlink(`public${product.filePath}`);

        // Store the new file in public/products directory
        filePath = `/products/${crypto.randomUUID()}-${data.file.name}`;
        await fs.writeFile(`public${filePath}`, Buffer.from(await data.file.arrayBuffer()));
    }

    let imagePath = product.imagePath;
    if (data.image != null && data.image.size > 0) {
        // Delete the old image
        await fs.unlink(`public${product.imagePath}`);

        // Store the new image in public/products directory
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    await db.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath,
        },
    });

    revalidatePath("/");
    revalidatePath("/products");

    redirect("/admin/products");
}


export async function toggleProductAvailability(
    id: string,
    isAvailableForPurchase: boolean
) {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

    revalidatePath("/")
    revalidatePath("/products")
}

export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } });

    if (product == null) return notFound();

    // Delete the file and image from public/products directory
    await fs.unlink(`public${product.filePath}`);
    await fs.unlink(`public${product.imagePath}`);

    revalidatePath("/");
    revalidatePath("/products");
}
