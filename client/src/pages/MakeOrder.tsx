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

    return (
	<div>
	    <div className=''>
		{signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
	    </div>
	    <div className={'flex flex-col transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
		<FloatingHelpWindow/>
		<NavBar handleSignClick={handleSignClick}/>
		<UserInfo/>
		<Footer/>
	    </div>
	</div>
    )
}
