import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { NavBar } from '../components/NavBar'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'

export const SingleProduct = () => {
    const productURLParams = useParams()
    const [productDetails, setproductDetails] = useState([])
    const [componentDidMount, setcomponentDidMount] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(componentDidMount === false){
            axios
                .get(
                    'http://localhost:8000/api/get_single_product/' + productURLParams.productID,
                )
                .then((response) => {
                    setproductDetails(response.data)
                    console.log(response.data)
                })
                .catch((error) => { console.log(error) })
            setcomponentDidMount(true)
        }
    })

    const createSpecifications = () => {
        let productCategories = {}
        for(const property in productDetails) {
            if(property.includes('category')) {
                productCategories[property] = productDetails[property]
            }
        }

        return (
            <div>
                {Object.keys(productCategories).map((category) => {
                    return (
                        <div className='flex justify-between'>
                            <span className=''>
                                {category}
                            </span>
                            <span className='truncate'>
                                ............................................................................................
                            </span>
                            <span className=''>
                                {productDetails[category]}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='bg-white'>
            <NavBar/>
            <div className='max-w-[1020px] mx-auto h-screen'>
                <div className='flex justify-center mx-auto space-x-2 mt-6 p-4'>
                    <div className='flex items-center justify-between'>
                        <img className='w-[400px]' src={'/static/' + productDetails.image} alt={productDetails.name}/>
                    </div>
                    <div className='w-[400px] bg-gray-100 rounded-lg p-6 px-8'>
                        <h1 className='font-[600] text-2xl'>{productDetails.name}</h1>
                        <span className='text-gray-700 font-normal text-sm inline-block my-2'>{'Код товара: ' + productDetails.id}</span>
                        <p className='font-medium text-3xl my-4'>₸{productDetails.price}</p>
                        <div className=''>
                            {createSpecifications()}
                        </div>
                        <div className='flex items-center mt-6 space-x-6'>
                            <form className='flex h-11 w-32'>
                                <button className='w-full text-center bg-white rounded-l-lg ring-1 ring-gray-500 font-bold text-2xl'><RemoveOutlinedIcon/></button>
                                <input value='1' className='w-full placeholder:text-gray-900 placeholder:text-lg text-center ring-1 ring-gray-500 focus:outline-none text-lg'/>
                                <button className='w-full text-center bg-white rounded-r-lg ring-1 ring-gray-500 font-bold text-2xl'><AddOutlinedIcon/></button>
                            </form>
                            <button className='p-3 px-5 text-lg text-white font-bold bg-green-500 ring-green-700 rounded-lg'>В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
