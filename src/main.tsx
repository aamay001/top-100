import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { TamaguiProvider, createTamagui } from 'tamagui';
import * as defaultConfig from '@tamagui/config/v3';

import 'normalize.css';
import App from './app.tsx';
import ColorModeProvider from './contexts/color-mode/color-mode-provider.tsx';

const config = createTamagui(defaultConfig);

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
