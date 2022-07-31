import React, { Component } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0]
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

    createList = () => {
        return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={value}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={this.handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        )
    }
    
    createAccordion = (title) => { 
        return (
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography><h1 className='font-bold text-md'>{title}</h1></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {this.createList()}
                </AccordionDetails>
            </Accordion>
        )
    }

    render() {
        return (
            <div className='w-[250px]'>
                {['Модель', ''].map((value) => {return this.createAccordion(value)})}
            </div>
        )
    }
}
