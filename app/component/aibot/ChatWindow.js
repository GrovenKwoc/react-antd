"use client";

export default function ChatWindow({ messages }) {
  return (
    <div className="flex flex-col p-4 h-4/5 overflow-y-scroll border">
      {messages.map((msg, index) => (
        <div key={index} className="my-2 p-2 border rounded">
          {msg.type === "text" ? (
            msg.content
          ) : (
            <img
              src={URL.createObjectURL(msg.content)}
              alt="Uploaded content"
            />
          )}
        </div>
      ))}
    </div>
  );
}
