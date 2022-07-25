import { SideBar } from "../../components/sidebar/SideBar"
import { NavBar } from "../../components/navbar/NavBar"
import { Widget } from "../../components/widget/Widget"
import { Featured } from "../../components/featured/Featured"
import { Chart } from "../../components/chart/Chart"
import { List } from "../../components/list/List"
import "./home.scss"

const Home = () => {
    return (
        <div className="home">
            <SideBar/>
            <div className="homeContainer"> 
                <NavBar />
                <div className="widgets">
                    <Widget type="user"/>
                    <Widget type="order"/>
                    <Widget type="earnings"/>
                    <Widget type="balance"/>
                </div>
                <div className="charts">
                    <Featured/>
                    <Chart aspect={2 / 1} title="{Some graph}"/>
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <List/>
                </div>
            </div>
        </div>
    )
}

export default Home