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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const leftTabItems = {
    'orders': { comp: <Orders/>, icon: <LocalShippingOutlinedIcon/>, name: 'Заказы' },
    'cart': { comp: <Cart/>, icon: <ShoppingCartOutlinedIcon/>, name: 'Корзина' },
    'favorites': { comp: <Favorites/>, icon: <FavoriteBorderOutlinedIcon/>, name: 'Избранное' },
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
      boxSizing:'border-box',
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
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
	setOpen(true);
    };

    const handleDrawerClose = () => {
	setOpen(false);
    };

    const keys = Object.keys(leftTabItems) as Array<keyof typeof leftTabItems>

    return (
	<Drawer onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose} variant="permanent" open={open}>
	    <List className=''>
			{keys.map((key) => {
			    return (
				<a href={'/profile/' + key}>
				    <ListItem key={leftTabItems[key]['name']} disablePadding sx={{ display: 'block' }}>
					<ListItemButton
					    sx={{
						minHeight: 48,
						    justifyContent: open ? 'initial' : 'center',
						    px: 2.5,
					    }}
					    className='text-black pl-6 py-2 w-full justify-start hover:text-green-400 transition ease-in-out duration-200'
					>
					    <ListItemIcon
						className='text-black font-bold'
						sx={{
						    minWidth: 0,
							mr: open ? 3 : 'auto',
							justifyContent: 'center',
						}}
					    >
						{leftTabItems[key]['icon']}
					    </ListItemIcon>
					    <ListItemText className='font-bold uppercase' primary={leftTabItems[key]['name']} sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				    </ListItem>
				</a>
			    )	    
			})}
				    <Button className='justify-start text-black border-l-2 border-white pl-7 py-2' onClick={props.handleLogout} startIcon={<LogoutOutlinedIcon/>}>Выйти</Button>
	</List>
				{/*<div className={key === props.windowType ? 'border-l-2 border-green-300' : 'border-l-2 border-white'}>
				    <a href={'/profile/' + key}><Button className='text-black pl-6 py-2 w-full justify-start hover:text-green-400 transition ease-in-out duration-200' startIcon={leftTabItems[key]['icon']} onClick={() => props.setWindowType(key)}>{leftTabItems[key]['name']}</Button></a>
				</div>*/}
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


    const account = useSelector((state: RootState) => state.auth.account)
    const dispatch = useDispatch()
    const history = useNavigate()
    // @ts-ignore
    const userID = account?.id
    //const user = useSWR<AccountResponse["user"]>(`/user/${userID}/`, fetcher)

    const handleLogout = () => {
	dispatch(authSlice.actions.setLogout())
	history('/')
    }

    return (
        <div className='bg-gray-100'>
            <div className=''>
                {signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
            </div>
	    <FloatingHelpWindow/>
	    <MiniDrawer windowType={windowType} handleLogout={handleLogout} setWindowType={setWindowType}/>
            <div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
		<div className=''>
		    <NavBar handleSignClick={handleSignClick}/>
		    <div className='mx-auto max-w-[1100px] py-5'>
			<h1 className='font-bold text-3xl mb-4 pl-3'>{
			    // @ts-ignore
				leftTabItems[windowType]['name']
			}</h1>
			<div className='flex flex-row space-x-4 items-start'>
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
