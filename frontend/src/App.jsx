import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrandsAsync } from './features/brands/BrandSlice';
import { fetchCategoriesAsync } from './features/categories/CategoriesSlice';
import {
  Navigate,
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { AddProductPage, AdminOrdersPage, AuthPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)
  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<AuthPage/>}/>
        <Route path='/login' element={<AuthPage/>}/>
        <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route exact path='/product-details/:id' element={<ProductDetailsPage/>}/>
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
        {
          loggedInUser?.role === 'admin' ? (
            // admin routes
            <>
            <Route path='/admin/dashboard'element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route path='/admin/product-update/:id'element={<Protected><ProductUpdatePage/></Protected>}/>
            <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
            <Route path='/admin/orders'  element={<Protected><AdminOrdersPage/></Protected>}/>
            <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
            </>
          )
          : (
            // user routes
            <>
            <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
            <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
            <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
            <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
            <Route path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
            <Route path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
            </>
          )
        }
        <Route path='*' element={<NotFoundPage/>} />
      </>
    )
  )

  return isAuthChecked ? (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <RouterProvider router={routes}/>
    </>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}>
       <div>Loading Quickora...</div>
    </div>
  );
}

export default App;
