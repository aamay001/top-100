import { H1, Spinner, XStack, YStack } from "tamagui";

import AlbumList from "./album-list";
import { useCallback, useEffect, useState } from "react";
import AlbumView from "./album-view";

import "../styles/album-list.view.scss";

interface AlbumListViewProps {
  title: string;
  isLoading: boolean;
  albums: Album[];
}

interface SelectedAlbumState {
  album: Album;
  position: number;
}

const AlbumListView: React.FC<AlbumListViewProps> = ({
  title,
  isLoading,
  albums,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbumState | undefined>(undefined);

  useEffect(() => {
    setSelectedAlbum({
      album: albums[0],
      position: 1,
    });
  }, [albums]);

  const onAlbumClicked = useCallback((album: Album, position: number) => {
    setSelectedAlbum({ album, position });
  }, []);

  return (
    <>
      <H1 paddingLeft={10} size="$9">{title}</H1>
      <XStack className="album-list-view-container">
      {isLoading
        ? (
          <Spinner size="large" marginTop={100} />
      ) : (
        <>
          <YStack className="album-list-view-left-pane">
            <AlbumList albums={albums} onAlbumClicked={onAlbumClicked} />
          </YStack>
          <YStack className="album-list-view-right-pane">
            <AlbumView
              album={selectedAlbum?.album}
              listPosition={selectedAlbum?.position}
            />
          </YStack>
        </>
      )}
      </XStack>
    </>
  );
};

export default AlbumListView;
