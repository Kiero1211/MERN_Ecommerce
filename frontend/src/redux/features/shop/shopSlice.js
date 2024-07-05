import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: [],
    checkboxes: [],
    radios: [],
    brandCheckboxes: {},
    checkedBrands: []
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        setProducts: (state, action) => {
            state.products = action.payload;
        },

        setCheckboxes: (state, action) => {
            state.checkboxes = action.payload;
        },

        setRadios: (state, action) => {
            state.radios = action.payload;
        },

        setCheckedBrands: (state, action) => {
            state.checkedBrands = action.payload;
        }
    }
})

export const {
    setCategories,
    setProducts,
    setCheckboxes,
    setRadios,
    setCheckedBrands
} = shopSlice.actions;
export default shopSlice.reducer;
