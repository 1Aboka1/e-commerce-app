import Home from "./admin-pages/pages/home/Home"
import Login from "./admin-pages/pages/login/Login"
import List from "./admin-pages/pages/list/List"
import Single from "./admin-pages/pages/single/Single"
import New from "./admin-pages/pages/new/New"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={<Home/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="users">
              <Route index element={<List/>}></Route>
              <Route path=":userId" element={<Single/>}></Route>
              <Route path="new" element={<New/>}></Route>
            </Route>
            <Route path="products">
              <Route index element={<List/>}></Route>
              <Route path=":productID" element={<Single/>}></Route>
              <Route path="new" element={<New/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
