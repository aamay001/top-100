interface ApiKeys {
  youTube: string;
}

interface ApiEndpoint {
  youTube: string;
}

export const apiKey: ApiKeys = {
  youTube: import.meta.env.VITE_YOUTUBE_API_KEY || '',
}

export const apiEnpoint: ApiEndpoint = {
  youTube: import.meta.env.VITE_YOUTUBE_API_ENDPOINT || '',
}