import { useState } from 'react';

import AlbumDataContext from "./album-data-context";
import { ALBUM_DATA_SOURCE } from '../../constants/strings';
import { getFeedMeta, parseAlbumData } from '../../utility/album-data-parser';
import { ItunesAlbumFeed } from '../../types/itunes-album-feed';

interface AlbumDataProviderProps {
  children: React.ReactNode,
}

interface AlbumDataUniqueMetaState {
  releaseYears: string[],
  categories: string[],
  artists: string[],
}

const defaultUniqueMeta = {
  releaseYears: [],
  categories: [],
  artists: [],
};

const AlbumDataProvider: React.FC<AlbumDataProviderProps> = ({ children }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedMeta, setFeedMeta] = useState<AlbumFeedMeta | null>(null);
  const [uniqeMeta, setUniqueMeta] = useState<AlbumDataUniqueMetaState>(defaultUniqueMeta);

  const refresh = () => {
    setIsLoading(true);

    const fetchAlbumData = async () => {
      const response = await fetch(ALBUM_DATA_SOURCE);
      const data = await response.json();
      const albumData = parseAlbumData(data as ItunesAlbumFeed);
      const meta = getFeedMeta(data as ItunesAlbumFeed);

      const uniqueReleaseYears = new Set<string>();
      const uniqueArtists = new Set<string>();
      const uniqueCategories = new Set<string>();

      albumData.forEach((a) => {
        uniqueReleaseYears.add(a.year);
        uniqueArtists.add(a.artist);
        uniqueCategories.add(a.category);
      });

      setUniqueMeta({
        releaseYears: Array.from(uniqueReleaseYears).sort(
          (a, b) => a > b ? 1 : -1 ),
        artists: Array.from(uniqueArtists).sort(
          (a, b) => a > b ? 1 : -1 ),
        categories: Array.from(uniqueCategories).sort(
          (a, b) => a > b ? 1 : -1 ),
      });

      setAlbums(albumData);
      setFeedMeta(meta);
      setIsLoading(false);
    }

    fetchAlbumData();
  }

  return (
    <AlbumDataContext.Provider 
      value={{
        albums,
        isLoading,
        refresh,
        meta: feedMeta,
        releaseYears: uniqeMeta.releaseYears,
        artists: uniqeMeta.artists,
        categories: uniqeMeta.categories,
      }}
    >
      {children}
    </AlbumDataContext.Provider>
  );
}

export default AlbumDataProvider;