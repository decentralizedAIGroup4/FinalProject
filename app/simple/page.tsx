"use client";

import { useState } from "react";

export default function SimplePage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // Simulate agent response
    setTimeout(() => {
      let response = "";
      if (input.toLowerCase().includes("profession")) {
        response = "Based on Brent's CV, he is a Chemical Engineer with experience in polymer processing research and development.";
      } else if (input.toLowerCase().includes("education")) {
        response = "Brent has a Master's degree in Chemical Engineering from the University of Oklahoma.";
      } else if (input.toLowerCase().includes("experience") || input.toLowerCase().includes("work")) {
        response = "Brent has worked as a Graduate Student/Laboratory Associate at the University of Oklahoma, as well as in various other roles including Adjunct Professor and Researcher/Developer.";
      } else {
        response = "I found information about Brent in his CV. You can ask about his profession, education, or work experience.";
      }
      
      setMessages([...newMessages, { role: "assistant", content: response }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Simple Chat</h1>
      
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
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
