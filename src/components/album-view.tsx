import { useEffect, useState } from 'react';
import { H2, Card, Image, Paragraph, Text } from 'tamagui';
import { LuCircleUser, LuCopyright, LuDisc3 } from 'react-icons/lu';
import { LiaCalendarAlt } from 'react-icons/lia';
import * as motion from 'motion/react-client';

interface AlbumViewProps {
  album?: Album;
  listPosition?: number;
}

const AlbumView: React.FC<AlbumViewProps> = ({
  album,
  listPosition,
}) => {
  const [resetAnimation, setResetAnimation] = useState<number>(-1);

  useEffect(() => {
    setResetAnimation(album?.id || 0);
  }, [album]);

  if (!album) {
    return null;
  }

  return (
    <Card 
      size="$4" 
      bordered 
      minHeight={320} 
      minWidth={300} 
      className="album-view-container"
    >
      <Card.Header padded>
        <H2 size="$8">
          {listPosition && `${listPosition}. `}{album?.name}
        </H2>
        <Paragraph className="album-view-category">
          {album?.category.name}
        </Paragraph>
      </Card.Header>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { 
            type: "spring", 
            visualDuration: 0.1, 
            bounce: 0.1 
          },
        }}
        key={resetAnimation}
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          minHeight: 170
        }}
      >
          <Image
            source={{ 
              uri: album?.images.large, 
              width: 170, 
              height: 170, 
            }}
            className="album-view-image"
            objectFit="cover"
            alignSelf="center"
          />
      </motion.div>
      <Card.Footer padded>
        <Text fontSize="$4">
          <ul className="album-view-meta">
            <li>
              <LuCircleUser />
              &nbsp;
              {`Artist: ${album?.artist}`}
            </li>
            <li>
              <LiaCalendarAlt/>
              &nbsp;
              {`Release Date: ${album?.releaseDate.text}`}
            </li>
            <li><LuDisc3 />&nbsp;{`Tracks: ${album?.trackCount}`}</li>
            <li><LuCopyright />&nbsp;{album?.rights}</li>
          </ul>
          </Text>
      </Card.Footer>
    </Card>
  );
}

export default AlbumView;