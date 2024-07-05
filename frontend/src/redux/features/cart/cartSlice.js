import { createSlice } from "@reduxjs/toolkit";
import { updateCartPrices } from "../../../Utils/cart";

const initialState = localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) :
    {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "Paypal"
    }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {user, rating, numReviews, reviews, ...item} = action.payload;
            const existsItemIndex = state.cartItems.findIndex(cartItem => cartItem._id === item._id);

            if (existsItemIndex) {
                // Update cartItem according to the request data
                state.cartItems[existsItemIndex] = item;
            } else {
                state.cartItems.push(item);
            }
            return updateCartPrices(state, item);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id);
            return updateCartPrices(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state))
        },
        
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCartPrices(state);
        },

        resetCart: (state, action) => {
            state = initialState;
            return state;
        }
    }
});

export default cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    clearCartItems,
    resetCart
} = cartSlice.actions;
