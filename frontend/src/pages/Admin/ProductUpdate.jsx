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

    return;
}

export default ProductUpdate;