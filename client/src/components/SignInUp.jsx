import React, { useState } from 'react'
import axios from 'axios'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export const SignInUp = (props) => {
    const loginAlias = 'login'
    const registerAlias = 'register'
    const emailAlias = 'email'
    const passwordAlias = 'password'
    const cpasswordAlias = 'cpassword'

    const [windowType, setWindowType] = useState(props.type)
    const [checked, setChecked] = useState(false)
    const [registrationInfo, setRegistrationInfo] = useState({
    	"email": "",
	"password": "",
	"cpassword": "",
    })
    const [warnings, setWarnings] = useState({
    	"email": false,
	"password": false,
	"cpassword": false,
	"agreementChecked": false,
    })
    const [registrationStatus, setRegistrationStatus] = useState(null)

    const handleRegistrationInputChange = (inputType) => (event) => {
	let tempRegistrationInfo = Object.assign({}, registrationInfo)
	tempRegistrationInfo[inputType] = event.target.value
	setRegistrationInfo(tempRegistrationInfo)
    }

    const handleWindowChange = () => {
        setWindowType(windowType === loginAlias ? registerAlias : loginAlias)
    }

    const handleCheckboxChange = () => {
    	setChecked(!checked)
    }

    const handleRegister = async (event) => {
    	event.preventDefault()
	setWarnings({
	    "email": registrationInfo[emailAlias].length === 0,
	    "password": registrationInfo[passwordAlias].length === 0,
	    "cpassword": registrationInfo[cpasswordAlias].length === 0,
	    "agreementChecked": !checked,
	})
	let shouldSendForm = true
	for(const key in warnings) {
	    if(warnings[key] === true) { shouldSendForm = false; break }
	}
	
	if(shouldSendForm === false) { return (null) }
	axios
	    .get(
		'/api/user_manage/register',
		{ params: registrationInfo },
		{ headers: { 'Content-Type': 'application/json', } },
	    )
	    .then((response) => {
	    	setRegistrationStatus(response.data.status)
	    })
	    .catch((error) => { console.log(error) })
    }

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
                        <input type="submit" value="Submit Registration">
                            <button className='w-full h-12 font-extrabold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'>Войти</button>
                        </input>
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
                    <form onSubmit={handleRegister} className='flex flex-col items-center px-10 space-y-3'>
                        <input type="text" value={registrationInfo[emailAlias]} onChange={handleRegistrationInputChange(emailAlias)} className='w-full h-12 p-4 outline-none rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300' placeholder='E-mail' />
			{ warnings[emailAlias] ? <p className='text-red-500'>*Введите E-mail</p> : (null) }
                        <div className='flex flex-row items-center justify-between w-full bg-white rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300'>
                            <input value={registrationInfo[passwordAlias]} onChange={handleRegistrationInputChange(passwordAlias)} className='w-full h-12 p-4 outline-none rounded-xl' type="password" placeholder='Пароль' />
                            <VisibilityOutlinedIcon className='mx-3 cursor-pointer'/>
                        </div>
			{ warnings[passwordAlias] ? <p className='text-red-500'>*Введите пароль</p> : (null) }
                        <input value={registrationInfo[cpasswordAlias]} onChange={handleRegistrationInputChange(cpasswordAlias)} className='w-full h-12 p-4 outline-none rounded-xl ring-1 ring-gray-400 focus-within:ring-1 focus-within:ring-green-400 transition ease-in-out duration-300' type="password" placeholder='Повторите пароль' />
			{ warnings[cpasswordAlias] ? <p className='text-red-500'>*Введите пароль повторно</p> : (null) }
			<div>
			    <FormGroup>
				<FormControlLabel className='text-gray-600 text-sm' control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="success"/>} label="Я согласен с условием пользования" />
			    </FormGroup>
			    { warnings['agreementChecked'] ? <p className='text-red-500'>*Вы должны согласиться с условиями пользования</p> : (null) }
                        </div>
			<input type="submit" value="Зарегистрироваться" className='w-full h-12 font-extrabold text-white bg-green-500 cursor-pointer rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'/>
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
