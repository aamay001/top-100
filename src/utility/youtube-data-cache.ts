const YOUTUBE_DATA_KEY = 'youtube-data';

const youTubeCache = new Map<number, string>();

export const setCache = (id: number, data: unknown) => {
  youTubeCache.set(id, JSON.stringify(data));
  localStorage.setItem(YOUTUBE_DATA_KEY, JSON.stringify(Array.from(youTubeCache)));
}

export const hasCached = (id: number) => {
  return youTubeCache.has(id);
}

export const getCache = (id: number) => {
  const data = youTubeCache.get(id);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export const initializeYouTubeCache = () => {
  const storedYouTubeCache = localStorage.getItem(YOUTUBE_DATA_KEY);

  if (storedYouTubeCache) {
    const data = new Map<number, string>(JSON.parse(storedYouTubeCache));
    for (const l of data) {
      youTubeCache.set(l[0], l[1]);
    }
  }
}