import { useState, useEffect, useRef } from "react";
import loaderVideo from "./assets/carLoader.mp4";
import "./loader.css";

const Loader = ({ onComplete, setLastFrame }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnd] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Capture the last frame when the video ends
    const handleVideoEnd = () => {
      setVideoEnd(true);
      video.pause();

      // Draw the last frame onto a canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas image to a data URL and pass it to Home component
      const lastFrame = canvas.toDataURL("image/png");
      setLastFrame(lastFrame);

      // Start transition
      setTransitioning(true);

      // Allow some time for the transition animation
      setTimeout(() => {
        onComplete();
      }, 1000); // 1 second for the transition
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [setLastFrame, onComplete]);

  return (
    <div className={`loader-container ${transitioning ? "transitioning" : ""}`}>
      <video ref={videoRef} autoPlay muted className="loader-video">
        <source src={loaderVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loader;
