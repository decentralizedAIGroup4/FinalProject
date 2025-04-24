import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { mkdir } from "fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Handles file uploads for the agent
 * @param request The incoming request with the file
 * @returns A response with the file information
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Ensure the upload directory exists
    const uploadDir = join(process.cwd(), "output", "uploaded");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.log("Directory already exists or cannot be created");
    }
    
    // Save the file
    const filePath = join(uploadDir, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);
    
    // Return the file information
    return NextResponse.json({
      success: true,
      fileName: file.name,
      filePath: filePath,
      fileId: fileName,
    });
  } catch (error) {
    console.error("[Agent Upload API]", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
