import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ToggleButtonGroup, ToggleButton, Button, Chip, Stack, Collapse } from '@mui/material'
import { styled } from '@mui/material/styles'
import axiosService from '../../utils/axios'
import {RootState} from '../../store'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess';
import axios from 'axios'

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

    const renderShrunk = (itemId: string) => {
	const relOrderItems = orderItems

	return (
	    <div className='flex flex-row justify-between'>
		<div>

		</div>
		<div className='flex flex-col items-center'>
		    <span>Итого: <span>{itemId}</span></span>
		</div>
	    </div>
	)
    }

    const renderOrders = () => {
	return (
	    <div className='space-y-3'>
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
			    <div key={item.id} className='flex flex-col divide-y py-2 shadow-xl shadow-gray-300 rounded-xl bg-white'>
				<div className='flex flex-row items-center justify-between px-3'>
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
				    <Button color='error'>Отменить</Button>
				</div>
				<Collapse in={!open.includes(item.id)} timeout="auto" unmountOnExit>
				    { renderShrunk(item.id) }
				</Collapse>
				<Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
				    <div>
				    <h1>Somtehing</h1>
				    </div>
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
		    </StyledToggleButtonGroup>
		</div>
		<h1 className='font-bold text-xl px-2'>Личные заказы</h1>
		{ renderOrders() }
	    </div>
	</div>
    )
}
