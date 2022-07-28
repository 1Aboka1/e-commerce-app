import React from 'react'
import { NavBar } from '../components/NavBar'
import { Widget } from '../components/Widget'

export const Home = () => {
  return (
    <div className='bg-slate-200 h-screen'>
        <NavBar/>
        <div className='flex mx-20 mt-5'>
          <Widget
            size="big"
            title="Repair parts"
            description="Available: 14"
            className=""
          />
        </div>
        
    </div>
  )
}
