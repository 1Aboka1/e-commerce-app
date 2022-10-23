import Fab from '@mui/material/Fab'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import Grow from '@mui/material/Grow'
import { useState } from 'react'

export const FloatingHelpWindow = () => {
    const [windowOpen, setWindowOpen] = useState(false) 

    return (
	<div className='fixed bottom-8 right-8'>
	    <div className='flex flex-row justify-start'>
		<Grow in={windowOpen} style={{ transformOrigin: '1 1 1' }}>
		    <div className='w-24 h-24 bg-white rounded-xl'>
			Sometgin
		    </div>
		</Grow>
	    </div>
	    <div className='flex flex-row justify-end'>
		<Fab>
		    <CallOutlinedIcon onClick={() => setWindowOpen(!windowOpen)} color='success' fontSize='large'/>
		</Fab>
	    </div>
	</div>
    )
}
