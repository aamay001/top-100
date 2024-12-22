import { Paragraph } from 'tamagui';
import '../../styles/youtube-video.scss';

interface YouTubeVideoProps {
  videoId: string,
  title: string,
}


const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title, 
}) => {
  return (
    <div className="youtube-video-embed">
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      >
      </iframe>
      <Paragraph>
        {title}
      </Paragraph>
    </div>
  );
};

export default YouTubeVideo;