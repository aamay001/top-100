import { useEffect } from 'react';
import { useAlbumData } from '../hooks/use-album-data';
import { useThemeName, YStack } from 'tamagui';
import AlbumListView from '../components/album-list/album-list-view';
import ColorModeToggle from '../components/app/color-mode-toggle';

const Home = () => {
  const { refresh, albums, isLoading } = useAlbumData();
  const theme  = useThemeName();

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <YStack backgroundColor={theme.startsWith('dark') ? 'black' : 'gainsboro'} padding="$5">
      <ColorModeToggle />
      <AlbumListView 
        title="Top 100 Albums" 
        albums={albums} 
        isLoading={isLoading} 
      />
    </YStack>
  );
}

export default Home;
