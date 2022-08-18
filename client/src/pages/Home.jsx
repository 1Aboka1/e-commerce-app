import React, { Component } from 'react'
import { NavBar } from '../components/NavBar'
import { WelcomeSection } from '../components/WelcomeSection'
import { CategoryPopUp } from '../components/CategoryPopUp'
import { SearchWindow } from '../components/SearchWindow'


export class Home extends Component {
	constructor(props) {
		super(props)
		this.searchWindowFocusRef = React.createRef()
	}

	handleSearchClick() { this.searchWindowFocusRef.current.focus() }

	render() {
		return (
			<div>
				<div className='flex flex-col pb-20'>
					<NavBar/>
					<WelcomeSection handleSearchClick={this.handleSearchClick.bind(this)}/>
				</div>
				<SearchWindow ref={this.searchWindowFocusRef}/>
				<CategoryPopUp/>
			</div>
		)
	}
}

					{/* <div className='max-w-[1240px] mx-auto justify-center flex'>
					<Widget image_path='8714780-1.jpg' title='Пылесосы'/>
					<Widget image_path='img_0_8_613_0.jpg' title='Стиральные машины' height={64}/>
					<Widget image_path='medium14.jpg' title='Холодильники' height={64}/>
					<Widget image_path='786265_u01_b.jpg' title='Плиты и духовки' height={64}/>
					</div> */}