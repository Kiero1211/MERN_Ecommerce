import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

// react-slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import moment from "moment";

import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore,
} from "react-icons/fa";

function ProductCarousel() {
	const {
		data: products,
		isLoading,
		error,
	} = useFetchTopProductsQuery();
	console.log(products);
	const carouselSettings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		// autoplay: true,
		autoplaySpeed: 3000,
	};

	const Wrapper = <div className="mb-4 md:block"></div>;

	if (isLoading) {
		return <Wrapper></Wrapper>;
	}

	if (error) {
		return (
			<Wrapper>
				<Message variant="error">
					{error?.data.message || error.message}
				</Message>
			</Wrapper>
		);
	}

	return (
		<Slider
			{...carouselSettings}
			className="lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">
			{products.map((product, index) => {
				const {
					image,
					_id,
					name,
					price,
					description,
					brand,
					createdAt,
					numReviews,
					rating,
					quantity,
					stock,
				} = product;
				console.log(product);
                return (
                    <div key={index} className="p-3">
                        <img src={image} alt={name} className="w-full rounded-lg object-cover "/>
						<div className="flex justify-around p-3">
							<div className="one">
								<h2>{name}</h2>
								<p>$ {price}</p> <br/> <br />
								<p className="w-[25rem]">
									{description.substring(0, 160)}...
								</p>
							</div>

							<div className="two">
								<h1 className="flex items-center mb-6 w-full">
									<FaStore size={26} className="mr-2 text-white" /> 
									<span>Brand: {brand}</span>
								</h1>
								<h1 className="flex items-center mb-6 w-full">
									<FaClock size={26} className="mr-2 text-white" /> 
									<span>
										Added:{" "}{moment(createdAt).fromNow()}
									</span>
									
								</h1>
								<h1 className="flex items-center mb-6 w-full">
									<FaStar size={26} className="mr-2 text-white" /> 
									<span>
										Reviews: {numReviews}
									</span>
								</h1>
							</div>

							<div className="three">
								<h1 className="flex items-center mb-6">
									<FaStar size={26} className="mr-2 text-white"/>
									<span>Rating: {rating}</span>
								</h1>
								<h1 className="flex items-center mb-6">
									<FaShoppingCart size={26} className="mr-2 text-white"/>
									<span>Quantity: {quantity}</span>
								</h1>
								<h1 className="flex items-center mb-6">
									<FaBox size={26} className="mr-2 text-white"/>
									<span>In stock: {stock}</span>
								</h1>
							</div>
						</div>
                    </div>
                )
			})}
		</Slider>
	);
}

export default ProductCarousel;
