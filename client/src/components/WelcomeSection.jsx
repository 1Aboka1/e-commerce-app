import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { CategoryPopUp } from './CategoryPopUp'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class WelcomeSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryPopUpSeen: false,
            inputText: '',
            inputFocused: false,
        }
    }

    togglePop = () => {
        this.setState({categoryPopUpSeen: !this.state.categoryPopUpSeen})
    }

    handleFocus = () => { this.setState({inputFocused: true}) }
    handleBlur = () => { this.setState({inputFocused: false}) }

    fetchSearchResult = (inputText) => {
        axios
            .get(
                `http://localhost:8000/api/get_search_results`,
                { params: { keywords: inputText } },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                this.setState({searchResult: response.data})
            })
            .catch((error) => { console.log(error) })
    }

    handleChange = (e) => {
        this.setState({inputText: e.target.value.toLowerCase()})
        this.fetchSearchResult(this.state.inputText)
    }

    createSearchResultList = () => {
        console.log(this.state.searchResult)
        return (
            <div className='absolute top-12 mx-auto left-0 right-0 bg-white rounded-md shadow-lg ring-1 ring-gray-500'>
                {
                    this.state.searchResult.map((searchResult) => {
                        return (
                            <div className='flex p-3 justify-between space-x-2'>
                                <span className='truncate font-semibold'>{ searchResult.name }</span>
                                <span className='font-semibold'>{ searchResult.price }</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    
    render() {
        return (
            <div className={'h-screen bg-gray-500 bg-center bg-no-repeat bg-cover bg-blend-multiply'} style={{backgroundImage: `url("http://localhost:8000/static/6424672.jpg")`}}>
                <div className='flex flex-col items-center gap-6 justify-center h-[75vh] '>
                    <h1 className='text-3xl text-center font-medium text-white'>Запчасти для бытовой техники с доставкой на дом <br/>в Усть-Каменогорске</h1>
                    <form className='relative w-[80vh] h-12 bg-white rounded-lg justify-between outline-none p-2 pr-3 flex items-center ring-1 ring-gray-400 focus-within:ring-green-300 hover:scale-105 focus-within:scale-105 transition ease-in-out duration-200'>
                        <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} type='search' placeholder='Поиск товаров...' required
                            className='placeholder:text-gray-900 placeholder:text-lg pl-4 w-full focus:outline-none text-lg'
                        />
                        <SearchOutlinedIcon className='hover: cursor-pointer'/>
                        { this.state.searchResult !== undefined && this.state.searchResult.length > 0 && this.state.inputFocused ? this.createSearchResultList() : null }
                    </form>
                    <div className='flex space-x-3 w-full justify-center'>
                        <Link to={'search'}>
                        <button onClick={this.props.handleSearchClick} className='rounded-lg px-4 py-3 ring-0 ring-gray-200 bg-green-500 text-white font-bold hover:bg-green-600 hover:scale-110 hover:ring-1 hover:ring-black transition ease-in-out duration-300'>Поиск</button>
                        </Link>
                        <button onClick={this.togglePop} className='rounded-lg px-4 py-3 ring-0 ring-gray-300 bg-white font-bold hover:bg-gray-200 hover:ring-1 hover:ring-black hover:scale-110 transition ease-in-out duration-200'>Категории</button>
                    </div>
                    {this.state.categoryPopUpSeen ? <CategoryPopUp toggle={this.togglePop}/> : null}
                </div>                
            </div>
        )
    }
}
