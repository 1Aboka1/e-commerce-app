import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const SignInUp = (props) => {
    const loginAlias = 'login'
	const registerAlias = 'register'

    const renderSignInWindow = () => {
        return (
            <div className='bg-gray-200 rounded-2xl w-[75vh]'>
                <div className='flex flex-row justify-between items-center px-4 py-4'>
                    <h1 className='font-medium text-xl'>Вход</h1>
                    <div className='rounded-full border bg-gray-300 p-1'>
                        <CloseOutlinedIcon/>
                    </div>
                </div>
                <div>
                    <form action="">
                        <input type="text" />
                        <div>
                            <input type="text" />
                        </div>
                        <a href="">Забыли пароль?</a>
                        <button>Войти</button>
                    </form>
                </div>
                <div>
                    <a href="">Нет аккаунта? Зарегистрироваться</a>
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
        <div className='fixed z-10 w-screen mx-auto'>
            <div className='flex justify-center items-center h-[85vh]'>
                {props.type === loginAlias ? renderSignInWindow() : (null)}
                {props.type === registerAlias ? renderSignUpWindow() : (null)}
            </div>
        </div>
    )
}