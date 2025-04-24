import AgentChat from "../components/agent-chat";

export default function AgentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CV Agent Demo</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        This demo uses the ts-agents library from LlamaIndex to create an agent that can answer questions about Brent&apos;s CV.
        The agent uses a PDF document as its knowledge source and can answer questions based on the content of the document.
      </p>
      <AgentChat />
    </div>
  );
}
