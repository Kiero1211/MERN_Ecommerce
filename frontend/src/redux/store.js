import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";

// Reducers
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorties/favoriteSlice";
import cartReducer from "./features/cart/cartSlice";

import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartReducer
    }, 
    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    devTools: true
})
setupListeners(store.dispatch);
export default store;