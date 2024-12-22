import { Paragraph } from 'tamagui';

import '../../styles/youtube-video.scss';
import unescapeHTML from '../../utility/clear-escape-chars';

interface YouTubeVideoProps {
  videoId: string,
  title: string,
  onLoad: () => void,
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title, 
  onLoad,
}) => {
  return (
    <div className="youtube-video-embed" style={{ visibility: 'inherit'}} >
      <iframe
        onLoad={onLoad}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      >
      </iframe>
      <Paragraph>
        {unescapeHTML(title)}
      </Paragraph>
    </div>
  );
};

export default YouTubeVideo;