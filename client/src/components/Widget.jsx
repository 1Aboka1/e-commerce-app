import React, { Component } from 'react'
import "./widget.scss"

export class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    
    render() {
        if(this.props.size === "big")
        {
            return (
                <div className='r'>

                </div>
            )
        }
    }
}
