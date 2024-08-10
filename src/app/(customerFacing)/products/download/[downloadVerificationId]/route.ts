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

    // Ensure that the filePath has a leading slash
    let filePath = data.product.filePath.startsWith('/') ? data.product.filePath : `/${data.product.filePath}`;

    console.log(`Resolved path to file: ${filePath}`);

    try {
        const { size } = await fs.stat(filePath);
        const file = await fs.readFile(filePath);
        const extension = filePath.split(".").pop();

        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error(`Error readin file at path: ${filePath}`, error);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
