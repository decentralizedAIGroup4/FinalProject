"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

export default function AgentChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    fileName: string;
    filePath: string;
    fileId: string;
  } | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jobDescFileInfo, setJobDescFileInfo] = useState<{
    fileName: string;
    filePath: string;
    fileId: string;
  } | null>(null);
  const [hasBothDocuments, setHasBothDocuments] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jobDescInputRef = useRef<HTMLInputElement>(null);

  // Handle CV/Resume file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload the file
      const response = await fetch("/api/chat/agent-upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload file");
      }
      
      // Store the uploaded file information
      setUploadedFile(file);
      setUploadedFileInfo({
        fileName: data.fileName,
        filePath: data.filePath,
        fileId: data.fileId,
      });
      
    } catch (err) {
      console.error("Error uploading file:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Job Description file upload
  const handleJobDescFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload the file
      const response = await fetch("/api/chat/agent-upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload file");
      }
      
      // Store the uploaded file information
      setJobDescFile(file);
      setJobDescFileInfo({
        fileName: data.fileName,
        filePath: data.filePath,
        fileId: data.fileId,
      });
      
    } catch (err) {
      console.error("Error uploading job description file:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Remove uploaded CV/Resume file
  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadedFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Remove uploaded Job Description file
  const removeJobDescFile = () => {
    setJobDescFile(null);
    setJobDescFileInfo(null);
    if (jobDescInputRef.current) {
      jobDescInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !uploadedFile && !jobDescFile) return;

    console.log("handleSubmit called with message:", message);
    setLoading(true);
    setError(null);

    // Prepare file information for display in chat history
    let fileInfo = "";
    if (uploadedFile) {
      fileInfo += `[CV/Resume: ${uploadedFile.name}]`;
    }
    if (jobDescFile) {
      fileInfo += fileInfo ? " " : "";
      fileInfo += `[Job Description: ${jobDescFile.name}]`;
    }

    // Add user message to chat history immediately
    const userMessage = { 
      role: "user", 
      content: fileInfo ? `${message} ${fileInfo}` : message 
    };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    console.log("Added user message to chat history:", userMessage);
    console.log("Current chat history:", newHistory);

    try {
      // Prepare files for API call
      const fileIds = [];
      const fileUrls = [];
      const fileNames = [];
      
      if (uploadedFileInfo) {
        fileIds.push(uploadedFileInfo.fileId);
        fileUrls.push(uploadedFileInfo.filePath);
        fileNames.push(uploadedFileInfo.fileName);
      }
      
      if (jobDescFileInfo) {
        fileIds.push(jobDescFileInfo.fileId);
        fileUrls.push(jobDescFileInfo.filePath);
        fileNames.push(jobDescFileInfo.fileName);
      }
      
      // Call the agent API
      console.log("Sending message to agent:", message);
      console.log("Sending files:", { fileIds, fileUrls, fileNames });
      
      const response = await fetch("/api/chat/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message,
          files: fileIds.length > 0 ? {
            fileIds,
            fileUrls,
            fileNames
          } : null
        }),
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

      // Check if both documents are present
      if (data.hasBothDocuments) {
        setHasBothDocuments(true);
      }
      
      // If this was a cover letter request, store it separately
      if (message.toLowerCase().includes("generate cover letter") || 
          message.toLowerCase().includes("create cover letter") ||
          message.toLowerCase().includes("write cover letter") ||
          message.toLowerCase().includes("cover letter")) {
        setCoverLetter(responseText);
        setShowCoverLetter(true);
      }
      
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

  // Handle generate cover letter button click
  const handleGenerateCoverLetter = async () => {
    if (uploadedFile && jobDescFile) {
      // Use a custom message for cover letter generation
      const coverLetterMessage = "Generate a cover letter based on my CV and the job description";
      
      // Create a synthetic event
      const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
      
      // Save the current message
      const currentMessage = message;
      
      // Set the message to the cover letter request
      setMessage(coverLetterMessage);
      
      // Call handleSubmit with the synthetic event
      await handleSubmit(syntheticEvent);
      
      // Restore the original message
      setMessage(currentMessage);
    }
  };
  
  // Toggle cover letter visibility
  const toggleCoverLetter = () => {
    setShowCoverLetter(!showCoverLetter);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with the CV Agent</h2>
      
      {/* Cover Letter Section */}
      {coverLetter && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Cover Letter</h3>
            <Button 
              onClick={toggleCoverLetter} 
              variant="outline" 
              size="sm"
            >
              {showCoverLetter ? "Hide" : "Show"}
            </Button>
          </div>
          {showCoverLetter && (
            <Card className="p-4 bg-white border shadow-sm">
              <div className="whitespace-pre-line">
                {coverLetter}
              </div>
            </Card>
          )}
        </div>
      )}
      
      <div className="mb-4 space-y-4 h-[400px] overflow-y-auto border rounded-lg p-4">
        {chatHistory.length === 0 ? (
          <div className="text-gray-500 text-center space-y-2">
            <p>Upload a CV/resume and/or job description to get started</p>
            <p className="text-sm">You can upload both to compare them and assess fit</p>
            <p className="text-sm">Or use the default CV (Brent's CV) to try it out</p>
          </div>
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
      
      {/* Generate Cover Letter Button */}
      {uploadedFile && jobDescFile && !loading && (
        <div className="mb-4">
          <Button 
            onClick={handleGenerateCoverLetter}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            Analysis for Cover Letter
          </Button>
        </div>
      )}

      {/* File preview section */}
      <div className="mb-4 space-y-2">
        {uploadedFile && (
          <div className="p-2 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2">📄</div>
                <span><strong>CV/Resume:</strong> {uploadedFile.name}</span>
              </div>
              <button 
                onClick={removeUploadedFile}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        {jobDescFile && (
          <div className="p-2 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2">📄</div>
                <span><strong>Job Description:</strong> {jobDescFile.name}</span>
              </div>
              <button 
                onClick={removeJobDescFile}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about the uploaded files..."
          disabled={loading}
          className="flex-1"
        />
        <div className="flex gap-1">
          <Button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={loading || uploadedFile !== null}
            title={uploadedFile ? "Remove current file first" : "Upload CV/Resume"}
            className="text-xs px-2"
          >
            📎 CV
          </Button>
          <Button 
            type="button" 
            onClick={() => jobDescInputRef.current?.click()}
            variant="outline"
            disabled={loading || jobDescFile !== null}
            title={jobDescFile ? "Remove current file first" : "Upload Job Description"}
            className="text-xs px-2"
          >
            📎 Job
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
        />
        <input
          ref={jobDescInputRef}
          type="file"
          className="hidden"
          onChange={handleJobDescFileChange}
          accept=".pdf,.docx,.txt"
        />
        <Button 
          type="submit" 
          disabled={loading || (!message.trim() && !uploadedFile && !jobDescFile)}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
