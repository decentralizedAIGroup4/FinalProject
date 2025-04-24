import {
  OpenAI,
  FunctionTool,
  OpenAIAgent,
  Settings,
  VectorStoreIndex,
  QueryEngineTool
} from 'llamaindex';
import { HuggingFaceEmbedding } from '@llamaindex/huggingface';
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import path from 'node:path';
import 'dotenv/config';

/**
 * Creates an OpenAI agent with query engine tools for PDF documents
 * @param documentPaths Path or array of paths to the PDF documents to be processed
 * @param toolName Base name of the tool to be created
 * @param toolDescription Description of the tool to be created
 * @returns The created OpenAI agent
 */
export async function createAgentWithPdfTool(
  documentPaths: string | string[],
  toolName: string = "document_tool",
  toolDescription: string = "This tool can answer detailed questions about the document."
) {
  // Convert single path to array for consistent handling
  const paths = Array.isArray(documentPaths) ? documentPaths : [documentPaths];
  
  // Configure LLM
  Settings.llm = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.MODEL || "gpt-4-turbo",
  });

  // Set up callbacks for debugging
  Settings.callbackManager.on("llm-tool-call", (event) => {
    console.log("Tool Call:", event.detail);
  });

  Settings.callbackManager.on("llm-tool-result", (event) => {
    console.log("Tool Result:", event.detail);
  });

  // Configure embedding model
  Settings.embedModel = new HuggingFaceEmbedding({
    modelType: "BAAI/bge-small-en-v1.5"
  });

  // Create tools array
  const tools = [];
  
  // Process each document and create a tool for it
  for (let i = 0; i < paths.length; i++) {
    const docPath = paths[i];
    const docName = path.basename(docPath);
    
    // Determine if this is likely a CV or job description based on the filename
    const isJobDescription = docName.toLowerCase().includes("job") || 
                            docName.toLowerCase().includes("description");
    
    // Create specific tool name and description
    const specificToolName = paths.length > 1 
      ? `${toolName}_${i+1}${isJobDescription ? "_job" : "_cv"}`
      : toolName;
      
    const specificToolDescription = paths.length > 1
      ? isJobDescription 
        ? `This tool analyzes the job description: ${docName}`
        : `This tool analyzes the CV/resume: ${docName}`
      : toolDescription;
    
    console.log(`Creating tool for document ${i+1}: ${docPath}`);
    console.log(`Tool name: ${specificToolName}`);
    console.log(`Tool description: ${specificToolDescription}`);
    
    // Try multiple approaches to load the document
    let docsToUse: any[] = [];
    
    // First try: Load the file directly
    try {
      console.log(`Attempting to load ${docPath} directly`);
      const reader = new SimpleDirectoryReader();
      const singleFileDocuments = await reader.loadData(docPath);
      
      if (singleFileDocuments.length > 0) {
        console.log(`Successfully loaded ${docPath} directly with ${singleFileDocuments.length} documents`);
        docsToUse = singleFileDocuments;
      }
    } catch (directLoadError) {
      console.error(`Error loading file directly:`, directLoadError);
      
      // Second try: Load from directory and filter
      try {
        console.log(`Attempting to load from directory ${path.dirname(docPath)}`);
        const reader = new SimpleDirectoryReader();
        const documents = await reader.loadData(path.dirname(docPath));
        
        // Filter to only include the specific file we want
        const targetFileName = path.basename(docPath);
        const filteredDocuments = documents.filter(doc => {
          return doc.metadata.file_name === targetFileName;
        });
        
        if (filteredDocuments.length > 0) {
          console.log(`Found ${filteredDocuments.length} documents matching ${targetFileName}`);
          docsToUse = filteredDocuments;
        } else {
          console.warn(`Warning: Could not find document with filename ${targetFileName} in loaded documents`);
          console.log("Available documents:", documents.map(d => d.metadata.file_name).join(", "));
          
          // Fall back to using all documents in the directory
          console.log("Using all documents in the directory instead");
          docsToUse = documents;
        }
      } catch (error) {
        const dirLoadError = error as Error;
        console.error(`Error loading from directory:`, dirLoadError);
        throw new Error(`Failed to load document ${docPath}: ${dirLoadError.message}`);
      }
    }
    
    // If we still don't have any documents, throw an error
    if (docsToUse.length === 0) {
      throw new Error(`Could not load any documents for ${docPath}`);
    }
    
    console.log(`Loaded ${docsToUse.length} documents for ${docPath}`);
    
    // Create vector store index
    const index = await VectorStoreIndex.fromDocuments(docsToUse);

    // Configure retriever
    const retriever = await index.asRetriever();
    retriever.similarityTopK = 10;

    // Create query engine
    const queryEngine = await index.asQueryEngine({
      retriever
    });

    // Add tool for this document
    tools.push(
      new QueryEngineTool({
        queryEngine: queryEngine,
        metadata: {
          name: specificToolName,
          description: specificToolDescription,
        },
      })
    );
  }
  
  // If we have multiple documents, we don't need to add a special comparison tool
  // Instead, we'll enhance the system prompt to guide the agent to compare the documents
  // This is simpler and avoids TypeScript errors with the FunctionTool constructor

  // Create the agent with all tools
  const agent = new OpenAIAgent({ 
    tools,
    systemPrompt: paths.length > 1 
      ? "You are an expert CV and job description analyzer. When presented with both a CV/resume and job description, ALWAYS analyze and compare them without asking for additional details. Provide a thorough assessment of how well the candidate's qualifications match the job requirements, highlighting specific strengths and identifying any gaps. If asked to generate a cover letter, create a professional, tailored cover letter that highlights the candidate's relevant skills and experiences that match the job requirements. NEVER ask for CV or job description documents as they are already provided to you through your tools. Use the document_analysis_tool tools to access and analyze the documents."
      : "You are an expert CV analyzer. You can analyze CVs/resumes and provide insights about the candidate's qualifications and experience. NEVER ask for CV documents as they are already provided to you through your tools. Use the document_analysis_tool tools to access and analyze the documents."
  });
  
  return agent;
}

/**
 * Sends a message to the agent and returns the response as a string
 * @param agent The OpenAI agent to chat with
 * @param message The message to send to the agent
 * @returns The agent's response as a string
 */
export async function chatWithAgent(agent: OpenAIAgent, message: string): Promise<string> {
  try {
    // Check if this is a cover letter request
    const isCoverLetterRequest = message.toLowerCase().includes("generate cover letter") || 
                                message.toLowerCase().includes("create cover letter") ||
                                message.toLowerCase().includes("write cover letter") ||
                                message.toLowerCase().includes("cover letter");
    
    // If this is a cover letter request, add explicit instructions
    let enhancedMessage = message;
    if (isCoverLetterRequest) {
      enhancedMessage = `${message}\n\nIMPORTANT: Use the document analysis tools to analyze both the CV/resume and job description. DO NOT ask for these documents as they are already provided to you through your tools. Generate a professional cover letter based on the information in these documents.`;
    }
    
    const response = await agent.chat({
      message: enhancedMessage,
    });
    
    // Log the response for debugging
    console.log("Raw response from agent:", response);
    
    // Try to extract the response text
    if (typeof response === "string") {
      return response;
    }
    
    // If it's an object with a toString method that gives meaningful output
    if (response && typeof response.toString === "function") {
      const stringValue = response.toString();
      if (stringValue && stringValue !== "[object Object]") {
        return stringValue;
      }
    }
    
    // If we have a response object, try to extract the content
    if (response && typeof response === "object") {
      // Check for common properties that might contain the response
      if (response.response && typeof response.response === "string") {
        return response.response;
      }
      
      // Try to stringify the object for debugging
      try {
        const jsonString = JSON.stringify(response);
        console.log("Response as JSON:", jsonString);
        
        // If we can parse it as JSON, look for content or text properties
        const parsed = JSON.parse(jsonString);
        if (parsed.content) return String(parsed.content);
        if (parsed.text) return String(parsed.text);
        if (parsed.message && typeof parsed.message === "string") return parsed.message;
        if (parsed.message && parsed.message.content) return String(parsed.message.content);
      } catch (e) {
        console.error("Error parsing response as JSON:", e);
      }
    }
    
    // Fallback response
    return "I processed your request about Brent's CV, but couldn't format the response properly.";
  } catch (error) {
    console.error("Error in chatWithAgent:", error);
    return "An error occurred while processing your request.";
  }
}

/**
 * Example usage of the agent
 */
export async function exampleAgentUsage() {
  try {
    // Create an agent with a PDF tool
    const documentPath = path.join(process.cwd(), 'data', 'Brent-CV-2025a.pdf');
    const agent = await createAgentWithPdfTool(
      documentPath,
      "resume_tool",
      "This tool can answer detailed questions about Brent's resume/CV."
    );

    // Chat with the agent
    const response = await chatWithAgent(agent, "What is Brent's profession?");
    console.log(response);
    
    return response;
  } catch (error) {
    console.error("Error in agent usage:", error);
    throw error;
  }
}
