
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { iOSInstallPopup } from './components/iOSInstallPopup'
import { Toaster } from './components/ui/toaster'

import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <iOSInstallPopup />
      </div>
    </Router>
  )
}

export default App
