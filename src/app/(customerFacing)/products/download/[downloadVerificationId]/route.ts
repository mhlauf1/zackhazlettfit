import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { downloadVerificationId } }: { params: { downloadVerificationId: string } }) {

    // Fetch the download verification data from the database
    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true } } },
    });

    // If the data doesn't exist or has expired, redirect to the expired page
    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url));
    }

    // Assuming filePath is relative to the public directory
    const fileName = path.basename(data.product.filePath); // Extract the file name
    const fileUrl = `https://www.zackhazlettfit.com/products/${fileName}`;

    console.log(`Fetching file from URL: ${fileUrl}`);

    try {
        // Fetch the file from the external URL
        const fileResponse = await fetch(fileUrl);

        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch file from ${fileUrl}`);
        }

        // Read the file content
        const fileBuffer = await fileResponse.arrayBuffer();
        const extension = fileName.split(".").pop();
        const fileNameWithExtension = `${data.product.name}.${extension}`;

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Disposition": `attachment; filename="${fileNameWithExtension}"`,
                "Content-Type": fileResponse.headers.get("Content-Type") || "application/octet-stream",
                "Content-Length": fileResponse.headers.get("Content-Length") || fileBuffer.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error(`Error downloading file: ${error.message}`);
        return NextResponse.redirect(new URL("/products/download/error", req.url));
    }
}
