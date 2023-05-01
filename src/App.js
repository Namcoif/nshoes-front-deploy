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
import CategoriesManagement from './container/manager/CategoriesManagement';
import OrdersManagement from './container/manager/OrdersManagement';
import StatisticalManagement from './container/manager/StatisticalManagement';
import SignUpSuccess from './pages/signupsuccess/SignUpSuccess';
import AdminPage from './pages/admin/AdminPage';
import InfoManagement from './container/customer/InfoManagement';
function App() {

  const selector = useSelector(state => state);
  const title = selector.page.title
  // localStorage.setItem("isLogged", false)
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="App ">
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<HomePage />} >

          <Route path='/' element={<BodyPage />} />
          <Route path='/api/v1/products/:productId' element={<ProductInfo />} />
          <Route path='api/v1/carts/:userId' element={<ShoppingCart />} />
          <Route path='api/v1/products/search/:categoryId/:productName/:minPrice/:maxPrice/:pageNumber' element={<SearchProducts />} />
          <Route path='api/v1/orders/paging/:userId/:orderStatus/:pageNumber' element={<Orders />} />
          <Route path='api/v1/categories/management' element={<CategoriesManagement />} />
          <Route path='/api/v1/orders-management/:orderStatus/:pageNumber' element={<OrdersManagement />} />
          <Route path='/api/v1/statistical/management' element={<StatisticalManagement />} />
          <Route path='/api/v1/user-info/management' element={<InfoManagement />} />

        </Route>
        <Route path='ap1/v1/user-confirm' element={<SignUpSuccess />} />
        <Route path='api/v1/admin' element={<AdminPage />} />
        <Route path='api/v1/admin/:userId' element={<AdminPage />} />

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
