import { useEffect, useState } from 'react';
import { Card, Image, H2, Paragraph, Text, Button } from 'tamagui';
import { 
  LuCircleUser, 
  LuCopyright, 
  LuDisc3, 
  LuCalendar1, 
  LuHeart
} from 'react-icons/lu';
import * as motion from 'motion/react-client';
import { GestureResponderEvent } from 'react-native';

import { isLiked, addLike, removeLike } from '../../utility/like-manager';
import YouTubeVideoList from '../youtube-video/youtube-video-list';
import { addCallback } from "../../utility/like-manager";

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
  const [likesUpdated, setLikesUpdated] = useState<boolean>(false);

  useEffect(() => {
    addCallback('album-view', () => {
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
        <Button 
          icon={
            <LuHeart 
              size={20} 
              fill={isLiked(album.id) ? 'red' : 'transparent'}
            />
          }
          circular size="$3" 
          backgroundColor="transparent"
          onPress={(e) => onLikeButtonClicked(e, album.id)}
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
          }}
        />
        <Paragraph>
          {album?.category}
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
      <YouTubeVideoList searchTerm={album.title} id={album.id} />
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