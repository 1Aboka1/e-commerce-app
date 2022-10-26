import {Button, TextField} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { rootDataType } from "../../types"

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
			<div className='flex flex-row space-x-3'>
			    <Button variant='contained' color='warning' className='rounded-xl font-semibold'>Самовывоз</Button>
			    <Button variant='contained' disabled color='warning' className='rounded-xl font-semibold'>Доставка</Button>
			</div>
			<div className='flex flex-row space-x-4'>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    )
}
