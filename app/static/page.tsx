"use client";

import { useState } from "react";

export default function StaticPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Call the simple agent API
      console.log("Sending message to agent:", input);
      const response = await fetch("/api/chat/simple-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      // Add agent response
      setMessages([...newMessages, { role: "assistant", content: data.response || "No response received" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { role: "assistant", content: `Error: ${(error as Error).message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Static Agent Test</h1>

      <div className="border rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Ask a question to get started</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user" ? "bg-blue-100 ml-12" : "bg-gray-100 mr-12"
                }`}
              >
                <p className="font-semibold">{msg.role === "user" ? "You" : "Agent"}</p>
                <p>{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="p-3 rounded-lg bg-gray-100 mr-12">
                <p className="font-semibold">Agent</p>
                <p>Thinking...</p>
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
