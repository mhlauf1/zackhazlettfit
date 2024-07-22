import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path"; // Import the path module

export async function GET(
    req: NextRequest,
    { params: { downloadVerificationId } }: { params: { downloadVerificationId: string } }
) {
    try {
        const data = await db.downloadVerification.findUnique({
            where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
            select: { product: { select: { filePath: true, name: true } } },
        });

        if (data == null) {
            return NextResponse.redirect(new URL("/products/download/expired", req.url));
        }

        const pathToFile = path.join(process.cwd(), data.product.filePath);
        const { size } = await fs.stat(pathToFile);
        const file = await fs.readFile(pathToFile);
        const extension = data.product.filePath.split(".").pop();

        return new NextResponse(file, {
            headers: {
                "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
                "Content-Length": size.toString(),
            },
        });
    } catch (error) {
        console.error("Error handling download request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
