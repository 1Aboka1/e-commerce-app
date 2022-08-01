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
            <div className='justify-between flex flex-col bg-white rounded-lg focus:ring-green-400 ring-1 ring-gray-300 m-10 w-52 h-80 p-8 cursor-pointer hover:ring-[3px] hover:shadow-2xl transition ease-in-out duration-300 group'>
                <img className={'object-center object-cover h-' + this.props.height} src={require('./../assets/' + this.props.image_path)} alt={this.props.title}/>
                <h1 className={'group-hover:text-gray-800 pt-5 text-center text-gray-600 font-bold text-xl transition ease-in-out duration-300'}>{this.props.title}</h1>
            </div>
        )
    }
}
