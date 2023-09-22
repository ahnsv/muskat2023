import React, {
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

type SoundButtonProps = {
  youtubeVideoID: string;
};
const SoundButton: React.FC<SoundButtonProps> = ({ youtubeVideoID }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const initPlayer = useCallback(() => {
    if (playerRef.current) return;

    const player = new window.YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: youtubeVideoID,
      playerVars: {
        autoplay: 0,
      },
      events: {
        onReady: () => {
          if (isPlaying) {
            player.playVideo();
          }
        },
      },
    });

    playerRef.current = player;
  }, [isPlaying, youtubeVideoID]);

  useEffect(() => {
    // Load the YouTube Iframe API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    script.onload = () => {
      // Initialize the player once the API script is loaded
      initPlayer();
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the script tag if the component unmounts
      document.head.removeChild(script);
    };
  }, [initPlayer]);

  const toggleSound = () => {
    if (!playerRef.current) {
      initPlayer();
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleSound}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center"
      >
        {isPlaying ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.73 5.293a1 1 0 0 1 1.414 1.414L12.414 12l3.707 3.293a1 1 0 0 1-1.414 1.414L10 13.414V10a1 1 0 0 1 1-1z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
            Stop
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="25"
              height="25"
            >
              <circle cx="50" cy="50" r="45" fill="#ffffff" />
              <polygon points="35,25 75,50 35,75" fill="#000000" />
            </svg>
            <span className="ml-2">Play Music</span>
          </>
        )}
      </button>
      <div id="youtube-player" />
    </div>
  );
};

export default SoundButton;
