
import { Routes, Route } from 'react-router-dom';

import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';


function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<FrontLayout/>}>
            <Route path="" element={<Home/>}></Route>
            <Route path="products" element={<Products/>}></Route>
          </Route>
          </Routes> 
    </>
  )
}

export default App
