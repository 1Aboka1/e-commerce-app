import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export const SignInUp = (props) => {
    const loginAlias = 'login'
	const registerAlias = 'register'

    const renderSignInWindow = () => {
        return (
            <div className='bg-gray-100 rounded-2xl w-[75vh]'>
                <div className='flex flex-row justify-between items-center px-6 py-4'>
                    <h1 className='font-semibold text-xl'>Вход</h1>
                    <div className='rounded-full border bg-gray-300 p-1'>
                        <CloseOutlinedIcon className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form className='flex flex-col items-center px-10 space-y-3'>
                        <input className='rounded-xl w-full h-12 p-4 outline-none focus-within:ring-1 ring-green-400 transition ease-in-out duration-300' type="text" placeholder='E-mail' />
                        <div className='bg-white w-full flex flex-row justify-between items-center rounded-xl focus-within:ring-1 ring-green-400 transition ease-in-out duration-300'>
                            <input className='w-full h-12 p-4 rounded-xl outline-none' type="text" placeholder='Пароль' />
                            <VisibilityOutlinedIcon className='mx-3 cursor-pointer'/>
                        </div>
                        <a className='text-green-500 hover:text-green-600 transition ease-in-out duration-300' href="">Забыли пароль?</a>
                        <button className='w-full h-12 bg-green-500 text-white font-extrabold rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'>Войти</button>
                    </form>
                </div>
                <div className='flex flex-row justify-center py-7 border-t border-gray-300'>
                    <a href="" className='text-green-500 hover:text-green-600 transition ease-in-out duration-300'>Нет аккаунта? Зарегистрироваться</a>
                </div>
            </div>
        )
    }

    const renderSignUpWindow = () => {
        return (
            <div className='w-24 bg-red-500'>
                Register window
            </div>
        )
    }

    return (
        <div className='fixed z-10 w-screen mx-auto animate-in fade-in zoom-in duration-300'>
            <div className='flex justify-center items-center h-[95vh]'>
                {props.type === loginAlias ? renderSignInWindow() : (null)}
                {props.type === registerAlias ? renderSignUpWindow() : (null)}
            </div>
        </div>
    )
}