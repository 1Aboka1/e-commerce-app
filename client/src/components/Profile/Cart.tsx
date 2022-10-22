import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import {TextField} from '@mui/material'
import shoppingSessionSlice from '../../store/slices/shopsession'

 const onlyNumberRE = /^[0-9\b]+$/

export const Cart = () => {
    const shopping_session = useSelector((state: RootState) => state.shopping_session)
    const [componentDidMount, setComponentDidMount] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
	if(componentDidMount === false) {
	    const itemsID = shopping_session.items?.map((item) => { return item.product_id })
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
	}
	setComponentDidMount(true)
    }, [componentDidMount])

    const handleQuantityChange = (itemID: string, direction?: number) => (event: any) => {
	const currentItem = shopping_session.items?.find((item) => item.id === itemID)
	if(direction !== undefined && event._reactName === 'onClick') {
	    if(currentItem?.quantity! === 1 && direction === -1) {
		return null
	    }
	    dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: currentItem?.quantity! + direction}))	
	}
	if(event.currentTarget.value === '') {
	    dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: 1}))
	}
	if(!onlyNumberRE.test(event.currentTarget.value) || +event.currentTarget.value > 999) {
	    return null
	}
	dispatch(shoppingSessionSlice.actions.changeQuantity({id: itemID, new_quantity: +event.currentTarget.value}))
	// Should send the changed store to API by UpdateShoppingSession
    }

    const handleRemoveItem = (itemID: string) => (event: any) => {
	dispatch(shoppingSessionSlice.actions.removeCartItem({itemID}))
	setComponentDidMount(false)
    }

    const createItemsList = (product: any) => {           
	const shopping_session_item = shopping_session.items?.find(item => item.product_id === product.id)
        return(
	    <div className='flex justify-between py-4 transition ease-in-out duration-200 group'>
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
			<TextField color='success' value={shopping_session_item?.quantity} onChange={handleQuantityChange(shopping_session_item?.id!)} size='small' className='w-14 text-center rounded-none text-green-500 border-green-400'/>
			<Button onClick={handleQuantityChange(shopping_session_item?.id!, 1)} className='rounded-r-lg font-bold text-green-500 border-green-400'>+</Button>
		    </ButtonGroup>
		    <span className='text-[12px] text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
		</div>
	    </div>
        )
    }

    const createEmptyQS = () => {
        return (
	    <div className='h-screen flex flex-col items-center'>
                <h1 className='text-center pt-5 text-2xl font-bold'>В вашей корзине пусто</h1>
		<img className='w-[400px] ' src={require('../../assets/carton-container-symbol-vector-i.jpg')} alt='Пустая коробка'/>
            </div>
        )
    }

    return (
	<div className='flex flex-col py-3 shadow-xl shadow-gray-300 rounded-xl bg-white grow'>
	    { 
		cartItems.length === 0 ?
		createEmptyQS() 
		: 
		cartItems.map((item: any) => {
		    return createItemsList(item)
		})
	    }
	</div>
    )
}
