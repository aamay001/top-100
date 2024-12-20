import { useState } from 'react';

import AlbumDataContext from "./album-data-context";
import { ALBUM_DATA_SOURCE } from '../../constants/strings';
import { getFeedMeta, parseAlbumData } from '../../utility/album-data-parser';
import { ItunesAlbumFeed } from '../../types/itunes-album-feed';

interface AlbumDataProviderProps {
  children: React.ReactNode,
}

const AlbumDataProvider: React.FC<AlbumDataProviderProps> = ({ children }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedMeta, setFeedMeta] = useState<AlbumFeedMeta | null>(null);

  const refresh = () => {
    setIsLoading(true);

    const fetchAlbumData = async () => {
      const response = await fetch(ALBUM_DATA_SOURCE);
      const data = await response.json();
      const albumData = parseAlbumData(data as ItunesAlbumFeed);
      const meta = getFeedMeta(data as ItunesAlbumFeed);
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
      }}
    >
      {children}
    </AlbumDataContext.Provider>
  );
}

export default AlbumDataProvider;