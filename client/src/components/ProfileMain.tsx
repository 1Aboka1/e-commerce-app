import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import authSlice from '../store/slices/auth'
import useSWR from 'swr'
import { fetcher } from '../utils/axios'
import { AccountResponse } from '../types'
import { RootState } from '../store'

interface LocationState {
    userID: string,
}

export const ProfileMain = () => {
    // @ts-ignore
    const account = useSelector((state: RootState) => state.auth.account)
    const dispatch = useDispatch()
    const history = useNavigate()
    // @ts-ignore
    const userID = account?.id
    const user = useSWR<AccountResponse["user"]>(`/user/${userID}/`, fetcher)

    const handleLogout = () => {
	dispatch(authSlice.actions.setLogout())
	history('/login')
    }

    return (
	<div>
	    <button onClick={handleLogout}>Log out</button>    
	    <div>{
		user.data ?
		<div className="w-full h-full text-center items-center">
		    <p className="self-center my-auto">{user.data.email}</p>
		</div>
		:
		<p className="text-center items-center">Loading ...</p>
	    }
	    </div>
	</div>
    )
}
