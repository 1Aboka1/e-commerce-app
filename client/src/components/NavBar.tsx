import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Button from '@mui/material/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Badge from '@mui/material/Badge'

const loginAlias = 'login'
const registerAlias = 'register'

export const NavBar = (props: any) => {
    	const user = useSelector((state: RootState) => state.auth.account)
    	const shoppingSession = useSelector((state: RootState) => state.shopping_session)
	
	return (
		<div className='bg-black shadow-md shadow-gray-700 sticky top-0 z-50'>
			<div className='text-white flex items-center max-w-[1240px] w-screen mx-auto h-[70px] justify-between font-medium'>
				<div className='flex items-center space-x-4'>
					<Link to={`/`}>
						{/* <LogoDevIcon fontSize='large' className='ml-5 text-green-400 hover: cursor-pointer'/> */}
						{ <img className='w-12 rounded-md' src={require('../assets/favicon.png')} alt='company icon'/> }
					</Link>
					<Link to={'/search'}>
						<button className="p-1 hover:text-green-300 transition ease-in-out duration-200">Каталог</button>
					</Link>
				</div>
				<form className='w-[350px] bg-gray-800 rounded-2xl outline-none p-2 flex items-center hover:scale-105 focus-within:scale-105 transition duration-200'>
					<input type='search' placeholder='Поиск товаров...' required
						className='w-80 bg-gray-800 placeholder:text-slate-200 placeholder:text-[13px] pl-4 focus:outline-none text-md'
					/>
					<SearchOutlinedIcon className='hover:cursor-pointer'/>
				</form>
				<div className='mr-7 space-x-3 flex items-center'>
				    {user ?
				    (
					<div className='flex flex-row items-center space-x-3'>
					    <a href={'/profile/cart'}><Button className='text-white normal-case hover:text-green-300 transition ease-in-out duration-200' startIcon={<Badge badgeContent={shoppingSession?.total} color='primary'><ShoppingCartOutlinedIcon/></Badge>}>Корзина</Button></a>

					    <a href={'/profile/favorites'}><span className='text-green-300 cursor-pointer'>{user.first_name}</span></a>
				    	</div>
				    )
				    :
				    (
					<div className="py-3 rounded-md ">
					    <button onClick={props.handleSignClick(loginAlias)} className="bg-slate-600 p-2 px-3 rounded-2xl hover:bg-slate-700 transition duration-200 ease-in-out">Вход</button>
					    <button onClick={props.handleSignClick(registerAlias)} className="p-2 rounded-md hover:text-gray-300 transition ease-in-out duration-200">Регистрация</button>
					</div>
				    )
				    }
				</div>
			</div>
		</div>
	)
}
