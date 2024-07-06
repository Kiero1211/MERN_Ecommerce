import { useState, useEffect } from "react";
import clsx from "clsx";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "../redux/selectors";
import { useFetchFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
	setCategories,
	setProducts,
	setCheckboxes,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import ProductCard from "./Product/ProductCard";

function Shop() {
	const [priceFilter, setPriceFilter] = useState("");

	const dispatch = useDispatch();
	const { categories, products, checkboxes, radios } =
		useSelector(shopSelector);

	const categoriesQuery = useFetchCategoriesQuery();
	const filteredProductsQuery = useFetchFilteredProductsQuery({
		checkboxes,
		radios,
	});

	const checkboxClassName = clsx([
		"w-4",
		"h-4",
		"text-pink-600",
		"bg-gray-100",
		"border-gray-300",
		"focus:ring-pink-500",
		"dark:focus:ring-pink-600",
		"dark:ring-offset-gray-800",
		"focus:ring-2",
		"dark:bg-gray-700",
		"dark:border-gray-600",
	]);

    const handleCategoryCheckboxes = (flag, id) => {
        const updatedCheckboxArray = flag 
            ? [...checkboxes, id] // add to checkbox array if the value "checked" is true
            : checkboxes.filter(c => c !== id); // remove from checkbox array if the value "checked" is false

        dispatch(setCheckboxes(updatedCheckboxArray));
    }

    const uniqueBrands = [
        ...Array.from(
            // Return a set of every unique brands from the filterdProducts
            new Set(
                filteredProductsQuery.data
                    ?.map(product => product.brand)
                    .filter(brand => brand !== undefined)
            )
        )
    ]

    const handleBrandRadios = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(product => product.brand === brand);

        dispatch(setProducts(productsByBrand))
    }


	useEffect(() => {
		if (!categoriesQuery.isLoading) {
			dispatch(setCategories(categoriesQuery.data));
		}
	}, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

	useEffect(() => {
		if (
			(checkboxes || radios) &&
			!filteredProductsQuery.isLoading
		) {
			//Perform post filter by the priceFilter state
			const filteredProducts =
				filteredProductsQuery.data.filter((product) => {
					return (
						product.price
							.toString()
							.includes(priceFilter) ||
						product.price === parseInt(priceFilter, 10)
					);
				});
                // Apply the post newly filtered products
                dispatch(setProducts(filteredProducts));
		}
	}, [
		checkboxes,
		radios,
		filteredProductsQuery,
		priceFilter,
		dispatch,
	]);

	return (
		<>
			<div className="container mx-auto pl-10">
				<div className="flex md:flex-row">
					<div className="bg-[#151515] p-3 my-2">
                        {/* Categories */}
                        <>
                            <h2 className="h2 text-center py-2 bg-black rounded-full mb-2">
                                Filter by Categories
                            </h2>
                            
                            <div className="p-5 w-[15rem]">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="mb-2">
                                        <div className="flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                id={`category-${index}`}
                                                className={checkboxClassName}
                                                onChange={(e) => handleCategoryCheckboxes(e.target.checked, category._id)}
                                            />
                                            <label
                                                htmlFor={`category-${index}`}
                                                className="ml-2 text-sm font-medium text-white dark:text-gray-300">
                                                {category.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>

                        {/* Brands */}
                        <>
                            <h2 className="h2 text-center py-2 bg-black rounded-full mb-2">
                                Filter by Brands
                            </h2>

                            <div className="p-5">
                                {uniqueBrands?.map((brand, index) => (
                                    <div key={index} className="flex items-center mr-4 mb-5">
                                        <input 
                                            type="radio"
                                            id={brand}
                                            name="brand"
                                            className={checkboxClassName}
                                            onChange={() => handleBrandRadios(brand)}
                                        />

                                        <label 
                                            htmlFor={brand} 
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                            ))}
                            </div>
                        </>

                        {/* Price */}
                        <>
                            <h2 className="h2 text-center py-2 bg-black rounded-full mb-2">
                                Filter By Price
                            </h2>

                            <div className="p-5 w-[15rem]">
                                <input 
                                    type="text"
                                    placeholder="Enter Price" 
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                    className="w-full px-3 py-2 placeholder-gray-400 bg-black text-white border rounded-lg focus:outline-none foucs:ring focus:border-pink-300"
                                />
                            </div>
                        </>

                        {/* Reset */}
                        <div className="p-5 pt-0">
                            <button className="w-full border my-4" onClick={() => window.location.reload()}>Reset</button>
                        </div>
					</div>

                    <div className="p-3">
                        <h2 className="h2 text-center mb-2">{products?.length} Products</h2>
                    
                        <div className="flex flex-wrap">
                            {products?.map((product, index) => (
                                <div key={index} className="p-3">
                                    <ProductCard product={product}/>
                                </div>
                            ))}
                        </div>
                    </div>
				</div>
			</div>
		</>
	);
}

export default Shop;
