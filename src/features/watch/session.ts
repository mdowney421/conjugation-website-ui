const STORAGE_KEY = "dialectrek-watch-session-id";

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
