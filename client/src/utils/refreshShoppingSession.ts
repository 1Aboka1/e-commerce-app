import axios from 'axios'
import store from '../store'
import shoppingSessionSlice from '../store/slices/shopsession'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const RefreshShoppingSession = () => {
    const user = store.getState().auth.account

    axios
	.get(
	    '/api/cart/shopping_session/' + user?.id,
	)
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
