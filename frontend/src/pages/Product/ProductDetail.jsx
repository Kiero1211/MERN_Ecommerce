import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Redux
import { useSelector } from "react-redux";
import {
	useFetchProductByIdQuery,
	useCreateProductReviewMutation,
} from "../../redux/api/productApiSlice";
import { userInfoSelector, isAdminSelector } from "../../redux/selectors";

//Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import ProductRatings from "./ProductRatings";
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStore,
	FaStar,
} from "react-icons/fa";
import moment from "moment";

function ProductDetail() {
    const {id: productId} = useParams();

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const {data: product, isLoading, refetch, error} = useFetchProductByIdQuery(productId);

    const userInfo = useSelector(userInfoSelector);

    const [createReviewApiCall, {isLoading: loadingProductReview}] = useCreateProductReviewMutation();

	return (
		<div className="ml-[8rem]">
            <div>
                <Link to="/" className="text-white font-semibold hover:underline">Go Back</Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="flex flex-wrap relative items-between mt-[2rem]">
                        <figure className="relative 2xl:w-[45rem] xl:w-[40rem] lg:w-[30rem] md:w-[20rem] sm:w-[15rem]">
                            <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full object-cover mr-[2rem]"/>
                            <HeartIcon product={product} /> 
                        </figure>
                        {/* Product info */}
                        <div className="ml-[3rem]">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="my-4 xl:w-[35rem] lg:w-[30rem] md:w-[25rem] text-[#BOBOBO]">
                                {product.description}
                            </p>
                            <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

                            <div className="flex items-center justify-between w-[20rem] mt-[2rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore size={26} className="mr-2 text-white inline" /> Brand: {product.brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaClock size={26} className="mr-2 text-white inline" /> Added: {moment(product.createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStar size={26} className="mr-2 text-white inline" /> Reviews: {product.numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6">
                                        <FaStar size={26} className="mr-2 text-white inline" /> Ratings: {product.rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaShoppingCart size={26} className="mr-2 text-white inline" /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaBox size={26} className="mr-2 text-white inline" /> In Stock: {product.stock}
                                    </h1>
                                </div>
                            </div>

                            {/* Product ratings */}
                            <div className="flex justify-between flex-wrap">
                                <ProductRatings value={product.rating}  text={`${product.numReviews} reviews`}/>

                                {product.stock > 0 && (
                                    <div>
                                        <select 
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="p-2 w-[6rem] rounded-lg text-black"
                                        >
                                            {[...Array(product.stock).keys()].map(index => {
                                                return (
                                                    <option value={index + 1} key={index}>
                                                        {index + 1}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
	);
}

export default ProductDetail;
