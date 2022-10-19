import axios from 'axios'
import store from '../store'
import shoppingSessionSlice from '../store/slices/shopsession'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const RefreshShoppingSession = () => {
    let userID = useSelector((state: RootState) => state.shopping_session.id)
    const paramForGETRequest: { user_id: string | null } = { user_id: null }
    paramForGETRequest.user_id = userID

    axios
	.get(
	    '/api/shopping_session',
	    { data: paramForGETRequest },
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
