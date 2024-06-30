import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { 
    useUpdateProductMutation,
    useFetchProductByIdQuery,
    useDeleteProductMutation,
    useUploadProductImageMutation
 } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import clsx from "clsx";
import AdminMenu from "../../components/AdminMenu";

function ProductUpdate() {
    
    const {id: requestedProductId} = useParams();
    const {data: productData} = useFetchProductByIdQuery(requestedProductId);
    
    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.stock || "");

    const navigate = useNavigate();
    const {data: categories = []} = useFetchCategoriesQuery();
    const [updateProductApiCall] = useUpdateProductMutation();
    const [deleteProductApiCall] = useDeleteProductMutation();
    const [uploadProductImageApiCall] = useUploadProductImageMutation();

    const inputClassName = clsx([
		"block",
		"text-white",
		"px-4",
		"mb-3",
		"mt-2",
		"border",
		"rounded-lg",
		"w-[30rem]",
		"bg-[#101011]"
	])

    const handleUploadFile = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadProductImageApiCall(formData);
			toast.success(res.message);
			setImage(res.data.image);
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};

    const handleDelete = async () => {
        try {
            let confirm = window.confirm("Are you sure you want to delete this product?");

            if (!confirm) return;

            const {data} = await deleteProductApiCall(requestedProductId);
            if (!data) {
                toast.error("Product is already deleted");
            }
            toast.success(`${data.name} is deleted`);
            navigate("/admin/product-list");
        } catch (error) {
            console.log(error);
           toast.error("Failed to delete product, please try again");
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();

			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("category", category);
			productData.append("quantity", quantity);
			productData.append("brand", brand);
			productData.append("stock", stock);
			productData.append("image", image);

            const {data} = await updateProductApiCall({productId: requestedProductId, productData});

            if (!data) {
                toast.error("Failed to update product, please re-check your information")
            } else {
                toast.success(`${name} is updated`)
                navigate("/admin/product-list");
            }
        } catch (error) {
           console.log(error);
           toast.error("Failed to update product, please try again");
        }
    }

    useEffect(() => {
        if (productData && productData._id) {
            setImage(productData.image);
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setQuantity(productData.quantity)
            setCategory(productData.category);
            setBrand(productData.brand);
            setStock(productData.stock);
        }
    }, [productData])

    return (
        <div className="container lg:mx-[9rem] sm:mx-[0]">
			<div className="flex flex-col md:flex-row">
				<AdminMenu />
				<div className="md:w-3/4 p-3">
					<p className="h-12">Create Product</p>
					{image && (
						<div className="text-center">
							<img
								src={image}
								alt="Create Product"
								className="block mx-auto max-h-[200px]"
							/>
						</div>
					)}

					<div className="p-3">
						<label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
							{/* {image ? image : "Upload image"} */}
							<input
								type="file"
								name="image"
								accept="image/*"
								onChange={handleUploadFile}
								className={image ? "text-white" : "hidden"}
							/>
						</label>
					</div>
					<div className="p-3">
						<div className="flex justify-between flex-wrap">
							<div className="one">
								<label
									htmlFor="name"
									className="font-semibold">
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									className={inputClassName}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div className="two">
								<label
									htmlFor="price"
									className="font-semibold">
									Price
								</label>
								<input
									id="price"
									name="price"
									type="number"
									className={inputClassName}
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex justify-between flex-wrap">
							<div className="one">
								<label
									htmlFor="quantity"
									className="font-semibold">
									Quantity
								</label>
								<input
									id="quantity"
									name="quantity"
									type="number"
									className={inputClassName}
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>

							<div className="two">
								<label
									htmlFor="brand"
									className="font-semibold">
									Brand
								</label>
								<input
									id="brand"
									name="brand"
									type="text"
									className={inputClassName}
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>
						</div>

						<label
							htmlFor="description"
							className="my-5">
							Description
						</label>
						<textarea
							name="description"
							id="description"
							className="p-2 mb-3 mt-2 bg-[#101011] border rounded-lg w-full text-white"
							value={description}
							onChange={(e) => setDescription(e.target.value)}></textarea>

						<div className="flex flex-wrap justify-between">
							<div>
								<label htmlFor="stock">Count In Stock</label>
								<input
									type="number"
									className={inputClassName}
									value={stock}
									onChange={(e) => setStock(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="category">Choose Category</label>
								<select
									type="text"
									className={inputClassName}
									onChange={(e) => setCategory(e.target.value)}
								>
									{	
										categories?.map((categoryItem, index) => {
											return (
												<option value={categoryItem._id} key={index} defaultChecked={categoryItem.name === category}>
													{categoryItem.name}
												</option>
											)
										})
									}
								</select>
							</div>
						</div>
                        

                        <div className="flex">
                            <button
                                onClick={handleSubmit}
                                className="py-2 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 mr-6"
                            >
                                Update
                            </button>

                            <button
                                onClick={handleDelete}
                                className="py-2 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>

                        </div>
					</div>
				</div>
			</div>
		</div>
    );
}

export default ProductUpdate;