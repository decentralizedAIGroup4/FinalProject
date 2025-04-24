"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testSimpleAgent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Testing simple agent API...");
      const res = await fetch("/api/chat/simple-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "What is Brent's profession?" }),
      });

      const data = await res.json();
      console.log("Response from simple agent API:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response from agent");
      }

      setResult(data.response || "No response received");
    } catch (err) {
      console.error("Error testing simple agent:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test the API when the page loads
    testSimpleAgent();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Agent API Test</h1>
      
      {loading && <p className="mb-4">Loading...</p>}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}
      
      {result && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-700">Response: {result}</p>
        </div>
      )}
      
      <button
        onClick={testSimpleAgent}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {loading ? "Testing..." : "Test Simple Agent API"}
      </button>
    </div>
  );
}
