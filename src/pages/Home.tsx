import { useEffect, useState } from 'react';
import { useAlbumData } from '../hooks/use-album-data-hook';

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
  }, [meta])
  
  return (
    <div>
      <h1>Home</h1>
      {isLoading &&
        <p>Loading...</p>}
      <em>
        {lastUpdate && lastUpdate.toLocaleString()}
      </em>
      <ol>
        {albums.map(album => {
          const {
            name,
            artist,
            category,
            id,
          } = album;

          return (
            <li key={id}>
              {`${name} - ${artist} - ${category.name}`}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Home;