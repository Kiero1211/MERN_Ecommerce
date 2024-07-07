const taxRate = 0.15;

const calculateOrderPrice = (orderItems) => {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const shippingPrice = itemsPrice > 100 ? 0 : 10;

    const taxPrice = Number((itemsPrice * taxRate).toFixed(2));

    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        itemsPrice: Number(itemsPrice.toFixed(2)),
        shippingPrice: Number(shippingPrice.toFixed(2)),
        taxPrice,
        totalPrice
    }
}

export default calculateOrderPrice;