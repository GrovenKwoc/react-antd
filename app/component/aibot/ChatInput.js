"use client";

import { useState } from "react";

export default function ChatInput({ onSendMessage, onUploadFile, onCapture }) {
  const [message, setMessage] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");

  const handleSendMessage = async () => {
    const response = await fetch(`/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, model }),
    });

    const data = await response.json();
    onSendMessage(data);
    setMessage("");
  };

  const handleGoogleAISendMessage = async () => {
    const response = await fetch(`/api/googleai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    onSendMessage(data);
    setMessage("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onUploadFile(file);
  };

  const handleCapture = async () => {
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      onCapture(stream);
    } else {
      alert("Media devices not supported");
    }
  };

  return (
    <div className="flex items-center p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="flex-1 border rounded px-4 py-2 mr-4"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send to OpenAI
      </button>
      <button
        onClick={handleGoogleAISendMessage}
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Send to Google AI
      </button>
      <input type="file" onChange={handleFileUpload} className="ml-4" />
      <button
        onClick={handleCapture}
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Capture
      </button>
    </div>
  );
}
