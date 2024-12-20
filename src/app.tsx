import { Route, Routes } from 'react-router';
import { Theme } from 'tamagui';

import AlbumDataProvider from './contexts/album-data/album-data-provider';
import Home from './pages/home.tsx';

import './app.css';

function App() {
  return (
    <>
      <Theme name="dark">
        <Theme name="blue">
          <AlbumDataProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </AlbumDataProvider>
        </Theme>
      </Theme>
    </>
  );
}

export default App;
