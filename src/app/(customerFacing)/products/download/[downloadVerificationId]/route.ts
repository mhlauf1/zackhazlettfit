import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import db from "@/db/db"

export async function GET(req: NextRequest, { params: { downloadVerificationId }, }: { params: { downloadVerificationId: string } }) {

    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true } } },
    })

    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }

    // Sanitize the filePath by replacing spaces with underscores or removing them
    let sanitizedFilePath = data.product.filePath.replace(/\s+/g, '_'); // or use '' to remove spaces entirely

    console.log(`Original file path: ${data.product.filePath}`);
    console.log(`Sanitized file path: ${sanitizedFilePath}`);

    try {
        // Attempt to read the file at the original path
        const { size } = await fs.stat(data.product.filePath);
        const file = await fs.readFile(data.product.filePath);
        const extension = data.product.filePath.split(".").pop();

        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error(`Error reading file at original path: ${data.product.filePath}`, error);
    }

    try {
        // Attempt to read the file at the sanitized path
        const { size } = await fs.stat(sanitizedFilePath);
        const file = await fs.readFile(sanitizedFilePath);
        const extension = sanitizedFilePath.split(".").pop();

        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error(`Error reading file at sanitized path: ${sanitizedFilePath}`, error);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
