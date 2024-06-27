import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // GET
        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`
            }),
            keepUnusedDataFor: 5
        }),

        readCategory: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`
            }),
            keepUnusedDataFor: 5
        }),

        //POST
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),

        //PUT
        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory
            }),
            invalidatesTags: ["Category"]

        }),

        //DELETE
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useGetAllCategoriesQuery,
    useReadCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} = categoryApiSlice;