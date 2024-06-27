import { useState } from "react";
import { toast } from "react-toastify";
import { 
    useFetchCategoriesQuery,
    useReadCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
 } from "../../redux/api/categoryApiSlice";

function CategoryList() {
    const {data: categories} = useFetchCategoriesQuery();
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategoryApiCall] = useCreateCategoryMutation();
    const [updateCategoryApiCall] = useUpdateCategoryMutation();
    const [deleteCategoryApiCall] = useDeleteCategoryMutation();

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            {/* Admin menu */}
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
            </div>
        </div>
    );
}

export default CategoryList;