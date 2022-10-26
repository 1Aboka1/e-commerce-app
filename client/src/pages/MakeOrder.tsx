import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'
import RefreshShoppingSession from '../utils/refreshShoppingSession'
import { FloatingHelpWindow } from '../components/FloatingHelpWindow'
import { UserInfo } from '../components/MakeOrder/UserInfo'
// @ts-ignore
import { DeliveryInfo } from '../components/MakeOrder/DeliveryInfo'
import { rootDataType, PAYMENT_OPTIONS, DELIVERY_TYPES } from '../types'

export const MakeOrder = () => {
    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
    RefreshShoppingSession()

    const handleSignClick = (type: any) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    const [rootData, setRootData] = useState<rootDataType>({
	user: {
	    last_name: '',
	    first_name: '',
	    phone: '',
	    email: '',
	    user_id: '',
	    shopping_session_id: '',
	},
	delivery: {
	    delivery_type: DELIVERY_TYPES.null,
	    address: '',
	},
	payment: {
	    payment_option: PAYMENT_OPTIONS.null,
	    total: 0,
	}
    })

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
			    <div className='flex flex-col w-full shadow-xl shadow-gray-300 rounded-xl bg-white'>
				<UserInfo rootData={rootData} setRootData={setRootData}/>
				<DeliveryInfo rootData={rootData} setRootData={setRootData}/>
			    </div>
    			</div>
		    </div>
	    	</div>
                <Footer/>
            </div>
        </div>
    )
}
