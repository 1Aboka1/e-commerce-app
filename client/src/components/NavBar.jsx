import React from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
//text-[#00df9a]
export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }

  render () {
    return (
      <div className='bg-slate-800'>
        <div className='text-gray-100 flex items-center max-w-[1240px] w-screen mx-auto h-20 justify-between'>
          <div className='flex items-center space-x-4'>
            <LogoDevIcon fontSize='large' className='ml-5 text-green-400 hover: cursor-pointer'/>
            <p className='font-bold text-lg'>8-705-434-3434</p>
          </div>
          <div className='text-md mr-7 space-x-3 flex items-center absolute left-1/2 -translate-x-1/2'>
            <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Главная</button>
            <button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Каталог</button>
            <div className="p-4 py-3 rounded-md ring-1 ring-green-100">
              <button className="bg-slate-600 p-2 rounded-md hover:bg-slate-700 hover:rounded-xl transition duration-400 ease-in-out">Вход</button>
              <button className="p-2 rounded-md hover:text-gray-300 transition ease-in-out duration-700">Регистрация</button>
            </div>
          </div>
          <form className='w-[350px] bg-slate-600 rounded-3xl outline-none p-3 pr-3 flex items-center border focus-within:border-green-200 transition duration-200'>
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
