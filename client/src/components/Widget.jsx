import React, { Component } from 'react'

export class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    
    render() {
        return (
            <div className='justify-between flex flex-col bg-white rounded-lg focus:ring-green-400 ring-1 ring-gray-300 m-10 w-52 h-80 p-8 cursor-pointer hover:ring-[3px] transition ease-in-out duration-300'>
                <img className={'object-center object-cover h-' + this.props.height} src={require('./../assets/' + this.props.image_path)} alt={this.props.title}/>
                <h1 className={'pt-4 text-center text-gray-800 font-bold text-xl'}>{this.props.title}</h1>
            </div>
        )
    }
}
