import React, { Component } from 'react'
import axios from 'axios'
export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchedData: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/products')
            .then((response) => {
                this.setState({
                    fetchedData: response.data,
                })
            })
            .catch((error) => {console.log(error)})
    }

    createProductList = (product) => {      
        return(
            <div className='flex justify-between py-4 first:pt-5 cursor-pointer transition ease-in-out duration-200 group'>
                <div className='flex'>
                    <img className='w-[200px] object-scale-down' src={'/static/' + product.image} alt='Мотор'/>
                    <div className=''>
                        <h1 className='font-medium text-black text-2xl group-hover:text-green-600 transition ease-in-out duration-200'>{product.name}</h1>
                        <p className='pt-5 text-[15px] text-gray-700'>{product.description}</p>
                    </div>
                </div>
                <div className='flex flex-col space-y-2 px-6 pt-4'>
                    <h1 className='text-2xl text-end'>₸{product.price}</h1>
                    <button className='bg-green-500 p-3 font-bold text-white whitespace-nowrap rounded-lg hover:bg-green-600 transition ease-out duration-300'>В корзину</button>
                    <span className='text-sm text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
                </div>
            </div>
        )
    }
    
    createProductGrid =(product) => {
        return (
            <div></div>
        )
    }

    render() {
        return (
            <div className='bg-white shadow-lg basis-3/4 ring-1 ring-gray-300 rounded-lg'>
                {this.state.fetchedData.map((product) => {return this.props.listView ? this.createProductList(product) : this.createProductGrid(product)})}
            </div>
        )
    }
}
