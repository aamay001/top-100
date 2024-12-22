import { useEffect, useState } from 'react';
import { apiKey, apiEnpoint } from '../../settings/api-settings';
import { H2, Spinner, XStack, YStack } from 'tamagui';
import { YouTubeResponse } from '../../types/youtube-search-response';
import YouTubeVideo from './youtube-video';

interface YouTubeVideosProps {
  searchTerm: string,
}

const YouTubeVideoList: React.FC<YouTubeVideosProps> = ({
  searchTerm,
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videoInfo, setVideoInfo] = useState<YouTubeResponse | null>(null);
  const [videoLoadCount, setVideoLoadCount] = useState<number>(0);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);
    setVideoLoadCount(0);
    setVideoInfo(null);

    if (!apiKey.youTube || !apiEnpoint.youTube) {
      return;
    }

    const queryParam: { [key: string]: string } = {
      part: 'snippet',
      maxResults: '5',
      q: searchTerm,
      type: 'video',
      key: apiKey.youTube
    };

    const query = '?' + Object.keys(queryParam).map((k) => k + '=' + encodeURIComponent(queryParam[k])).join('&')

    const fetchVideo = async () => {
      try {
        const results = await fetch(apiEnpoint.youTube + query);

        if (results.status === 200) {
          const data: YouTubeResponse = await results.json();

          setVideoInfo(data);
        } else {
          console.log(results);
          setError(results);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    fetchVideo();
  }, [searchTerm]);

  const onVideoDoneLoading = () => { 
    console.log('load count');
    setVideoLoadCount(prev => prev + 1);
    if (videoLoadCount + 1 >= 5) {
      setIsLoading(false);
    }
  }

  if (!apiKey.youTube || !apiEnpoint.youTube || error) {
    return null;
  }

  return (
    <YStack marginTop="$7" padding="$4">
      <H2 size="$7">Related Videos</H2>
      <XStack 
        justifyContent="center" 
        paddingTop="$4" 
        paddingLeft="$4" 
        paddingRight="$4"
      >
        {isLoading && <Spinner size="large" />}
        <ul style={{ 
            padding: 0, 
            margin: 0, 
            marginTop: 15, 
            visibility: isLoading 
              ? 'hidden'
              : 'visible',
            position: isLoading 
              ? 'fixed'
              : 'initial'
          }}>
          {videoInfo && videoInfo?.items.map(v => 
            <li key={v.id.videoId} className="youtube-video-listitem">
              <YouTubeVideo 
                videoId={v.id.videoId} 
                title={v.snippet.title} 
                onLoad={onVideoDoneLoading} 
              />
            </li>)}
        </ul>
      </XStack>
    </YStack>
  );
}

export default YouTubeVideoList;