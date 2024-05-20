"use client";

import { useState } from "react";

export default function ChatInput({ onSendMessage, onUploadFile, onCapture }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const handleGoogleAISendMessage = async () => {
    onSendMessage({ type: "user", message: message });
    setPending(true);
    try {
      const response = await fetch(`/api/googleai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      onSendMessage({ type: "bot", message: data });
    } catch (error) {
      console.log(error);
      onSendMessage({ type: "bot", message: "Something's Wrong" });
    }
    setMessage("");
    setPending(false);
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
    <div className="flex justify-between">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="请输入要咨询的情绪问题"
        className="flex-1 border rounded p-8 mr-4"
        disabled={pending}
      />
      <button
        onClick={handleGoogleAISendMessage}
        className=" bg-blue-900 text-white p-8 rounded"
        disabled={pending}
      >
        咨询AI专家
      </button>
      {/* <input type="file" onChange={handleFileUpload} className="ml-4" />
      <button
        onClick={handleCapture}
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Capture
      </button> */}
    </div>
  );
}
