import { useEffect, useState } from "react";
import { H1, Spinner, XStack, YStack, Paragraph } from "tamagui";

import AlbumList from "./album-list";
import AlbumView from "../album/album-view";
import Search from "../search/search";
import { useOrientation } from "../../hooks/use-orientation";
import { NO_SEARCH_REASULTS_FOUND } from "../../constants/strings";

import "../../styles/album-list.view.scss";

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
  const [searchResults, setSearchResults] = useState<Album[] | null>(null);

  useEffect(() => {
    setSelectedAlbum({
      album: searchResults
        ? searchResults[0]
        : albums[0],
      position: 1,
      openModal: false,
    });
  }, [albums, searchResults]);

  const onSearchResults = (results: Album[] | null) => {
    setSearchResults(results);
  }

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
      <YStack justifyContent="center" alignItems="center">
        <Search 
          data={albums} 
          dataKey="name" 
          onSearch={onSearchResults} 
          className="album-list-view-search"
          disable={isLoading}
        />
        <XStack className="album-list-view-pane-container">
        {isLoading
          ? (
            <Spinner size="large" marginTop={100} />
        ) : (
          <>
            <YStack className="album-list-view-left-pane">
              <AlbumList 
                albums={searchResults || albums} 
                onAlbumClicked={onAlbumClicked}
              />
              {searchResults && searchResults.length === 0 &&
                <Paragraph size="$8" textAlign="center" paddingTop="$5" whiteSpace="pre-line">
                  {NO_SEARCH_REASULTS_FOUND}
                </Paragraph>}
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
      </YStack>
    </>
  );
};

export default AlbumListView;
