import store from '../store'
import { sender } from './axios'

const UpdateShoppingSession = (product_id: string) => {
    const session = store.getState().shopping_session

    sender(
	'/cart/cart_item/', 
	{ 
	    session: session.id,
	    product_id: product_id,
	}
    )
}

export default UpdateShoppingSession 
