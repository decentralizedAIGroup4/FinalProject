import { NextRequest, NextResponse } from "next/server";
import { createAgentWithPdfTool, chatWithAgent } from "../llamaindex/ts-agents";
import path from "node:path";
import { existsSync } from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache for the agent to avoid recreating it on every request
let agentCache: any = null;
let currentDocumentPath: string | null = null;

/**
 * Handles POST requests to the agent API endpoint
 * @param request The incoming request
 * @returns A response with the agent's reply
 */
export async function POST(request: NextRequest) {
  console.log("Agent API: Received request");
  try {
    const body = await request.json();
    const { message, files } = body;
    console.log("Agent API: Received message:", message);
    console.log("Agent API: Received files:", files);

    if (!message && !files) {
      console.log("Agent API: No message or files provided");
      return NextResponse.json(
        { error: "Message or files are required in the request body" },
        { status: 400 }
      );
    }

    // Check if we need to create a new agent with a different document
    let documentPath = path.join(process.cwd(), "data", "Brent-CV-2025a.pdf"); // Default CV
    let documentDescription = "This tool can answer detailed questions about Brent's resume/CV.";
    
    // If files are provided, use the first file
    if (files && files.fileUrls && files.fileUrls.length > 0) {
      const fileUrl = files.fileUrls[0];
      const fileName = files.fileNames[0];
      
      // Check if the file path is already absolute
      let filePath = fileUrl;
      
      // If it's not an absolute path, construct it
      if (!path.isAbsolute(fileUrl)) {
        filePath = path.join(process.cwd(), "output", "uploaded", path.basename(fileUrl));
      }
      
      // Verify the file exists
      if (!existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return NextResponse.json(
          { error: `File not found: ${fileName}` },
          { status: 404 }
        );
      }
      
      documentPath = filePath;
      documentDescription = `This tool can answer detailed questions about the uploaded resume/CV: ${fileName}`;
      
      console.log("Using uploaded document:", documentPath);
      
      // If the document path has changed, we need to create a new agent
      if (currentDocumentPath !== documentPath) {
        agentCache = null;
        currentDocumentPath = documentPath;
      }
    }

    // Initialize the agent if it doesn't exist
    if (!agentCache) {
      console.log("Creating new agent with document:", documentPath);
      agentCache = await createAgentWithPdfTool(
        documentPath,
        "resume_tool",
        documentDescription
      );
    }

    // Chat with the agent - the function now returns a string directly
    const responseText = await chatWithAgent(agentCache, message);
    
    console.log("Response text:", responseText);

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("[Agent API]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
