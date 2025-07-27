import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Header/>
  
    <main>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
    
  )
}
export default App
