import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../redux/selectors";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

import ProgressStep from "../../components/ProgressStep";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function PlaceOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(cartSelector);

    const [createOrderApiCall, {isLoading, error}] = useCreateOrderMutation();

    const handlePlaceOrder = async () => {
        try {
            const res = await createOrderApiCall({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
              }).unwrap();
            dispatch(clearCartItems);
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error.data.message);
        }
    }

    useEffect(() => {
        if (!cart.shippingAddress.address || !cart.paymentMethod) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    return (
        <div className="container mx-auto pt-10">
            <ProgressStep step1 step2 step3/>

            <div className="mt-8 mx-auto w-[90%]">
                {cart.cartItems.length === 0 ? (
                    <Message variant={error}> Your cart is empty </Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-1 py-2 text-left align-top">Image</th>
                                    <th className="px-1 py-2 text-left align-top">Product</th>
                                    <th className="px-1 py-2 text-left align-top">Quantity</th>
                                    <th className="px-1 py-2 text-left align-top">Price</th>
                                    <th className="px-1 py-2 text-left align-top">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                        </td>
                                        <td className="p-2">
                                            <Link to={`/product/${item._id}`}> {item.name} </Link>
                                        </td>

                                        <td className="p-2">{item.quantity}</td>
                                        <td className="p-2">${item.price.toFixed(2)}</td>
                                        <td className="p-2">${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                            <div className="flex flex-wrap justify-between p-8 bg-[#181818]">
                                <ul className="text-lg">
                                    <li className="mb-4">
                                        <span className="font-semibold">Items: </span> ${cart.itemsPrice}
                                    </li>
                                    <li className="mb-4">
                                        <span className="font-semibold">Shipping: </span> ${cart.shippingPrice}
                                    </li>
                                    <li className="mb-4">
                                        <span className="font-semibold">Tax: </span> ${cart.taxPrice}
                                    </li>
                                    <li className="mb-4">
                                        <span className="font-semibold">Total: </span> ${cart.totalPrice}
                                    </li>
                                </ul>

                                {error && <Message variant="error" >{error.data.Message}</Message>}

                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                                    <p><strong>Address: </strong>
                                        {cart.shippingAddress.address} {" "} 
                                        {cart.shippingAddress.city} {" "}
                                        {cart.shippingAddress.postalCode} {" "}
                                        {cart.shippingAddress.country} {" "}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                                    <p><strong>Method:</strong> {cart.paymentMethod}</p>
                                </div>

                                <button 
                                    type="button"
                                    className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={handlePlaceOrder}>
                                        Place Order
                                </button>

                                {isLoading && <Loader />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaceOrder;