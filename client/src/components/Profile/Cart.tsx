import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const Cart = () => {
    const real_shopping_session = useSelector((state: RootState) => state.shopping_session)
	    console.log(real_shopping_session)

    return (
	<div className='flex flex-col py-3 shadow-xl shadow-gray-300 rounded-xl bg-white grow'>
	    xnjxnj
	</div>
    )
}
