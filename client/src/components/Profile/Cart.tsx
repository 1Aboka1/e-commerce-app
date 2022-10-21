import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import axios from 'axios'

export const Cart = () => {
    const shopping_session = useSelector((state: RootState) => state.shopping_session)
    const [componentDidMount, setComponentDidMount] = useState(false)
    const [cartItems, setCartItems] = useState([])

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
		    console.log(response.data)
		})
		.catch((error) => {
		    console.log(error)
		})
	}
	setComponentDidMount(true)
    }, [componentDidMount])

    const createItemsList = (product: any) => {           
        return(
	    <div className='flex justify-between py-4 cursor-pointer transition ease-in-out duration-200 group'>
		<div className='flex'>
		    <img className='w-[200px] p-5 object-cover' src={'/mediafiles/' + product.image} alt={product.name}/>
		    <div className='py-3 justify-center flex flex-col'>
			<h1 className='font-medium text-black text-[20px] group-hover:text-green-600 transition ease-in-out duration-200'>{product.name}</h1>
			<p className='pt-5 text-[13px] text-gray-700'>{product.description}</p>
		    </div>
		</div>
		<div className='flex flex-col justify-center space-y-2 px-6'>
		    <h1 className='text-[20px] text-end'>₸{product.price}</h1>
		    <button className='bg-white w-32 border border-green-500 py-3 font-bold text-green-500 whitespace-nowrap rounded-lg transition ease-out duration-300'>
			В корзинe
		    </button>
		    <span className='text-[12px] text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
		</div>
	    </div>
        )
    }

    const createEmptyQS = () => {
        return (
            <div className='h-screen'>
                <h1 className='text-center pt-10 font-medium text-lg'>В вашей корзине пусто</h1>
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
