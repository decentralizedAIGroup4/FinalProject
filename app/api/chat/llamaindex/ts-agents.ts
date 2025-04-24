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
 * Creates an OpenAI agent with a query engine tool for a PDF document
 * @param documentPath Path to the PDF document to be processed
 * @param toolName Name of the tool to be created
 * @param toolDescription Description of the tool to be created
 * @returns The created OpenAI agent
 */
export async function createAgentWithPdfTool(
  documentPath: string,
  toolName: string = "document_tool",
  toolDescription: string = "This tool can answer detailed questions about the document."
) {
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

  // Load document
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData(path.dirname(documentPath));

  // Create vector store index
  const index = await VectorStoreIndex.fromDocuments(documents);

  // Configure retriever
  const retriever = await index.asRetriever();
  retriever.similarityTopK = 10;

  // Create query engine
  const queryEngine = await index.asQueryEngine({
    retriever
  });

  // Create tools
  const tools = [
    new QueryEngineTool({
      queryEngine: queryEngine,
      metadata: {
        name: toolName,
        description: toolDescription,
      },
    }),
  ];

  // Create the agent
  const agent = new OpenAIAgent({ tools });
  
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
    const response = await agent.chat({
      message,
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
