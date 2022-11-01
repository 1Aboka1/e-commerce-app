import {TextField} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { PAYMENT_OPTIONS, PAYMENT_ORDER_OPTIONS } from "../../types"

export const PaymentInfo = (props: any) => {
    const user = useSelector((state: RootState) => state.auth.account)
    const shopping_session = useSelector((state: RootState) => state.shopping_session)

    const obj = props.rootData
    obj['payment_option'] = PAYMENT_OPTIONS.CASH
    obj['payment_order'] = PAYMENT_ORDER_OPTIONS.AT_PICKUP
    props.setRootData(obj)

    return (
	<div className='flex flex-row space-x-3 items-start grow'>
	    <div className='flex flex-col space-y-4 grow'>
		<div className='flex flex-col space-y-3 pt-3 pb-1 px-5'>
		    <div className='flex flex-row space-x-5 items-center'>
			<div className='rounded-full w-8 h-8 bg-green-100 flex justify-center items-center shadow-xl shadow-gray-300'>
			    <p className='font-bold'>3</p>
			</div>
			<h1 className='font-semibold text-lg'>Способ оплаты</h1>
		    </div>
		    <div className='ml-4 pl-8 flex flex-col space-y-4 border-gray-400'>
			<div className='flex flex-row space-x-4 rounded-xl border-2 border-green-700 items-center p-3'>
			    <CheckCircleOutlinedIcon fontSize='large' className='text-green-500'/>			    
			    <p className='font-semibold'>Вы можете расплатиться переводом на "Kaspi Gold" или наличными в нашем магазине</p>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    )
}
