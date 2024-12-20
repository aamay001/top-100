import { useEffect } from 'react';
import { useAlbumData } from '../hooks/use-album-data';
import { YStack } from 'tamagui';
import AlbumListView from '../components/album-list-view';

const Home = () => {
  const { refresh, albums, isLoading } = useAlbumData();

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <YStack backgroundColor="black" padding="$5">
      <AlbumListView 
        title="Top 100 Albums" 
        albums={albums} 
        isLoading={isLoading} 
      />
    </YStack>
  );
}

export default Home;
