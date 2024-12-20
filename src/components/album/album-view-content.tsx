import { Card, Image, H2, Paragraph, Text  } from 'tamagui';
import { LuCircleUser, LuCopyright, LuDisc3, LuCalendar1 } from 'react-icons/lu';
import * as motion from 'motion/react-client';

interface AlbumViewContentProps {
  rank?: number,
  album: Album,
  fullWidth?: boolean
}

const AlbumViewContent: React.FC<AlbumViewContentProps> = ({
  rank,
  album,
  fullWidth,
}) => {

  return (
    <Card 
      size="$4" 
      minHeight={320} 
      minWidth={300} 
      className="album-view-container"
      style={{
        width: fullWidth
          ? '100%'
          : undefined,
      }}
    >
      <Card.Header padded>
        <H2 size="$7">
          {rank && `${rank}. `}{album?.name}
        </H2>
        <Paragraph>
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
        key={rank || -1}
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
              <LuCalendar1/>
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

export default AlbumViewContent;