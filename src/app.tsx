import { Route, Routes } from 'react-router';
import { Theme, PortalProvider } from 'tamagui';

import AlbumDataProvider from './contexts/album-data/album-data-provider';
import Home from './pages/home';

import './app.css';

function App() {
  return (
    <>
      <Theme name="dark">
        <Theme name="blue">
          <PortalProvider shouldAddRootHost>
            <AlbumDataProvider>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </AlbumDataProvider>
          </PortalProvider>
        </Theme>
      </Theme>
    </>
  );
}

export default App;
