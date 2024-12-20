import { H1, Spinner, XStack, YStack } from "tamagui";

import AlbumList from "./album-list";
import { useEffect, useState } from "react";
import AlbumView from "../album/album-view";

import "../../styles/album-list.view.scss";
import { useOrientation } from "../../hooks/use-orientation";

interface AlbumListViewProps {
  title: string;
  isLoading: boolean;
  albums: Album[];
}

interface SelectedAlbumState {
  album?: Album;
  position?: number;
  openModal: boolean,
}

const AlbumListView: React.FC<AlbumListViewProps> = ({
  title,
  isLoading,
  albums,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbumState | undefined>(undefined);
  const [albumInModal, setAlbumInModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedAlbum({
      album: albums[0],
      position: 1,
      openModal: false,
    });
  }, [albums]);

  useOrientation((type) => {
    if (type === 'landscape-secondary' || type === 'landscape-primary') {
        if (window.innerWidth > 768) {
          setAlbumInModal(false);
        } else {
          setAlbumInModal(true);
        }
    } else if (type === 'portrait-primary' || type === 'portrait-secondary') {
      if (window.innerWidth < 768) {
        setAlbumInModal(true);
      } else {
        setAlbumInModal(false);
      }
    }
  });

  const onAlbumClicked = (album: Album, position: number) => {
    setSelectedAlbum({ album, position, openModal: true });
  };

  const onModalClosed = () => {
    setSelectedAlbum({
      album: selectedAlbum?.album,
      position: selectedAlbum?.position,
      openModal: false,
    });
  }

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
              asModal={albumInModal}
              openModal={selectedAlbum?.openModal}
              onModalClosed={onModalClosed}
            />
          </YStack>
        </>
      )}
      </XStack>
    </>
  );
};

export default AlbumListView;
