/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/agent/route";
exports.ids = ["app/api/chat/agent/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/agent/route.ts":
/*!*************************************!*\
  !*** ./app/api/chat/agent/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _llamaindex_ts_agents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../llamaindex/ts-agents */ \"(rsc)/./app/api/chat/llamaindex/ts-agents.ts\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:path */ \"node:path\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst runtime = \"nodejs\";\nconst dynamic = \"force-dynamic\";\n// Cache for the agent to avoid recreating it on every request\nlet agentCache = null;\n/**\n * Handles POST requests to the agent API endpoint\n * @param request The incoming request\n * @returns A response with the agent's reply\n */ async function POST(request) {\n    console.log(\"Agent API: Received request\");\n    try {\n        const body = await request.json();\n        const { message } = body;\n        console.log(\"Agent API: Received message:\", message);\n        if (!message) {\n            console.log(\"Agent API: No message provided\");\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Message is required in the request body\"\n            }, {\n                status: 400\n            });\n        }\n        // Initialize the agent if it doesn't exist\n        if (!agentCache) {\n            console.log(\"Creating new agent...\");\n            const documentPath = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"data\", \"Brent-CV-2025a.pdf\"); // Using the CV file that exists in the data directory\n            agentCache = await (0,_llamaindex_ts_agents__WEBPACK_IMPORTED_MODULE_1__.createAgentWithPdfTool)(documentPath, \"resume_tool\", \"This tool can answer detailed questions about Brent's resume/CV.\");\n        }\n        // Chat with the agent - the function now returns a string directly\n        const responseText = await (0,_llamaindex_ts_agents__WEBPACK_IMPORTED_MODULE_1__.chatWithAgent)(agentCache, message);\n        console.log(\"Response text:\", responseText);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            response: responseText\n        });\n    } catch (error) {\n        console.error(\"[Agent API]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvYWdlbnQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF3RDtBQUN3QjtBQUNuRDtBQUV0QixNQUFNSSxVQUFVLFNBQVM7QUFDekIsTUFBTUMsVUFBVSxnQkFBZ0I7QUFFdkMsOERBQThEO0FBQzlELElBQUlDLGFBQWtCO0FBRXRCOzs7O0NBSUMsR0FDTSxlQUFlQyxLQUFLQyxPQUFvQjtJQUM3Q0MsUUFBUUMsR0FBRyxDQUFDO0lBQ1osSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUgsUUFBUUksSUFBSTtRQUMvQixNQUFNLEVBQUVDLE9BQU8sRUFBRSxHQUFHRjtRQUNwQkYsUUFBUUMsR0FBRyxDQUFDLGdDQUFnQ0c7UUFFNUMsSUFBSSxDQUFDQSxTQUFTO1lBQ1pKLFFBQVFDLEdBQUcsQ0FBQztZQUNaLE9BQU9WLHFEQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFRSxPQUFPO1lBQTBDLEdBQ25EO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDVCxZQUFZO1lBQ2ZHLFFBQVFDLEdBQUcsQ0FBQztZQUNaLE1BQU1NLGVBQWViLHFEQUFTLENBQUNlLFFBQVFDLEdBQUcsSUFBSSxRQUFRLHVCQUF1QixzREFBc0Q7WUFDbkliLGFBQWEsTUFBTUwsNkVBQXNCQSxDQUN2Q2UsY0FDQSxlQUNBO1FBRUo7UUFFQSxtRUFBbUU7UUFDbkUsTUFBTUksZUFBZSxNQUFNbEIsb0VBQWFBLENBQUNJLFlBQVlPO1FBRXJESixRQUFRQyxHQUFHLENBQUMsa0JBQWtCVTtRQUU5QixPQUFPcEIscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFUyxVQUFVRDtRQUFhO0lBQ3BELEVBQUUsT0FBT04sT0FBTztRQUNkTCxRQUFRSyxLQUFLLENBQUMsZUFBZUE7UUFDN0IsT0FBT2QscURBQVlBLENBQUNZLElBQUksQ0FDdEI7WUFDRUUsT0FBTyxNQUFpQkQsT0FBTztRQUNqQyxHQUNBO1lBQ0VFLFFBQVE7UUFDVjtJQUVKO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL2JyZW50L0Rvd25sb2Fkcy9FbmNvZGVERUFJL0ZpbmFsUHJvamVjdC9hcHAvYXBpL2NoYXQvYWdlbnQvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgY3JlYXRlQWdlbnRXaXRoUGRmVG9vbCwgY2hhdFdpdGhBZ2VudCB9IGZyb20gXCIuLi9sbGFtYWluZGV4L3RzLWFnZW50c1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiO1xuXG4vLyBDYWNoZSBmb3IgdGhlIGFnZW50IHRvIGF2b2lkIHJlY3JlYXRpbmcgaXQgb24gZXZlcnkgcmVxdWVzdFxubGV0IGFnZW50Q2FjaGU6IGFueSA9IG51bGw7XG5cbi8qKlxuICogSGFuZGxlcyBQT1NUIHJlcXVlc3RzIHRvIHRoZSBhZ2VudCBBUEkgZW5kcG9pbnRcbiAqIEBwYXJhbSByZXF1ZXN0IFRoZSBpbmNvbWluZyByZXF1ZXN0XG4gKiBAcmV0dXJucyBBIHJlc3BvbnNlIHdpdGggdGhlIGFnZW50J3MgcmVwbHlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc29sZS5sb2coXCJBZ2VudCBBUEk6IFJlY2VpdmVkIHJlcXVlc3RcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gYm9keTtcbiAgICBjb25zb2xlLmxvZyhcIkFnZW50IEFQSTogUmVjZWl2ZWQgbWVzc2FnZTpcIiwgbWVzc2FnZSk7XG5cbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWdlbnQgQVBJOiBObyBtZXNzYWdlIHByb3ZpZGVkXCIpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIk1lc3NhZ2UgaXMgcmVxdWlyZWQgaW4gdGhlIHJlcXVlc3QgYm9keVwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBhZ2VudCBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgaWYgKCFhZ2VudENhY2hlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBhZ2VudC4uLlwiKTtcbiAgICAgIGNvbnN0IGRvY3VtZW50UGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImRhdGFcIiwgXCJCcmVudC1DVi0yMDI1YS5wZGZcIik7IC8vIFVzaW5nIHRoZSBDViBmaWxlIHRoYXQgZXhpc3RzIGluIHRoZSBkYXRhIGRpcmVjdG9yeVxuICAgICAgYWdlbnRDYWNoZSA9IGF3YWl0IGNyZWF0ZUFnZW50V2l0aFBkZlRvb2woXG4gICAgICAgIGRvY3VtZW50UGF0aCxcbiAgICAgICAgXCJyZXN1bWVfdG9vbFwiLFxuICAgICAgICBcIlRoaXMgdG9vbCBjYW4gYW5zd2VyIGRldGFpbGVkIHF1ZXN0aW9ucyBhYm91dCBCcmVudCdzIHJlc3VtZS9DVi5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDaGF0IHdpdGggdGhlIGFnZW50IC0gdGhlIGZ1bmN0aW9uIG5vdyByZXR1cm5zIGEgc3RyaW5nIGRpcmVjdGx5XG4gICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgY2hhdFdpdGhBZ2VudChhZ2VudENhY2hlLCBtZXNzYWdlKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIHRleHQ6XCIsIHJlc3BvbnNlVGV4dCk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZXNwb25zZTogcmVzcG9uc2VUZXh0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQWdlbnQgQVBJXVwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBlcnJvcjogKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNyZWF0ZUFnZW50V2l0aFBkZlRvb2wiLCJjaGF0V2l0aEFnZW50IiwicGF0aCIsInJ1bnRpbWUiLCJkeW5hbWljIiwiYWdlbnRDYWNoZSIsIlBPU1QiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsImJvZHkiLCJqc29uIiwibWVzc2FnZSIsImVycm9yIiwic3RhdHVzIiwiZG9jdW1lbnRQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/agent/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/chat/llamaindex/ts-agents.ts":
/*!**********************************************!*\
  !*** ./app/api/chat/llamaindex/ts-agents.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   chatWithAgent: () => (/* binding */ chatWithAgent),\n/* harmony export */   createAgentWithPdfTool: () => (/* binding */ createAgentWithPdfTool),\n/* harmony export */   exampleAgentUsage: () => (/* binding */ exampleAgentUsage)\n/* harmony export */ });\n/* harmony import */ var llamaindex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! llamaindex */ \"(rsc)/./node_modules/llamaindex/dist/index.react-server.js\");\n/* harmony import */ var _llamaindex_huggingface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @llamaindex/huggingface */ \"(rsc)/./node_modules/@llamaindex/huggingface/dist/index.js\");\n/* harmony import */ var _llamaindex_readers_directory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @llamaindex/readers/directory */ \"(rsc)/./node_modules/@llamaindex/readers/directory/dist/index.js\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:path */ \"node:path\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv/config */ \"(rsc)/./node_modules/dotenv/config.js\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n/**\n * Creates an OpenAI agent with a query engine tool for a PDF document\n * @param documentPath Path to the PDF document to be processed\n * @param toolName Name of the tool to be created\n * @param toolDescription Description of the tool to be created\n * @returns The created OpenAI agent\n */ async function createAgentWithPdfTool(documentPath, toolName = \"document_tool\", toolDescription = \"This tool can answer detailed questions about the document.\") {\n    // Configure LLM\n    llamaindex__WEBPACK_IMPORTED_MODULE_0__.Settings.llm = new llamaindex__WEBPACK_IMPORTED_MODULE_0__.OpenAI({\n        apiKey: process.env.OPENAI_API_KEY,\n        model: process.env.MODEL || \"gpt-4-turbo\"\n    });\n    // Set up callbacks for debugging\n    llamaindex__WEBPACK_IMPORTED_MODULE_0__.Settings.callbackManager.on(\"llm-tool-call\", (event)=>{\n        console.log(\"Tool Call:\", event.detail);\n    });\n    llamaindex__WEBPACK_IMPORTED_MODULE_0__.Settings.callbackManager.on(\"llm-tool-result\", (event)=>{\n        console.log(\"Tool Result:\", event.detail);\n    });\n    // Configure embedding model\n    llamaindex__WEBPACK_IMPORTED_MODULE_0__.Settings.embedModel = new _llamaindex_huggingface__WEBPACK_IMPORTED_MODULE_1__.HuggingFaceEmbedding({\n        modelType: \"BAAI/bge-small-en-v1.5\"\n    });\n    // Load document\n    const reader = new _llamaindex_readers_directory__WEBPACK_IMPORTED_MODULE_2__.SimpleDirectoryReader();\n    const documents = await reader.loadData(node_path__WEBPACK_IMPORTED_MODULE_3___default().dirname(documentPath));\n    // Create vector store index\n    const index = await llamaindex__WEBPACK_IMPORTED_MODULE_0__.VectorStoreIndex.fromDocuments(documents);\n    // Configure retriever\n    const retriever = await index.asRetriever();\n    retriever.similarityTopK = 10;\n    // Create query engine\n    const queryEngine = await index.asQueryEngine({\n        retriever\n    });\n    // Create tools\n    const tools = [\n        new llamaindex__WEBPACK_IMPORTED_MODULE_0__.QueryEngineTool({\n            queryEngine: queryEngine,\n            metadata: {\n                name: toolName,\n                description: toolDescription\n            }\n        })\n    ];\n    // Create the agent\n    const agent = new llamaindex__WEBPACK_IMPORTED_MODULE_0__.OpenAIAgent({\n        tools\n    });\n    return agent;\n}\n/**\n * Sends a message to the agent and returns the response as a string\n * @param agent The OpenAI agent to chat with\n * @param message The message to send to the agent\n * @returns The agent's response as a string\n */ async function chatWithAgent(agent, message) {\n    try {\n        const response = await agent.chat({\n            message\n        });\n        // Log the response for debugging\n        console.log(\"Raw response from agent:\", response);\n        // Try to extract the response text\n        if (typeof response === \"string\") {\n            return response;\n        }\n        // If it's an object with a toString method that gives meaningful output\n        if (response && typeof response.toString === \"function\") {\n            const stringValue = response.toString();\n            if (stringValue && stringValue !== \"[object Object]\") {\n                return stringValue;\n            }\n        }\n        // If we have a response object, try to extract the content\n        if (response && typeof response === \"object\") {\n            // Check for common properties that might contain the response\n            if (response.response && typeof response.response === \"string\") {\n                return response.response;\n            }\n            // Try to stringify the object for debugging\n            try {\n                const jsonString = JSON.stringify(response);\n                console.log(\"Response as JSON:\", jsonString);\n                // If we can parse it as JSON, look for content or text properties\n                const parsed = JSON.parse(jsonString);\n                if (parsed.content) return String(parsed.content);\n                if (parsed.text) return String(parsed.text);\n                if (parsed.message && typeof parsed.message === \"string\") return parsed.message;\n                if (parsed.message && parsed.message.content) return String(parsed.message.content);\n            } catch (e) {\n                console.error(\"Error parsing response as JSON:\", e);\n            }\n        }\n        // Fallback response\n        return \"I processed your request about Brent's CV, but couldn't format the response properly.\";\n    } catch (error) {\n        console.error(\"Error in chatWithAgent:\", error);\n        return \"An error occurred while processing your request.\";\n    }\n}\n/**\n * Example usage of the agent\n */ async function exampleAgentUsage() {\n    try {\n        // Create an agent with a PDF tool\n        const documentPath = node_path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'data', 'Brent-CV-2025a.pdf');\n        const agent = await createAgentWithPdfTool(documentPath, \"resume_tool\", \"This tool can answer detailed questions about Brent's resume/CV.\");\n        // Chat with the agent\n        const response = await chatWithAgent(agent, \"What is Brent's profession?\");\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(\"Error in agent usage:\", error);\n        throw error;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvbGxhbWFpbmRleC90cy1hZ2VudHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQU9vQjtBQUMyQztBQUNPO0FBQ3pDO0FBQ047QUFFdkI7Ozs7OztDQU1DLEdBQ00sZUFBZVEsdUJBQ3BCQyxZQUFvQixFQUNwQkMsV0FBbUIsZUFBZSxFQUNsQ0Msa0JBQTBCLDZEQUE2RDtJQUV2RixnQkFBZ0I7SUFDaEJULGdEQUFRQSxDQUFDVSxHQUFHLEdBQUcsSUFBSVosOENBQU1BLENBQUM7UUFDeEJhLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztRQUNsQ0MsT0FBT0gsUUFBUUMsR0FBRyxDQUFDRyxLQUFLLElBQUk7SUFDOUI7SUFFQSxpQ0FBaUM7SUFDakNoQixnREFBUUEsQ0FBQ2lCLGVBQWUsQ0FBQ0MsRUFBRSxDQUFDLGlCQUFpQixDQUFDQztRQUM1Q0MsUUFBUUMsR0FBRyxDQUFDLGNBQWNGLE1BQU1HLE1BQU07SUFDeEM7SUFFQXRCLGdEQUFRQSxDQUFDaUIsZUFBZSxDQUFDQyxFQUFFLENBQUMsbUJBQW1CLENBQUNDO1FBQzlDQyxRQUFRQyxHQUFHLENBQUMsZ0JBQWdCRixNQUFNRyxNQUFNO0lBQzFDO0lBRUEsNEJBQTRCO0lBQzVCdEIsZ0RBQVFBLENBQUN1QixVQUFVLEdBQUcsSUFBSXBCLHlFQUFvQkEsQ0FBQztRQUM3Q3FCLFdBQVc7SUFDYjtJQUVBLGdCQUFnQjtJQUNoQixNQUFNQyxTQUFTLElBQUlyQixnRkFBcUJBO0lBQ3hDLE1BQU1zQixZQUFZLE1BQU1ELE9BQU9FLFFBQVEsQ0FBQ3RCLHdEQUFZLENBQUNFO0lBRXJELDRCQUE0QjtJQUM1QixNQUFNc0IsUUFBUSxNQUFNNUIsd0RBQWdCQSxDQUFDNkIsYUFBYSxDQUFDSjtJQUVuRCxzQkFBc0I7SUFDdEIsTUFBTUssWUFBWSxNQUFNRixNQUFNRyxXQUFXO0lBQ3pDRCxVQUFVRSxjQUFjLEdBQUc7SUFFM0Isc0JBQXNCO0lBQ3RCLE1BQU1DLGNBQWMsTUFBTUwsTUFBTU0sYUFBYSxDQUFDO1FBQzVDSjtJQUNGO0lBRUEsZUFBZTtJQUNmLE1BQU1LLFFBQVE7UUFDWixJQUFJbEMsdURBQWVBLENBQUM7WUFDbEJnQyxhQUFhQTtZQUNiRyxVQUFVO2dCQUNSQyxNQUFNOUI7Z0JBQ04rQixhQUFhOUI7WUFDZjtRQUNGO0tBQ0Q7SUFFRCxtQkFBbUI7SUFDbkIsTUFBTStCLFFBQVEsSUFBSXpDLG1EQUFXQSxDQUFDO1FBQUVxQztJQUFNO0lBRXRDLE9BQU9JO0FBQ1Q7QUFFQTs7Ozs7Q0FLQyxHQUNNLGVBQWVDLGNBQWNELEtBQWtCLEVBQUVFLE9BQWU7SUFDckUsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUgsTUFBTUksSUFBSSxDQUFDO1lBQ2hDRjtRQUNGO1FBRUEsaUNBQWlDO1FBQ2pDdEIsUUFBUUMsR0FBRyxDQUFDLDRCQUE0QnNCO1FBRXhDLG1DQUFtQztRQUNuQyxJQUFJLE9BQU9BLGFBQWEsVUFBVTtZQUNoQyxPQUFPQTtRQUNUO1FBRUEsd0VBQXdFO1FBQ3hFLElBQUlBLFlBQVksT0FBT0EsU0FBU0UsUUFBUSxLQUFLLFlBQVk7WUFDdkQsTUFBTUMsY0FBY0gsU0FBU0UsUUFBUTtZQUNyQyxJQUFJQyxlQUFlQSxnQkFBZ0IsbUJBQW1CO2dCQUNwRCxPQUFPQTtZQUNUO1FBQ0Y7UUFFQSwyREFBMkQ7UUFDM0QsSUFBSUgsWUFBWSxPQUFPQSxhQUFhLFVBQVU7WUFDNUMsOERBQThEO1lBQzlELElBQUlBLFNBQVNBLFFBQVEsSUFBSSxPQUFPQSxTQUFTQSxRQUFRLEtBQUssVUFBVTtnQkFDOUQsT0FBT0EsU0FBU0EsUUFBUTtZQUMxQjtZQUVBLDRDQUE0QztZQUM1QyxJQUFJO2dCQUNGLE1BQU1JLGFBQWFDLEtBQUtDLFNBQVMsQ0FBQ047Z0JBQ2xDdkIsUUFBUUMsR0FBRyxDQUFDLHFCQUFxQjBCO2dCQUVqQyxrRUFBa0U7Z0JBQ2xFLE1BQU1HLFNBQVNGLEtBQUtHLEtBQUssQ0FBQ0o7Z0JBQzFCLElBQUlHLE9BQU9FLE9BQU8sRUFBRSxPQUFPQyxPQUFPSCxPQUFPRSxPQUFPO2dCQUNoRCxJQUFJRixPQUFPSSxJQUFJLEVBQUUsT0FBT0QsT0FBT0gsT0FBT0ksSUFBSTtnQkFDMUMsSUFBSUosT0FBT1IsT0FBTyxJQUFJLE9BQU9RLE9BQU9SLE9BQU8sS0FBSyxVQUFVLE9BQU9RLE9BQU9SLE9BQU87Z0JBQy9FLElBQUlRLE9BQU9SLE9BQU8sSUFBSVEsT0FBT1IsT0FBTyxDQUFDVSxPQUFPLEVBQUUsT0FBT0MsT0FBT0gsT0FBT1IsT0FBTyxDQUFDVSxPQUFPO1lBQ3BGLEVBQUUsT0FBT0csR0FBRztnQkFDVm5DLFFBQVFvQyxLQUFLLENBQUMsbUNBQW1DRDtZQUNuRDtRQUNGO1FBRUEsb0JBQW9CO1FBQ3BCLE9BQU87SUFDVCxFQUFFLE9BQU9DLE9BQU87UUFDZHBDLFFBQVFvQyxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPO0lBQ1Q7QUFDRjtBQUVBOztDQUVDLEdBQ00sZUFBZUM7SUFDcEIsSUFBSTtRQUNGLGtDQUFrQztRQUNsQyxNQUFNbEQsZUFBZUYscURBQVMsQ0FBQ08sUUFBUStDLEdBQUcsSUFBSSxRQUFRO1FBQ3RELE1BQU1uQixRQUFRLE1BQU1sQyx1QkFDbEJDLGNBQ0EsZUFDQTtRQUdGLHNCQUFzQjtRQUN0QixNQUFNb0MsV0FBVyxNQUFNRixjQUFjRCxPQUFPO1FBQzVDcEIsUUFBUUMsR0FBRyxDQUFDc0I7UUFFWixPQUFPQTtJQUNULEVBQUUsT0FBT2EsT0FBTztRQUNkcEMsUUFBUW9DLEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE1BQU1BO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvYnJlbnQvRG93bmxvYWRzL0VuY29kZURFQUkvRmluYWxQcm9qZWN0L2FwcC9hcGkvY2hhdC9sbGFtYWluZGV4L3RzLWFnZW50cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBPcGVuQUksXG4gIEZ1bmN0aW9uVG9vbCxcbiAgT3BlbkFJQWdlbnQsXG4gIFNldHRpbmdzLFxuICBWZWN0b3JTdG9yZUluZGV4LFxuICBRdWVyeUVuZ2luZVRvb2xcbn0gZnJvbSAnbGxhbWFpbmRleCc7XG5pbXBvcnQgeyBIdWdnaW5nRmFjZUVtYmVkZGluZyB9IGZyb20gJ0BsbGFtYWluZGV4L2h1Z2dpbmdmYWNlJztcbmltcG9ydCB7IFNpbXBsZURpcmVjdG9yeVJlYWRlciB9IGZyb20gXCJAbGxhbWFpbmRleC9yZWFkZXJzL2RpcmVjdG9yeVwiO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCAnZG90ZW52L2NvbmZpZyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBPcGVuQUkgYWdlbnQgd2l0aCBhIHF1ZXJ5IGVuZ2luZSB0b29sIGZvciBhIFBERiBkb2N1bWVudFxuICogQHBhcmFtIGRvY3VtZW50UGF0aCBQYXRoIHRvIHRoZSBQREYgZG9jdW1lbnQgdG8gYmUgcHJvY2Vzc2VkXG4gKiBAcGFyYW0gdG9vbE5hbWUgTmFtZSBvZiB0aGUgdG9vbCB0byBiZSBjcmVhdGVkXG4gKiBAcGFyYW0gdG9vbERlc2NyaXB0aW9uIERlc2NyaXB0aW9uIG9mIHRoZSB0b29sIHRvIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIE9wZW5BSSBhZ2VudFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQWdlbnRXaXRoUGRmVG9vbChcbiAgZG9jdW1lbnRQYXRoOiBzdHJpbmcsXG4gIHRvb2xOYW1lOiBzdHJpbmcgPSBcImRvY3VtZW50X3Rvb2xcIixcbiAgdG9vbERlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlRoaXMgdG9vbCBjYW4gYW5zd2VyIGRldGFpbGVkIHF1ZXN0aW9ucyBhYm91dCB0aGUgZG9jdW1lbnQuXCJcbikge1xuICAvLyBDb25maWd1cmUgTExNXG4gIFNldHRpbmdzLmxsbSA9IG5ldyBPcGVuQUkoe1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVksXG4gICAgbW9kZWw6IHByb2Nlc3MuZW52Lk1PREVMIHx8IFwiZ3B0LTQtdHVyYm9cIixcbiAgfSk7XG5cbiAgLy8gU2V0IHVwIGNhbGxiYWNrcyBmb3IgZGVidWdnaW5nXG4gIFNldHRpbmdzLmNhbGxiYWNrTWFuYWdlci5vbihcImxsbS10b29sLWNhbGxcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJUb29sIENhbGw6XCIsIGV2ZW50LmRldGFpbCk7XG4gIH0pO1xuXG4gIFNldHRpbmdzLmNhbGxiYWNrTWFuYWdlci5vbihcImxsbS10b29sLXJlc3VsdFwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlRvb2wgUmVzdWx0OlwiLCBldmVudC5kZXRhaWwpO1xuICB9KTtcblxuICAvLyBDb25maWd1cmUgZW1iZWRkaW5nIG1vZGVsXG4gIFNldHRpbmdzLmVtYmVkTW9kZWwgPSBuZXcgSHVnZ2luZ0ZhY2VFbWJlZGRpbmcoe1xuICAgIG1vZGVsVHlwZTogXCJCQUFJL2JnZS1zbWFsbC1lbi12MS41XCJcbiAgfSk7XG5cbiAgLy8gTG9hZCBkb2N1bWVudFxuICBjb25zdCByZWFkZXIgPSBuZXcgU2ltcGxlRGlyZWN0b3J5UmVhZGVyKCk7XG4gIGNvbnN0IGRvY3VtZW50cyA9IGF3YWl0IHJlYWRlci5sb2FkRGF0YShwYXRoLmRpcm5hbWUoZG9jdW1lbnRQYXRoKSk7XG5cbiAgLy8gQ3JlYXRlIHZlY3RvciBzdG9yZSBpbmRleFxuICBjb25zdCBpbmRleCA9IGF3YWl0IFZlY3RvclN0b3JlSW5kZXguZnJvbURvY3VtZW50cyhkb2N1bWVudHMpO1xuXG4gIC8vIENvbmZpZ3VyZSByZXRyaWV2ZXJcbiAgY29uc3QgcmV0cmlldmVyID0gYXdhaXQgaW5kZXguYXNSZXRyaWV2ZXIoKTtcbiAgcmV0cmlldmVyLnNpbWlsYXJpdHlUb3BLID0gMTA7XG5cbiAgLy8gQ3JlYXRlIHF1ZXJ5IGVuZ2luZVxuICBjb25zdCBxdWVyeUVuZ2luZSA9IGF3YWl0IGluZGV4LmFzUXVlcnlFbmdpbmUoe1xuICAgIHJldHJpZXZlclxuICB9KTtcblxuICAvLyBDcmVhdGUgdG9vbHNcbiAgY29uc3QgdG9vbHMgPSBbXG4gICAgbmV3IFF1ZXJ5RW5naW5lVG9vbCh7XG4gICAgICBxdWVyeUVuZ2luZTogcXVlcnlFbmdpbmUsXG4gICAgICBtZXRhZGF0YToge1xuICAgICAgICBuYW1lOiB0b29sTmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHRvb2xEZXNjcmlwdGlvbixcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG5cbiAgLy8gQ3JlYXRlIHRoZSBhZ2VudFxuICBjb25zdCBhZ2VudCA9IG5ldyBPcGVuQUlBZ2VudCh7IHRvb2xzIH0pO1xuICBcbiAgcmV0dXJuIGFnZW50O1xufVxuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgYWdlbnQgYW5kIHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGEgc3RyaW5nXG4gKiBAcGFyYW0gYWdlbnQgVGhlIE9wZW5BSSBhZ2VudCB0byBjaGF0IHdpdGhcbiAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHNlbmQgdG8gdGhlIGFnZW50XG4gKiBAcmV0dXJucyBUaGUgYWdlbnQncyByZXNwb25zZSBhcyBhIHN0cmluZ1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhdFdpdGhBZ2VudChhZ2VudDogT3BlbkFJQWdlbnQsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhZ2VudC5jaGF0KHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgfSk7XG4gICAgXG4gICAgLy8gTG9nIHRoZSByZXNwb25zZSBmb3IgZGVidWdnaW5nXG4gICAgY29uc29sZS5sb2coXCJSYXcgcmVzcG9uc2UgZnJvbSBhZ2VudDpcIiwgcmVzcG9uc2UpO1xuICAgIFxuICAgIC8vIFRyeSB0byBleHRyYWN0IHRoZSByZXNwb25zZSB0ZXh0XG4gICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBJZiBpdCdzIGFuIG9iamVjdCB3aXRoIGEgdG9TdHJpbmcgbWV0aG9kIHRoYXQgZ2l2ZXMgbWVhbmluZ2Z1bCBvdXRwdXRcbiAgICBpZiAocmVzcG9uc2UgJiYgdHlwZW9mIHJlc3BvbnNlLnRvU3RyaW5nID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gcmVzcG9uc2UudG9TdHJpbmcoKTtcbiAgICAgIGlmIChzdHJpbmdWYWx1ZSAmJiBzdHJpbmdWYWx1ZSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgICByZXR1cm4gc3RyaW5nVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIGhhdmUgYSByZXNwb25zZSBvYmplY3QsIHRyeSB0byBleHRyYWN0IHRoZSBjb250ZW50XG4gICAgaWYgKHJlc3BvbnNlICYmIHR5cGVvZiByZXNwb25zZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgLy8gQ2hlY2sgZm9yIGNvbW1vbiBwcm9wZXJ0aWVzIHRoYXQgbWlnaHQgY29udGFpbiB0aGUgcmVzcG9uc2VcbiAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZSAmJiB0eXBlb2YgcmVzcG9uc2UucmVzcG9uc2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBUcnkgdG8gc3RyaW5naWZ5IHRoZSBvYmplY3QgZm9yIGRlYnVnZ2luZ1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBhcyBKU09OOlwiLCBqc29uU3RyaW5nKTtcbiAgICAgICAgXG4gICAgICAgIC8vIElmIHdlIGNhbiBwYXJzZSBpdCBhcyBKU09OLCBsb29rIGZvciBjb250ZW50IG9yIHRleHQgcHJvcGVydGllc1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuICAgICAgICBpZiAocGFyc2VkLmNvbnRlbnQpIHJldHVybiBTdHJpbmcocGFyc2VkLmNvbnRlbnQpO1xuICAgICAgICBpZiAocGFyc2VkLnRleHQpIHJldHVybiBTdHJpbmcocGFyc2VkLnRleHQpO1xuICAgICAgICBpZiAocGFyc2VkLm1lc3NhZ2UgJiYgdHlwZW9mIHBhcnNlZC5tZXNzYWdlID09PSBcInN0cmluZ1wiKSByZXR1cm4gcGFyc2VkLm1lc3NhZ2U7XG4gICAgICAgIGlmIChwYXJzZWQubWVzc2FnZSAmJiBwYXJzZWQubWVzc2FnZS5jb250ZW50KSByZXR1cm4gU3RyaW5nKHBhcnNlZC5tZXNzYWdlLmNvbnRlbnQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyByZXNwb25zZSBhcyBKU09OOlwiLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRmFsbGJhY2sgcmVzcG9uc2VcbiAgICByZXR1cm4gXCJJIHByb2Nlc3NlZCB5b3VyIHJlcXVlc3QgYWJvdXQgQnJlbnQncyBDViwgYnV0IGNvdWxkbid0IGZvcm1hdCB0aGUgcmVzcG9uc2UgcHJvcGVybHkuXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGNoYXRXaXRoQWdlbnQ6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC5cIjtcbiAgfVxufVxuXG4vKipcbiAqIEV4YW1wbGUgdXNhZ2Ugb2YgdGhlIGFnZW50XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGFtcGxlQWdlbnRVc2FnZSgpIHtcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgYW4gYWdlbnQgd2l0aCBhIFBERiB0b29sXG4gICAgY29uc3QgZG9jdW1lbnRQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkYXRhJywgJ0JyZW50LUNWLTIwMjVhLnBkZicpO1xuICAgIGNvbnN0IGFnZW50ID0gYXdhaXQgY3JlYXRlQWdlbnRXaXRoUGRmVG9vbChcbiAgICAgIGRvY3VtZW50UGF0aCxcbiAgICAgIFwicmVzdW1lX3Rvb2xcIixcbiAgICAgIFwiVGhpcyB0b29sIGNhbiBhbnN3ZXIgZGV0YWlsZWQgcXVlc3Rpb25zIGFib3V0IEJyZW50J3MgcmVzdW1lL0NWLlwiXG4gICAgKTtcblxuICAgIC8vIENoYXQgd2l0aCB0aGUgYWdlbnRcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNoYXRXaXRoQWdlbnQoYWdlbnQsIFwiV2hhdCBpcyBCcmVudCdzIHByb2Zlc3Npb24/XCIpO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGFnZW50IHVzYWdlOlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJPcGVuQUkiLCJPcGVuQUlBZ2VudCIsIlNldHRpbmdzIiwiVmVjdG9yU3RvcmVJbmRleCIsIlF1ZXJ5RW5naW5lVG9vbCIsIkh1Z2dpbmdGYWNlRW1iZWRkaW5nIiwiU2ltcGxlRGlyZWN0b3J5UmVhZGVyIiwicGF0aCIsImNyZWF0ZUFnZW50V2l0aFBkZlRvb2wiLCJkb2N1bWVudFBhdGgiLCJ0b29sTmFtZSIsInRvb2xEZXNjcmlwdGlvbiIsImxsbSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsIm1vZGVsIiwiTU9ERUwiLCJjYWxsYmFja01hbmFnZXIiLCJvbiIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImVtYmVkTW9kZWwiLCJtb2RlbFR5cGUiLCJyZWFkZXIiLCJkb2N1bWVudHMiLCJsb2FkRGF0YSIsImRpcm5hbWUiLCJpbmRleCIsImZyb21Eb2N1bWVudHMiLCJyZXRyaWV2ZXIiLCJhc1JldHJpZXZlciIsInNpbWlsYXJpdHlUb3BLIiwicXVlcnlFbmdpbmUiLCJhc1F1ZXJ5RW5naW5lIiwidG9vbHMiLCJtZXRhZGF0YSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImFnZW50IiwiY2hhdFdpdGhBZ2VudCIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImNoYXQiLCJ0b1N0cmluZyIsInN0cmluZ1ZhbHVlIiwianNvblN0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZWQiLCJwYXJzZSIsImNvbnRlbnQiLCJTdHJpbmciLCJ0ZXh0IiwiZSIsImVycm9yIiwiZXhhbXBsZUFnZW50VXNhZ2UiLCJqb2luIiwiY3dkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/llamaindex/ts-agents.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fagent%2Froute&page=%2Fapi%2Fchat%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fagent%2Froute.ts&appDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fagent%2Froute&page=%2Fapi%2Fchat%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fagent%2Froute.ts&appDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_brent_Downloads_EncodeDEAI_FinalProject_app_api_chat_agent_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/agent/route.ts */ \"(rsc)/./app/api/chat/agent/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/agent/route\",\n        pathname: \"/api/chat/agent\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/agent/route\"\n    },\n    resolvedPagePath: \"/home/brent/Downloads/EncodeDEAI/FinalProject/app/api/chat/agent/route.ts\",\n    nextConfigOutput,\n    userland: _home_brent_Downloads_EncodeDEAI_FinalProject_app_api_chat_agent_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGYWdlbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNoYXQlMkZhZ2VudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNoYXQlMkZhZ2VudCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGYnJlbnQlMkZEb3dubG9hZHMlMkZFbmNvZGVERUFJJTJGRmluYWxQcm9qZWN0JTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGYnJlbnQlMkZEb3dubG9hZHMlMkZFbmNvZGVERUFJJTJGRmluYWxQcm9qZWN0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QjtBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvYnJlbnQvRG93bmxvYWRzL0VuY29kZURFQUkvRmluYWxQcm9qZWN0L2FwcC9hcGkvY2hhdC9hZ2VudC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9hZ2VudC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYXQvYWdlbnRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NoYXQvYWdlbnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9icmVudC9Eb3dubG9hZHMvRW5jb2RlREVBSS9GaW5hbFByb2plY3QvYXBwL2FwaS9jaGF0L2FnZW50L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fagent%2Froute&page=%2Fapi%2Fchat%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fagent%2Froute.ts&appDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@huggingface/transformers":
/*!********************************************!*\
  !*** external "@huggingface/transformers" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:module":
/*!******************************!*\
  !*** external "node:module" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:module");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "unpdf":
/*!************************!*\
  !*** external "unpdf" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("unpdf");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@llamaindex","vendor-chunks/openai","vendor-chunks/zod","vendor-chunks/entities","vendor-chunks/zod-to-json-schema","vendor-chunks/ms","vendor-chunks/underscore","vendor-chunks/llamaindex","vendor-chunks/mammoth","vendor-chunks/bluebird","vendor-chunks/jszip","vendor-chunks/xmlbuilder","vendor-chunks/pako","vendor-chunks/lop","vendor-chunks/csv-parse","vendor-chunks/readable-stream","vendor-chunks/node-fetch","vendor-chunks/domutils","vendor-chunks/@xmldom","vendor-chunks/dotenv","vendor-chunks/magic-bytes.js","vendor-chunks/agentkeepalive","vendor-chunks/htmlparser2","vendor-chunks/peberminta","vendor-chunks/js-tiktoken","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/inherits","vendor-chunks/dingbat-to-unicode","vendor-chunks/web-streams-polyfill","vendor-chunks/selderee","vendor-chunks/parseley","vendor-chunks/leac","vendor-chunks/html-to-text","vendor-chunks/domelementtype","vendor-chunks/@selderee","vendor-chunks/@huggingface","vendor-chunks/util-deprecate","vendor-chunks/string_decoder","vendor-chunks/safe-buffer","vendor-chunks/process-nextick-args","vendor-chunks/path-is-absolute","vendor-chunks/option","vendor-chunks/lodash","vendor-chunks/lie","vendor-chunks/isarray","vendor-chunks/immediate","vendor-chunks/humanize-ms","vendor-chunks/event-target-shim","vendor-chunks/deepmerge","vendor-chunks/core-util-is","vendor-chunks/base64-js","vendor-chunks/abort-controller"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fagent%2Froute&page=%2Fapi%2Fchat%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fagent%2Froute.ts&appDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbrent%2FDownloads%2FEncodeDEAI%2FFinalProject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();