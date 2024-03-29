import { Routes, Route } from 'react-router-dom';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Login from './pages/front/Login';
import Register from './pages/front/Register';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import Success from './pages/front/Success';
import AccountDashboard from './pages/front/account/AccountDashboard';
import Profile from './pages/front/account/Profile';
import Orders from './pages/front/account/Orders';
import Privacy from './pages/front/Privacy';
import FrequencelyAskedQuestions from './pages/front/FrequencelyAskedQuestions';
import Articles from './pages/front/Articles';
import ArticleDetail from './pages/front/ArticleDetail';
import ContactUs from './pages/front/ContactUs';
import Search from './pages/front/Search';
import BrandStory from './pages/front/BrandStory';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategrories';
import AdminArticles from './pages/admin/AdminArticles';
import NotFound from './pages/NotFound';
import { MessageContext, MessageReducer, initState } from './store/messageStore';
import { useReducer } from 'react';
import AutoScrollToTop from './components/AutoScrollToTop';

function App() {
  const reducer = useReducer(MessageReducer, initState);

  return (
    <>
      <MessageContext.Provider value={reducer}>
        <AutoScrollToTop>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route path="" element={<Home />}></Route>
              <Route path="products" element={<Products />}></Route>
              <Route path="product/:id" element={<ProductDetail />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/success/:orderId" element={<Success />}></Route>
              <Route path="/account" element={<AccountDashboard />}>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="order" element={<Orders />}></Route>
              </Route>
              <Route path="/privacy" element={<Privacy />}></Route>
              <Route path="/frequencely_asked_questions" element={<FrequencelyAskedQuestions />}></Route>
              <Route path="/articles" element={<Articles />}></Route>
              <Route path="/article/:id" element={<ArticleDetail />}></Route>
              <Route path="contactus" element={<ContactUs />}></Route>
              <Route path="search" element={<Search />}></Route>
              <Route path="brandstory" element={<BrandStory />}></Route>
            </Route>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="orders" element={<AdminOrders />}></Route>
              <Route path="products" element={<AdminProducts />}></Route>
              <Route path="categories" element={<AdminCategories />}></Route>
              <Route path="articles" element={<AdminArticles />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes> 
        </AutoScrollToTop>
      </MessageContext.Provider>

    </>
  )
}

export default App
