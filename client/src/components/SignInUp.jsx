import React from 'react'

export const SignInUp = (props) => {
    const loginAlias = 'login'
	const registerAlias = 'register'

    const renderSignInWindow = () => {
        return (
            <div className='w-24 bg-red-800'>
                Login window
            </div>
        )
    }

    const renderSignUpWindow = () => {
        return (
            <div className='w-24 bg-red-800'>
                Register window
            </div>
        )
    }

    return (
        <div className='fixed h-screen w-screen mx-auto'>
            <div className='flex justify-center'>
                {props.type === loginAlias ? renderSignInWindow() : (null)}
                {props.type === registerAlias ? renderSignUpWindow() : (null)}
            </div>
        </div>
    )
}