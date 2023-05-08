import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main className='mt-16 md:mt-24 w-full'>{children}</main>
    </>
  )
}

export default Layout