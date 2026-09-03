"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import type { LanguageDefinition } from "../../languages/registry";
import { compareVideos, fetchVideos, likeVideo } from "./api";
import DifficultyBadge from "./DifficultyBadge";
import { ChevronDownIcon, HeartIcon, PlayIcon } from "./icons";
import { getSessionId } from "./session";
import { formatDuration, levelLabel, type DifficultyLevel, type SortMode, type Video } from "./types";
import VideoCard from "./VideoCard";
import YouTubePlayer from "./YouTubePlayer";

type WatchClientProps = {
  code: string;
  definition: LanguageDefinition;
};

const LEVEL_PARAM_VALUES = new Set(["novice", "beginner", "intermediate", "advanced"]);
const SORT_PARAM_VALUES = new Set(["easiest", "hardest", "most-liked", "random"]);

const WatchClient = ({ code, definition }: WatchClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  // One random seed per browsing session (new filters, new sort, fresh
  // page load), reused across every "load more" page so sort=random stays
  // a stable order while paging through it instead of reshuffling per page.
  const seedRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [lastWatchedId, setLastWatchedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Filter, sort, and which video is open all live in the URL rather than
  // component state -- that's what makes the browser's back button land
  // the user back on the watch tab with their filters intact instead of
  // leaving the page entirely.
  const activeVideoId = searchParams.get("video");
  const rawLevel = searchParams.get("level");
  const filterLevel: DifficultyLevel | "all" = LEVEL_PARAM_VALUES.has(rawLevel ?? "")
    ? (rawLevel as DifficultyLevel)
    : "all";
  const rawSort = searchParams.get("sort");
  const sortMode: SortMode = SORT_PARAM_VALUES.has(rawSort ?? "") ? (rawSort as SortMode) : "random";

  // Clears any leftover confirmation whenever the video in the URL changes
  // -- including when it's cleared by the back button -- so a stale
  // "thanks, ranking updated" message from the last video never lingers.
  useEffect(() => {
    setConfirmation(null);
  }, [activeVideoId]);

  // Filtering and sorting happen server-side now (see watch.py). A new
  // seed here means a fresh shuffle for sort=random each time the filters
  // actually change, while "load more" below keeps reusing this same seed.
  useEffect(() => {
    let cancelled = false;
    seedRef.current = Math.floor(Math.random() * 1_000_000_000);
    setIsLoading(true);
    setVideos([]);
    fetchVideos(code, {
      level: filterLevel === "all" ? undefined : filterLevel,
      sort: sortMode,
      seed: seedRef.current,
    }).then((result) => {
      if (cancelled) return;
      setVideos(result.items);
      setHasMore(result.hasMore);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [code, filterLevel, sortMode]);

  // Kept in a ref (rather than depended on directly) so the
  // IntersectionObserver effect below can set itself up once per browse
  // session instead of tearing down and reconnecting on every state change.
  const loadMoreRef = useRef<() => void>(() => {});
  loadMoreRef.current = () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    fetchVideos(code, {
      level: filterLevel === "all" ? undefined : filterLevel,
      sort: sortMode,
      seed: seedRef.current,
      offset: videos.length,
    }).then((result) => {
      setVideos((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setIsLoadingMore(false);
    });
  };

  // The sentinel div only exists in the DOM once loading finishes and the
  // grid actually renders (it's absent while isLoading is true and while
  // watching a video) -- depending on that, not just activeVideoId, is
  // what lets this find the real node instead of running once against a
  // still-null ref and never re-attaching.
  const showGrid = !isLoading && videos.length > 0;
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreRef.current();
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [activeVideoId, showGrid]);

  const updateParams = (updates: Record<string, string | null>, push: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (push) {
      router.push(url);
    } else {
      router.replace(url);
    }
  };

  const activeVideo = videos.find((video) => video.id === activeVideoId) ?? null;
  const lastVideo =
    lastWatchedId && lastWatchedId !== activeVideoId
      ? videos.find((video) => video.id === lastWatchedId) ?? null
      : null;

  const visibleVideos = videos;

  // Pushed (not replaced) so it lands as a new history entry -- that's
  // what lets the browser back button pop back to the browse view.
  const openVideo = (id: string) => updateParams({ video: id }, true);

  const backToBrowse = () => router.back();

  const toggleLike = async (id: string) => {
    if (isMutating) return;
    setIsMutating(true);
    const updated = await likeVideo(code, id, getSessionId());
    if (updated) {
      setVideos((prev) => prev.map((video) => (video.id === id ? updated : video)));
      setLikedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
    setIsMutating(false);
  };

  const castComparisonVote = async (direction: "easier" | "same" | "harder") => {
    if (!activeVideo || !lastVideo || isMutating) return;
    setIsMutating(true);

    const result = await compareVideos(code, activeVideo.id, lastVideo.id, direction, getSessionId());
    if (result) {
      setVideos((prev) =>
        prev.map((video) => {
          if (video.id === result.video.id) return result.video;
          if (video.id === result.previousVideo.id) return result.previousVideo;
          return video;
        }),
      );
      setLastWatchedId(activeVideo.id);
      setConfirmation(
        direction === "same"
          ? "Noted as about the same difficulty."
          : "Thanks -- the ranking just updated.",
      );
    }
    setIsMutating(false);
  };

  const markBaseline = () => {
    if (!activeVideo) return;
    setLastWatchedId(activeVideo.id);
    setConfirmation("Got it -- this is your baseline for comparing what you watch next.");
  };

  return (
    <div className="page">
      <PageHeader
        title="Watch"
        subtitle={`Watch ${definition.displayName} videos, then vote on how hard they were to follow.`}
      />

      {activeVideo ? (
        <div className="watch-player">
          <button type="button" className="back-link watch-back" onClick={backToBrowse}>
            ← All videos
          </button>

          <div className="watch-player-frame">
            {/* Guards against a row with no real video behind it (a
                "placeholder-*" id) -- falls back to the static icon instead
                of asking YouTube to embed a video that doesn't exist. */}
            {activeVideo.youtubeId.startsWith("placeholder-") ? (
              <PlayIcon />
            ) : (
              <YouTubePlayer videoId={activeVideo.youtubeId} />
            )}
          </div>

          <div className="watch-player-info">
            <div className="watch-player-heading">
              <h2>{activeVideo.title}</h2>
              <button
                type="button"
                className={`watch-like-button${likedIds.has(activeVideo.id) ? " liked" : ""}`}
                onClick={() => toggleLike(activeVideo.id)}
                aria-pressed={likedIds.has(activeVideo.id)}
                disabled={isMutating}
              >
                <HeartIcon filled={likedIds.has(activeVideo.id)} />
                {activeVideo.likeCount}
              </button>
            </div>
            <p className="watch-card-channel">
              {activeVideo.channel} · {formatDuration(activeVideo.durationSeconds)}
            </p>
            <DifficultyBadge score={activeVideo.difficultyScore} />
          </div>

          {!confirmation && lastVideo && (
            <div className="watch-compare">
              <p>
                Compared to <strong>{lastVideo.title}</strong>, was this one...
              </p>
              <div className="watch-compare-actions">
                <Button variant="outline" onClick={() => castComparisonVote("easier")} disabled={isMutating}>
                  Easier
                </Button>
                <Button variant="outline" onClick={() => castComparisonVote("same")} disabled={isMutating}>
                  About the same
                </Button>
                <Button variant="outline" onClick={() => castComparisonVote("harder")} disabled={isMutating}>
                  Harder
                </Button>
              </div>
            </div>
          )}

          {!confirmation && !lastVideo && (
            <div className="watch-compare">
              <p>Watch another video after this to start comparing difficulty.</p>
              <Button onClick={markBaseline}>Continue</Button>
            </div>
          )}

          {confirmation && (
            <div className="watch-compare">
              <p>{confirmation}</p>
              <Button onClick={backToBrowse}>Back to browsing</Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="watch-toolbar">
            <div className="chip-grid watch-filter-row">
              {(["all", "novice", "beginner", "intermediate", "advanced"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`chip${filterLevel === level ? " selected" : ""}`}
                  onClick={() => updateParams({ level: level === "all" ? null : level }, false)}
                >
                  {level === "all" ? "All levels" : levelLabel[level]}
                </button>
              ))}
            </div>

            <div className="watch-sort-wrap">
              <select
                className="watch-sort-select"
                value={sortMode}
                onChange={(event) =>
                  updateParams(
                    { sort: event.target.value === "random" ? null : event.target.value },
                    false,
                  )
                }
                aria-label="Sort videos"
              >
                <option value="random">Random</option>
                <option value="easiest">Easiest first</option>
                <option value="hardest">Hardest first</option>
                <option value="most-liked">Most liked</option>
              </select>
              <span className="watch-sort-chevron">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          {isLoading ? (
            <EmptyState>Loading videos...</EmptyState>
          ) : visibleVideos.length === 0 ? (
            <EmptyState>No videos at this level yet. Try a different filter.</EmptyState>
          ) : (
            <>
              <div className="watch-grid">
                {visibleVideos.map((video) => (
                  <VideoCard key={video.id} video={video} onSelect={openVideo} />
                ))}
              </div>
              {/* Scrolling this into view triggers the next page -- see the
                  IntersectionObserver effect above. Stays mounted even once
                  hasMore is false; loadMoreRef is a no-op in that case. */}
              <div ref={sentinelRef} className="watch-load-sentinel" aria-hidden="true" />
              {isLoadingMore && <EmptyState>Loading more...</EmptyState>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WatchClient;
