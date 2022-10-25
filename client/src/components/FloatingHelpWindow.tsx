import Fab from '@mui/material/Fab'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import Grow from '@mui/material/Grow'
import { useState } from 'react'

export const FloatingHelpWindow = () => {
    const [windowOpen, setWindowOpen] = useState(false) 

    return (
	<div className='fixed flex flex-col z-10 space-y-4 bottom-8 right-8'>
	    <div className='flex flex-row justify-start'>
		<Grow hidden={!windowOpen} in={windowOpen} style={{ transformOrigin: '0 0 1 1' }}>
		    <div className='w-72 h-72 p-4 bg-white rounded-xl shadow-lg shadow-gray-500'>
 
		    </div>
		</Grow>
	    </div>
	    <div className='flex flex-row justify-end'>
		<Fab className='bg-white'>
		    <CallOutlinedIcon onClick={() => setWindowOpen(!windowOpen)} color='success' fontSize='large'/>
		</Fab>
	    </div>
	</div>
    )
}
