import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToggleButtonGroup, ToggleButton, Button, Chip, Stack, Collapse } from '@mui/material'
import { styled } from '@mui/material/styles'
import axiosService from '../../utils/axios'
import {RootState} from '../../store'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess';
import axios from 'axios'
import {DELIVERY_TYPES} from '../../types'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    backgroundColor: '#a2a5a529',
    boxShadow: 3,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      color: '#ffffff',
      backgroundColor: '#ffffff',
    }
  },
}))

const fetchOrders = async (userId: string, setOrders: CallableFunction) => {
    await axiosService
	.get(
	    `/order/order_instance/`,
	    { params: userId },
	)
	.then((response) => {
	    setOrders(response.data)
	})
	.catch((error) => {
	    console.log(error)
	})
}

const fetchOrderItems = async (ordersId: string[], setOrderItems: CallableFunction) => {
    await axiosService
	.get(
	    `/order/order_item/`,
	    { params: ordersId },
	)
	.then((response) => {
	    setOrderItems(response.data)
	})
	.catch((error) => {
	    console.log(error)
	})
}

const fetchProducts = async (orderItemsId: any[], setProducts: CallableFunction) => {
    const orderUniqueItemsId = [...new Set(orderItemsId)]
    await axios
	.get(
	    '/api/products/',
	    { params: JSON.stringify(orderUniqueItemsId) },
	)
	.then((response: any) => {
	    setProducts(response.data)
	})
	.catch((error: any) => {
	    console.log(error)
	})
}

export const Orders = () => {
    const [alignment, setAlignment] = useState<string>('all')
    const handleAlignment = (
	    event: React.MouseEvent<HTMLElement>,
	    newAlignment: string,
	    ) => {
        setAlignment(newAlignment)
    }

    const user = useSelector((state: RootState) => state.auth.account)

    const [orders, setOrders] = useState<any>([])
    const [open, setOpen] = useState<any>([])
    const [orderItems, setOrderItems] = useState<any>([])
    const [products, setProducts] = useState<any>([])

    useEffect(() => {
	fetchOrders(user?.id, setOrders)
    }, [user?.id])

    useEffect(() => {
	if(orders) {
	    if(orders.length !== 0) {
		fetchOrderItems(orders.map((item: any) => item.id), setOrderItems)
	    }
	}
    }, [orders])

    useEffect(() => {
	if(orderItems) {
	    fetchProducts(orderItems.map((item: any) => item.product), setProducts)
	}
    }, [orderItems])

    const handleExpandClick = (event: any) => {
	const id = +event.currentTarget.id

	if(open.includes(id)) {
	    const temp_arr = [...open]
	    temp_arr.splice(open.indexOf(id), 1)
	    setOpen(temp_arr)
	} else {
	    setOpen(open.concat(id))
	}
    }

    const renderShrunk = (orderId: string) => {
	const relOrderItems: any = orderItems.reduce((result: any, item: any) => {
	    if(item.order === orderId) {
		result.push(item)
	    }
	    return result
	}, [])

	const relProducts: any = []
	for(const orderItem of relOrderItems) {
	    relProducts.push(
		products.find((item: any) => item.id === orderItem.product)
	    )
	}

	if(relProducts[0] === undefined) {
	    return null
	}

	return (
	    <div className='flex flex-row items-center justify-between pr-6 px-2'>
		<div className='flex flex-row justify-start'>
		    {
		    relProducts.map((item: any) => {
			    return (
				    <img className='w-[120px] p-3 object-contain' src={'/mediafiles/' + item?.image} alt={item.name}/>
				   )
			    })
		    }
		</div>
		<div className='flex flex-col items-center'>
		    <span className='text-gray-700'>Итого: <span className='font-semibold text-black'>{orders.find((item: any) => item.id === orderId).total} ₸</span></span>
		    <span className='text-gray-700'>Товаров: {relProducts.length} шт.</span>
		</div>
	    </div>
	)
    }

    const renderExpanded = (orderId: string) => {
	const order = orders.find((item: any) => orderId === item.id)
	const relOrderItems: any = orderItems.reduce((result: any, item: any) => {
	    if(item.order === orderId) {
		result.push(item)
	    }
	    return result
	}, [])

	const relProducts: any = []
	for(const orderItem of relOrderItems) {
	    relProducts.push(
		products.find((item: any) => item.id === orderItem.product)
	    )
	}

	if(relProducts[0] === undefined || order === undefined) {
	    return null
	}

	let deliveryType: string | null
	switch(order.delivery_type) {
	    case DELIVERY_TYPES.PICKUP:
		deliveryType = 'Самовывоз'
		break
	    case DELIVERY_TYPES.COURIER:
		deliveryType = 'Курьер'
		break
	    default:
		deliveryType = null
		break
	}

	return (
	    <div className='divide-y'>
		<div className='flex flex-row items-center justify-between py-3 px-6'>
		    <div className='flex flex-col space-y-2'>
			<span className='text-gray-700'>Способ получения: <span className='text-black font-semibold'>{deliveryType}</span></span>
			<span className='text-gray-700'>Телефон получателя: <span className='text-black font-semibold'>{user?.phone}</span></span>
			<span className='text-gray-700'>Срок хранения: <span className='text-black font-semibold'>{'Неизвестно'}</span></span>
		    </div>
		    <div className='flex flex-col items-center space-y-2'>
			<span className='text-gray-700'>Итого: <span className='font-semibold text-black'>{orders.find((item: any) => item.id === orderId).total} ₸</span></span>
			<Link to={`/checkout/pdf/${order.id}/${user?.id}/`}>
			    <Button variant='contained' className='bg-gray-100 text-black outline outline-gray-800 rounded-xl'>Распечатать</Button>

			</Link>
		    </div>
		</div>
		<div className='divide-y'>
		    {
			relProducts.map((product: any) => {
			    const relOrder = relOrderItems.find((item: any) => item.product === product.id)
			    return (
				<div>
				<Link to={`/product_item/${product.id}`} key={product.id}>
				    <div className='flex justify-between items-center px-5 py-4 cursor-pointer transition ease-in-out duration-200 group'>
					<div className='flex flex-row'>
					    <img className='w-[180px] p-3 object-contain' src={'/mediafiles/' + product.image} alt={product.name}/>
					    <div className='space-y-3 py-7 flex flex-col'>
						<h1 className='font-medium text-black text-lg group-hover:text-green-600 transition ease-in-out duration-200'>{product.name}</h1>
						<p className='text-sm text-gray-700'>{product.description}</p>
						<p className='text-sm text-gray-700'>Код товара: {product.id}</p>
					    </div>

					</div>
					<div>
					    <h1 className='text-[16px] whitespace-nowrap text-end text-gray-800'>Цена: <span className='text-black text-[19px] font-semibold'>{order.total} ₸</span></h1>
					    <h1 className='text-[16px] whitespace-nowrap text-end text-gray-800'>{relOrder.quantity} шт. x <span className='text-black text-[19px] font-semibold'>{product.price} ₸</span></h1>
					</div>
				    </div>
				</Link>
				</div>
			    )
			})
		    }
		</div>
	    </div>
	)
    }

    const [shouldUpdate, setShouldUpdate] = useState(false)
    useEffect(() => {
	setShouldUpdate(!shouldUpdate)
    }, [shouldUpdate])

    const handleRemove = (orderId: string) => () => {
    	axiosService
	    .delete(
		`/order/order_instance/${orderId}/`
	    )
	    .then((response) => {
		setShouldUpdate(!shouldUpdate)
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }

    const renderOrders = () => {
	return (
	    <div className='space-y-3 min-h-screen'>
		{
		    orders.map((item: any) => {
			let chips = []
			if(item.completed_status === true) {
			    chips.push(<Chip color='success' label='Завершен'/>)
			} else {
			    chips.push(<Chip color='primary' label='В пути'/>)
			}

			if(item.payment_status === 'PENDING') {
			    chips.push(<Chip color='warning' label='Не оплачен'/>)
			} else if(item.payment_status === 'SUCCESSFUL') {
			    chips.push(<Chip color='success' label='Оплачено'/>)
			} else {
			    chips.push(<Chip color='error' label='Не оплачен'/>)
			}

			return (
			    <div key={item.id} className='flex flex-col divide-y py-1 shadow-xl shadow-gray-300 rounded-xl bg-white'>
				<div className='flex flex-row items-center justify-between py-1 px-3'>
				    <div className='flex flex-row items-center space-x-2'>
					<div className='flex flex-row items-center space-x-1 cursor-pointer' id={item.id} onClick={handleExpandClick}>
					    { !open.includes(item.id) ? <ExpandMore fontSize={'large'}/> : <ExpandLess fontSize={'large'}/> }
					    <span className='font-semibold'>{'Заказ ' + item.id}</span>
					    <span className='font-medium text-medium'>{' от ' + item.created_at.slice(0, 10).replace(/-/g, '.')}</span>
					</div>
					<Stack direction='row' spacing={1}>
					    { chips }
					</Stack>
				    </div>
				    <Button color='error' onClick={handleRemove(item.id)}>Отменить</Button>
				</div>
				<Collapse in={!open.includes(item.id)} timeout="auto" unmountOnExit>
				    { renderShrunk(item.id) }
				</Collapse>
				<Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
				    { renderExpanded(item.id) }
				</Collapse>
			    </div>
			)
		    })
		}
	    </div>
	)
    }

    return (
	<div className='flex flex-row space-x-3 items-start grow'>
	    <div className='flex flex-col space-y-4 grow'>
		<div className='flex flex-row justify-start space-x-3 px-1 py-2'>
		    <StyledToggleButtonGroup className='space-x-3' exclusive value={alignment} onChange={handleAlignment}>
		        <ToggleButton sx={{ boxShadow: 1 }} className='font-bold border-0 rounded-xl text-black' value='all'>Все</ToggleButton>
		        <ToggleButton sx={{ boxShadow: 1 }} className='font-bold border-0 rounded-xl text-black' value='pending'>Открытые</ToggleButton>
		        <ToggleButton sx={{ boxShadow: 1 }} className='font-bold border-0 rounded-xl text-black' value='payed'>Выкупленные</ToggleButton>
		        <ToggleButton sx={{ boxShadow: 1 }} className='font-bold border-0 rounded-xl text-black' value='success'>Завершенные</ToggleButton>
		    </StyledToggleButtonGroup>
		</div>
		<h1 className='font-bold text-xl px-2'>Личные заказы</h1>
		{ renderOrders() }
	    </div>
	</div>
    )
}
