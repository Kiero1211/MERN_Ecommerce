export const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
}

export const updateCartPrices = (state) => {
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    )
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    state.taxPrice = addDecimals(0.15 * state.itemsPrice);

    state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    )

    console.log(state.itemsPrice, state.shippingPrice, state.taxPrice, state.totalPrice);

    localStorage.setItem("cart", JSON.stringify(state));
}