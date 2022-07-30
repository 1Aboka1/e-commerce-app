import React from 'react'
import { NavBar } from '../components/NavBar'
import { Widget } from '../components/Widget'

export const Home = () => {
  return (
    <div>
        <NavBar/>
        <h1 className='font-bold text-3xl text-center py-6 border-b-2 border-green-300'>Магазин запчастей</h1>
        <div className='max-w-[1240px] mx-auto justify-center flex'>
          <Widget image_path='8714780-1.jpg' title='Пылесосы' height='14'/>
          <Widget image_path='img_0_8_613_0.jpg' title='Стиральные машины' height='14' pt='12'/>
          <Widget image_path='medium14.jpg' title='Холодильники' height='48'/>
        </div>
    </div>
  )
}
