import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import db from "@/db/db"

export async function GET(req: NextRequest, { params: { downloadVerificationId }, }: { params: { downloadVerificationId: string } }) {

    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true } } },
    });

    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url));
    }

    // Construct the path relative to the public directory
    const hazlettPath = path.resolve(process.cwd(), 'public', data.product.filePath);

    // Logging the paths
    console.log(`Resolved absolute hazlettPath: ${hazlettPath}`);

    try {
        // Fetching file stats
        const { size } = await fs.stat(hazlettPath);
        console.log(`File size: ${size} bytes`);

        // Reading the file
        const file = await fs.readFile(hazlettPath);
        console.log(`File read successfully from: ${hazlettPath}`);

        // Extracting the file extension
        const extension = hazlettPath.split(".").pop();
        console.log(`File extension: ${extension}`);

        // Returning the file as a response
        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error(`Error reading file at path: ${hazlettPath}`, error);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
