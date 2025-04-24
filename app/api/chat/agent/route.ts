import { NextRequest, NextResponse } from "next/server";
import { createAgentWithPdfTool, chatWithAgent } from "../llamaindex/ts-agents";
import path from "node:path";
import { existsSync } from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache for the agent to avoid recreating it on every request
let agentCache: any = null;
let currentDocumentPaths: string[] = [];

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

    // Default document paths and descriptions
    const documentPaths: string[] = [];
    const documentDescriptions: string[] = [];
    
    // Default CV if no files are provided
    const defaultCvPath = path.join(process.cwd(), "data", "Brent-CV-2025a.pdf");
    
    // Default job description if needed for cover letter generation
    const defaultJobDescPath = path.join(process.cwd(), "data", "junior-full-stack-web-dev.pdf");
    
    // Check if this is a cover letter request
    const isCoverLetterRequest = message.toLowerCase().includes("generate cover letter") || 
                                message.toLowerCase().includes("create cover letter") ||
                                message.toLowerCase().includes("write cover letter") ||
                                message.toLowerCase().includes("cover letter");
    
    // Process uploaded files
    if (files && files.fileUrls && files.fileUrls.length > 0) {
      for (let i = 0; i < files.fileUrls.length; i++) {
        const fileUrl = files.fileUrls[i];
        const fileName = files.fileNames[i];
        
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
        
        documentPaths.push(filePath);
        
        // Determine if this is a CV or job description based on the file name or position in the array
        // This is a simple heuristic - in a real app, you might want to analyze the content
        const isJobDescription = fileName.toLowerCase().includes("job") || 
                                fileName.toLowerCase().includes("description") ||
                                i > 0; // Assume second file is job description
        
        if (isJobDescription) {
          documentDescriptions.push(`This tool can analyze the job description: ${fileName}`);
        } else {
          documentDescriptions.push(`This tool can analyze the resume/CV: ${fileName}`);
        }
        
        console.log(`Using uploaded document ${i+1}:`, filePath);
      }
    } else {
      // If no files are provided, use the default CV
      documentPaths.push(defaultCvPath);
      documentDescriptions.push("This tool can answer detailed questions about Brent's resume/CV.");
      
      // If this is a cover letter request, also add the default job description
      if (isCoverLetterRequest) {
        documentPaths.push(defaultJobDescPath);
        documentDescriptions.push("This tool can analyze the default job description for a Junior Full Stack Web Developer position.");
        console.log("Added default job description for cover letter generation");
      }
    }
    
    // Check if we need to create a new agent with different documents
    const documentsChanged = documentPaths.length !== currentDocumentPaths.length ||
      documentPaths.some((path, index) => path !== currentDocumentPaths[index]);
    
    if (documentsChanged || !agentCache) {
      console.log("Creating new agent with documents:", documentPaths);
      
      // Create a combined description for the agent
      let agentDescription = "This agent can analyze";
      if (documentPaths.length > 1) {
        agentDescription += " and compare a CV/resume against a job description to assess fit.";
      } else {
        agentDescription += " a CV/resume and answer questions about it.";
      }
      
      // Create the agent with the documents
      agentCache = await createAgentWithPdfTool(
        documentPaths,
        "document_analysis_tool",
        agentDescription
      );
      
      // Update the current document paths
      currentDocumentPaths = [...documentPaths];
    }

    // Enhance the message if we have both CV and job description
    let enhancedMessage = message;
    let hasBothDocuments = false;
    
    if (documentPaths.length > 1) {
      hasBothDocuments = true;
      
      // If this is a cover letter generation request
      if (message.toLowerCase().includes("generate cover letter") || 
          message.toLowerCase().includes("create cover letter") ||
          message.toLowerCase().includes("write cover letter") ||
          message.toLowerCase().includes("cover letter")) {
        enhancedMessage = "Please generate a professional cover letter based on the CV and job description provided. The cover letter should highlight the candidate's relevant skills and experiences that match the job requirements, and explain why they would be a good fit for the position. IMPORTANT: Use your document analysis tools to access and analyze both the CV and job description. DO NOT ask for these documents as they are already provided to you through your tools.";
      }
      // If the user hasn't explicitly asked for a comparison but we have both documents,
      // explicitly instruct the agent to analyze both documents without asking for details
      else if (!message.toLowerCase().includes("compare") && 
          !message.toLowerCase().includes("match") &&
          !message.toLowerCase().includes("fit")) {
        enhancedMessage = `Based on the CV and job description provided, ${message} Please analyze both documents and provide insights without asking for additional details.`;
      }
    }

    // Chat with the agent
    const responseText = await chatWithAgent(agentCache, enhancedMessage);
    
    console.log("Response text:", responseText);

    // Add a flag to indicate if both documents are present
    return NextResponse.json({ 
      response: responseText,
      hasBothDocuments: hasBothDocuments
    });
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
