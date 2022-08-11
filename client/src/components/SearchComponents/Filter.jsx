import React, { Component } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            filterList: [], //TODO: #5 Fetch filtersList from API
            filterCountList: [],
        }
        this.createAccordion = this.createAccordion.bind(this)
        this.createList = this.createList.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

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

    componentDidUpdate() {
        axios
            .get(
                'http://localhost:8000/api/get_filtered_products',
                { params: JSON.stringify(this.state.checked) },
                { headers: { 'Content-Type': 'application/json', } },
            )
            .then((response) => {
                let filteredProducts = React.createContext(response.data)
            })
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
    }

    //TODO: #4 Fetch filters from API according to the name of the filterList
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
            <div className='basis-1/4 shadow-lg ring-1 ring-gray-300 rounded-lg sticky top-5'>
                {this.state.filterList.map((filter) => {return this.createAccordion(filter)})}
            </div>
        )
    }
}