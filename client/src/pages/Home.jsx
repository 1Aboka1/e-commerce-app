import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'

export const Home = () => {
	const [signWindowShown, setSignWindowShown] = useState(false)
	const [signType, setSignType] = useState('')
	const [bgDimmed, setBgDimmed] = useState(false)
	
	const handleSignClick = (type) => () => {
		setSignType(type)
		setSignWindowShown(!signWindowShown)
	}

	return (
		<div>
			<div className=''>
				{signWindowShown ? <SignInUp type={signType}/> : (null)}
			</div>
			<div className='flex flex-col'>
				<NavBar handleSignClick={handleSignClick}/>
				<WelcomeSection/>
				<Footer/>
			</div>
		</div>
	)
}