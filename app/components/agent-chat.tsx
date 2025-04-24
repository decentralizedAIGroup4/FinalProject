"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

export default function AgentChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  // Simplified version of handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("handleSubmit called with message:", message);
    setLoading(true);
    setError(null);

    // Add user message to chat history immediately
    const userMessage = { role: "user", content: message };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    console.log("Added user message to chat history:", userMessage);
    console.log("Current chat history:", newHistory);

    try {
      // Call the agent API
      console.log("Sending message to agent:", message);
      const response = await fetch("/api/chat/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      console.log("Received response from fetch:", response);
      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response from agent");
      }

      // Extract the response text
      const responseText = data.response || "No response received";
      console.log("Response text:", responseText);

      // Create assistant message
      const assistantMessage = { role: "assistant", content: responseText };
      
      // Update chat history with assistant response
      const updatedHistory = [...newHistory, assistantMessage];
      console.log("Updating chat history with assistant message:", assistantMessage);
      console.log("New chat history will be:", updatedHistory);
      
      setChatHistory(updatedHistory);
      setResponse(responseText);
      
      // Verify state was updated
      setTimeout(() => {
        console.log("Current chat history after update:", chatHistory);
      }, 100);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with the CV Agent</h2>
      
      <div className="mb-4 space-y-4 h-[400px] overflow-y-auto border rounded-lg p-4">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500 text-center">
            Ask a question about Brent&apos;s CV to get started
          </p>
        ) : (
          chatHistory.map((msg, index) => (
            <Card key={index} className={`p-3 ${msg.role === "user" ? "bg-blue-50" : "bg-gray-50"}`}>
              <p className="font-semibold">{msg.role === "user" ? "You" : "Agent"}</p>
              <p>{msg.content}</p>
            </Card>
          ))
        )}
        
        {loading && (
          <Card className="p-3 bg-gray-50">
            <p className="font-semibold">Agent</p>
            <p>Thinking...</p>
          </Card>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about Brent's CV..."
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !message.trim()}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
