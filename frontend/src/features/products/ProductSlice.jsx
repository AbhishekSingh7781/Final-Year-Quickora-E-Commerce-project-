import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
} from './ProductApi';

const initialState = {
    products: [],
    status: 'idle',
    totalItems: 0,
    selectedProduct: null,
    productAddStatus: 'idle',
    productUpdateStatus: 'idle',
    filters: {},
};

export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async ({ filter, sort, pagination, admin }) => {
        const response = await fetchProducts(filter, sort, pagination, admin);
        return response.data;
    }
);

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        const response = await fetchProductById(id);
        return response.data;
    }
);

export const addProductAsync = createAsyncThunk(
    'product/create',
    async (product) => {
        const response = await createProduct(product);
        return response.data;
    }
);

export const updateProductAsync = createAsyncThunk(
    'product/update',
    async (update) => {
        const response = await updateProduct(update);
        return response.data;
    }
);

// For backwards compatibility and different naming in some components
export const createProductAsync = addProductAsync;
export const updateProductByIdAsync = updateProductAsync;

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        resetProductAddStatus: (state) => {
            state.productAddStatus = 'idle';
        },
        resetProductUpdateStatus: (state) => {
            state.productUpdateStatus = 'idle';
        },
        setCategoryFilter: (state, action) => {
            state.filters = { ...state.filters, category: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action.payload;
            })
            .addCase(addProductAsync.pending, (state) => {
                state.productAddStatus = 'loading';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.productAddStatus = 'fulfilled';
                state.products.push(action.payload);
            })
            .addCase(addProductAsync.rejected, (state) => {
                state.productAddStatus = 'rejected';
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.productUpdateStatus = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.productUpdateStatus = 'fulfilled';
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.selectedProduct = action.payload;
            })
            .addCase(updateProductAsync.rejected, (state) => {
                state.productUpdateStatus = 'rejected';
            });
    },
});

export const { clearSelectedProduct, resetProductAddStatus, resetProductUpdateStatus, setCategoryFilter } = productSlice.actions;

export const selectAllProducts = (state) => state.ProductSlice.products;
export const selectTotalItems = (state) => state.ProductSlice.totalItems;
export const selectProductById = (state) => state.ProductSlice.selectedProduct;
export const selectSelectedProduct = (state) => state.ProductSlice.selectedProduct;
export const selectProductListStatus = (state) => state.ProductSlice.status;
export const selectProductAddStatus = (state) => state.ProductSlice.productAddStatus;
export const selectProductUpdateStatus = (state) => state.ProductSlice.productUpdateStatus;
export const selectFilters = (state) => state.ProductSlice.filters;

export default productSlice.reducer;