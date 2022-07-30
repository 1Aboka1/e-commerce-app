import React, { Component } from 'react'

export class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.debug()
    }

    debug = () => { console.log( '../assets/' + this.props.image_path) }
    
    render() {
        return (
            <div className='bg-white rounded-lg ring-1 ring-green-400 m-10 w-56 p-8 cursor-pointer hover:ring-[3px] transition ease-in-out duration-300'>
                <img className={'object-cover h-' + this.props.height + ' w-auto scale-' + this.props.scale} src={require('./../assets/' + this.props.image_path)} alt={this.props.title}/>
                <h1 className={'text-center pt-' + this.props.pt + ' font-bold text-xl'}>{this.props.title}</h1>
            </div>
        )
    }
}
