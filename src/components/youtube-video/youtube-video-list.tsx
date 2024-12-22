import { useEffect, useState } from 'react';
import { apiKey, apiEnpoint } from '../../settings/api-settings';
import { H2, Spinner, XStack, YStack } from 'tamagui';
import { YouTubeResponse } from '../../types/youtube-search-response';
import YouTubeVideo from './youtube.video';

interface YouTubeVideosProps {
  searchTerm: string,
}

const YouTubeVideoList: React.FC<YouTubeVideosProps> = ({
  searchTerm,
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videoInfo, setVideoInfo] = useState<YouTubeResponse>();

  useEffect(() => {
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
      const results = await fetch(apiEnpoint.youTube + query);

      const data: YouTubeResponse = await results.json();
      setVideoInfo(data);
      setIsLoading(false);
    }

    setTimeout(() => {
      fetchVideo();
    }, 10);

  }, [searchTerm]);

  return (
    <YStack marginTop="$7" padding="$4">
      <H2 size="$7">Related Videos</H2>
      <XStack justifyContent="center">
        {isLoading && <Spinner size="large" />}
        {!isLoading &&
          <ul style={{ padding: 0, margin: 0, marginTop: 15 }}>
            {videoInfo?.items.map(v => 
              <li key={v.id.videoId} className="youtube-video-listitem">
                <YouTubeVideo videoId={v.id.videoId} title={v.snippet.title} />
              </li>)}
          </ul>}
      </XStack>
    </YStack>
  );
}

export default YouTubeVideoList;