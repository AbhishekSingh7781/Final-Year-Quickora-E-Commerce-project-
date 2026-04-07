import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToWishlist, fetchWishlist, removeFromWishlist } from './WishlistApi';

const initialState = {
  items: [],
  status: 'idle',
};

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (item) => {
    const response = await addToWishlist(item);
    return response.data;
  }
);

export const fetchWishlistAsync = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const response = await fetchWishlist();
    return response.data;
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (id) => {
    const response = await removeFromWishlist(id);
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.id) {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1);
      });
  },
});

export const selectWishlistItems = (state) => state.WishlistSlice.items;
export const selectWishlistStatus = (state) => state.WishlistSlice.status;

export default wishlistSlice.reducer;