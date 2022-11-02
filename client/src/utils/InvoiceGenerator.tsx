import {useEffect, useState} from 'react'
import axiosService from './axios'
import { useParams } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const fetchOrder = async (orderID: string, userID: string, setOrder: CallableFunction, setOrderItems: CallableFunction, setUser: CallableFunction) => {
    await axiosService
	.get(
	    `/order/order_instance/${orderID}/`,
	)
	.then((response) => {
	    setOrder(response.data)
	})
	.catch((error) => {
	    console.log(error)
	})

    await axiosService
	.get(
	    `/order/order_item/`,
	    { params: orderID },
	)
	.then((response) => {
	    setOrderItems(response.data)
	})
	.catch((error) => {
	    console.log(error)
	})

    await axiosService
	.get(
	    `/user/${userID}/`,
	)
	.then((response) => {
	    setUser(response.data)
	})
	.catch((error) => {
	    console.log(error)
	})
}

export const InvoiceGenerator = () => {
    // @ts-ignore
    document.body.style.zoom = "105%"
    const URLParam = useParams()
    const [order, setOrder] = useState<any>(null)
    const [orderItems, setOrderItems] = useState<any>(null)
    const [componentDidMount, setComponentDidMount] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
	if(componentDidMount === false) {
	    fetchOrder(URLParam.orderID!, URLParam.userID!, setOrder, setOrderItems, setUser) 
	}
	setComponentDidMount(true)
    }, [componentDidMount, URLParam.orderID])


    return (
	<div>
	    <div className='flex flex-col max-w-[650px] divide-y space-y-7 bg-white shadow-lg shadow-gray-400 p-3 px-9 my-6 mx-auto'>
		<div className='flex flex-row justify-between'>
		    <div className='flex flex-col space-y-2'>
			<img className='w-12 rounded-md' src={require('../assets/favicon.png')} alt='company icon'/>
			<h1 className='font-bold text-2xl'>FastBuy</h1>
			<div className='flex flex-col'>
			    <p className='text-gray-600 text-sm'>Ерасыл Найманкумарулы</p>
			    <p className='text-gray-600 text-sm'>30-й Гвардейской дивизии 22</p>
			    <p className='text-gray-600 text-sm'>Усть-Каменогорск 070000</p>
			</div>
		    </div>
		    <div className='pt-4'>
			<h1 className='font-bold text-4xl'>ЧЕК</h1>
		    </div>
		</div>
		<div className='flex flex-row justify-between pt-6'>
		    <div className='flex flex-col space-y-2'>
			<h1 className='font-bold'>Покупатель:</h1>
			<div>
			    <p className='text-gray-700'>{user?.last_name + ' ' + user?.first_name}</p>
			    <p className='text-gray-700'></p>
			    <p className='text-gray-700'></p>
			</div>
		    </div>
		    <div className='flex flex-row space-x-3'>
			<div className='flex flex-col'>
			    <h1 className='font-bold'>Номер чека:</h1>
			    <h1 className='font-bold'>Дата покупки:</h1>
			</div>
			<div className='flex flex-col'>
			    <h1 className='text-gray-700'>{URLParam.orderID}</h1>
			    <h1 className='text-gray-700'>{order.expected_date.slice(0, 10)}</h1>
			</div>
		    </div>
		</div>
		<TableContainer component={Paper}>
		    <Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
			    <TableRow>
				<TableCell>Dessert (100g serving)</TableCell>
				<TableCell align="right">Calories</TableCell>
				<TableCell align="right">Fat&nbsp;(g)</TableCell>
				<TableCell align="right">Carbs&nbsp;(g)</TableCell>
				<TableCell align="right">Protein&nbsp;(g)</TableCell>
			    </TableRow>
			</TableHead>
			<TableBody>
			    {orderItems.map((row: any) => (
				<TableRow
				    key={row.name}
				    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				    <TableCell component="th" scope="row">
					{row.name}
				    </TableCell>
				    <TableCell align="right">{row.calories}</TableCell>
				    <TableCell align="right">{row.fat}</TableCell>
				    <TableCell align="right">{row.carbs}</TableCell>
				    <TableCell align="right">{row.protein}</TableCell>
				</TableRow>
			))}
		    	</TableBody>
		    </Table>
	    	</TableContainer>
	    </div>	
	</div>
    )
}
