import {apiSlice} from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants";

const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDER_URL}/create`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),

        fetchOrderDetails: builder.query({
            query: (orderId) => `${ORDER_URL}/${orderId}`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDER_URL}/${orderId}/pay`,
                method: "PUT",
                body: details
            }),
            invalidatesTags: ["Order"]
        }),

        deliverOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDER_URL}/${orderId}/deliver`,
                method: "PUT",
                body: details
            }),
            invalidatesTags: ["Order"]
        }),

        getPaypalClientId: builder.query({
            query: () => PAYPAL_URL
        }),

        fetchMyOrders: builder.query({
            query: () => `${ORDER_URL}/current`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),

        fetchAllOrders: builder.query({
            query: () => `${ORDER_URL}/all`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),

        fetchTotalSales: builder.query({
            query: () => `${ORDER_URL}/all/sales`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),

        fetchTotalAmountOrders: builder.query({
            query: () => `${ORDER_URL}/all/count`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),

        fetchSalesByDate: builder.query({
            query: () => `${ORDER_URL}/all/sales-by-date`,
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useCreateOrderMutation,

    useFetchAllOrdersQuery,
    useFetchMyOrdersQuery,
    useFetchOrderDetailsQuery,
    useFetchSalesByDateQuery,
    useFetchTotalAmountOrdersQuery,
    useFetchTotalSalesQuery,
    useGetPaypalClientIdQuery,

    usePayOrderMutation,
    useDeliverOrderMutation
} = orderSlice;