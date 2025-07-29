import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';

function App() {

  const fetchUser = async()=>{
    const userData =  await fetchUserDetails();
console.log('User Data:', userData);

    
  }

  useEffect(() => {
    fetchUser();
  }, []);
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
