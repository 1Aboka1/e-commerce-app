import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const SideBar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">abokadmin</span>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                <p className="title">LISTS</p>
                <li>
                    <GroupOutlinedIcon className="icon"/>
                    <span>Users</span>
                </li>
                <li>
                    <Inventory2OutlinedIcon className="icon"/>
                    <span>Products</span>
                </li>
                <li>
                    <BorderColorOutlinedIcon className="icon"/>
                    <span>Orders</span>
                </li>
                <li>
                    <LocalShippingOutlinedIcon className="icon"/>
                    <span>Delivery</span>
                </li>
                <p className="title">USEFUL</p>
                <li>
                    <AssessmentOutlinedIcon className="icon"/>
                    <span>Stats</span>
                </li>
                <li>
                    <NotificationsNoneOutlinedIcon className="icon"/>
                    <span>Notifications</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                    <SettingsSystemDaydreamOutlinedIcon className="icon"/>
                    <span>System Health</span>
                </li>
                <li>
                    <BookOutlinedIcon className="icon"/>
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsOutlinedIcon className="icon"/>
                    <span>Settings</span>
                </li>
                <p className="title">USER</p>
                <li>
                    <PersonOutlineOutlinedIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li>
                    <LogoutOutlinedIcon className="icon"/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
        </div>
    </div>
  )
}
