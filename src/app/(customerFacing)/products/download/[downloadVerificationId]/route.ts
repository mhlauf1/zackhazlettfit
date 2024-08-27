import { NextRequest, NextResponse } from "next/server"
import path from "path"  // Import the path module
import db from "@/db/db"

export async function GET(req: NextRequest, { params: { downloadVerificationId }, }: { params: { downloadVerificationId: string } }) {

    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true } } },
    })

    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }

    // Ensure that the filePath has a leading slash if necessary
    let filePath = data.product.filePath.startsWith("/") ? data.product.filePath : `/${data.product.filePath}`;

    // Convert to an absolute path
    filePath = path.resolve(process.cwd(), filePath);  // Resolve the absolute path based on the current working directory

    // Construct the hazlettPath URL
    const hazlettPath = `https://www.zackhazlettfit.com/${data.product.filePath.startsWith("/") ? data.product.filePath.slice(1) : data.product.filePath}`;

    // Log the hazlettPath for debugging
    console.log(`Hazlett URL for file: ${hazlettPath}`);

    try {
        // Assuming you want to fetch and stream the file directly from the hazlettPath
        const response = await fetch(hazlettPath);

        if (!response.ok) {
            throw new Error(`Failed to fetch file from ${hazlettPath}`);
        }

        const file = await response.arrayBuffer();
        const extension = hazlettPath.split(".").pop();
        const size = response.headers.get("Content-Length");

        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size?.toString() || "",
            },
        });
    } catch (error) {
        console.error(`Error fetching file from hazlettPath: ${hazlettPath}`, error);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
