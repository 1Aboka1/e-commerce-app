import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export const SignInUp = (props) => {
    const loginAlias = 'login'
	const registerAlias = 'register'
    const [windowType, setWindowType] = useState(props.type)
    const [checked, setChecked] = useState(false)

    const handleWindowChange = () => {
        setWindowType(windowType === loginAlias ? registerAlias : loginAlias)
    }

    const handleCheckboxChange = () => {
    	setChecked(!checked)
    }

    // const handleSignUpClick = () => {

    // }
    
    const renderSignInWindow = () => {
        return (
            <div className='bg-gray-100 rounded-2xl w-[75vh]'>
                <div className='flex flex-row items-center justify-between px-6 py-4'>
                    <h1 className='text-xl font-semibold'>Вход</h1>
                    <div className='p-1 bg-gray-300 border rounded-full'>
                        <CloseOutlinedIcon className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form className='flex flex-col items-center px-10 space-y-3'>
                        <input className='w-full h-12 p-4 outline-none rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300' type="text" placeholder='E-mail' />
                        <div className='flex flex-row items-center justify-between w-full bg-white rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300'>
                            <input className='w-full h-12 p-4 outline-none rounded-xl' type="password" placeholder='Пароль' />
                            <VisibilityOutlinedIcon className='mx-3 cursor-pointer'/>
                        </div>
                        <p className='text-green-500 hover:text-green-600 transition ease-in-out duration-300' href="">Забыли пароль?</p>
                        <button className='w-full h-12 font-extrabold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'>Войти</button>
                    </form>
                </div>
                <div className='flex flex-row justify-center border-t border-gray-300 py-7'>
                    <p onClick={handleWindowChange} className='text-green-500 cursor-pointer hover:text-green-600 transition ease-in-out duration-300'>Нет аккаунта? Зарегистрироваться</p>
                </div>
            </div>
        )
    }

    const renderSignUpWindow = () => {
        return (
            <div className='bg-gray-100 rounded-2xl w-[75vh]'>
                <div className='flex flex-row items-center justify-between px-6 py-4'>
                    <h1 className='text-xl font-semibold'>Регистрация</h1>
                    <div className='p-1 bg-gray-300 border rounded-full'>
                        <CloseOutlinedIcon className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form className='flex flex-col items-center px-10 space-y-3'>
                        <input className='w-full h-12 p-4 outline-none rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300' type="text" placeholder='E-mail' />
                        <div className='flex flex-row items-center justify-between w-full bg-white rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300'>
                            <input className='w-full h-12 p-4 outline-none rounded-xl' type="password" placeholder='Пароль' />
                            <VisibilityOutlinedIcon className='mx-3 cursor-pointer'/>
                        </div>
                        <input className='w-full h-12 p-4 outline-none rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300' type="password" placeholder='Пароль' />
			<div>
			    <FormGroup>
				<FormControlLabel className='text-gray-600 text-sm' control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="success"/>} label="Я согласен с условием пользования" />
			    </FormGroup>
			</div>
                        <button className='w-full h-12 font-extrabold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'>Зарегистрироваться</button>
                    </form>
                </div>
                <div className='flex flex-row justify-center border-t border-gray-300 py-7'>
                    <p onClick={handleWindowChange} className='text-green-500 cursor-pointer hover:text-green-600 transition ease-in-out duration-300'>Уже есть аккаунт? Войти</p>
                </div>
            </div>
        )
    }

    return (
        <div className='fixed z-10 w-screen mx-auto animate-in fade-in zoom-in duration-300'>
            <div className='flex justify-center items-center h-[95vh]'>
                {windowType === loginAlias ? renderSignInWindow() : (null)}
                {windowType === registerAlias ? renderSignUpWindow() : (null)}
            </div>
        </div>
    )
}
