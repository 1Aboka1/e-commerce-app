import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import CartItem from '../../store/slices/shopsession'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import {TextField} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import shoppingSessionSlice from '../../store/slices/shopsession'
import UpdateShoppingSession, { UpdateType } from '../../utils/updateShoppingSession'
import FormControlLabel from '@mui/material/FormControlLabel'

const onlyNumberRE = /^[0-9\b]+$/

const OrderDetails = () => {
    const shopping_session = useSelector((state: RootState) => state.shopping_session)

    return (
	<div className='flex flex-col divide-y w-96 shadow-xl px-4 shadow-gray-300 rounded-xl bg-white'>
	    <h1 className='font-bold text-lg py-4'>Детали заказа</h1>
	    <div className='flex flex-row justify-between items-center'>
		<div>
		    <h1>Итого:</h1>
		    <p>{shopping_session.items?.length}</p>
		</div>
		<p>{shopping_session.total}</p>
	    </div>	
	</div>
    )
}

export const Cart = () => {
    let shopping_session: any = useSelector((state: RootState) => state.shopping_session)
    const [componentDidMount, setComponentDidMount] = useState(false)
    const [mainChecked, setMainChecked] = useState(true)
    const [cartItems, setCartItems] = useState<string[]>([])
    const dispatch = useDispatch()
    const maxCheckedItems = shopping_session.items.length
    const [checkedItems, setCheckedItems] = useState<string[]>(shopping_session.items?.map((item: any) => { return item.id }))
    let itemsID: any

    useEffect(() => {
	itemsID = shopping_session.items?.map((item: any) => { return item.product_id })
	axios
	    .get(
		'/api/products/',
		{ params: JSON.stringify(itemsID) },
	    )
	    .then((response) => {
		setCartItems(response.data)
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }, [])

    const handleQuantityChange = (itemID: string, direction?: number) => (event: any) => {
	const currentItem = shopping_session.items?.find((item: any) => item.id === itemID)
	if(direction !== undefined && event._reactName === 'onClick') {
	    if(currentItem?.quantity! < 1 && direction === -1) {
		return null
	    }
	    dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: currentItem?.quantity! + direction}))
	    UpdateShoppingSession(UpdateType.ChangeQuantity, undefined, itemID)
	    return null
	}
	if(event.currentTarget.value === '') {
	    dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: 0}))
	    UpdateShoppingSession(UpdateType.ChangeQuantity, undefined, itemID)
	    return null
	}
	if(!onlyNumberRE.test(event.currentTarget.value) || +event.currentTarget.value > 999) {
	    return null
	}
	dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: +event.currentTarget.value}))
	UpdateShoppingSession(UpdateType.ChangeQuantity, undefined, itemID)
    }

    const handleBlur = (itemID: string) => () => {
	const currentItem = shopping_session.items?.find((item: any) => item.id === itemID)
	if(currentItem?.quantity === 0) {
	    dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: 1}))
	    UpdateShoppingSession(UpdateType.ChangeQuantity, undefined, itemID)
	}
    }
    
    const handleRemoveItem = (itemID: string) => () => {
	const itemsProductID: string = shopping_session.items.find((item: any) => item.id === itemID).product_id
	const indexOfCartItems = cartItems.findIndex((item: any) => item.id === itemsProductID)
	let newCartItems = [...cartItems]
	newCartItems.splice(indexOfCartItems, 1)
	setCartItems(newCartItems)
	UpdateShoppingSession(UpdateType.RemoveItem, undefined, itemID)
    }

    const handleClearCart = () => {
	let newCartItems = [...cartItems]
	checkedItems.forEach((itemID: string) => {
	    const itemsProductID = shopping_session.items.find((item: any) => item.id === itemID).product_id
	    newCartItems.splice(newCartItems.findIndex((item: any) => item.id === itemsProductID), 1)
	    UpdateShoppingSession(UpdateType.RemoveItem, undefined, itemID)
	})
	setCheckedItems([])
	setCartItems(newCartItems)
    }

    const handleCheckedItemsChange = (value: string) => () => {
        const currentIndex = checkedItems.indexOf(value)
        const newChecked = [...checkedItems]
        
        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
	setCheckedItems(newChecked)
	if(newChecked.length < maxCheckedItems!) {
	    setMainChecked(false)
	}
	else if(newChecked.length === maxCheckedItems) {
	    setMainChecked(true)
	}
    }

    const createItemsList = (product: any) => {           
	const shopping_session_item = shopping_session.items?.find((item: any) => item.product_id === product.id)
        return(
	    <div className='flex justify-between px-5 py-4 transition ease-in-out duration-200 group'>
		<Checkbox checked={checkedItems.indexOf(shopping_session_item?.id) !== -1} color='success' onChange={handleCheckedItemsChange(shopping_session_item?.id)} className='absolute'/>
		<div className='flex'>
		    <img className='w-[200px] p-5 object-cover' src={'/mediafiles/' + product.image} alt={product.name}/>
		    <div className='py-3 space-y-3 justify-center flex flex-col'>
			<h1 className='font-medium text-black text-[20px] group-hover:text-green-600 transition ease-in-out duration-200'>{product.name}</h1>
			<p className='text-[13px] text-gray-700'>{product.description}</p>
			<ButtonGroup className=''>
			    <Button className='rounded-l-lg py-2 font-bold text-green-500 border-green-400'>В избранное</Button>
			    <Button onClick={handleRemoveItem(shopping_session_item?.id!)} className='rounded-r-lg py-2 font-bold text-green-500 border-green-400'>Удалить</Button>
			</ButtonGroup> 
		    </div>
		</div>
		<div className='flex flex-col justify-center space-y-2 px-6'>
		    <h1 className='text-[20px] text-end'>₸{product.price}</h1>
	    	    <ButtonGroup className='h-10'>
			<Button onClick={handleQuantityChange(shopping_session_item?.id!, -1)} className='rounded-l-lg font-bold text-green-500 border-green-400'>-</Button>
			<TextField color='success' value={shopping_session_item?.quantity} onChange={handleQuantityChange(shopping_session_item?.id!)} onBlur={handleBlur(shopping_session_item?.id!)} size='small' className='w-14 text-center rounded-none text-green-500 border-green-400'/>
			<Button onClick={handleQuantityChange(shopping_session_item?.id!, 1)} className='rounded-r-lg font-bold text-green-500 border-green-400'>+</Button>
		    </ButtonGroup>
		    <span className='text-[12px] text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
		</div>
	    </div>
        )
    }

    const createEmptyQS = () => { return (
	    <div className='h-[500px] flex flex-col items-center'>
                <h1 className='text-center pt-5 text-2xl font-bold'>В вашей корзине пусто</h1>
		<img className='w-[400px] ' src={require('../../assets/carton-container-symbol-vector-i.jpg')} alt='Пустая коробка'/>
            </div>
        )
    }

    const handleMainChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
	setMainChecked(event.target.checked)
	if(checkedItems.length !== 0) {
	    setCheckedItems([])
	}
	else {
	    setCheckedItems(shopping_session.items?.map((item: any) => { return item.id }))
	}
    }

    return (
	<div className='flex flex-row space-x-3 grow'>
	    <div className='flex flex-col space-y-4'>
		<div className='flex flex-row justify-between px-8 py-3 shadow-xl shadow-gray-300 rounded-xl bg-white'>
		    <div>
			<FormControlLabel label='Выбрать все' control={<Checkbox color='success' checked={mainChecked} onChange={handleMainChecked}/>}/>
		    </div>
		    <Button className='text-gray-700' onClick={handleClearCart} size='small'>Удалить выбранные</Button>
		</div>
		<div className='flex flex-col py-3 shadow-xl shadow-gray-300 rounded-xl bg-white'>
		    { 
			cartItems.length === 0 ?
			createEmptyQS() 
			: 
			cartItems.map((item: any) => {
			    return createItemsList(item)
			})
		    }
		</div>
	    </div>
	    <OrderDetails/>
	</div>
    )
}
