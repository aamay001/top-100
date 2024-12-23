[![Netlify Status](https://api.netlify.com/api/v1/badges/e7016935-694a-48fd-b342-88b4895b6c27/deploy-status)](https://app.netlify.com/sites/top-100/deploys)

# Top 100 Albums (sourced from iTunes API)

A small application that displays the Top 100 (ish) Albums from the iTunes API. The API has been returning 70 - 80 results (changes throughout the day) for some reason.

## Application Hosted on Netlify

The application is hosted on the following platforms:

- [Netlify (top-100.netlify.app)](https://top-100.netlify.app/)
- [Custom Domain (top100.andyamaya.com)](https://top100.andyamaya.com)


## Features:
- Fully responsive UI (Landscape and Portrait)
- All Client-Side Code
- iTunes Top 100 API
- YouTube Search API
- Client Side Caching (YouTube Search Results)
- Light and Dark Mode (last selection stored locally)
- Search and Filter
- Likes (stored locally)

## Tech:
- Vite
- React
- TypeScript
- Sass
- Tamagui
- Motion
- HTML, CSS, JavaScript

## How to run locally:

### Requirements:
- Node V22 (+ NPM)
- Vite 6 

### Environment Variables:
Add the following in a `.env` file:
```env
VITE_YOUTUBE_API_KEY=
VITE_YOUTUBE_API_ENDPOINT=https://www.googleapis.com/youtube/v3/search
```

### Command:
```bash
npm run dev # (to develop on your machine)
npx vite --host  # (to expose on your local network)
```

## Known Behavior:
- **Keyboard press to open Album from list**: (Tamagui component did not allow keyboard event. This is likely because Tamagui is designed for React Native).
- **Category, Year, and Artist filters shrink** after more than one filter is used. Select "no option" to go back, respectively.
- **Drag to dismiss is disabled on the AlbumView sheet intentionally**. Use the "Close" button or click/tap outside of the sheet to dismiss and return to the album list.
- **YouTube Search API** has a daily quota that can easily be reached (about 100 requests). Caching is used to minimize the impact on the quota. If the quota is exceeded, try again in a couple of hours.

## Legacy Browser Support

To add support for older browsers, modify `vite.config.ts`:

Update the `modernTargets` property in the `legacyPluginOptions` to automatically include necessary polyfills.

