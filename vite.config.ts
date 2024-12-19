import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

const legacyPluginOptions = {
  modernTargets: "edge>=79, firefox>=67, chrome>=64, safari>=12, chromeAndroid>=64, iOS>=12",
  modernPolyfills: true,
  renderLegacyChunks: false,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [legacy(legacyPluginOptions), react()],
});
