import React, { useRef } from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'

export const Home = () => {
	const searchWindowFocusRef = useRef(null)

	const handleSearchClick = () => { searchWindowFocusRef.current.focus() }
		
	return (
		<div>
			<div className='flex flex-col pb-20'>
				<NavBar/>
				<WelcomeSection handleSearchClick={handleSearchClick.bind(this)}/>
			</div>
		</div>
	)
}