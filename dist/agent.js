// your imports go here
import { OpenAI, FunctionTool, OpenAIAgent, Settings } from 'llamaindex';
import 'dotenv/config';
async function main() {
    // the rest of your code goes here
    Settings.llm = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4-turbo",
    });
    Settings.callbackManager.on("llm-tool-call", (event) => {
        console.log(event.detail.payload);
    });
    Settings.callbackManager.on("llm-tool-result", (event) => {
        console.log(event.detail.payload);
    });
    const sumNumbers = ({ a, b }) => {
        return `${a + b}`;
    };
    const tool = FunctionTool.from(sumNumbers, {
        name: "sumNumbers",
        description: "Use this function to sum two numbers",
        parameters: {
            type: "object",
            properties: {
                a: {
                    type: "number",
                    description: "First number to sum"
                },
                b: {
                    type: "number",
                    description: "Second number to sum"
                },
            },
            required: ["a", "b"]
        }
    });
    const tools = [tool];
    const agent = new OpenAIAgent({ tools });
    let response = await agent.chat({
        message: "Add 101 and 303",
    });
    console.log(response);
}
main().catch(console.error);
