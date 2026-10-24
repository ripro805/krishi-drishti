import { NextRequest, NextResponse } from "next/server";
import { getStorageProvider } from "@/lib/storage/cloudStorage";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let buffer: Buffer;
    let mimeType = "image/jpeg";
    let originalFilename: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File exceeds 15MB maximum size limit" }, { status: 413 });
      }

      mimeType = file.type || "image/jpeg";
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { error: `Unsupported file type: ${mimeType}. Please upload JPG, PNG, or WebP.` },
          { status: 415 }
        );
      }

      originalFilename = file.name;
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      // JSON body with imageData base64
      const body = await request.json().catch(() => ({}));
      const rawData = body.imageData;

      if (!rawData || typeof rawData !== "string") {
        return NextResponse.json({ error: "Missing or invalid imageData" }, { status: 400 });
      }

      let base64String = rawData;
      const match = rawData.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64String = match[2];
      }

      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { error: `Unsupported file type: ${mimeType}. Please upload JPG, PNG, or WebP.` },
          { status: 415 }
        );
      }

      buffer = Buffer.from(base64String, "base64");
      if (buffer.length > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Decoded image exceeds 15MB limit" }, { status: 413 });
      }
    }

    const storage = getStorageProvider();
    const uploadResult = await storage.upload(buffer, mimeType, originalFilename);

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      size: uploadResult.size,
      format: uploadResult.format,
      provider: uploadResult.provider,
    });
  } catch (err: any) {
    console.error("[Upload API] Error saving image:", err);
    return NextResponse.json(
      { error: "UPLOAD_FAILED", message: err.message || "Failed to store image" },
      { status: 500 }
    );
  }
}
