import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router'
import authSlice from '../store/slices/auth'
import useSWR from 'swr'
import { fetcher } from '../utils/axios'
import { AccountResponse } from '../types'
import { RootState } from '../store'

import { SignInUp } from '../components/SignInUp'
// @ts-ignore
import { NavBar } from "../components/NavBar"
import { Footer } from '../components/Footer'
import { Orders } from '../components/Profile/Orders'
import { Favorites } from '../components/Profile/Favorites'
import { Cart } from '../components/Profile/Cart'
import Button from '@mui/material/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const leftTabItems = {
    'cart': { comp: <Cart/>, icon: <ShoppingCartOutlinedIcon/>, name: 'Корзина' },
    'orders': { comp: <Orders/>, icon: <LocalShippingOutlinedIcon/>, name: 'Заказы' },
    'favorites': { comp: <Favorites/>, icon: <FavoriteBorderOutlinedIcon/>, name: 'Избранное' },
}

export const Profile = () => {
    const URLParam = useParams()
    const urlControl = useNavigate()
    const [windowType, setWindowType] = useState(URLParam.windowType)
    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
	
    const handleSignClick = (type: string) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    const account = useSelector((state: RootState) => state.auth.account)
    const dispatch = useDispatch()
    const history = useNavigate()
    // @ts-ignore
    const userID = account?.id
    const user = useSWR<AccountResponse["user"]>(`/user/${userID}/`, fetcher)

    const handleLogout = () => {
	dispatch(authSlice.actions.setLogout())
	history('/')
    }

    const renderList = () => {
	const keys = Object.keys(leftTabItems) as Array<keyof typeof leftTabItems>
	return (
	    <div className='w-full'>
		{
		    <div className='w-full'>
			{keys.map((key) => {
			    return (
				<div className={key === windowType ? 'border-l-2 border-green-300' : 'border-l-2 border-white'}>
				    <a href={'/profile/' + key}><Button className='text-black pl-6 py-2 w-full justify-start hover:text-green-400 transition ease-in-out duration-200' startIcon={leftTabItems[key]['icon']} onClick={() => setWindowType(key)}>{leftTabItems[key]['name']}</Button></a>
				</div>	
			    )	    
			})}
		    </div>
		}
	    </div>
	)
    }

    return (
        <div className='bg-gray-100'>
            <div className=''>
                {signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
            </div>
            <div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
		<div className='h-screen'>
		    <NavBar handleSignClick={handleSignClick}/>
		    <div className='mx-auto max-w-[1100px] py-5'>
			<h1 className='font-bold text-3xl mb-4 pl-3'>{
			    // @ts-ignore
			    leftTabItems[windowType]['name']}</h1>
			<div className='flex flex-row'>
			    <div className='flex flex-col py-3 w-[250px] rounded-xl bg-white'>
				{renderList()}		    
				<Button className='justify-start text-black border-l-2 border-white pl-7 py-2' onClick={handleLogout} startIcon={<LogoutOutlinedIcon/>}>Выйти</Button>

			    </div>
	{/* @ts-ignore*/}
			    { leftTabItems[windowType]['comp'] }
    			</div>
		    </div>
	    	</div>
                <Footer/>
            </div>
        </div>
    )
}
