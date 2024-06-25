import { createSelector } from "@reduxjs/toolkit";

export const userInfoSelector = createSelector(
    [(state) => state],
    (state) => state.auth.userInfo || {}
);