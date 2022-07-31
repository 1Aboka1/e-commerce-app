import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

export class SearchWindow extends Component {
  render() {
    return (
        <div className='bg-gray-200'>
            <div className='mx-auto max-w-[1100px] pt-4'>
                <div className='flex justify-between items-center py-4'>
                    <p className='font-light text-gray-900'>4380 товаров</p>
                    <div className='flex space-x-4'>
                        <form className='ring-1 ring-black bg-gray-100 rounded-md outline-none p-3 space-x-2 pr-2 flex items-center border focus-within:border-green-500 transition duration-200'>
                            <input type='search' placeholder='Поиск товаров...' required
                                className='w-80 bg-gray-100 placeholder:text-gray-700 placeholder:text-[14px] pl-4 focus:outline-none text-md'
                            />
                            <SearchOutlinedIcon className='hover: cursor-pointer' fontSize='16px'/>
                        </form>
                        <div className='flex space-x-2 rounded-md ring-1 ring-black'>
                            <button className=''>
                                <MenuOutlinedIcon/>
                            </button>
                            <button>
                                <GridViewOutlinedIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
  }
}
