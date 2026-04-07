const fs = require('fs');
const path = require('path');

const frontendPath = path.join(__dirname, 'frontend', 'src');
const dirs = ['features', 'pages', 'hooks', 'assets'];

dirs.forEach(d => {
  const dirPath = path.join(frontendPath, d);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// Create Auth components and hooks
fs.mkdirSync(path.join(frontendPath, 'features', 'auth', 'components'), { recursive: true });
fs.writeFileSync(path.join(frontendPath, 'features', 'auth', 'components', 'Logout.jsx'), `export const Logout = () => <div>Logout</div>`);
fs.writeFileSync(path.join(frontendPath, 'features', 'auth', 'components', 'Protected.jsx'), `export const Protected = ({children}) => <div>{children}</div>`);
fs.writeFileSync(path.join(frontendPath, 'features', 'auth', 'AuthSlice.jsx'), `
import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({ name: 'auth', initialState: { isAuthChecked: true, loggedInUser: { isAdmin: true } }, reducers: {} });
export const selectIsAuthChecked = state => state.AuthSlice.isAuthChecked;
export const selectLoggedInUser = state => state.AuthSlice.loggedInUser;
export default authSlice.reducer;
`);

fs.mkdirSync(path.join(frontendPath, 'hooks', 'useAuth'), { recursive: true });
fs.writeFileSync(path.join(frontendPath, 'hooks', 'useAuth', 'useAuthCheck.js'), `export const useAuthCheck = () => {}`);
fs.writeFileSync(path.join(frontendPath, 'hooks', 'useAuth', 'useFetchLoggedInUserDetails.js'), `export const useFetchLoggedInUserDetails = () => {}`);

// Constants
fs.writeFileSync(path.join(frontendPath, 'constants.js'), `export const ITEMS_PER_PAGE = 10;`);

// Assets
fs.writeFileSync(path.join(frontendPath, 'assets', 'index.js'), `export const noOrdersAnimation = {};`);

// Create Slices
const slices = ['user/UserSlice', 'brands/BrandSlice', 'categories/CategoriesSlice', 'cart/CartSlice', 'review/ReviewSlice', 'order/OrderSlice', 'wishlist/WishlistSlice', 'products/ProductSlice'];
slices.forEach(s => {
    fs.mkdirSync(path.join(frontendPath, 'features', s.split('/')[0]), { recursive: true });
    
    let extraExports = '';
    if (s.includes('BrandSlice')) extraExports = `export const selectBrands = () => [{_id: 1, name: 'Brand 1'}];`;
    if (s.includes('CategoriesSlice')) extraExports = `export const selectCategories = () => [{_id: 1, name: 'Cat 1'}];`;
    if (s.includes('ProductSlice')) extraExports = `
export const addProductAsync = () => async dispatch => {};
export const resetProductAddStatus = () => ({type: 'a'});
export const selectProductAddStatus = () => 'idle';
export const updateProductByIdAsync = () => async dispatch => {};
export const deleteProductByIdAsync = () => async dispatch => {};
export const fetchProductsAsync = () => async dispatch => {};
export const selectProductIsFilterOpen = () => false;
export const selectProductTotalResults = () => 0;
export const selectProducts = () => [];
export const toggleFilters = () => ({type: 'a'});
export const undeleteProductByIdAsync = () => async dispatch => {};
export const clearSelectedProduct = () => ({type: 'a'});
export const fetchProductByIdAsync = () => async dispatch => {};
export const resetProductUpdateStatus = () => ({type: 'a'});
export const selectProductUpdateStatus = () => 'idle';
export const selectSelectedProduct = () => ({ brand: {_id:1}, category: {_id:1}, images: []});
    `;
    if (s.includes('OrderSlice')) extraExports = `
export const getAllOrdersAsync = () => async dispatch => {};
export const resetOrderUpdateStatus = () => ({type: 'a'});
export const selectOrderUpdateStatus = () => 'idle';
export const selectOrders = () => [];
export const updateOrderByIdAsync = () => async dispatch => {};
    `;
    
    fs.writeFileSync(path.join(frontendPath, 'features', s + '.jsx'), `
import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({ name: '${s.split('/')[0]}', initialState: {}, reducers: {} });
${extraExports}
export default slice.reducer;
    `);
});

// Products components
fs.mkdirSync(path.join(frontendPath, 'features', 'products', 'components'), { recursive: true });
fs.writeFileSync(path.join(frontendPath, 'features', 'products', 'components', 'ProductCard.jsx'), `export const ProductCard = () => <div>ProductCard</div>`);

// Create Pages
const pages = ['AddProductPage', 'AdminOrdersPage', 'CartPage', 'CheckoutPage', 'ForgotPasswordPage', 'HomePage', 'LoginPage', 'OrderSuccessPage', 'OtpVerificationPage', 'ProductDetailsPage', 'ProductUpdatePage', 'ResetPasswordPage', 'SignupPage', 'UserOrdersPage', 'UserProfilePage', 'WishlistPage', 'AdminDashboardPage', 'NotFoundPage'];
let indexExports = '';
pages.forEach(p => {
    fs.writeFileSync(path.join(frontendPath, 'pages', p + '.jsx'), `
        import React from 'react';
        export const ${p} = () => <div>${p}</div>
    `);
    if(p !== 'AdminDashboardPage' && p !== 'NotFoundPage') {
        indexExports += `export { ${p} } from './${p}';\n`;
    }
});
fs.writeFileSync(path.join(frontendPath, 'pages', 'index.js'), indexExports);

// Move existing front-end files
const frontendFiles = [
    { src: 'App.js', dest: 'App.jsx' }, // Use JSX for vite compatibility usually, but vite supports jsx in App.jsx. Let's rename to JSX
    { src: 'AdminDashboard.jsx', dest: 'pages/AdminDashboardPage.jsx' }, // Let's just create a wrapper? No, the import was AdminDashboardPage. The user had AdminDashBoard. So I'll move AdminDashboard.jsx to pages/AdminDashboardPage.jsx but export AdminDashboardPage. Wait, the user's AdminDashboard exports AdminDashBoard!
    { src: 'AdminOrder.jsx', dest: 'pages/AdminOrdersPage.jsx' },
    { src: 'AddProduct.jsx', dest: 'pages/AddProductPage.jsx' },
    { src: 'ProductUpdate.jsx', dest: 'pages/ProductUpdatePage.jsx' },
    { src: 'Store.js', dest: 'app/store.js' },
    { src: 'RootLayout.js', dest: 'RootLayout.jsx' },
    { src: 'AddressSlice.jsx', dest: 'features/address/AddressSlice.jsx' },
];

fs.mkdirSync(path.join(frontendPath, 'app'), { recursive: true });
fs.mkdirSync(path.join(frontendPath, 'features', 'address'), { recursive: true });

frontendFiles.forEach(f => {
    if (fs.existsSync(path.join(__dirname, f.src))) {
        let content = fs.readFileSync(path.join(__dirname, f.src), 'utf-8');
        
        // Fix export names to match App.js expectations
        if(f.src === 'AdminDashboard.jsx') content = content.replace('export const AdminDashBoard', 'export const AdminDashboardPage');
        if(f.src === 'AdminOrder.jsx') content = content.replace('export const AdminOrders', 'export const AdminOrdersPage');
        if(f.src === 'AddProduct.jsx') content = content.replace('export const AddProduct', 'export const AddProductPage');
        if(f.src === 'ProductUpdate.jsx') content = content.replace('export const ProductUpdate', 'export const ProductUpdatePage');
        if(f.src === 'Store.js') content = content.replace('../features', '../../features'); // adjust path if needed

        fs.writeFileSync(path.join(frontendPath, f.dest), content);
        fs.unlinkSync(path.join(__dirname, f.src));
    }
});

// Update standard Vite entry points
fs.writeFileSync(path.join(frontendPath, 'main.jsx'), `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
`);

fs.writeFileSync(path.join(frontendPath, 'index.css'), ` body { margin: 0; } `);

if (fs.existsSync(path.join(__dirname, 'Index.htm'))) {
    fs.renameSync(path.join(__dirname, 'Index.htm'), path.join(__dirname, 'frontend', 'index.html'));
}
if (fs.existsSync(path.join(__dirname, 'quickora_logo.png'))) {
    fs.copyFileSync(path.join(__dirname, 'quickora_logo.png'), path.join(__dirname, 'frontend', 'public', 'quickora_logo.png'));
}

console.log('Frontend scaffolding complete');
