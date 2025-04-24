import { NextRequest, NextResponse } from "next/server";
import { createAgentWithPdfTool, chatWithAgent } from "../llamaindex/ts-agents";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache for the agent to avoid recreating it on every request
let agentCache: any = null;

/**
 * Handles POST requests to the agent API endpoint
 * @param request The incoming request
 * @returns A response with the agent's reply
 */
export async function POST(request: NextRequest) {
  console.log("Agent API: Received request");
  try {
    const body = await request.json();
    const { message } = body;
    console.log("Agent API: Received message:", message);

    if (!message) {
      console.log("Agent API: No message provided");
      return NextResponse.json(
        { error: "Message is required in the request body" },
        { status: 400 }
      );
    }

    // Initialize the agent if it doesn't exist
    if (!agentCache) {
      console.log("Creating new agent...");
      const documentPath = path.join(process.cwd(), "data", "Brent-CV-2025a.pdf"); // Using the CV file that exists in the data directory
      agentCache = await createAgentWithPdfTool(
        documentPath,
        "resume_tool",
        "This tool can answer detailed questions about Brent's resume/CV."
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
