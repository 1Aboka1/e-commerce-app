import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'


const loginAlias = 'login'
const registerAlias = 'register'
const emailAlias = 'email'
const firstNameAlias = 'first_name'
const lastNameAlias = 'last_name'
const phoneAlias = 'phone'
const passwordAlias = 'password'
const cpasswordAlias = 'cpassword'
const passwordsMatchAlias = 'passwordsMatch'

export const SignInUp = (props) => {
    const [windowType, setWindowType] = useState(props.type)
    const [checked, setChecked] = useState(false)
    const [registrationInfo, setRegistrationInfo] = useState({
    	"email": "",
	"password": "",
	"cpassword": "",
	"first_name": '',
	'last_name': '',
	'phone': '',
    })

    useEffect(() => {
        let s = setInterval(() => {
 
    	}, 1000)
    }, [])

    let warningObject = {}
    for(let key in registrationInfo) { warningObject[key] = false }
    warningObject[passwordsMatchAlias] = false
    const [warnings, setWarnings] = useState(warningObject)

    const [registrationStatus, setRegistrationStatus] = useState(false)

    const setNewWarnings = () => {
	let warningsObject = {}
	for(let key in warnings) {
	    try {
	    	warningsObject[key] = registrationInfo[key].length === 0
	    } catch(error) {}
	}
	setWarnings(prevState => ({
	    ...prevState,
	    ...warningsObject
	}))
    }

    const handleRegistrationInputChange = (inputType) => (event) => {
	let tempRegistrationInfo = Object.assign({}, registrationInfo)
	tempRegistrationInfo[inputType] = event.target.value
	setRegistrationInfo(tempRegistrationInfo)
	if(inputType === cpasswordAlias || inputType === passwordAlias) {
	    if(registrationInfo[passwordAlias] !== registrationInfo[cpasswordAlias]) {
		setWarnings({ ...warnings, "passwordsMatch": true })
	    } else {
	    	setWarnings({ ...warnings, "passwordsMatch": false })
	    }
	}
	setNewWarnings()
    }

    const handleWindowChange = () => {
        setWindowType(windowType === loginAlias ? registerAlias : loginAlias)
    }

    const handleCheckboxChange = () => {
    	setChecked(!checked)
    }

    const handleRegister = (event) => {
    	event.preventDefault()
	setNewWarnings()

	let shouldSendForm = true
	for(const key in warnings) {
	    if(warnings[key] === true) { shouldSendForm = false; break }
	}
	
	if(shouldSendForm === false) { return (null) }
	let tempRegistrationInfo = registrationInfo
	delete tempRegistrationInfo[cpasswordAlias]
	axios
	    .post(
		'/api/auth/register/',
		tempRegistrationInfo,
		{ headers: { "Content-Type": "application/json" } }
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
			<input type="submit" value="Войти" className='w-full h-12 font-extrabold text-white bg-green-500 cursor-pointer rounded-2xl hover:bg-green-600 transition ease-in-out duration-300'/>
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
            <div className='bg-gray-100 rounded-2xl w-[75vh] mt-8'>
                <div className='flex flex-row items-center justify-between px-6 py-4'>
                    <h1 className='text-xl font-semibold'>Регистрация</h1>
                    <div className='p-1 bg-gray-300 border rounded-full'>
                        <CloseOutlinedIcon className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form onSubmit={handleRegister} className='flex flex-col items-center px-10 space-y-3'>
			<TextField className='w-full' color="success" error={warnings[emailAlias]} id="standard-basic" defaultValue={registrationInfo[emailAlias]}  label="Email" variant="standard" onChange={handleRegistrationInputChange(emailAlias)} />
			<TextField className='w-full' color="success" error={warnings[firstNameAlias]} id="standard-basic" defaultValue={registrationInfo[firstNameAlias]}  label="Имя" variant="standard" onChange={handleRegistrationInputChange(firstNameAlias)}/>
			<TextField className='w-full' color="success" error={warnings[lastNameAlias]} id="standard-basic" defaultValue={registrationInfo[lastNameAlias]}  label="Фамилия" variant="standard" onChange={handleRegistrationInputChange(lastNameAlias)}/>
			<TextField className='w-full' color="success" error={warnings[phoneAlias]} id="standard-basic" defaultValue={registrationInfo[phoneAlias]}  label="Номер" variant="standard" onChange={handleRegistrationInputChange(phoneAlias)}/>
			<TextField className='w-full' color="success" error={warnings[passwordAlias]} id="standard-basic" defaultValue={registrationInfo[passwordAlias]}  label="Пароль" variant="standard" onChange={handleRegistrationInputChange(passwordAlias)}/>
			<TextField className='w-full' color="success" error={warnings[passwordsMatchAlias]} {...(warnings[passwordsMatchAlias] ? {helperText: 'Пароли не совпадают'} : {})}id="standard-basic" defaultValue={registrationInfo[cpasswordAlias]}  label="Повторите пароль" variant="standard" onChange={handleRegistrationInputChange(cpasswordAlias)}/>
			<div>
			    <FormGroup>
				<FormControlLabel className='text-gray-600 text-sm' control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="success"/>} label="Я согласен с условиями пользования" />
			    </FormGroup>
			    { warnings['agreementChecked'] ? <p className='text-red-500'>*Вы должны согласиться с условиями пользования</p> : (null) }
                        </div>
			<Button className='bg-green-600 w-full rounded-xl' type='submit' variant='contained' color='success'>Зарегистрироваться</Button>
                    </form>
                </div>
                <div className='flex flex-row justify-center border-t border-gray-300 py-3'>
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
