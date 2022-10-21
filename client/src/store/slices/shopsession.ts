import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CartItem = {
    id: string | null,
    quantity: number,
    product_id: string,
}

type Session = {
    id: string | null,
    total: number | null,
    items: CartItem[] | null,
}

const initialState: Session = { id: null, total: null, items: null }

const shoppingSessionSlice = createSlice({
    name: 'shopping_session',
    initialState,
    reducers: {
	addCartItem(
	    state: Session,
	    action: PayloadAction<{ item: CartItem }>
	) {
	    state.items?.push(action.payload.item)
    	},
	removeCartItem(
	    state: Session,
	    action: PayloadAction<{ itemID: string }>
	) {
	    state.items?.map((item, index) => {
		if(item['id'] === action.payload.itemID) {
		    state.items?.splice(index)
		}
	    })
	},
	refreshCart(
	    state: Session,
	    action: PayloadAction<{ id: string, total: number, items: CartItem[]  }>
	){
	    state.id = action.payload.id
	    state.total = action.payload.total
	    state.items = action.payload.items
	},
	clearCart(
	    state: Session,
	    action: PayloadAction<{}>
	) {
	    state.items = []
	}
    }
})

export default shoppingSessionSlice
