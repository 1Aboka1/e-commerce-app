import {useEffect, useState} from 'react'
import axiosService from './axios'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import html2canvas from 'html2canvas'
import {Button} from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { Link } from 'react-router-dom'

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
    const [order, setOrder] = useState<any>({})
    const [orderItems, setOrderItems] = useState<any>([])
    const [user, setUser] = useState<any>({})
    const [products, setProducts] = useState<any>([])

    useEffect(() => {
	fetchOrder(URLParam.orderID!, URLParam.userID!, setOrder, setOrderItems, setUser) 
    }, [URLParam.orderID, URLParam.userID])

    useEffect(() => {
	const itemsID = orderItems?.map((item: any) => { return item.product })
	axios
	    .get(
		'/api/products/',
		{ params: JSON.stringify(itemsID) },
	    )
	    .then((response) => {
		setProducts(response.data)
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }, [orderItems])

    const screenshotInvoice = async () => {
	const input = document.getElementById('divToPrint')
	const canvas = await html2canvas(input!)
	const imgData = canvas.toDataURL('image/png', 1.0)
	downloadImage(imgData, 'image')
    }

    const downloadImage = (blob: any, fileName: any) => {
	const fakeLink = window.document.createElement("a")
	// @ts-ignore
	fakeLink.style = "display:none;"
	fakeLink.download = fileName

	fakeLink.href = blob

	document.body.appendChild(fakeLink)
	fakeLink.click()
	document.body.removeChild(fakeLink)

	fakeLink.remove()
    }

    return (
	<div>
	    <Button onClick={screenshotInvoice} variant='contained' className='bg-green-500 w-full' startIcon={<FileDownloadOutlinedIcon/>}>Сохранить чек</Button>
	    <Link to={'/'}>
		<Button variant='contained' className='bg-white w-full text-black' startIcon={<ExitToAppOutlinedIcon/>}>Вернуться на главную</Button>
	    </Link>
	    <div id='divToPrint' className='flex flex-col max-w-[650px] divide-y space-y-7 bg-white border border-gray-600 py-7 px-9 my-6 mx-auto'>
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
			    <p className='text-gray-700'>{user?.email}</p>
			    <p className='text-gray-700'>{user?.phone}</p>
			</div>
		    </div>
		    <div className='flex flex-row space-x-3'>
			<div className='flex flex-col'>
			    <h1 className='font-bold'>Номер чека:</h1>
			    <h1 className='font-bold'>Дата покупки:</h1>
			</div>
			<div className='flex flex-col'>
			    <h1 className='text-gray-700'>{URLParam.orderID}</h1>
			    <h1 className='text-gray-700'>{order.expected_date?.slice(0, 10)}</h1>
			</div>
		    </div>
		</div>
		<TableContainer className='outline outline-gray-300'>
		    <Table sx={{ minWidth: 500 }} aria-label="simple table">
			<TableHead className='bg-gray-300'>
			    <TableRow>
				<TableCell className='font-semibold'>Название</TableCell>
				<TableCell className='font-semibold' align="right">Количество</TableCell>
				<TableCell className='font-semibold' align="right">Цена</TableCell>
			    </TableRow>
			</TableHead>
			<TableBody>
			    {products.map((row: any) => {
				const orderItem = orderItems.find((item: any) => item.product === row.id)
				return (
				    <TableRow
					key={row.name}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				    >
					<TableCell component="th" scope="row">
					    {row.name}
					</TableCell>
					<TableCell align="right">{orderItem.quantity}</TableCell>
					<TableCell align="right">{(row.price * orderItem.quantity) + '₸'}</TableCell>
				    </TableRow>
				)
			    })}
		    	</TableBody>
		    </Table>
	    	</TableContainer>
	    </div>	
	</div>
    )
}
