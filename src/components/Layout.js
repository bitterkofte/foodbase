import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main className='mt-16 md:mt-24 px-4 md:px-16 w-full'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout