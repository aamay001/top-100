import { useEffect, useState } from 'react';
import { apiKey, apiEnpoint } from '../../settings/api-settings';
import { H2, Paragraph, Spinner, XStack, YStack } from 'tamagui';
import { YouTubeResponse } from '../../types/youtube-search-response';
import YouTubeVideo from './youtube-video';
import * as youTubeCache from '../../utility/youtube-data-cache';

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

    if (youTubeCache.hasYouTubeCached(searchTerm)) {
      const cache = youTubeCache.getYouTubeCacheData(searchTerm);
      setVideoInfo(cache);
      setIsLoading(false);
      return;
    }

    const queryParam: { [key: string]: string } = {
      part: 'snippet',
      maxResults: '5',
      q: searchTerm,
      type: 'video',
      key: apiKey.youTube,
      videoEmbeddable: 'true',
    };

    const query = '?' + Object.keys(queryParam).map((k) => k + '=' + encodeURIComponent(queryParam[k])).join('&')

    const fetchVideo = async () => {
      try {
        const results = await fetch(apiEnpoint.youTube + query);

        if (results.status === 200) {
          const data: YouTubeResponse = await results.json();

          setVideoInfo(data);
          youTubeCache.setYouTubeCache(searchTerm, data);
          
        } else {
          setError(results);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchVideo();
  }, [searchTerm]);

  const onVideoDoneLoading = () => { 
    setVideoLoadCount(prev => prev + 1);
    if (videoLoadCount + 1 >= 3) {
      setIsLoading(false);
    }
  }

  if (!apiKey.youTube || !apiEnpoint.youTube || (error && (error as Response).status !== 403)) {
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
        {error && 
          <Paragraph size="$4" textAlign="center">
            YouTube API Quota reached!<br />
            Try again tomorrow to see the YouTube results!
          </Paragraph>}
        {!error && <ul style={{ 
            padding: 0, 
            margin: 0, 
            marginTop: 15, 
            visibility: isLoading 
              ? 'hidden'
              : 'visible',
            position: isLoading 
              ? 'fixed'
              : 'static'
          }}>
          {videoInfo && videoInfo?.items.map(v => 
            <li key={v.id.videoId} className="youtube-video-listitem">
              <YouTubeVideo 
                videoId={v.id.videoId} 
                title={v.snippet.title} 
                onLoad={onVideoDoneLoading} 
              />
            </li>)}
        </ul>}
      </XStack>
    </YStack>
  );
}

export default YouTubeVideoList;