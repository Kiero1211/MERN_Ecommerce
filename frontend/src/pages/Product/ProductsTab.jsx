import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";

import ProductRatings from "./ProductRatings";
import ProductCard from "./ProductCard";
import Loader from "../../components/Loader";
import SingleProduct from "./SingleProduct";

function ProductsTab({
    loadingProductReview,
    onSubmit,
    userInfo,
    rating,
    setRating,
    comment,
    setComment,
    product,
}) {
    const [activeTab, setActiveTab] = useState(1);
    const {data, isLoading} = useFetchTopProductsQuery();
    if (isLoading) {
        return <Loader />
    }

    const handleTabClick = (value) => {
        setActiveTab(value)
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Tab control */}
            <section className="mr-[5rem]">
                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 && "font-bold"}`}
                    onClick={() => handleTabClick(1)}
                >
                    Write Your Review
                </div>

                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 && "font-bold"}`}
                    onClick={() => handleTabClick(2)}
                >
                    All Reviews
                </div>

                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 && "font-bold"}`}
                    onClick={() => handleTabClick(3)}
                >
                    Related Products
                </div>
            </section>

            {/* Tab body */}
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                    {Object.keys(userInfo).length > 0 ? (
                        <form onSubmit={onSubmit}>
                            {/* Rating */}
                            <div className="my-2">
                                <label htmlFor="rating" className="block text-xl mb-2">Rating</label>
                                <select 
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                >
                                    <option value="">--Select a rating--</option>
                                    <option value="1">Inferior (1 star)</option>
                                    <option value="2">Decent (2 stars)</option>
                                    <option value="3">Great (3 stars)</option>
                                    <option value="4">Excellent (4 stars)</option>
                                    <option value="5">Exceptional (5 stars)</option>
                                </select>
                            </div>
        
                            {/* Comment */}
                            <div className="my-2">
                                <label htmlFor="comment" className="block text-xl mb-2">Comment</label>
                                <textarea 
                                    id="comment"
                                    rows="3"
                                    required
                                    value={comment}
                                    onInput={(e) => setComment(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                ></textarea>
                            </div>
        
                            <button 
                                type="submit"
                                disabled={loadingProductReview}
                                className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                            >
                                Submit Review
                            </button>
                        </form>
                    ) : (
                        <p>Please <Link to="/login">sign in</Link> to write a review</p>
                    )}
                </div>
                )}
            </section>

            <section>
                {activeTab === 2 && (
                    <>
                        {product.numReviews === 0 && <p>No Reviews</p>}
                        <div>
                            {
                                product.reviews.map((review, index) => {
                                    return (
                                        <div 
                                            key={index}
                                            className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0] xl:w-[50rem] sm:w-[24rem] mb-5"
                                        >
                                            <div className="flex justify-between">
                                                <strong className="text-[#B0B0B0]">{review.name}</strong>
                                                <p className="text-[#B0B0B0]">
                                                    {review.createdAt.substring(0, 10)}
                                                </p>
                                            </div>

                                            <p className="my-4">{review.comment}</p>
                                            <ProductRatings value={review.rating}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
            </section>

            <section>
                {activeTab === 3 && (
                    <section className="ml-[4rem] flex flex-wrap">
                        {
                            !data ? (
                                <Loader />
                            ) : (
                                data.map((product, index) => {
                                    return <ProductCard key={index} product={product}/>
                                })
                            )
                        }
                    </section>
                )}
            </section>


        </div>
    )
}

export default ProductsTab;