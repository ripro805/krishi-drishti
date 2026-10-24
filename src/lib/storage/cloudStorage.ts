import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface UploadResult {
  url: string;
  publicId: string;
  size: number;
  format: string;
  provider: "cloudinary" | "s3" | "local";
}

export interface StorageProvider {
  name: "cloudinary" | "s3" | "local";
  upload(buffer: Buffer, mimeType: string, originalFilename?: string): Promise<UploadResult>;
}

// ── 1. Local Persistent File Storage ────────────────────────────────
export class LocalStorageProvider implements StorageProvider {
  name = "local" as const;
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public", "uploads", "scans");
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(buffer: Buffer, mimeType: string, originalFilename?: string): Promise<UploadResult> {
    const ext = this.getExtension(mimeType, originalFilename);
    const uniqueId = `leaf_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
    const filename = `${uniqueId}.${ext}`;
    const filepath = path.join(this.uploadDir, filename);

    await fs.promises.writeFile(filepath, buffer);

    return {
      url: `/uploads/scans/${filename}`,
      publicId: uniqueId,
      size: buffer.length,
      format: ext,
      provider: "local",
    };
  }

  private getExtension(mimeType: string, originalFilename?: string): string {
    if (originalFilename) {
      const ext = path.extname(originalFilename).replace(".", "").toLowerCase();
      if (["jpg", "jpeg", "png", "webp"].includes(ext)) return ext;
    }
    if (mimeType.includes("png")) return "png";
    if (mimeType.includes("webp")) return "webp";
    return "jpg";
  }
}

// ── 2. Cloudinary Storage Provider ──────────────────────────────────
export class CloudinaryStorageProvider implements StorageProvider {
  name = "cloudinary" as const;
  private cloudName: string;
  private apiKey: string;
  private apiSecret: string;

  constructor(cloudName: string, apiKey: string, apiSecret: string) {
    this.cloudName = cloudName;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async upload(buffer: Buffer, mimeType: string): Promise<UploadResult> {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "krishidrishti_scans";
    const signaturePayload = `folder=${folder}&timestamp=${timestamp}${this.apiSecret}`;
    const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

    const formData = new FormData();
    const blob = new Blob([buffer], { type: mimeType });
    formData.append("file", blob);
    formData.append("api_key", this.apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", folder);
    formData.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Cloudinary upload failed (${res.status}): ${JSON.stringify(errData)}`);
    }

    const data = await res.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      size: data.bytes || buffer.length,
      format: data.format || "jpg",
      provider: "cloudinary",
    };
  }
}

// ── 3. Factory Function ─────────────────────────────────────────────
export function getStorageProvider(): StorageProvider {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    return new CloudinaryStorageProvider(cloudName, apiKey, apiSecret);
  }

  // Fallback to robust local storage
  return new LocalStorageProvider();
}
