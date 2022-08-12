import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export class WelcomeSection extends Component {
    render() {
        return (
            <div className="bg-[url('./../assets/shutterstock_1131222482_core_2_2_1 (1).jpg')]">
                <div className='flex flex-col items-center gap-6 justify-center h-[65vh] '>
                    <h1 className='text-3xl text-center'>Запчасти для бытовой техники с доставкой на дом <br/>в Усть-Каменогорске!</h1>
                    <form className='w-[80vh] h-12 bg-white rounded-lg justify-between outline-none p-2 pr-3 flex items-center ring-1 ring-gray-200 focus-within:ring-green-200 transition duration-200'>
                        <input type='search' placeholder='Поиск товаров...' required
                            className='placeholder:text-gray-900 placeholder:text-lg pl-4 focus:outline-none text-lg'
                        />
                        <SearchOutlinedIcon className='hover: cursor-pointer'/>
                    </form>
                </div>                
            </div>
        )
    }
}
