import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { SingleProduct } from './pages/SingleProduct'
import { Search } from './pages/Search'
import {Provider} from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { Profile } from './pages/Profile'
import { MakeOrder } from './pages/MakeOrder'
import { InvoiceGenerator } from './utils/InvoiceGenerator.tsx'

function App() {	
    document.body.style.zoom = "95%"
    return (
	<Provider store={store}>
	    <PersistGate persistor={persistor} loading={null}>
		<BrowserRouter>
		    <Routes>
			<Route path="/" element={<Home/>}>
			    <Route index element={<Home/>}/>
			</Route>
			<Route path="product_item">
			    <Route path=":productID" element={<SingleProduct/>}/>
			</Route>
			<Route path="search" element={<Search/>}/>
			<Route exact path='profile' element={<ProtectedRoute/>}>
			    <Route path=':windowType' element={<Profile/>}>
				<Route path=':genericParam' element={<Profile/>}></Route>
			    </Route>
			</Route>
			<Route path='checkout'>
			    <Route index element={<MakeOrder/>}/>
			    <Route path='pdf'>
				<Route path=':orderID/:userID' element={<InvoiceGenerator/>}></Route>
			    </Route>
			</Route>
		    </Routes>
		</BrowserRouter>
	    </PersistGate>
	</Provider>
    )
}

export default App
