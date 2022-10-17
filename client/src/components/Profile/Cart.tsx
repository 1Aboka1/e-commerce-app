import { useState } from 'react'
import useSWR from 'swr'
import { AccountResponse } from '../../types'
import { fetcher } from '../../utils/axios'
import { useParams } from 'react-router-dom'

export const Cart = () => {
    const URLParams = useParams()
    const shoppingSessionID = URLParams.genericParam
    const shoppingSession = useSWR<AccountResponse["user"]>(`/cart/shopping_session/${shoppingSessionID}/`, fetcher)

    return (
	<div>
	    {shoppingSessionID}
	</div>
    )
}
