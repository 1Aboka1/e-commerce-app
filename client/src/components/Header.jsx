import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <div>
        <div className='font-bold text-center py-8 border-b-2 border-green-300 space-y-5'>
          <h1 className='text-4xl '>Магазин запчастей бытовой техники</h1>
          <p className='text-xl'>Мы предоставляем широкий ассортимент надежных запчастей для ремонта бытовой техники!</p>
        </div>
      </div>
    )
  }
}
