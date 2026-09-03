"use client";

import { useEffect, useRef } from "react";

// @types/youtube declares the YT namespace but not the API's own callback
// global, which it invokes directly on window once the script loads.
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YouTubePlayerProps = {
  videoId: string;
};

// The official way to embed -- see
// https://developers.google.com/youtube/iframe_api_reference. The script is
// shared across every player on the page and only ever injected once.
let apiPromise: Promise<typeof YT> | null = null;

const loadYouTubeApi = (): Promise<typeof YT> => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });

  return apiPromise;
};

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YTApi) => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new YTApi.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        // rel=0 limits related videos (shown after playback ends) to the
        // same channel rather than the whole site -- YouTube stopped
        // supporting fully disabling them in 2018, but this is still
        // respected. Nothing here hides the player chrome or YouTube
        // branding, which their embed terms require.
        playerVars: { rel: 0 },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  return <div className="watch-player-embed" ref={containerRef} />;
};

export default YouTubePlayer;
