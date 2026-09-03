const STORAGE_KEY = "dialectrek-watch-session-id";
const LIKED_IDS_KEY = "dialectrek-watch-liked-ids";
const DISLIKED_IDS_KEY = "dialectrek-watch-disliked-ids";

// A random id scoped to this browser, used only to dedupe one viewer's
// likes/votes on the backend (see watch.py) -- not an account, just enough
// to stop the same browser from liking a video twice.
export const getSessionId = (): string => {
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
};

const readIdSet = (key: string): Set<string> => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

const writeIdSet = (key: string, ids: Set<string>) => {
  window.localStorage.setItem(key, JSON.stringify([...ids]));
};

// The backend tracks like/dislike state per session id, not per page load
// (see toggle_like/toggle_dislike in watch.py) -- without mirroring that in
// localStorage too, a reload or a new tab would forget which videos this
// browser already voted on, show the button as un-toggled, and then flip
// the vote the wrong way the next time it's clicked.
export const readLikedIds = (): Set<string> => readIdSet(LIKED_IDS_KEY);
export const persistLikedIds = (ids: Set<string>) => writeIdSet(LIKED_IDS_KEY, ids);
export const readDislikedIds = (): Set<string> => readIdSet(DISLIKED_IDS_KEY);
export const persistDislikedIds = (ids: Set<string>) => writeIdSet(DISLIKED_IDS_KEY, ids);
