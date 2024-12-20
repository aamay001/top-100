import { YStack, YGroup, Separator, ListItem, Image } from "tamagui";

interface AlbumListProps {
  albums: Album[];
  onAlbumClicked: (a: Album, p: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ 
  albums, 
  onAlbumClicked,
}) => {
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
                onPress={() => onAlbumClicked(album, position)}
                iconAfter={
                  <Image 
                    source={{ 
                      uri: album.images.small, 
                      width: 55, 
                      height: 55 
                    }}
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
