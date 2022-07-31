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
            <div className='justify-between flex flex-col bg-white rounded-lg ring-1 ring-green-300 m-10 w-52 h-80 p-8 cursor-pointer hover:ring-[3px] transition ease-in-out duration-300'>
                <img className={'object-center object-cover h-' + this.props.height} src={require('./../assets/' + this.props.image_path)} alt={this.props.title}/>
                <h1 className={'pt-4 text-center font-bold text-xl'}>{this.props.title}</h1>
            </div>
        )
    }
}
