import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>
        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coin/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
