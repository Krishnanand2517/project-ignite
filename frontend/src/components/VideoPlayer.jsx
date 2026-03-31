import { useState, useRef, useEffect } from "react";

const VideoPlayer = ({ contentObject }) => {
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // ✅ Sync state with actual video state
  useEffect(() => {
    const video = videoPlayerRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayerClick = (event) => {
    const video = videoPlayerRef.current;
    if (!video) return;

    // ✅ Ignore clicks on native controls
    if (event.target !== video) return;

    if (video.paused) {
      video.play().catch(() => {
        // autoplay restriction fallback
        const handleLoaded = () => {
          video.play();
          video.removeEventListener("loadeddata", handleLoaded);
        };
        video.addEventListener("loadeddata", handleLoaded);
      });
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-black shadow-2xl cursor-pointer group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handlePlayerClick}
    >
      <video
        ref={videoPlayerRef}
        controls
        title={contentObject.contentTitle}
        className="w-full rounded-2xl"
      >
        <source src={contentObject.contentUrl} type="video/mp4" />
        <source src={contentObject.contentUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Custom overlay */}
      {(!isPlaying || showControls) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-[rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-200 ${
              isPlaying && !showControls
                ? "opacity-0 scale-90"
                : "opacity-100 scale-100"
            }`}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 5L19 12L8 19V5Z" fill="white" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
