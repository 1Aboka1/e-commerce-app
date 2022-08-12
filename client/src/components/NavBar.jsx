import React from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }

  //TODO: #1 Add login/register buttons as ToolTips from MUI
  
  render () {
    return (
      <div className='bg-black'>
        <div className='text-gray-100 flex items-center max-w-[1240px] w-screen mx-auto h-[70px] justify-between'>
          <div className='flex items-center space-x-4'>
            <LogoDevIcon fontSize='large' className='ml-5 text-green-400 hover: cursor-pointer'/>
            <p className='font-bold text-lg'>8-705-434-3434</p>
          </div>
          <div className='text-md mr-7 space-x-3 flex items-center absolute left-1/2 -translate-x-1/2'>
            <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Главная</button>
            <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Каталог</button>
            <div className="py-3 rounded-md ">
              <button className="bg-slate-600 p-2 rounded-md hover:bg-slate-700 hover:rounded-xl transition duration-400 ease-in-out">Вход</button>
              <button className="p-2 rounded-md hover:text-gray-300 transition ease-in-out duration-700">Регистрация</button>
            </div>
          </div>
          <form className='w-[350px] bg-slate-600 rounded-lg outline-none p-2 pr-3 flex items-center ring-1 ring-gray-200 focus-within:ring-green-200 transition duration-200'>
            <input type='search' placeholder='Поиск товаров...' required
              className='w-80 bg-slate-600 placeholder:text-slate-200 placeholder:text-[14px] pl-4 focus:outline-none text-md'
            />
            <SearchOutlinedIcon className='hover: cursor-pointer'/>
          </form>
        </div>
      </div>
    )
  }
}
