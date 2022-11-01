import React, { useState } from 'react'
import axios from 'axios'
import authSlice from '../store/slices/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
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
    let warningObject = {}
    for(let key in registrationInfo) { warningObject[key] = false }
    warningObject[passwordsMatchAlias] = false
    const [warnings, setWarnings] = useState(warningObject)

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

    const handleRegister = async (event) => {
    	event.preventDefault()
	setNewWarnings()

	let shouldSendForm = true
	for(const key in warnings) {
	    if(warnings[key] === true) { shouldSendForm = false; break }
	}
	
	if(shouldSendForm === false) { return (null) }
	let tempRegistrationInfo = registrationInfo
	delete tempRegistrationInfo[cpasswordAlias]
	const tempLoginInfo = {
	    'email': tempRegistrationInfo.email,
	    'password': tempRegistrationInfo.password,
	}
	await axios
	    .post(
		'/api/auth/register/',
		tempRegistrationInfo,
		{ headers: { "Content-Type": "application/json" } }
	    )
	    .then((response) => {
		axios
		    .post(
			'/api/auth/login/',
			tempLoginInfo,
			{ headers: { "Content-Type": "application/json" } }
		    )
		    .then((response) => {
			dispatch(
			    authSlice.actions.setAuthTokens({
				token: response.data.access,
				refreshToken: response.data.refresh,
			    })
			)
			dispatch(authSlice.actions.setAccount(response.data.user))
			window.location.reload()
		    })
		    .catch((error) => { console.log(error) })
	    })
	    .catch((error) => { console.log(error) })
    }

    const renderSignUpWindow = () => {
        return (
            <div className='bg-gray-100 rounded-2xl w-[75vh] mt-8'>
                <div className='flex flex-row items-center justify-between px-6 py-4'>
                    <h1 className='text-xl font-semibold'>Регистрация</h1>
                    <div className='p-1 bg-gray-300 border rounded-full'>
                        <CloseOutlinedIcon id='closeButton' className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form onSubmit={handleRegister} className='flex flex-col items-center px-10 space-y-3'>
			<TextField className='w-full' color="success" error={warnings[emailAlias]} id="standard-basic" defaultValue={registrationInfo[emailAlias]}  label="Email" variant="standard" onChange={handleRegistrationInputChange(emailAlias)} />
			<TextField className='w-full' color="success" error={warnings[firstNameAlias]} id="standard-basic" defaultValue={registrationInfo[firstNameAlias]}  label="Имя" variant="standard" onChange={handleRegistrationInputChange(firstNameAlias)}/>
			<TextField className='w-full' color="success" error={warnings[lastNameAlias]} id="standard-basic" defaultValue={registrationInfo[lastNameAlias]}  label="Фамилия" variant="standard" onChange={handleRegistrationInputChange(lastNameAlias)}/>
			<TextField className='w-full' color="success" error={warnings[phoneAlias]} id="standard-basic" defaultValue={registrationInfo[phoneAlias]}  label="Номер" variant="standard" onChange={handleRegistrationInputChange(phoneAlias)}/>
			<TextField className='w-full' color="success" error={warnings[passwordAlias]} id="standard-basic" type='password' defaultValue={registrationInfo[passwordAlias]}  label="Пароль" variant="standard" onChange={handleRegistrationInputChange(passwordAlias)}/>
			<TextField className='w-full' color="success" error={warnings[passwordsMatchAlias]} {...(warnings[passwordsMatchAlias] ? {helperText: 'Пароли не совпадают'} : {})}id="standard-basic" type='password' defaultValue={registrationInfo[cpasswordAlias]}  label="Повторите пароль" variant="standard" onChange={handleRegistrationInputChange(cpasswordAlias)}/>
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

    //Login states
    const [loginInfo, setLoginInfo] = useState({
	"email": "",
	"password": "",
    })

    const dispatch = useDispatch()
    const history = useNavigate()
    //L in variable names means Login for the purpose of distinguishing them from registration states
    let LwarningObject = {}
    for(let key in loginInfo) { LwarningObject[key] = false }
    const [Lwarnings, setLWarnings] = useState(LwarningObject)

    const setNewLWarnings = () => {
	let LwarningsObject = {}
	for(let key in Lwarnings) {
	    try {
	    	LwarningsObject[key] = loginInfo[key].length === 0
	    } catch(error) {}
	}
	setLWarnings(prevState => ({
	    ...prevState,
	    ...LwarningsObject
	}))
    }

    const handleLoginInputChange = (inputType) => (event) => {
	let tempLoginInfo = Object.assign({}, loginInfo)
	tempLoginInfo[inputType] = event.target.value
	setLoginInfo(tempLoginInfo)
	setNewLWarnings()
    }

    const handleLogin = async (event) => {
    	event.preventDefault()
	setNewLWarnings()

	let shouldSendForm = true
	for(const key in warnings) {
	    if(warnings[key] === true) { shouldSendForm = false; break }
	}
	
	if(shouldSendForm === false) { return (null) }
	let tempLoginInfo = loginInfo 
	await axios
	    .post(
		'/api/auth/login/',
		tempLoginInfo,
		{ headers: { "Content-Type": "application/json" } }
	    )
	    .then((response) => {
		dispatch(
		    authSlice.actions.setAuthTokens({
			token: response.data.access,
			refreshToken: response.data.refresh,
		    })
		)
		dispatch(authSlice.actions.setAccount(response.data.user))
		window.location.reload()
	    })
	    .catch((error) => { console.log(error) })
    }

    const renderSignInWindow = () => {
	return (
            <div className='bg-gray-100 rounded-2xl w-[75vh] mt-8'>
                <div className='flex flex-row items-center justify-between px-6 py-4'>
                    <h1 className='text-xl font-semibold'>Вход</h1>
                    <div className='p-1 bg-gray-300 border rounded-full'>
                        <CloseOutlinedIcon className='cursor-pointer' onClick={props.handleSignClick('')}/>
                    </div>
                </div>
                <div className='my-3'>
                    <form onSubmit={handleLogin} className='flex flex-col items-center px-10 space-y-3'>
			<TextField className='w-full' color="success" error={Lwarnings[emailAlias]} id="standard-basic" defaultValue={loginInfo[emailAlias]}  label="Email" variant="standard" onChange={handleLoginInputChange(emailAlias)} />
			<TextField className='w-full pb-5' color="success" error={Lwarnings[passwordAlias]} id="standard-basic" type='password' defaultValue={loginInfo[passwordAlias]}  label="Пароль" variant="standard" onChange={handleLoginInputChange(passwordAlias)}/>
			<Button className='bg-green-600 w-full rounded-xl' type='submit' variant='contained' color='success'>Войти</Button>
                    </form>
                </div>
                <div className='flex flex-row justify-center border-t border-gray-300 py-3'>
			<p onClick={handleWindowChange} className='text-green-500 cursor-pointer hover:text-green-600 transition ease-in-out duration-300'><span className='text-gray-700'>Нет аккаунта?</span> Зарегистрироваться</p>
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
