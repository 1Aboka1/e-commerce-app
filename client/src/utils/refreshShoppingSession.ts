import axios from 'axios'
import store from '../store'
import shoppingSessionSlice from '../store/slices/shopsession'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetcher, sender } from './axios'

const RefreshShoppingSession = () => {
    const user = store.getState().auth.account

    const fetchedShoppingSession = fetcher(
	'/cart/shopping_session/' + user?.id, 
    )
    fetchedShoppingSession
	.then((response) => {
	    store.dispatch(
		shoppingSessionSlice.actions.refreshCart({ id: response.data.id, total: response.data.total, items: response.data.items })
	    )
	})
	.catch((error) => {
	    console.log(error)
	})
}

export default RefreshShoppingSession
