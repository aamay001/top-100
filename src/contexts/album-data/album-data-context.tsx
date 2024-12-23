import { createContext } from 'react';

type AlbumData = Album[];

interface AlbumDataContextValue {
  albums: AlbumData,
  meta: AlbumFeedMeta | null,
  refresh: () => void,
  isLoading: boolean,
  categories: string[],
  releaseYears: string[],
  artists: string[],
  error?: TypeError | Error,
}

const AlbumDataContext = createContext<AlbumDataContextValue | null>(null);

export default AlbumDataContext;