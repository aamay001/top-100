import { Route, Routes } from 'react-router'
import './App.css'
import AlbumDataProvider from './contexts/album-data/album-data-provider'
import Home from './pages/Home'

function App() {

  return (
    <>
      <AlbumDataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AlbumDataProvider>
    </>
  )
}

export default App
