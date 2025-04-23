// your imports go here
import {
  OpenAI,
  FunctionTool,
  OpenAIAgent,
  Settings,
  VectorStoreIndex,
  QueryEngineTool,
  LlamaParseReader
} from 'llamaindex';
import { HuggingFaceEmbedding } from '@llamaindex/huggingface';
import { SimpleDirectoryReader } from "@llamaindex/readers/directory"

import 'dotenv/config';

/*
import * as llamaindex from 'llamaindex';
console.log(Object.keys(llamaindex));
*/

async function main() {
      // the rest of your code goes here
      Settings.llm = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4-turbo",
      });


      Settings.callbackManager.on("llm-tool-call",(event) => {
	      console.log(event.detail.payload)
      });

      Settings.callbackManager.on("llm-tool-result",(event) => {
	      console.log(event.detail.payload)
      });

      Settings.embedModel = new HuggingFaceEmbedding({
	      modelType: "BAAI/bge-small-en-v1.5",
	      quantized: false
      })


      const reader = new LlamaParseReader({ resultType: "markdown" });

      const documents = await reader.loadData("../data/CSF_Proposed_Budget_Book_June_2023_Master_Web.pdf")

      const index = await VectorStoreIndex.fromDocuments(documents)

      const retriever = await index.asRetriever()

      retriever.similarityTopK = 10

      const queryEngine = await index.asQueryEngine({
        retriever
      })

      const tools = [
          new QueryEngineTool({
             queryEngine: queryEngine,
             metadata: {
               name: "san_francisco_budget_tool",
               description: `This tool can answer detailed questions about the individual components of the budget of San Francisco in 2023-2024.`,
          },
      }),
     ]

     // create the agent
     const agent = new OpenAIAgent({tools})

     let response = await agent.chat({
          message: "What's the budget of San Francisco in 2023-2024?",
     })

     console.log(response)
}

main().catch(console.error);
