import React, { Component } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            filtersList: ['Модель', 'Тип', 'Фильтр', 'Еще один фильтр'], //TODO: #5 Fetch filtersList from API
        }
    }

    handleToggle = (value) => () => {
        const currentIndex = this.state.checked.indexOf(value)
        const newChecked = [...this.state.checked]

        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({checked: newChecked})
    }

    //TODO: #4 Fetch filters from API according to the name of the filterList
    createList = () => {
        const filters = ['LG', 'Samsung']

        return (
            <div>
                {filters.map((value) => {
                    const labelId = `checkbox-list-label-${value}`

                    return (
                        <div className='first:pt-1 last:pb-1 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200' onClick={this.handleToggle(value)}>
                            <div className='flex items-center'>
                                <Checkbox
                                    edge="start"
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                <span>{value}</span>
                            </div>
                            <span className=''>{34}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    createAccordion = (title) => { 
        return (
            <Accordion elevation={0} disableGutters={true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='h-12 rounded-lg ring-1 ring-gray-300 bg-white hover:bg-gray-100 transition duration-200 ease-in-out group'
                >
                <Typography><h1 className='font-bold text-[16px]'>{title}</h1></Typography>
                </AccordionSummary>
                <AccordionDetails className='p-0'>
                    {this.createList()}
                </AccordionDetails>
            </Accordion>
        )
    }

    render() {
        return (
            <div className='basis-1/4 shadow-lg ring-1 ring-gray-300 rounded-lg sticky top-5'>
                {this.state.filtersList.map((value) => {return this.createAccordion(value)})}
            </div>
        )
    }
}