import { useState } from 'react'
import LoginForm from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import './App.css'
//import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   // <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
    //</ThemeProvider>
  )
}

export default App