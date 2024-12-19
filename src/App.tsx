import { Route, Routes } from 'react-router';
import AlbumDataProvider from './contexts/album-data/album-data-provider';
import Home from './pages/Home';

import './App.css';
import { Theme } from 'tamagui';

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
