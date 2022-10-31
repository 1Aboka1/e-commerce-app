import React from 'react'
import store from '../store'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

export const InvoiceGenerator = () => {
    // @ts-ignore
    document.body.style.zoom = "105%"
    const user = useSelector((state: RootState) => state.auth.account)
    console.log(user)

    return (
	<div>
	    <div className='flex flex-col max-w-[650px] divide-y space-y-7 bg-white shadow-lg shadow-gray-400 p-3 px-7 my-6 mx-auto'>
		<div className='flex flex-row justify-between'>
		    <div className='flex flex-col space-y-2'>
			<img className='w-12 rounded-md' src={require('../assets/favicon.png')} alt='company icon'/>
			<h1 className='font-bold text-2xl'>FastBuy</h1>
			<div className='flex flex-col'>
			    <p className='text-gray-600 text-sm'>Ерасыл Найманкумарулы</p>
			    <p className='text-gray-600 text-sm'>30-й Гвардейской дивизии 22</p>
			    <p className='text-gray-600 text-sm'>Усть-Каменогорск 070000</p>
			</div>
		    </div>
		    <div className='pt-4'>
			<h1 className='font-bold text-4xl'>ЧЕК</h1>
		    </div>
		</div>
		<div className='flex flex-row justify-between pt-6'>
		    <div className='flex flex-col space-y-2'>
			<h1 className='font-bold'>Покупатель:</h1>
			<div>
			    <p className='text-gray-700'>{user?.last_name + ' ' + user?.first_name}</p>
			    <p className='text-gray-700'></p>
			</div>
		    </div>
    		    <div className='flex flex-col'>
		    </div>
		</div>
	    </div>	
	</div>
    )
}
