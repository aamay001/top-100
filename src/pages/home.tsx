import { useEffect } from 'react';
import { useAlbumData } from '../hooks/use-album-data';
import { YStack } from 'tamagui';
import AlbumListView from '../components/album-list/album-list-view';
import ColorModeToggle from '../components/app/color-mode-toggle';
import useColorMode from '../hooks/useColorMode';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../components/app/error';

const Home = () => {
  const { refresh, albums, isLoading } = useAlbumData();
  const { colorModeBackgroundColor } = useColorMode();

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <YStack backgroundColor={colorModeBackgroundColor} padding="$5">
      <ColorModeToggle />
      <ErrorBoundary fallback={<Error />}>
        <AlbumListView 
          title="Top 100 Albums" 
          albums={albums} 
          isLoading={isLoading} 
        />
      </ErrorBoundary>
    </YStack>
  );
}

export default Home;
