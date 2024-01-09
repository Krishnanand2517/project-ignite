import { useState, useRef } from "react";

const PlayButton = ({ onPlayerClick }) => {
  return (
    <svg
      fill="#ffffff"
      height="100px"
      width="100px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60 60"
      xmlSpace="preserve"
      stroke="#ffffff"
      className="overflow-visible"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>{" "}
          <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>{" "}
        </g>
      </g>
    </svg>
  );
};

const PauseButton = ({ onPlayerClick }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="100px"
      width="100px"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      stroke="#ffffff"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Media / Pause_Circle">
          <path
            id="Vector"
            d="M14 9V15M10 9V15M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};

const VideoPlayer = ({ contentObject }) => {
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const handlePlayerClick = () => {
    const video = videoPlayerRef.current;

    if (isFirstClick) {
      setIsFirstClick(false);
    }

    if (video) {
      isPlaying ? video.pause() : video.play();
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className="relative w-full max-w-screen-md 2xl:max-w-screen-lg mx-auto rounded-md overflow-hidden shadow-lg"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handlePlayerClick}
    >
      <video
        ref={videoPlayerRef}
        controls
        title={contentObject.contentTitle}
        className="rounded-md w-full"
        onPlay={() => setIsPlaying(() => true)}
      >
        <source src={contentObject.contentUrl} type="video/mp4" />
        <source src={contentObject.contentUrl} type="video/mkv" />
        Sorry, your browser does not support embedded videos
      </video>

      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer bg-opacity-50 p-4 rounded-full ${
          (showControls || !isPlaying) && "bg-black"
        }`}
      >
        {!isFirstClick &&
          (isPlaying && showControls ? (
            <PauseButton />
          ) : (
            !isPlaying && <PlayButton />
          ))}
        {isFirstClick && <PlayButton />}
      </div>
    </div>
  );
};

export default VideoPlayer;
