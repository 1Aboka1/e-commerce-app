import "./single.scss"
import { SideBar } from '../../components/sidebar/SideBar'
import { NavBar } from '../../components/navbar/NavBar'
import { List } from '../../components/list/List'
import React from "react"
import { Chart } from '../../components/chart/Chart'
import axios from "axios"


class Single extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            chartData: [
                {name: "January", Total: 1200},
                {name: "February", Total: 900},
                {name: "March", Total: 200},
                {name: "April", Total: 2000},
                {name: "May", Total: 1500},
                {name: "June", Total: 1300},
            ],
        }
    }

    refreshUserData = () => {
        axios
            .get('/api/users/'.concat(window.location.href[window.location.href.length - 1]))
            .then((response) => {this.setState({userData: response.data})})
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        this.refreshUserData()
    }
    
    render() {
        return (
            <div className="single">
                <SideBar />
                <div className="singleContainer">
                    <NavBar />
                    <div className="top">
                        <div className="left">
                            <div className="editButton">Edit</div>
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img className="itemImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7n_hjrfOEgfm7CTRjgTURpIw1IN0Yp4pBQ&usqp=CAU" alt="Profile icon" />
                                <div className="itemInfo">
                                    <h1 className="itemTitle">{this.state.userData.name}</h1>
                                    <div className="itemDetails">
                                        <span className="itemKey">Email:</span>
                                        <span className="itemValue">{this.state.userData.email}</span>
                                    </div>
                                    <div className="itemDetails">
                                        <span className="itemKey">Balance:</span>
                                        <span className="itemValue">{this.state.userData.balance}</span>
                                    </div>
                                    <div className="itemDetails">
                                        <span className="itemKey">Staff:</span>
                                        <span className="itemValue">{this.state.userData.is_staff ? "✓" : "X"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <Chart aspect={3 / 1} title={this.state.userData.name + "'s latest transactions"}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="listTitle">Latest buyings</div>
                        <List/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Single