import React from 'react'
import { NavBar } from '../components/NavBar'
import { Widget } from '../components/Widget'
import { Header } from '../components/Header'
import { SearchWindow } from '../components/SearchWindow'

export const Home = () => {
  return (
    <div>
      <div className='h-screen'>
        <NavBar/>
        <Header/>
        <div className='max-w-[1240px] mx-auto justify-center flex'>
          <Widget image_path='8714780-1.jpg' title='Пылесосы'/>
          <Widget image_path='img_0_8_613_0.jpg' title='Стиральные машины' height={64}/>
          <Widget image_path='medium14.jpg' title='Холодильники' height={64}/>
        </div>
      </div>
      <SearchWindow/>
    </div>
  )
}
