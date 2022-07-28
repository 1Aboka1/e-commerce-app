import React from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }

  render () {
    return (
        <div className='flex items-center w-screen h-14 bg-slate-800 justify-between'>
          <LogoDevIcon className='h-12 w-12 ml-5 text-blue-400 hover: cursor-pointer'/>
          <div className='mr-7 space-x-3 flex items-center absolute left-1/2 -translate-x-1/2'>
            <button className="text-gray-100 text-xs p-1">Home</button>
            <button className="text-gray-100 text-xs p-1">Catalog</button>
            <div className="p-2 pt-1 pb-1 border rounded-md border-blue-500">
              <button className="text-gray-100 bg-slate-600 p-2 rounded-md text-xs hover:bg-slate-400 transition duration-200 ease-in-out">Login</button>
              <button className="text-gray-100 p-2 rounded-md text-xs">Register</button>
            </div>
          </div>
          <form className='bg-slate-600 rounded-md mr-5'>
            <div className='rounded-md outline-none p-1 space-x-2 pr-2 flex items-center border focus-within:border-blue-500 transition duration-200'>
              <input type='search' placeholder='Search...' required
                className='bg-slate-600 placeholder:text-slate-200 placeholder:text-xs pl-4 focus:outline-none text-white text-md'
              />
              <SearchOutlinedIcon className='text-gray-100 hover: cursor-pointer' fontSize='16px'/>
            </div>
          </form>
        </div>
    )
  }
}
