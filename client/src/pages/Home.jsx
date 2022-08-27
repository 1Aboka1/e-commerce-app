import React from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'

export const Home = () => {
	return (
		<div>
			<div className='flex flex-col pb-20'>
				<NavBar/>
				<WelcomeSection/>
			</div>
		</div>
	)
}