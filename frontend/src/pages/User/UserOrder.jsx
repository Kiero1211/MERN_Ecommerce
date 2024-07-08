import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useFetchMyOrdersQuery } from "../../redux/api/orderApiSlice";

function UserOrder() {
	const {
		data: orders,
		isLoading,
		error,
	} = useFetchMyOrdersQuery();

	return (
		<div className="container mx-auto">
			<h2 className="text-2xl font-semibold mb-4">My Orders</h2>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="error">
					{error?.data?.message || error?.error}
				</Message>
			) : (
				<table className="w-full text-center">
					<thead className="border">
						<tr>
							<th className="p-2">IMAGE</th>
							<th className="p-2">ID</th>
							<th className="p-2">DATE</th>
							<th className="p-2">TOTAL</th>
							<th className="p-2">PAID</th>
							<th className="p-2">DELIEVERED</th>
						</tr>
					</thead>

					<tbody>
						{orders.map((order, index) => (
							<tr key={index}>
								<td>
									<img
										src={
											order.orderItems[0].image
										}
										alt={order.user.username}
										className="w-20 h-20 object cover mb-5"
									/>
								</td>

								<td className="py-2 text-center">{order._id}</td>
								<td className="py-2 text-center">
									{order.createdAt.substring(0, 10)}
								</td>
								<td className="py-2 text-center">
									${order.totalPrice.toFixed(2)}
								</td>
								<td className="py-2">
									<p
										className={`p-1 text-center mx-auto ${
											order.isPaid
												? "bg-green-400"
												: "bg-red-400"
										} w-[6rem] rounded-full`}>
										{order.isPaid
											? "Completed"
											: "Pending"}
									</p>
								</td>
								<td className="py-2">
									<p
										className={`p-1 text-center mx-auto ${
											order.isDelivered
												? "bg-green-400"
												: "bg-red-400"
										} w-[6rem] rounded-full`}>
										{order.isDelivered
											? "Completed"
											: "Pending"}
									</p>
								</td>
								<td className="py-2">
									<Link to={`/order/${order._id}`}>
										<button className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-3 rounded">
											View Details
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default UserOrder;
