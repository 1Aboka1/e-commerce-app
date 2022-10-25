import {TextField} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import store from "../../store"

export const UserInfo = (props: any) => {
    const user = useSelector((state: RootState) => state.auth.account)
    const shopping_session = useSelector((state: RootState) => state.shopping_session)

    return (
	<div className='flex flex-row space-x-3 items-start grow'>
	    <div className='flex flex-col space-y-4 grow'>
		<div className='flex flex-col space-y-3 py-3 shadow-xl shadow-gray-300 rounded-xl bg-white px-5'>
		    <div className='flex flex-row space-x-5 items-center'>
			<div className='rounded-full w-8 h-8 bg-green-100 flex justify-center items-center shadow-xl shadow-gray-300'>
			    <p className='font-bold'>1</p>
			</div>
			<h1 className='font-semibold text-lg'>Данные покупателя</h1>
		    </div>
		    <div className='ml-4 pl-8 border-l-2 flex flex-col space-y-4 border-gray-400'>
			<div className='flex flex-row space-x-4'>
			    <TextField color='success' variant='filled' label='Фамилия' className=''/>
			    <TextField color='success' variant='filled' label='Имя' className=''/>
			</div>
			<div className='flex flex-row space-x-4'>
			    <TextField color='success' variant='filled' label='Телефон' className=''/>
			    <TextField color='success' variant='filled' label='Email' className=''/>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    )
}
