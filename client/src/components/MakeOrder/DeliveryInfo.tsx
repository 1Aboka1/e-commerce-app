import {Button, TextField} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { rootDataType } from "../../types"
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined'

export const DeliveryInfo = (props: any) => {
    const user = useSelector((state: RootState) => state.auth.account)
    const shopping_session = useSelector((state: RootState) => state.shopping_session)

    const obj = props.rootData
    obj['user']['user_id'] = user?.id
    obj['user']['shopping_session_id'] = shopping_session.id
    props.setRootData(obj)

    const handleTextFieldChange = (event: any) => {
	const field_name = event.currentTarget.id
	const obj = props.rootData
	obj['user'][field_name] = event.currentTarget.value
	props.setRootData(obj)
    }

    return (
	<div className='flex flex-row space-x-3 items-start grow'>
	    <div className='flex flex-col space-y-4 grow'>
		<div className='flex flex-col space-y-3 py-3 px-5'>
		    <div className='flex flex-row space-x-5 items-center'>
			<div className='rounded-full w-8 h-8 bg-green-100 flex justify-center items-center shadow-xl shadow-gray-300'>
			    <p className='font-bold'>2</p>
			</div>
			<div>
			    <h1 className='font-semibold text-lg'>Способ получения</h1>
			    <p className='text-sm'>в г. Усть-Каменогорск</p>
			</div>
		    </div>
		    <div className='ml-4 pl-8 border-l-2 flex flex-col space-y-4 border-gray-400'>
			<div className='flex flex-col space-y-5'>
			    <div className='flex flex-row space-x-3'>
				<Button variant='contained' color='warning' className='rounded-xl font-semibold'>Самовывоз</Button>
				<Button variant='contained' disabled color='warning' className='rounded-xl font-semibold'>Доставка</Button>
			    </div>	
			    <div className='flex flex-row items-center space-x-2'>
				<PinDropOutlinedIcon fontSize='large' className='text-green-500'/><p className='font-semibold text-lg'>{'Наш адрес: Молдагулова 17/7, кв. 21'}</p>
			    </div>
			    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40091.2291128039!2d71.37493655012186!3d51.09551023420209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585b18f5dcc5d%3A0xd9a145281f5797a2!2z0L_RgNC-0YHQvy4g0JrQsNCx0LDQvdCx0LDQuSDQkdCw0YLRi9GA0LAgNTMsINCQ0YHRgtCw0L3QsCAwMjAwMDA!5e0!3m2!1sru!2skz!4v1666776747231!5m2!1sru!2skz" width="600" height="450" className='rounded-xl' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
			</div>
			<div className='flex flex-row space-x-4'>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    )
}
