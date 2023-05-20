import Image from 'next/image'
import React from 'react'
import FB from '../../public/FoodBase-bg-orange.jpg'

const pictures = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Image className='w-[700px] h-auto' src={FB} width={700} height={700} alt='fb' />
    </div>
  )
}

export default pictures