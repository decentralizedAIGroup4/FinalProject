import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Handles POST requests to the simple agent API endpoint
 * @param request The incoming request
 * @returns A response with a simple reply
 */
export async function POST(request: NextRequest) {
  console.log("Simple Agent API: Received request", new Date().toISOString());
  try {
    const body = await request.json();
    const { message } = body;
    console.log("Simple Agent API: Received message:", message);

    if (!message) {
      console.log("Simple Agent API: No message provided");
      return NextResponse.json(
        { error: "Message is required in the request body" },
        { status: 400 }
      );
    }

    // Simple response based on the message
    let response = "";
    if (message.toLowerCase().includes("profession")) {
      response = "Based on Brent's CV, he is a Chemical Engineer with experience in polymer processing research and development.";
    } else if (message.toLowerCase().includes("education")) {
      response = "Brent has a Master's degree in Chemical Engineering from the University of Oklahoma.";
    } else if (message.toLowerCase().includes("experience") || message.toLowerCase().includes("work")) {
      response = "Brent has worked as a Graduate Student/Laboratory Associate at the University of Oklahoma, as well as in various other roles including Adjunct Professor and Researcher/Developer.";
    } else {
      response = "I found information about Brent in his CV. You can ask about his profession, education, or work experience.";
    }
    
    console.log("Simple Agent API: Response:", response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("[Simple Agent API]", error);
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
