import { useState } from 'react'
import useSWR from 'swr'
import { AccountResponse } from '../../types'
import { fetcher } from '../../utils/axios'
import { useParams } from 'react-router-dom'

export const Cart = () => {
    const URLParams = useParams()
    const shoppingSessionID = URLParams.genericParam
	const shoppingSession =  useSWR<AccountResponse["user"]>(shoppingSessionID !== undefined ? `/cart/shopping_session/${shoppingSessionID}/` : null, fetcher)

    return (
	<div className='flex flex-col py-3 shadow-xl shadow-gray-300 rounded-xl bg-white grow'>
	  sdfs  
	</div>
    )
}
