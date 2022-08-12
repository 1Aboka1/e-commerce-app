import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { Products } from './SearchComponents/Products'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'

export class SearchWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            checked: [],
            filterList: [], //TODO: #5 Fetch filtersList from API
            filterCountList: [],
            filteredQuerySet: [],
            didSenttoAPI: false,
        }
        this.createAccordion = this.createAccordion.bind(this)
        this.createList = this.createList.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleListClick = () => {
        this.setState({listView: true});
    }

    handleGridClick = () => {
        this.setState({listView: false});
    }

    //TODO: #2 Create SearchBar with AutoComplete from MUI
    //TODO: #3 Create multiple instances of item component for items from db

    componentDidMount() {
        axios
            .get(`http://localhost:8000/api/product_categories`)
            .then((response) => {
                this.setState({
                    filterList: response.data,
                })
                const tempList = response.data.map((item) => { return item.name })
                let json_tempList = {}
                tempList.map((item) => { json_tempList[item] = ['Default']; return 0 })
                this.setState({checked: json_tempList})
            })
            .catch((error) => { console.log(error) })
        
        axios
            .get(`http://localhost:8000/api/product_category_count`)
            .then((response) => {
                this.setState({
                    filterCountList: response.data,
                })
            })
            .catch((error) => { console.log(error) })
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.state.didSenttoAPI){
            axios
            .get(
                    'http://localhost:8000/api/get_filtered_products',
                    { params: JSON.stringify(this.state.checked) },
                    { headers: { 'Content-Type': 'application/json', } },
                )
                .then((response) => {
                    this.setState({ filteredQuerySet: response.data, didSenttoAPI: true })
                    console.log(this.state.filteredQuerySet )
                })
                .catch((error) => { console.log(error) })
        }
    }

    
    
    handleToggle = (value, type) => () => {
        const currentIndex = this.state.checked[type].indexOf(value)
        const newChecked = [...this.state.checked[type]]
        
        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        let previousState = this.state
        previousState.checked[type] = newChecked
        this.setState( previousState )
        this.setState({ didSenttoAPI: false })
        // let previousState = this.state.checked
        // previousState[type] = newChecked
        // this.setState({ checked: previousState[type] })
    }

    createList = (filters) => {
        return (
            <div>
                {filters.map((filter) => {
                    const labelId = `checkbox-list-label-${filter}`
                    const filterData = this.state.filterCountList.find((item) => item.name === filter)
                    const productsCount = filterData.products_count
                    const type = filterData.type
                    return (
                        <div 
                            className='first:pt-1 last:pb-1 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200' 
                            onClick={this.handleToggle(filter, type)}
                        >
                            <div className='flex items-center'>
                                <Checkbox
                                    edge="start"
                                    checked={this.state.checked[type].indexOf(filter) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                <span>{filter}</span>
                            </div>
                            <span className=''>{productsCount}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    createAccordion = (filter) => { 
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
                    {this.createList(filter.children)}
                </AccordionDetails>
            </Accordion>
        )
    }

    render() {
        return (
            <div className='h-screen'>
                <div className='mx-auto max-w-[1100px] pt-4'>
                    <div className='flex justify-between items-center py-4'>
                        <p className='font-light text-gray-900'>4380 товаров</p>
                        <div className='flex space-x-4 h-10'>
                            <form className='ring-1 ring-gray-300 bg-gray-100 rounded-md outline-none p-3 space-x-2 pr-2 flex items-center border focus-within:border-green-500 transition duration-200'>
                                <input type='search' placeholder='Поиск товаров...' required
                                    className='w-80 bg-gray-100 placeholder:text-gray-700 placeholder:text-[15px] pl-3 focus:outline-none text-lg'
                                />
                                <SearchOutlinedIcon className='hover: cursor-pointer' fontSize='medium'/>
                            </form>
                            <div className='flex rounded-md ring-1 ring-gray-300'>
                                <button className={(this.state.listView ? 'bg-gray-300 ' : '') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-l-md focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={this.handleListClick}>
                                    <MenuOutlinedIcon fontSize='small'/>
                                </button>
                                <button className={(this.state.listView ? '' : 'bg-gray-300 ') + 'flex items-center px-[10px] ring-1 ring-gray-300 rounded-r-md focus:ring-green-300 focus:ring-2 transition ease-in-out duration-400 hover:bg-gray-200'} onClick={this.handleGridClick}>
                                    <GridViewOutlinedIcon  fontSize='small'/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-x-5 items-start'>
                        <div className='basis-1/4 shadow-lg ring-1 ring-gray-300 rounded-lg sticky top-5'>
                            {this.state.filterList.map((filter) => {return this.createAccordion(filter)})}
                        </div>
                        <Products listView={this.state.listView} filteredQuerySet={this.state.filteredQuerySet}/>
                    </div>
                </div>
            </div>        
        )
    }
}
