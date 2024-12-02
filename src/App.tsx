import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import useLocalStorage from 'use-local-storage'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Experience from './pages/Experience'

function App() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', systemTheme)
  return (

    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path='/experience' element={<Experience theme={theme} />} />
      </Routes>
      <Footer theme={theme} />
    </Router>
  )
}

export default App
