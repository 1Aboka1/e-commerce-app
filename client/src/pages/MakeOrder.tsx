import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'
import RefreshShoppingSession from '../utils/refreshShoppingSession'
import { FloatingHelpWindow } from '../components/FloatingHelpWindow'
// @ts-ignore
import { UserInfo } from '../components/MakeOrder/UserInfo'
// @ts-ignore
import { PaymentInfo } from '../components/MakeOrder/PaymentInfo'
// @ts-ignore
import { DeliveryInfo } from '../components/MakeOrder/DeliveryInfo'
import { rootDataType, PAYMENT_OPTIONS, DELIVERY_TYPES } from '../types'
import {Button} from '@mui/material'
import axiosService from '../utils/axios'
import store from '../store'

export const MakeOrder = () => {
    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
    RefreshShoppingSession()

    const handleSignClick = (type: any) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    const [rootData, setRootData] = useState<rootDataType>({
	user: '',
	shopping_session: '',
	delivery_type: null,
	address: '',
	payment_order: null,
	payment_option: null,
	total: 0,
    })

    const handleSubmitClick = async () => {
	await axiosService
	    .post(
		'/order/order_instance/',
		rootData,
		{ headers: { 'Content-Type': 'application/json' } },
	    )
	    .catch((error: any) => {
		console.log(error)
	    })
    }

    return (
        <div className='bg-gray-100'>
            <div className=''>
                {signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
            </div>
	    <FloatingHelpWindow/>
            <div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
		<div className=''>
		    <NavBar handleSignClick={handleSignClick}/>
		    <div className='mx-auto max-w-[1100px] py-5'>
			<h1 className='font-bold text-3xl mb-4 pl-3'>Оформление заказа</h1>
			<div className={'flex flex-row space-x-4 items-start transition ease-in-out duration-300' + (false ? ' brightness-[0.77] pointer-events-none' : '')}>
			    <div className='shadow-xl shadow-gray-300 rounded-xl items-center pb-5 space-y-4 flex flex-col bg-white'>
				<div className='flex flex-col w-full'>
				    <UserInfo rootData={rootData} setRootData={setRootData}/>
				    <DeliveryInfo rootData={rootData} setRootData={setRootData}/>
				    <PaymentInfo rootData={rootData} setRootData={setRootData}/> 
				</div>
				<Button onClick={handleSubmitClick} variant='contained' className='font-semibold bg-green-500 p-4 rounded-xl px-6'>Подтвердить заказ</Button>
				<p className='text-gray-700'>• Подтверждая заказ, вы соглашаетесь с нашими условиями пользования и правилами продаж</p>
			    </div>
    			</div>
		    </div>
	    	</div>
                <Footer/>
            </div>
        </div>
    )
}
