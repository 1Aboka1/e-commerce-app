import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <div>
        <div className='font-bold text-center py-8 border-b border-gray-400 space-y-5'>
          <h1 className='text-3xl text-gray-700'>Магазин запчастей бытовой техники</h1>
          <p className='text-[18px] text-gray-600'>Мы предоставляем широкий ассортимент надежных запчастей для ремонта бытовой техники!</p>
        </div>
      </div>
    )
  }
}
