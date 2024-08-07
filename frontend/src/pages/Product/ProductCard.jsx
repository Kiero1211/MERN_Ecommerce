import { Link } from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {FaTag} from "react-icons/fa";
import { useDispatch } from "react-redux";
import {addToCart} from "../../redux/features/cart/cartSlice";
import {toast} from "react-toastify";
import HeartIcon from "./HeartIcon";


function ProductCard({ product }) {
	const dispatch = useDispatch();

	const handleAddToCart = (item, quantity) => {
		try {
			dispatch(addToCart({...item, quantity}));
			toast.success("Product added to cart successfully")
			
		} catch (error) {
			toast.error(`Failed to add to cart: ${error.data?.message || error.message}`)
		}
	}
	
	return (
		<div className="max-w-sm bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			{/* Thumbnail */}
			<Link 
			to={`/product/${product._id}`}
			>
				<figure className="relative">
					<span className="bg-pink-100 absolute top-3 left-3 text-pink-800 text-sm font-medium mr-2 px-2.5
					py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
						{product.brand}
					</span>
					<img src={product.image} alt={product.name} className="h-[16rem] object-cover cursor-pointer w-full"/>
					<HeartIcon product={product}/>	
				</figure>
			</Link>

			{/* Info */}
			<div className="p-5">
				<h5 className="mb-2 text-lg text-white dark:text-white">
					{product.name}
				</h5>
				<p className="text-black font-semibold text-pink-500 flex items-center">
					<FaTag className="mr-1"/>
					<span>${product.price}</span>
				</p>
				<p className="mb-3 font-normal text-[#CFCFCF]">
					{product.description.substring(0, 20)}...
				</p>
				<section className="flex justify-between items-center">
					<Link 
						to={`/product/${product._id}`}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
						text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none 
						focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
					>
						Read More
						<svg
						className="w-3.5 h-3.5 ml-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
						>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
						</svg>
					</Link>

					<button className="p-2 rounded-full" onClick={() => handleAddToCart(product, 1)}>
						<AiOutlineShoppingCart size={26}/>
					</button>
				</section>
			</div>
		</div>
	);
}

export default ProductCard;
