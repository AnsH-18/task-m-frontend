import React from 'react'
import Header from '../../components/Header'

function layout({children}) {
  return (
    <div className=' pt-20 '>
        <Header></Header>
        <div className=' min-h-screen flex justify-center'>
          <div className='max-w-5xl'>
            {children}
          </div>
         
        </div>
       </div>
  )
}

export default layout