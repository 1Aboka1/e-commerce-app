import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { SingleProduct } from './pages/SingleProduct'

function App() {
    return (
		<BrowserRouter>
			<Routes>
			<Route path="/" element={<Home/>}>
				<Route index element={<Home/>}/>
				<Route path="product_item">
					<Route path=":productID" element={<SingleProduct/>}/>
				</Route>
			</Route>
			</Routes>
		</BrowserRouter>
    )
}

export default App
