import React from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link } from 'react-router-dom'

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
        <div className='text-gray-100 flex items-center max-w-[1240px] w-screen mx-auto h-[70px] justify-between text-[15px] font-medium'>
          <div className='flex items-center space-x-4'>
            <Link to={`/`}>
              <LogoDevIcon fontSize='large' className='ml-5 text-green-400 hover: cursor-pointer'/>
            </Link>
            <Link to={`/`}>
              <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Главная</button>
            </Link>
            <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Каталог</button>
            <p className='font-bold text-md'>8-705-434-3434</p>
          </div>
          <form className='w-[350px] bg-gray-800 rounded-2xl outline-none p-2 pr-3 flex items-center hover:scale-105 focus-within:scale-105 transition duration-200'>
            <input type='search' placeholder='Поиск товаров...' required
              className='w-80 bg-gray-800 placeholder:text-slate-200 placeholder:text-[13px] pl-4 focus:outline-none text-md'
            />
            <SearchOutlinedIcon className='hover:cursor-pointer'/>
          </form>
          <div className='mr-7 space-x-3 flex items-center'>
            <div className="py-3 rounded-md ">
              <button className="bg-slate-600 p-2 px-3 rounded-2xl hover:bg-slate-700 transition duration-200 ease-in-out">Вход</button>
              <button className="p-2 rounded-md hover:text-gray-300 transition ease-in-out duration-200">Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
