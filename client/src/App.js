import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { SingleProduct } from './pages/SingleProduct'
import { Search } from './pages/Search'
import { SignInUp } from './pages/SignInUp'

function App() {
    return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}>
					<Route index element={<Home/>}/>
				</Route>
				<Route path="product_item">
					<Route path=":productID" element={<SingleProduct/>}/>
				</Route>
				<Route path="search" element={<Search/>}/>
				<Route path="singInUp" element={<SignInUp/>}/>
			</Routes>
		</BrowserRouter>
    )
}

export default App
