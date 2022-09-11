import React, { useState } from 'react'
import { SearchWindow } from '../components/SearchWindow'
import { NavBar } from '../components/NavBar'
import { SignInUp } from '../components/SignInUp'
import { Footer } from '../components/Footer'

export const Search = () => {
	const [signWindowShown, setSignWindowShown] = useState(false)
	const [signType, setSignType] = useState('')
	
	const handleSignClick = (type) => () => {
		setSignType(type)
		setSignWindowShown(!signWindowShown)
	}
  
	return (
		<div>
			<div className=''>
					{signWindowShown ? <SignInUp type={signType}/> : (null)}
			</div>
			<div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.8] pointer-events-none' : '')}>
				<NavBar handleSignClick={handleSignClick}/>
				<SearchWindow/>
				<Footer/>
			</div>
		</div>
	)
}
