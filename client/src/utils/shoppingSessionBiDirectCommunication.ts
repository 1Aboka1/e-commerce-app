import axios from 'axios'
import store from '../store'
import shoppingSessionSlice from '../store/slices/shopsession'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const UpdateShoppingSession = () => {
    const session = store.getState().shopping_session

    axios
	.post(
	    '/api/cart/cart_item/',
	    { 
		session: session.id,
		product_id: 1,
	    }
	)
	.then((response) => {
	    console.log(response)
	})
	.catch((error) => {
	    console.log(error)
	})
}

export default UpdateShoppingSession 
