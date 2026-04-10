import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../constants';

const slice = createSlice({ 
    name: 'categories', 
    initialState: { categories: [] }, 
    reducers: {
        setCategories: (state, action) => { state.categories = action.payload; }
    } 
});

export const fetchCategoriesAsync = () => async dispatch => {
    try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        dispatch(slice.actions.setCategories(data));
    } catch(err) {}
};

export const selectCategories = (state) => state.CategoriesSlice.categories;
export default slice.reducer;