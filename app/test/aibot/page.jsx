"use client";

import { useState } from "react";
import ChatInput from "@/app/component/aibot/ChatInput";
import ChatWindow from "@/app/component/aibot/ChatWindow";
import VideoStream from "@/app/component/aibot/VideoStream";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState(null);

  const handleSendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  const handleUploadFile = (file) => {
    setMessages([...messages, { type: "file", content: file }]);
  };

  const handleCapture = (stream) => {
    setStream(stream);
  };

  return (
    <div className="flex flex-col justify-around h-full">
      <ChatWindow messages={messages} />
      {stream && <VideoStream stream={stream} />}
      <ChatInput
        onSendMessage={handleSendMessage}
        onUploadFile={handleUploadFile}
        onCapture={handleCapture}
      />
    </div>
  );
}
