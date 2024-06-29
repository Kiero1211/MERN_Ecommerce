import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import {apiSlice} from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCT_URL}`,
                params: keyword
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        fetchProductById: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ]
        }),

        fetchAllProducts: builder.query({
            query: () => `${PRODUCT_URL}/all`,
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}/create`,
                method: "POST",
                body: productData
            }),
            invalidatesTags: ["Product"]
        }),

        updateProduct: builder.mutation({
            query: ({productId, productData}) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: productData
            }),
            invalidatesTags: ["Product"]
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Product"]
        }),

        createProductReview: builder.mutation({
            query: ({productId, reviewData}) => ({
                url: `${PRODUCT_URL}/${productId}/reviews/create`,
                method: "POST",
                body: reviewData
            }),
            invalidatesTags: ["Product"]
        }),

        fetchTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),


        fetchNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        })
    })
})

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useFetchProductsQuery,
    useFetchTopProductsQuery,
    useFetchNewProductsQuery,

    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductReviewMutation,
    useUploadProductImageMutation
} = productApiSlice;

