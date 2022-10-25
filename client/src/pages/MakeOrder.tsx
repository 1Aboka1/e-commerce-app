import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'
import RefreshShoppingSession from '../utils/refreshShoppingSession'
import { FloatingHelpWindow } from '../components/FloatingHelpWindow'
import { UserInfo } from '../components/MakeOrder/UserInfo'

export const MakeOrder = () => {
    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
    RefreshShoppingSession()

    const handleSignClick = (type: any) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    enum DELIVERY_TYPES {
	'COURIER',
	'PICKUP',
    }

    enum PAYMENT_OPTIONS {
	'KASPI',
	'CASH',
    }

    const [rootData, setRootData] = useState<{
	user: {
	    last_name: string,
	    first_name: string,
	    phone: string,
	    email: string,
	    user_id: string,
	    shopping_session_id: string,
	},
	delivery: {
	    delivery_type: DELIVERY_TYPES,
	    address: string,
	},
	payment: {
	    payment_option: PAYMENT_OPTIONS,
	    total: number,
	}
    } | null>(null)

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
			    <div className='flex flex-col space-y-4 w-full'>
				<UserInfo rootData={rootData} setRootData={setRootData}/>
			    </div>
    			</div>
		    </div>
	    	</div>
                <Footer/>
            </div>
        </div>
    )
}
