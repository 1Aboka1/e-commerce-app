import { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link, useNavigate } from 'react-router-dom'

export const WelcomeSection = (props) => {
    const [categoryPopUpSeen, setCategoryPopUpSeen] = useState(false)
    const [inputText, setInputText] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const history = useNavigate()

    const handleFocus = () => { setInputFocused(true) }
    const handleBlur = () => { setInputFocused(false) }

    const handleKeyDown = (event) => {
	if(event.key === 'Enter') {
	    history("/search")
	}
    }

    return (
	<div className={'h-screen bg-gray-500 bg-center bg-no-repeat bg-cover bg-blend-multiply'} style={{backgroundImage: `url("/mediafiles/6424672.jpg")`}}>
	    <div className='flex flex-col items-center gap-6 justify-center h-[75vh] '>
		<h1 className='text-3xl text-center font-medium text-white'>Запчасти для бытовой техники с доставкой на дом <br/>в Усть-Каменогорске</h1>
		<form className='w-[80vh] h-12 bg-white rounded-2xl justify-between outline-none p-2 pr-3 flex items-center ring-1 ring-gray-400 focus-within:ring-green-300 hover:scale-105 focus-within:scale-105 transition ease-in-out duration-200'>
		    <input onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} type='search' placeholder='Поиск товаров...' required
		    className='placeholder:text-gray-900 placeholder:text-lg pl-4 w-full focus:outline-none text-lg'
		/>
			<SearchOutlinedIcon className='hover: cursor-pointer'/>
		    </form>
		    <div className='flex space-x-3 w-full justify-center'>
			<Link to={'search'}>
			    <button className='rounded-xl px-4 py-3 ring-0 ring-gray-200 bg-green-500 text-white font-bold hover:bg-green-600 hover:scale-110 hover:ring-1 hover:ring-black transition ease-in-out duration-300'>Поиск</button>
			</Link>
			<Link to={'search'}>
			    <button className='rounded-xl px-4 py-3 ring-0 ring-gray-300 bg-white font-bold hover:bg-gray-200 hover:ring-1 hover:ring-black hover:scale-110 transition ease-in-out duration-200'>Каталог</button>
			</Link>
		    </div>
		</div>                
	    </div>
    )
}
