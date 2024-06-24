export const userInfoSelector = (state) => {
    console.log(state);
    return state.auth.userInfo;
}