import { H2, Card, Image, Paragraph } from 'tamagui';
import { LuCircleUser, LuCopyright, LuDisc3 } from 'react-icons/lu';
import { LiaCalendarAlt } from 'react-icons/lia';

interface AlbumViewProps {
  album?: Album;
  listPosition?: number;
}

const AlbumView: React.FC<AlbumViewProps> = ({
  album,
  listPosition,
}) => {
  if (!album) {
    return null;
  }

  return (
    <Card size="$4" bordered minHeight={320} minWidth={300} className="album-view-container">
      <Card.Header padded>
        <H2 size="$8">{listPosition && `${listPosition}. `}{album?.name}</H2>
        <Paragraph className="album-view-category">
          {album?.category.name}
        </Paragraph>
      </Card.Header>
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
      <Card.Footer padded>
        <Paragraph>
          <ul className="album-view-meta">
            <li><LuCircleUser />&nbsp;{album?.artist}</li>
            <li><LiaCalendarAlt/>&nbsp;{album?.releaseDate.text}</li>
            <li><LuDisc3 />&nbsp;{`Number of Tracks: ${album?.trackCount}`}</li>
            <li><LuCopyright />&nbsp;{album?.rights}</li>
          </ul>
        </Paragraph>
      </Card.Footer>
    </Card>
  );
}

export default AlbumView;