import React, { useState, useEffect } from 'react'
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
    const [checked, setchecked] = useState({})
    const [filterList, setfilterList] = useState([])
    const [filterCountList, setfilterCountList] = useState([])
    const [filteredQuerySet, setfilteredQuerySet] = useState([])
    const [didSentToAPI, setdidSentToAPI] = useState(false)
    const [productCount, setproductCount] = useState(0) 
    const [componentDidMount, setcomponentDidMount] = useState(false)   
    const [inputText, setinputText] = useState('')

    const handleListClick = () => {
        setListView(true)
    }

    const handleGridClick = () => {
        setListView(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(componentDidMount === false) {
            setcomponentDidMount(true)
            axios
                .get('/api/product_categories')
                .then((response) => {
                    setfilterList(response.data)
                    const tempList = response.data.map((item) => { return item.name })
                    let json_tempList = {}
                    tempList.map((item) => { json_tempList[item] = ['Default']; return 0 })
                    setchecked(json_tempList)
                })
                .catch((error) => { console.log(error) })
            
            axios
                .get('/api/product_category_count')
                .then((response) => {
                    setfilterCountList(response.data)
                })
                .catch((error) => { console.log(error) })
            axios
                .get('/api/get_products_count')
                .then((response) => {
                    setproductCount(response.data)
                })
                .catch((error) => { console.log(error) })
        }
    })

    useEffect(() => {
        if(componentDidMount === true && didSentToAPI === false) {
            if(!(checked && Object.keys(checked).length === 0 && Object.getPrototypeOf(checked) === Object.prototype && inputText.length === 0)) {
                axios
                    .get(
                        '/api/get_filtered_products',
                        { params: {
                            filters: JSON.stringify(checked),
                            keywords: inputText,
                        } },
                        { headers: { 'Content-Type': 'application/json', } },
                    )
                    .then((response) => {
                        setfilteredQuerySet(response.data)
                        setdidSentToAPI(true)
                    })
                    .catch((error) => { console.log(error) })
            }
        }
    })

    const handleToggle = (value, type) => () => {
        const currentIndex = checked[type].indexOf(value)
        const newChecked = [...checked[type]]
        
        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        let prevChecked = checked
        prevChecked[type] = newChecked
        setchecked( prevChecked )
        setdidSentToAPI(false)
    }

    const renderList = (filters) => {
        return (
            <div>
                {filters.map((filter) => {
		            if(filterCountList !== undefined) {
                        const labelId = `checkbox-list-label-${filter}`
                        const filterData = filterCountList.find((item) => item.name === filter)
                        const productsCount = filterData.products_count
                        const type = filterData.type
                        return (
                            <div 
                                className='first:pt-1 last:pb-1 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200' 
                                onClick={handleToggle(filter, type)}
                            >
                                <div className='flex items-center'>
                                    <Checkbox
                                        edge="start"
                                        checked={checked[type].indexOf(filter) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    <span>{filter}</span>
                                </div>
                                <span className=''>{productsCount}</span>
                            </div>
                        )
                    }
                    else{
                        return (null)
                    }
                })}
            </div>
        )
    }
    
    const renderAccordion = (filter) => { 
        return (
            <Accordion elevation={0} disableGutters={true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='h-12 rounded-lg ring-1 ring-gray-300 bg-white hover:bg-gray-100 transition duration-200 ease-in-out group'
                >
                <Typography><h1 className='font-bold text-[16px]'>{filter.name}</h1></Typography>
                </AccordionSummary>
                <AccordionDetails className='p-0'>
                    {renderList(filter.children)}
                </AccordionDetails>
            </Accordion>
        )
    }

    const handleChange = (e) => {
        setdidSentToAPI(false)
        setinputText(e.target.value.toLowerCase())
    }
    
    return (
        <div className='h-screen'>
            <div className='mx-auto max-w-[1100px] pt-4'>
                <div className='flex justify-between items-center py-4'>
                    <p className='font-light text-gray-900'>{ filteredQuerySet !== undefined && filteredQuerySet.length > 0 ? filteredQuerySet.length : productCount } товаров</p>
                    <div className='flex space-x-4 h-10'>
                        <form className='ring-1 ring-gray-300 bg-gray-100 rounded-md outline-none p-3 space-x-2 pr-2 flex items-center border focus-within:border-green-500 hover:scale-105 focus-within:scale-105 transition duration-200'>
                            <input onChange={handleChange} type='search' placeholder='Поиск товаров...' required
                                className='w-80 bg-gray-100 placeholder:text-gray-700 placeholder:text-[15px] pl-3 focus:outline-none text-lg'
                            />
                            <SearchOutlinedIcon className='hover: cursor-pointer' fontSize='medium'/>
                        </form>
                        <div className='flex rounded-md ring-1 ring-gray-300'>
                            <button className={(listView ? 'bg-gray-300 ' : '') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-l-md focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={handleListClick}>
                                <MenuOutlinedIcon fontSize='small'/>
                            </button>
                            <button className={(listView ? '' : 'bg-gray-300 ') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-r-md focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={handleGridClick}>
                                <GridViewOutlinedIcon  fontSize='small'/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-5 items-start'>
                    <div className='basis-1/4 shadow-lg ring-1 ring-gray-300 rounded-lg sticky top-5'>
                        {filterList.map((filter) => {return renderAccordion(filter)})}
                    </div>
                    <Products listView={listView} filteredQuerySet={filteredQuerySet}/>
                </div>
            </div>
        </div>
    )
}
