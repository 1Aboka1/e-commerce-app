import store from '../store'
import shoppingSessionSlice from '../store/slices/shopsession'
import { fetcher, sender } from './axios'

const RefreshShoppingSession = async () => {
    const user = store.getState().auth.account

    const fetchedShoppingSession = fetcher(
	'/cart/shopping_session/' + user?.id + '/', 
    )

    await fetchedShoppingSession
	.then((response) => {
	    store.dispatch(
		shoppingSessionSlice.actions.refreshCart({ id: response.id, total: response.total, items: response.items })
	    )
	})
	.catch((error) => {
	    console.log(error)
	})
}

export default RefreshShoppingSession
