import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({ 
    name: 'categories', 
    initialState: { categories: [] }, 
    reducers: {
        setCategories: (state, action) => { state.categories = action.payload; }
    } 
});

export const fetchCategoriesAsync = () => async dispatch => {
    try {
        const res = await fetch('http://localhost:5001/categories');
        const data = await res.json();
        dispatch(slice.actions.setCategories(data));
    } catch(err) {}
};

export const selectCategories = (state) => state.CategoriesSlice.categories;
export default slice.reducer;