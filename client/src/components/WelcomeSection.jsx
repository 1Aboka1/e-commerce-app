import React, { Component } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { CategoryPopUp } from './CategoryPopUp'
import axios from 'axios'

export class WelcomeSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryPopUpSeen: false,
            inputText: '',
        }
    }

    togglePop = () => {
        this.setState({categoryPopUpSeen: !this.state.categoryPopUpSeen})
    }

    fetchSearchResult = (inputText) => {
        axios
            .get(
                `http://localhost:8000/api/get_search_results`,
                { params: { keywords: inputText } },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                this.setState({searchResult: response.data})
                console.log(response.data)
            })
            .catch((error) => { console.log(error) })
    }

    handleChange = (e) => {
        this.setState({inputText: e.target.value.toLowerCase()})
        this.fetchSearchResult(this.state.inputText)
    }
    
    render() {
        return (
            <div className={'h-screen bg-gray-200 bg-[url("https://media.istockphoto.com/photos/home-appliancess-set-of-household-kitchen-technics-in-the-new-or-picture-id952839420?k=20&m=952839420&s=612x612&w=0&h=W1YiB_4DuiBFQVAUPlPY2ynLpVHzocKKtf6Vp22CwjM="))]'}>
                <div className='flex flex-col items-center gap-6 justify-center h-[75vh] '>
                    <h1 className='text-3xl text-center'>Запчасти для бытовой техники с доставкой на дом <br/>в Усть-Каменогорске!</h1>
                    <form className='w-[80vh] h-12 bg-white rounded-lg justify-between outline-none p-2 pr-3 flex items-center ring-1 ring-gray-200 focus-within:ring-green-200 hover:scale-105 focus-within:scale-105 transition ease-in-out duration-200'>
                        <input onChange={this.handleChange} type='search' placeholder='Поиск товаров...' required
                            className='placeholder:text-gray-900 placeholder:text-lg pl-4 w-full focus:outline-none text-lg'
                        />
                        <SearchOutlinedIcon className='hover: cursor-pointer'/>
                    </form>
                    <div className='flex space-x-3 w-full justify-center'>
                        <button className='rounded-lg px-4 py-3 ring-1 ring-gray-200 bg-green-500 text-white font-bold hover:bg-green-600 hover:scale-110 hover:ring-black transition ease-in-out duration-300'>Поиск</button>
                        <button onClick={this.togglePop} className='rounded-lg px-4 py-3 ring-1 ring-gray-200 bg-white font-bold hover:bg-gray-200 hover:ring-black hover:scale-110 transition ease-in-out duration-200'>Категории</button>
                    </div>
                    {this.state.categoryPopUpSeen ? <CategoryPopUp toggle={this.togglePop}/> : null}
                </div>                
            </div>
        )
    }
}
