import axios from "axios"
import React, { Component } from "react"

import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import "./featured.scss"


export class Featured extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersData: [],
    }
  }

  refreshList = () => {
    axios
      .get("api/users/")
      .then((res) => this.setState({usersData: res.data}))
      .catch((err) => console.log(err))
  }

  componentDidMount() {
    this.refreshList()
  }

  render() {
    return (
      <div className="featured">
          <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize="small"/>
          </div>
          <div className="bottom">
            <div className="featuredChart">
              <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
            </div>
            <p className="title">Total sales made today</p>
            {/* <p className="title">{this.state.usersData.filter(function(user) { return user.email === "zz.abulhair.zz@gmail.com"}).map((user) => user.email)}</p>
            <p className="amount">${this.state.usersData.filter(function(user) { return user.email === "zz.abulhair.zz@gmail.com"}).map((user) => user.balance)}</p> */}
            <p className="amount">${420}</p>
            <p className="desc">Previous transactions are processing</p>
            <div className="summary">
              <div className="item">
                <div className="itemTitle">Target</div>
                <div className="itemResult negative">
                  <KeyboardArrowDownOutlinedIcon/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Week</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}