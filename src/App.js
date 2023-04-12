import './App.css';
import HomePage from './pages/homepage/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/signin/SignIn';
import { useEffect } from 'react';
import ProductInfo from './container/ProductInfo';
import BodyPage from './pages/homepage/body/BodyPage';
import Cate from './_sharecomponents/demo/Cate';
import { useSelector } from 'react-redux';
import ShoppingCart from './container/ShoppingCart';
import ErrorPage from './pages/error/ErrorPage';
import SearchProducts from './container/SearchProducts';
import Orders from './container/Orders';
function App() {

  const selector = useSelector(state => state);
  const title = selector.page.title
  // localStorage.setItem("isLogged", false)
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="App">
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<HomePage />} >

          <Route path='/' element={<BodyPage />} />
          <Route path='/api/v1/products/:productId' element={<ProductInfo />} />
          <Route path='api/v1/carts/:userId' element={<ShoppingCart />} />
          {/* <Route path='api/v1/products/search/:categoryId' element={<SearchProducts />} />
          <Route path='api/v1/products/search/:categoryId/:productName' element={<SearchProducts />} />
          <Route path='api/v1/products/search/:categoryId/:productName/:maxPrice' element={<SearchProducts />} /> */}
          <Route path='api/v1/products/search/:categoryId/:productName/:minPrice/:maxPrice/:pageNumber' element={<SearchProducts />} />
          <Route path='api/v1/orders/paging/:userId/:orderStatus/:pageNumber' element={<Orders />} />
        </Route>
        <Route path='/api/v1/categories/sneaker' element={<Cate />} />
        <Route element={<ErrorPage />} />
        {/* <Route
          path='*'
          element={<Navigate to={'/'} replace />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
