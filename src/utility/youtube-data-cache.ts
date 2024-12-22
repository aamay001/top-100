const YOUTUBE_DATA_KEY = 'youtube-data';

const youTubeCache = new Map<string, string>();

export const setYouTubeCache = (id: string, data: unknown) => {
  youTubeCache.set(id, JSON.stringify(data));
  localStorage.setItem(YOUTUBE_DATA_KEY, JSON.stringify(Array.from(youTubeCache)));
}

export const hasYouTubeCached = (id: string) => {
  return youTubeCache.has(id);
}

export const getYouTubeCacheData = (id: string) => {
  const data = youTubeCache.get(id);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export const initializeYouTubeCache = () => {
  const storedYouTubeCache = localStorage.getItem(YOUTUBE_DATA_KEY);

  if (storedYouTubeCache) {
    const data = new Map<string, string>(JSON.parse(storedYouTubeCache));
    for (const l of data) {
      youTubeCache.set(l[0], l[1]);
    }
  }
}