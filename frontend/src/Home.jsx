// Redux
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchProductsQuery } from "./redux/api/productApiSlice";

// Components
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";

function Home() {
	const { keyword } = useParams();
	const {
		data: products,
		isLoading,
		error,
	} = useFetchProductsQuery({ keyword });

	return (
		<>
			{!keyword ? <Header /> : null}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="error">
					{error?.data.message || error.message}
				</Message>
			) : (
				<>
					<div className="flex justify-between items-center">
						<h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
							Special Products
						</h1>
						<Link
							to="/shop"
							className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
							Shop
						</Link>
					</div>
				</>
			)}
		</>
	);
}

export default Home;
