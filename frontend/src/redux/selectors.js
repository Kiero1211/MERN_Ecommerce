import { createSelector } from "@reduxjs/toolkit";

export const userInfoSelector = createSelector(
    [(state) => state],
    (state) => {
        return state.auth.userInfo || {}
    }
);