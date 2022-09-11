import React, { useState, useContext } from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'
import { Footer } from '../components/Footer'
import { SignInUp } from '../components/SignInUp'
import { signWindowShownContext, signTypeContext } from '../SignInUpWindowContext'

export const Home = () => {
	const [signWindowShown, setSignWindowShown] = useContext(signWindowShownContext)
	const [signType, setSignType] = useContext(signTypeContext)
	const [bgDimmed, setBgDimmed] = useState(false)
	
	const handleSignClick = (type) => () => {
		console.log(typeof(setSignType(type)))
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