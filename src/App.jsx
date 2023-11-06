
import { Routes, Route } from 'react-router-dom';

import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Login from './pages/front/Login';
import Register from './pages/front/Register';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout'
function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<FrontLayout/>}>
            <Route path="" element={<Home/>}></Route>
            <Route path="products" element={<Products/>}></Route>
            <Route path="product/:id" element={<ProductDetail/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
          </Route>
          </Routes> 
    </>
  )
}

export default App
