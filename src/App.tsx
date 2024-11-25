import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useLocalStorage from 'use-local-storage'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'

function App() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', systemTheme)
  return (

    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
      </Routes>
    </Router>
  )
}

export default App
