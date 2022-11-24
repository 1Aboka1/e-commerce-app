import Fab from '@mui/material/Fab'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import Grow from '@mui/material/Grow'
import { useState } from 'react'
import { SocialIcon } from 'react-social-icons'

export const FloatingHelpWindow = () => {
    const [windowOpen, setWindowOpen] = useState(false) 

    const handleClickAwayListener = () => {
	if(windowOpen === true) {
	    setWindowOpen(false)
	}
    }

		    console.log(windowOpen)
    return (
	<ClickAwayListener onClickAway={handleClickAwayListener}>
	    <div className='fixed flex flex-col z-10 space-y-4 bottom-8 right-8'>
		<div className='flex flex-row justify-start'>
		    <Grow hidden={!windowOpen} in={windowOpen} style={{ transformOrigin: '0 0 1 1' }}>
			<div className='bg-white rounded-xl shadow-lg shadow-gray-500 py-2 space-y-1 divide-y'>
			    <div className='flex flex-row items-center space-x-4 justify-between px-4 py-2 cursor-pointer'>
				<h1 className='font-medium text-gray-800'>Написать в Whatsapp</h1>
				<SocialIcon url="https://whatsapp.com/" style={{ height: 30, width: 30 }}/>
			    </div>
			    <div className='flex flex-row items-center space-x-4 justify-between px-4 py-2 cursor-pointer'>
				<h1 className='font-medium text-gray-800'>Написать в Telegram</h1>
				<SocialIcon url="https://telegram.org/" style={{ height: 30, width: 30 }}/>
			    </div>
			    <div className='flex flex-row items-center space-x-4 justify-between px-4 py-2 cursor-pointer'>
				<h1 className='font-medium text-gray-800'>Запросить звонок</h1>
				<CallOutlinedIcon className='border rounded-full p-1' fontSize='large'/>	
			    </div>
			</div>
		    </Grow>
		</div>
		<div className='flex flex-row justify-end'>
		    <Fab onClick={() => setWindowOpen(!windowOpen)} className='bg-white'>
			<CallOutlinedIcon color='success' fontSize='large'/>
		    </Fab>
		</div>
	    </div>
	</ClickAwayListener>
    )
}
