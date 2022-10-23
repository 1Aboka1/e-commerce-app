import store from '../store'
import { sender, fetcher } from './axios'
import axiosService from './axios'
import { useDispatch } from 'react-redux'
import shoppingSessionSlice from '../store/slices/shopsession'

export const enum UpdateType {
    AddItem,
    RemoveItem,
    ClearCart,
    ChangeQuantity,
}

const UpdateShoppingSession = (update_type: UpdateType, product_id?: string, item_id?: string) => {
    const session = store.getState().shopping_session
    const user = store.getState().auth.account

    const AddItem = (product_id: string) => {
	axiosService
	    .post(
		'/cart/cart_item/', 
		{ 
		    session_id: session.id,
		    product_id: product_id,
		}
	    )
	    .then((response) => {
		const fetchedShoppingSession = fetcher(
		    '/cart/shopping_session/' + user?.id + '/', 
		)

		fetchedShoppingSession
		    .then((response) => {
			store.dispatch(
			    shoppingSessionSlice.actions.refreshCart({ id: response.id, total: response.total, items: response.items })
			)
		    })
		    .catch((error) => {
			console.log(error)
		    })
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }

    const RemoveItem = (item_id: string) => {
	axiosService
	    .delete(
		`/cart/cart_item/${item_id}/`,
	    )
	    .then((response) => {
		const fetchedShoppingSession = fetcher(
		    '/cart/shopping_session/' + user?.id + '/', 
		)

		fetchedShoppingSession
		    .then((response) => {
			store.dispatch(
			    shoppingSessionSlice.actions.refreshCart({ id: response.id, total: response.total, items: response.items })
			)
		    })
		    .catch((error) => {
			console.log(error)
		    })
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }

    const ChangeQuantity = (item_id: string) => {
	const sessionItem = session.items?.find((item) => item.id === item_id)
	axiosService
	    .patch(
		`/cart/cart_item/${item_id}/`,
		{
		    id: item_id,
		    quantity: sessionItem?.quantity,
		    product_id: sessionItem?.product_id,
		    session_id: sessionItem?.session_id,
		},
		{ headers: { 'Content-Type': 'application/json' } },
	    )
	    .then((response) => {
		const fetchedShoppingSession = fetcher(
		    '/cart/shopping_session/' + user?.id + '/', 
		)

		fetchedShoppingSession
		    .then((response) => {
			store.dispatch(
			    shoppingSessionSlice.actions.refreshCart({ id: response.id, total: response.total, items: response.items })
			)
		    })
		    .catch((error) => {
			console.log(error)
		    })
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }

    const ClearCart = () => {
	axiosService
	    .delete(
		`/cart/shopping_session/${session.id}/`
	    )
	    .then((response) => {
		const fetchedShoppingSession = fetcher(
		    '/cart/shopping_session/' + user?.id + '/', 
		)

		fetchedShoppingSession
		    .then((response) => {
			store.dispatch(
			    shoppingSessionSlice.actions.refreshCart({ id: response.id, total: response.total, items: response.items })
			)
		    })
		    .catch((error) => {
			console.log(error)
		    })
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }

    switch(update_type) {
	case UpdateType.AddItem:
	    AddItem(product_id!)
	    break
	case UpdateType.RemoveItem:
	    RemoveItem(item_id!)
	    break
	case UpdateType.ChangeQuantity:
	    ChangeQuantity(item_id!)
	    break
	case UpdateType.ClearCart:
	    ClearCart()
    }
}

export default UpdateShoppingSession;
