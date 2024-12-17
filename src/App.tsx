import { Route, Routes } from 'react-router'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Top 100</h1>} />
      </Routes>
    </>
  )
}

export default App
