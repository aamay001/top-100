import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { TamaguiProvider, createTamagui } from 'tamagui';
import * as defaultConfig from '@tamagui/config/v3';

import 'normalize.css';
import App from './app.tsx';
import ColorModeProvider from './contexts/color-mode/color-mode-provider.tsx';
import { initializeLikes } from './utility/like-manager.ts';
import { initializeYouTubeCache } from './utility/youtube-data-cache.ts';

const config = createTamagui(defaultConfig);
initializeLikes();
initializeYouTubeCache();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeProvider initialValue='dark'>
        <TamaguiProvider config={config}>
          <App />
        </TamaguiProvider>
      </ColorModeProvider>
    </BrowserRouter>
  </StrictMode>,
);
