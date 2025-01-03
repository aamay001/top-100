import { useEffect, useState } from 'react';
import {
  YStack,
  YGroup,
  Separator,
  ListItem,
  Image,
  Button,
} from "tamagui";
import { LuHeart } from "react-icons/lu";
import { addLike, isLiked, removeLike } from "../../utility/like-manager";
import { GestureResponderEvent } from "react-native";

import { addCallback } from "../../utility/like-manager";

interface AlbumListProps {
  albums: Album[];
  onAlbumClicked: (a: Album, p: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onAlbumClicked,
}) => {
  const [likesUpdated, setLikesUpdated] = useState<boolean>(false);

  useEffect(() => {
    addCallback('album-list', () => {
      setLikesUpdated(!likesUpdated);
    });
  }, [likesUpdated]);

  const onLikeButtonClicked = (e: GestureResponderEvent, albumId: number) => {
    e.stopPropagation();
    if (isLiked(albumId)) {
      removeLike(albumId);
    } else {
      addLike(albumId);
    }
    setLikesUpdated(!likesUpdated);
  }

  return (
    <YStack>
      <YGroup bordered>
        {albums.map((album, index) => {
          const { name, artist, id } = album;
          const position = index + 1;

          return (
            <YGroup.Item key={id}>
              <ListItem
                title={`${position}. ${name}`}
                hoverTheme
                pressTheme
                padded
                tabIndex={5 + position}
                onPress={() => onAlbumClicked(album, position)}
                role="button"
                icon={
                  <Image
                    source={{
                      uri: album.images.small,
                      width: 55,
                      height: 55
                    }}
                  />
                }
                iconAfter={
                  <Button
                    icon={<LuHeart size={20} fill={isLiked(album.id) ? 'red' : 'transparent'}/>}
                    circular size="$3"
                    tabIndex={5 + position + 1}
                    backgroundColor="transparent"
                    onPress={(e) => onLikeButtonClicked(e, album.id)}
                  />
                }
              >
                <ListItem.Subtitle>
                  {artist}
                </ListItem.Subtitle>
              </ListItem>
              <Separator />
            </YGroup.Item>
          );
        })}
      </YGroup>
    </YStack>
  );
};

export default AlbumList;
