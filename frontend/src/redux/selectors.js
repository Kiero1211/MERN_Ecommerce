import { createSelector } from "@reduxjs/toolkit";

export const userInfoSelector = createSelector(
    [(state) => state],
    (state) => {
        return state.auth.userInfo || {}
    }
);

export const isAdminSelector = createSelector(
    [(state) => state],
    (state) => {
        return state.auth.userInfo.isAdmin || false
    }
)

export const favoriteProductSelector = createSelector(
    [(state) => state],
    (state) => {
        return state.favorites
    }
)

export const cartSelector = createSelector(
    [(state) => state],
    (state) => {
        return state.cart
    }
)