import React from 'react'
import { NavBar } from '../components/NavBar'
// import { Widget } from '../components/Widget'
import { SearchWindow } from '../components/SearchWindow'
import { WelcomeSection } from '../components/WelcomeSection'

export const Home = () => {
  return (
    <div>
      <div className='h-screen flex flex-col pb-20'>
        <NavBar/>
        <WelcomeSection />
        {/* <div className='max-w-[1240px] mx-auto justify-center flex'>
          <Widget image_path='8714780-1.jpg' title='Пылесосы'/>
          <Widget image_path='img_0_8_613_0.jpg' title='Стиральные машины' height={64}/>
          <Widget image_path='medium14.jpg' title='Холодильники' height={64}/>
          <Widget image_path='786265_u01_b.jpg' title='Плиты и духовки' height={64}/>
        </div> */}
      </div>
      <SearchWindow/>
    </div>
  )
}
