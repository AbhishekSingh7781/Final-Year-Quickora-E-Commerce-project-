import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({ 
    name: 'brands', 
    initialState: { brands: [] }, 
    reducers: {
        setBrands: (state, action) => { state.brands = action.payload; }
    } 
});

export const fetchBrandsAsync = () => async dispatch => {
    try {
        const res = await fetch('http://localhost:5001/brands');
        const data = await res.json();
        dispatch(slice.actions.setBrands(data));
    } catch(err) {}
};

export const selectBrands = (state) => state.BrandSlice.brands;
export default slice.reducer;