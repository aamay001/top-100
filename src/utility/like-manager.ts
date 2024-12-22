const ALBUM_LIKES_KEY = 'album-likes';

const likes = new Set();

export const addLike = (id: number) => {
  likes.add(id);
  localStorage.setItem(ALBUM_LIKES_KEY, JSON.stringify(Array.from(likes)));
}

export const removeLike = (id: number) => {
  likes.delete(id);
  localStorage.setItem(ALBUM_LIKES_KEY, JSON.stringify(Array.from(likes)));
}

export const isLiked = (id: number) => {
  return likes.has(id);
}

export const initializeLikes = () => {
  const storedLikes = localStorage.getItem(ALBUM_LIKES_KEY);

  if (storedLikes) {
    for (const l of JSON.parse(storedLikes)) {
      likes.add(l);
    }
  }
}