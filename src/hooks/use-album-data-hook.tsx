import { useContext } from "react";
import AlbumDataContext from "../contexts/album-data/album-data-context";

export const useAlbumData = () => {
  const context = useContext(AlbumDataContext);

  if (context === null) {
    throw new Error('useAlbumData must be used within AlbumDataProvider!');
  }

  return context;
}