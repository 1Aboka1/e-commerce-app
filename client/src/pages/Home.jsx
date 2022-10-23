import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'
import RefreshShoppingSession from '../utils/refreshShoppingSession'
import { FloatingHelpWindow } from '../components/FloatingHelpWindow'

export const Home = () => {
	const [signWindowShown, setSignWindowShown] = useState(false)
	const [signType, setSignType] = useState('')
    	RefreshShoppingSession()
	
	const handleSignClick = (type) => () => {
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
				<WelcomeSection/>
				<Footer/>
			</div>
		</div>
	)
}
