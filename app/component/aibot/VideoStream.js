"use client";

import { useRef, useEffect } from "react";

export default function VideoStream({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex justify-center p-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        className="w-full max-w-md"
      />
    </div>
  );
}
