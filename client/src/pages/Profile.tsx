import React, { useState } from 'react'

import { SignInUp } from '../components/SignInUp'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { ProfileMain } from '../components/ProfileMain'

export const Profile = () => {

    const [signWindowShown, setSignWindowShown] = useState(false)
    const [signType, setSignType] = useState('')
	
    const handleSignClick = (type: string) => () => {
	setSignType(type)
	setSignWindowShown(!signWindowShown)
    }

    return (
        <div>
            <div className=''>
                {signWindowShown ? <SignInUp type={signType} handleSignClick={handleSignClick}/> : (null)}
            </div>
            <div className={'transition ease-in-out duration-300' + (signWindowShown ? ' brightness-[0.77] pointer-events-none' : '')}>
                <NavBar handleSignClick={handleSignClick}/>
		<ProfileMain/>
                <Footer/>
            </div>
        </div>
    )
}
