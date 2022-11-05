import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import authSlice from '../store/slices/auth'
import { RootState } from '../store'
import RefreshShoppingSession from '../utils/refreshShoppingSession'
// @ts-ignore
import { FloatingHelpWindow } from '../components/FloatingHelpWindow'

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
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';

const iconStyling = 'mr-5'

const leftTabItems = {
    'orders': { comp: <Orders/>, icon: (<div className='relative'><span className="animate-ping left-0 top-2 absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span><LocalShippingOutlinedIcon className={iconStyling}/></div>), name: 'Заказы' },
    'cart': { comp: <Cart/>, icon: <ShoppingCartOutlinedIcon className={iconStyling}/>, name: 'Корзина' },
    'favorites': { comp: <Favorites/>, icon: <FavoriteBorderOutlinedIcon className={iconStyling}/>, name: 'Избранное' },
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
    borderColor: 'primary.main',
    boxShadow: '100',
    borderBottomRightRadius: '16px',
    borderTopRightRadius: '16px',
    justifyContent: 'center',
  overflowX: 'hidden',
    height: 'calc(100% / 3)',
    top: 'calc(100% / 4 - 30px)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
    border: '2',
    borderColor: 'primary.main',
    borderBottomRightRadius: '16px',
    borderTopRightRadius: '16px',
    boxShadow: '3',
    justifyContent: 'center',
  overflowX: 'hidden',
    height: 'calc(100% / 3)',
    top: 'calc(100% / 4 - 30px)',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    border: '2',
    borderColor: 'primary.main',
    borderRadius: '16px',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MiniDrawer = (props: any) => {
    const theme = useTheme();

    const handleDrawerOpen = () => {
	props.setOpen(true);
    };

    const handleDrawerClose = () => {
	props.setOpen(false);
    };

    const keys = Object.keys(leftTabItems) as Array<keyof typeof leftTabItems>

    return (
	<Drawer onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose} variant="permanent" open={props.open}>
	    <List className=''>
			{keys.map((key) => {
			    return (
				<div className={key === props.windowType ? 'border-l-2 border-green-300' : 'border-l-2 border-white'}>
				    <a href={'/profile/' + key}><Button className='text-black pl-6 py-2 w-full justify-start hover:text-green-400 transition ease-in-out duration-200' startIcon={leftTabItems[key]['icon']} onClick={() => props.setWindowType(key)}>{leftTabItems[key]['name']}</Button></a>
				</div>	
			    )	    
			})}
				    <Button className='justify-start w-full text-black border-l-2 border-white pl-7 py-2 hover:text-green-400 transition ease-in-out duration-200' onClick={props.handleLogout} startIcon={<LogoutOutlinedIcon className={iconStyling}/>}>Выйти</Button>
	</List>
    </Drawer>
    )
}

export const Profile = () => {
    const URLParam = useParams()
    const [windowType, setWindowType] = useState(URLParam.windowType)
    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
    const [componentDidMount, setComponentDidMount] = useState(false)
	
    const handleSignClick = (type: string) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    useEffect(() => {
	if(componentDidMount === false) {
	    RefreshShoppingSession()
	}
	setComponentDidMount(true)
    }, [componentDidMount])


    const dispatch = useDispatch()
    const history = useNavigate()
    // @ts-ignore
    //const user = useSWR<AccountResponse["user"]>(`/user/${userID}/`, fetcher)

    const handleLogout = () => {
	dispatch(authSlice.actions.setLogout())
	history('/')
    }

    const [open, setOpen] = useState(false);

    return (
        <div className='bg-gray-100'>
            <div className=''>
                {signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
            </div>
	    <FloatingHelpWindow/>
	    <MiniDrawer open={open} setOpen={setOpen} handleLogout={handleLogout} windowType={windowType} setWindowType={setWindowType}/>
            <div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
		<div className=''>
		    <NavBar handleSignClick={handleSignClick}/>
		    <div className='mx-auto max-w-[1100px] py-5'>
			<h1 className='font-bold text-3xl mb-4 pl-3'>{
			    // @ts-ignore
				leftTabItems[windowType]['name']
			}</h1>
			<div className={'flex flex-row space-x-4 items-start transition ease-in-out duration-300' + (false ? ' brightness-[0.77] pointer-events-none' : '')}>
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
