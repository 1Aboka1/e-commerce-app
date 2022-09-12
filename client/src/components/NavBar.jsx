import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link } from 'react-router-dom'

export const NavBar = (props) => {
	const loginAlias = 'login'
	const registerAlias = 'register'
	
	return (
		<div className='bg-black'>
			<div className='text-gray-100 flex items-center max-w-[1240px] w-screen mx-auto h-[70px] justify-between text-[15px] font-medium'>
				<div className='flex items-center space-x-4'>
					<Link to={`/`}>
						{/* <LogoDevIcon fontSize='large' className='ml-5 text-green-400 hover: cursor-pointer'/> */}
						{ <img className='w-12 rounded-md' src={require('../assets/favicon.png')} alt='company icon'/> }
					</Link>
					<Link to={`/`}>
						<button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Главная</button>
					</Link>
					<Link to={'/search'}>
						<button className="p-1 hover:text-gray-300 transition ease-in-out duration-200">Каталог</button>
					</Link>
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
						<button onClick={props.handleSignClick(loginAlias)} className="bg-slate-600 p-2 px-3 rounded-2xl hover:bg-slate-700 transition duration-200 ease-in-out">Вход</button>
						<button onClick={props.handleSignClick(registerAlias)} className="p-2 rounded-md hover:text-gray-300 transition ease-in-out duration-200">Регистрация</button>
					</div>
				</div>
			</div>
		</div>
	)
}
