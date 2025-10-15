import React from 'react'
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import Featuresection from './components/pages/Featuresection'
import WhatYouGetPage from './components/pages/WhatYouGetPage'
import FAQPage from './components/pages/FAQPage'
import Footer from './components/layouts/Footer'

const App = () => {
  
  return (
   <>

      <Navbar/>
      <Home/>
      <Featuresection/>
      <WhatYouGetPage/>
      <FAQPage/>
      <Footer />
   </>
  )
}

export default App