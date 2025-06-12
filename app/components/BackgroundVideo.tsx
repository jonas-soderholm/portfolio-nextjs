// components/BackgroundVideo.tsx
"use client";

export default function BackgroundVideo() {
  return (
    <div className="video-bg">
      <video src="/gradient.mp4" autoPlay muted playsInline loop />
      <video src="/gradient.mp4" autoPlay muted playsInline loop />
    </div>
  );
}
