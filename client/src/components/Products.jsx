import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import store from '../store'
import { RootState } from '../store'

export class Products extends Component {
    constructor(props) {
        super(props)
	const shopping_session = useSelector((state: RootState) => state.shopping_session)
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

    handleAddToCart = (productID) => () => {
	store
    }

    createProductList = (product) => {           
        return(
            <Link to={`/product_item/${product.id}`} key={product.id}>
                <div className='flex justify-between py-4 cursor-pointer transition ease-in-out duration-200 group'>
                    <div className='flex'>
                            <img className='w-[200px] p-5 object-cover' src={'/mediafiles/' + product.image} alt={product.name}/>
                        <div className='py-3 justify-center flex flex-col'>
                            <h1 className='font-medium text-black text-[20px] group-hover:text-green-600 transition ease-in-out duration-200'>{product.name}</h1>
                            <p className='pt-5 text-[13px] text-gray-700'>{product.description}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center space-y-2 px-6'>
                        <h1 className='text-[20px] text-end'>₸{product.price}</h1>
                        <button className='bg-green-500 p-3 font-bold text-white whitespace-nowrap rounded-lg hover:bg-green-600 transition ease-out duration-300'>В корзину</button>
                        <span className='text-[12px] text-end text-gray-600 whitespace-nowrap'>В наличии: {product.quantity}</span>
                    </div>
                </div>
            </Link>
        )
    }
    
    createProductGrid = (product) => {
        return (
            <div></div>
        )
    }

    createEmptyQS = () => {
        return (
            <div className='h-screen'>
                <h1 className='text-center pt-10 font-medium text-lg'>Нет результатов. Попробуйте использовать другие фильтры</h1>
            </div>
        )
    }

    render() {
        return (
            <div className='bg-white shadow-xl shadow-gray-300 basis-3/4 rounded-xl'>
                {/* { this.props.filteredQuerySet.length === 0 ? this.state.fetchedData.map((product) => {return this.props.listView ? this.createProductList(product) : this.createProductGrid(product)}) : this.props.filteredQuerySet.map((product) => {return this.props.listView ? this.createProductList(product) : this.createProductGrid(product)}) } */}
                { this.props.filteredQuerySet.length === 0 ? this.createEmptyQS() : this.props.filteredQuerySet.map((product) => {return this.props.listView ? this.createProductList(product) : this.createProductGrid(product)}) }
                {/* { this.props.filteredQuerySet.map((product) => {return this.props.listView ? this.createProductList(product) : this.createProductGrid(product)}) } */}
            </div>
        )
    }
}
