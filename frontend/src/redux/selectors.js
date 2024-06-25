export const userInfoSelector = (state) => {
    return state.auth.userInfo || {};
}