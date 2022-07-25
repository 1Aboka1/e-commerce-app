import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDown';

export const Widget = ({ type }) => {
    let data;

    //temp
    const amount = 100
    const diff = 20



    switch(type){
        case 'user':
            data = {
                title: 'Users',
                isMoney: false,
                link: 'See all users',
                icon: <PersonOutlineOutlinedIcon className="icon"/>
            }
            break;
        case 'order':
            data = {
                title: 'Orders',
                isMoney: false,
                link: 'View all orders',
                icon: <ShoppingCartIcon className="icon"/>
            }
            break;
        case 'earnings':
            data = {
                title: 'Earnings',
                isMoney: true,
                link: 'View net earnings',
                icon: <MonetizationOnIcon className="icon"/>
            }
            break;
        case 'balance':
            data = {
                title: 'Balance',
                isMoney: true,
                link: 'See details',
                icon: <AccountBalanceWalletIcon className="icon"/>
            }
            break;
        default:
            break;
    }

    return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$" }{amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage">
                {diff > 0 ? <KeyboardArrowUpOutlinedIcon/> : <KeyboardArrowDownOutlinedIcon/>}
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}
