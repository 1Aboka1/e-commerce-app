import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';



export class SearchWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            expanded: false,
        }
    }

    handleExpandHandle = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false})
    }

    handleListClick = () => {
        this.setState({listView: true});
    }

    handleGridClick = () => {
        this.setState({listView: false});
    }

    //TODO: #2 Create SearchBar with AutoComplete from MUI

    render() {
        return (
            <div>
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

                </div>
            </div>        
        )
    }
}
