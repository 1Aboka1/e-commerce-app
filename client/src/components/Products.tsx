import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {RootState} from '../store'
import { useDispatch, useSelector } from 'react-redux'
import shoppingSessionSlice from '../store/slices/shopsession'
import UpdateShoppingSession from '../utils/updateShoppingSession'

export const Products = (props: any) => {
    //const [fetchedData, setFetchedData] = useState([])
    //const [componentDidMount, setComponentDidMount] = useState(false)
    const shopping_session = useSelector((state: RootState) => state.shopping_session)
    const dispatch = useDispatch()

    //   useEffect(() => {
    //       if(componentDidMount === false) {
    //           axios
    //       	.get('/api/products')
    //       	.then((response) => {
    //       	    setFetchedData(response.data)
    //       	})
    //       	.catch((error) => {console.log(error)})
    //           setComponentDidMount(true)
    //       }
    //   }, [componentDidMount])

    const handleAddToCart = (productID: string) => (event: React.SyntheticEvent) => {
	event.preventDefault()
	dispatch(shoppingSessionSlice.actions.addCartItem({ item: { id: null, quantity: 1, product_id: productID } }))
	UpdateShoppingSession(productID)
    }

    const getPresenceOfItem = (productID: string) => {
	return (shopping_session.items?.some((item) => item.product_id === productID))
    } 
    
    const createProductList = (product: any) => {           
	const presenceOfProduct = getPresenceOfItem(product.id)
        return(
            <Link to={`/product_item/${product.id}`} key={product.id}>
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
	    {
		presenceOfProduct ?
			<button onClick={handleAddToCart(product.id)} disabled={true} className='bg-white w-32 border border-green-500 py-3 font-bold text-green-500 whitespace-nowrap rounded-lg transition ease-out duration-300'>
			    В корзинe
			</button>
		:

			<button onClick={handleAddToCart(product.id)} className='bg-green-500 py-3 w-32 font-bold text-white whitespace-nowrap rounded-lg hover:bg-green-600 transition ease-out duration-300'>
			    Купить
			</button>
	    }
                        <span className='text-[12px] text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
                    </div>
                </div>
            </Link>
        )
    }

    const createProductGrid = (product: any) => {
        return (
            <div></div>
        )
    }

    const createEmptyQS = () => {
        return (
            <div className='h-screen'>
                <h1 className='text-center pt-10 font-medium text-lg'>Нет результатов. Попробуйте использовать другие фильтры</h1>
            </div>
        )
    }

    return ( 
    <div className='bg-white shadow-xl shadow-gray-300 basis-3/4 rounded-xl'>
	{ props.filteredQuerySet.length === 0 ? createEmptyQS() : props.filteredQuerySet.map((product: any) => {return props.listView ? createProductList(product) : createProductGrid(product)}) }
    </div>
)
}
