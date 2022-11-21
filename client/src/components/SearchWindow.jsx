import { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { Products } from './Products'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'

export const SearchWindow = () => {
    const [listView, setListView] = useState(true)
    const [checked, setchecked] = useState([])
    const [filterList, setfilterList] = useState([])
    const [filteredQuerySet, setfilteredQuerySet] = useState([])
    const [didSentToAPI, setdidSentToAPI] = useState(false)
    const [productCount, setProductCount] = useState(0)
    const [inputText, setinputText] = useState('')
    const [subcategoryProductsCount, setSubcategoryProductsCount] = useState([])

    const handleListClick = () => {
        setListView(true)
    }

    const handleGridClick = () => {
        setListView(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
	axios
	    .get('/api/product_categories/')
	    .then((response) => {
		setfilterList(response.data)
	    })
	    .catch((error) => { console.log(error) })
	axios
	    .get('/api/subcategories_products_count/')
	    .then((response) => {
		setSubcategoryProductsCount(response.data)
	    })
	    .catch((error) => {
		console.log(error)
	    })
    }, [])

    useEffect(() => {
	if(!(checked && Object.keys(checked).length === 0 && Object.getPrototypeOf(checked) === Object.prototype && inputText.length === 0)) {
	    axios
		.get(
		    '/api/get_filtered_products',
		    { params: {
			filters: JSON.stringify(checked),
			keywords: inputText,
		    } },
		)
		.then((response) => {
		    setfilteredQuerySet(response.data)
		    setdidSentToAPI(true)
		})
		.catch((error) => { console.log(error) })
	}
    }, [checked, didSentToAPI, inputText])

    const handleToggle = (event) => {
        const newChecked = [...checked]
	const searchKeyword = event.currentTarget.id
	const currentIndex = newChecked.indexOf(searchKeyword) 
        
        if(currentIndex === -1) {
            newChecked.push(searchKeyword)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setchecked(newChecked)
    }

    const renderList = (filters) => {
            return (
                <div>
                    {filters.map((filter) => {
                        const labelId = `checkbox-list-label-${filter}`

			const productCount = subcategoryProductsCount.find((item) => item.name === filter)?.product__count
                        return (
                            <div 
                                className='first:pt-1 last:pb-1 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200' 
                                onClick={handleToggle}
				id={filter}
                            >
                                <div className='flex items-center'>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(filter) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    <span>{filter}</span>
                                </div>
                                <span className=''>{productCount}</span>
                            </div>
                        )
                    })}
                </div>
            )
    }

    const renderAccordion = (filter) => { 
        return (
            <Accordion elevation={1} disableGutters={true} className='rounded-t-xl rounded-b-xl'>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='h-12 rounded-xl bg-white hover:bg-gray-100 transition duration-200 ease-in-out group'
                >
                <Typography><h1 className='font-bold text-[16px]'>{filter.name}</h1></Typography>
                </AccordionSummary>
                <AccordionDetails className='p-0'>
                    {renderList(filter.subcategories)}
                </AccordionDetails>
	    </Accordion>
        )
    }

    const handleChange = (e) => {
        setdidSentToAPI(false)
        setinputText(e.target.value.toLowerCase())
    }
    
    return (
        <div className='h-full mb-5 bg-[#F5F5F5]'>
            <div className='mx-auto max-w-[1100px] pt-4'>
		<h1 className='font-bold text-3xl mb-1'>Поиск</h1>
                <div className='flex justify-between items-center pb-4'>
                    <p className='font-light text-gray-900'>{ filteredQuerySet !== undefined && filteredQuerySet.length > 0 ? filteredQuerySet.length : productCount } товаров</p>
                    <div className='flex space-x-4 h-10'>
                        <form className='ring-1 ring-gray-300 bg-white rounded-xl outline-none p-3 space-x-2 pr-2 flex items-center border focus-within:border-green-500 hover:scale-105 focus-within:scale-105 transition duration-200'>
                            <input onChange={handleChange} type='search' placeholder='Поиск товаров...' required
                                className='w-80 bg-white placeholder:text-gray-700 placeholder:text-[15px] pl-3 focus:outline-none text-xl'
                            />
                            <SearchOutlinedIcon className='hover: cursor-pointer' fontSize='medium'/>
                        </form>
                        <div className='flex rounded-xl ring-1 ring-gray-300'>
                            <button className={(listView ? 'bg-gray-300 ' : '') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-l-xl focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={handleListClick}>
                                <MenuOutlinedIcon fontSize='small'/>
                            </button>
                            <button className={(listView ? '' : 'bg-gray-300 ') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-r-xl focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={handleGridClick}>
                                <GridViewOutlinedIcon  fontSize='small'/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-5 items-start'>
                    <div className='basis-1/4 shadow-xl shadow-gray-300 rounded-xl sticky top-24'>
                        {filterList.map((filter) => {return renderAccordion(filter)})}
                    </div>
                    <Products listView={listView} filteredQuerySet={filteredQuerySet}/>
                </div>
            </div>
        </div>
    )
}
