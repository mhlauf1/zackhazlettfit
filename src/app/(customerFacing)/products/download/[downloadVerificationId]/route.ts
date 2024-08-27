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

    // Assuming filePath is a relative path to the file in the public directory
    const fileName = data.product.filePath.split('/').pop();  // Extract just the file name
    const fileUrl = `https://www.zackhazlettfit.com/products/${fileName}`;

    console.log(`Serving file from URL: ${fileUrl}`);

    // Redirect to the file URL in the public directory
    return NextResponse.redirect(fileUrl);
}
