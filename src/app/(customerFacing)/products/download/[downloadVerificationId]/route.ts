import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"  // Import the path module
import db from "@/db/db"

export async function GET(req: NextRequest, { params: { downloadVerificationId }, }: { params: { downloadVerificationId: string } }) {

    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true } } },
    });

    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url));
    }

    // Ensure that the filePath has a leading slash if necessary
    let filePath = data.product.filePath.startsWith("/") ? data.product.filePath : `/${data.product.filePath}`;

    // Convert to an absolute path
    filePath = path.resolve(process.cwd(), filePath);  // Resolve the absolute path based on the current working directory

    // Reassign hazlettPath to be used instead of filePath



    try {
        // Fetching file stats
        const { size } = await fs.stat(filePath);
        console.log(`File size: ${size} bytes`);

        // Reading the file
        const file = await fs.readFile(filePath);
        console.log(`File read successfully from: ${filePath}`);

        // Extracting the file extension
        const extension = filePath.split(".").pop();
        console.log(`File extension: ${extension}`);

        // Returning the file as a response
        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error(`Error reading file at path: ${filePath}`, error);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
