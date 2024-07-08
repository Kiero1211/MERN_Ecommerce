import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/selectors";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
	useDeliverOrderMutation,
	useFetchOrderDetailsQuery,
	useGetPaypalClientIdQuery,
    usePayOrderMutation
} from "../../redux/api/orderApiSlice";

import { loadStripe } from "@stripe/stripe-js";

function Order() {
    const {id: orderId} = useParams();
    const {data: order, refetch, isLoading, error} = useFetchOrderDetailsQuery(orderId);

    const [deliverOrderApiCall, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
    const [payOrderApiCall, {isLoading: loadingPayment}] = usePayOrderMutation();
    const userInfo = useSelector(userInfoSelector);

	if (isLoading) {
        return <Loader/>
    }

    if (error) {
        return <Message variant="error">{error.data.message}</Message>
    }

    const handlePayment = async () => {
        const stripe = loadStripe(process.env.REACT_APP_STRIPE_KEY);

        const body = {
            products: order.orderItems,
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch(`/order/${orderId}/checkout`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="container flex flex-col ml-[10rem] md:flex-row">
            <div className="md:w-2/3 pr-4">
                <div className="border gray-300 mt-5 pb-4 mb-5">
                    {order.orderItems.length === 0 ? (
                        <Message>Order is empty</Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-[80%]">
                                <thead className="border-b-2">
                                    <tr>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Product</th>
                                        <th className="p-2 text-center">Quantity</th>
                                        <th className="p-2">Unit Price</th>
                                        <th className="p-2">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2">
                                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                            </td>
                                            <td className="p-2">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </td>
                                            <td className="p-2 text-center">{item.quantity}</td>
                                            <td className="p-2 text-center">${item.price.toFixed(2)}</td>
                                            <td className="p-2 text-center">${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:w-1/3 ">
                    <div className="mt-5 border-gray-300 pb-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">Shipping</h2>
                        <p className="my-4">
                            <strong className="text-pink-500">Order: </strong> {order._id}
                        </p>
                        <p className="my-4">
                            <strong className="text-pink-500">Name: </strong> {order.user.username}
                        </p>
                        <p className="my-4">
                            <strong className="text-pink-500">Email: </strong> {order.user.email}
                        </p>
                        <p className="my-4">
                            <strong className="text-pink-500">Email: </strong> {order.user.email}
                        </p>
                        <div className="my-4">
                            <p><strong className="text-pink-500">Address: </strong>
                                {order.shippingAddress.address} {" "} 
                                {order.shippingAddress.city} {" "}
                                {order.shippingAddress.postalCode} {" "}
                                {order.shippingAddress.country} {" "}
                            </p>
                        </div>

                        <div className="my-4">
                            <p><strong className="text-pink-500">Method:</strong> {order.paymentMethod}</p>
                        </div>

                        {order.isPaid ? (
                            <Message variant="success" className="text-pink-500">Paid on: {order.paidAt}</Message>
                        ) : (
                            <Message variant="error" className="text-pink-500">Not paid</Message>
                        )}
                    </div>
                    <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Items</span>
                        <span>${order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>${order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>${order.taxPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Total</span>
                        <span>${order.totalPrice}</span>
                    </div>

                    {
                        !order.isPaid && (
                        <div>
                            { 
                                (loadingPayment ) ? (
                                    <Loader />
                                ) : (
                                    <> 
                                    <button 
                                    type="button"
                                    className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                                    disabled={order.orderItems.length === 0}
                                    onClick={handlePayment}>
                                        Make Payment
                                    </button> 
                                    </>
                                )
                            }
                        </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Order;
