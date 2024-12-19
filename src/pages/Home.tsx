import { useEffect, useState } from 'react';
import { useAlbumData } from '../hooks/use-album-data';
import { H1, ListItem, Paragraph, XStack, YGroup, YStack, Separator } from 'tamagui';

const Home = () => {
  const { refresh, meta, albums, isLoading } = useAlbumData();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (meta) {
      setLastUpdate(meta?.updated);
    }
  }, [meta]);
  
  return (
    <XStack fullscreen backgroundColor="black">
      <YStack>

      </YStack>
      <YStack>
          <H1>Home</H1>
          {isLoading &&
            <Paragraph>Loading...</Paragraph>}
          <em>
            {lastUpdate && lastUpdate.toLocaleString()}
          </em>
          <YGroup bordered separator={<Separator />}>
            {albums.map((album, index) => {
              const {
                name,
                artist,
                id,
              } = album;

              return (
                <YGroup.Item key={id}>
                  <ListItem title={`${index + 1}. ${name}`}>
                    <ListItem.Subtitle>{artist}</ListItem.Subtitle>
                  </ListItem>
                </YGroup.Item>
              );
            })}
          </YGroup>
        </YStack>
    </XStack>
  );
}

export default Home;