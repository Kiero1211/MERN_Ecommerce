import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
	useFetchCategoriesQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import clsx from "clsx";

import Loader from "../../components/Loader";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "../../components/AdminMenu";

function CreateCategory() {
	const { data: categories, isLoading } = useFetchCategoriesQuery();
	const [name, setName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [updatingName, setUpdatingName] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const [createCategoryApiCall] = useCreateCategoryMutation();
	const [updateCategoryApiCall] = useUpdateCategoryMutation();
	const [deleteCategoryApiCall] = useDeleteCategoryMutation();

	const buttonClassNames = [
		"bg-pink-500",
		"text-white",
		"py-2",
		"px-4",
		"rounded-lg",
		"hover:bg-pink-600",
		"focus:outline-none",
		"focus:ring-2",
		"focus:ring-pink-500",
		"focus-ring-opacity-50",
	];

	const handleCreateCategory = useCallback(async (e) => {
		e.preventDefault();

		if (!name) {
			toast.error("Category name is required");
		}

		try {
			const result = await createCategoryApiCall({ name }).unwrap();
			if (result.error) {
				toast.error(result.error);
			} else {
				setName("");
				toast.success(`${result.name} is created`);
			}
		} catch (error) {
			console.log(error.message);
			toast.error("Failed to create category");
		}
	}, [name, createCategoryApiCall]);
    
    const handleUpdateCategory = useCallback(async (e) => {
        e.preventDefault();

        if (!updatingName) {
            toast.error("Category not found");
            return;
        }
        console.log(selectedCategory);
        try {
            await updateCategoryApiCall({categoryId: selectedCategory._id, updatedCategory: {
                name: updatingName
            }});
            toast.success("Updated successfully");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to update category")
        } finally {
            setSelectedCategory(null);
            setUpdatingName("");
            setModalVisible(false);
        }
    }, [selectedCategory, updateCategoryApiCall, updatingName])

    const handleDeleteCategory = useCallback(async () => {
        try {
            await deleteCategoryApiCall(selectedCategory._id);
            toast.success("Deleted successfully");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setModalVisible(false);
            setSelectedCategory(null);
        }
    }, [selectedCategory, deleteCategoryApiCall])

    const handleSetValue = useCallback((value) => setUpdatingName(value), []);

	const handleCloseModal = useCallback(() => setModalVisible(false), []);

	return (
		<div className="ml-[10rem] flex flex-col md:flex-row">
			<AdminMenu />
			<div className="md:w-3/4 p-3">
				<div className="h-12">Manage Categories</div>
				<CategoryForm
					value={name}
					setValue={setName}
					handleSubmit={handleCreateCategory}
					buttonClassNames={buttonClassNames}
				/>
				<br />
				<hr />
				<div className="flex flex-wrap">
					{categories?.map((category, index) => {
						return (
							<div key={index}>
								<button
									className={clsx([[...buttonClassNames], "m-3"])}
									onClick={() => {
										setModalVisible(true);
										setSelectedCategory(category);
										setUpdatingName(category.name);
									}}>
									{category.name}
								</button>
							</div>
						);
					})}
				</div>

				<Modal
					isOpen={modalVisible}
					onClose={handleCloseModal}>
					<CategoryForm
						value={updatingName}
						setValue={handleSetValue}
                        handleSubmit={handleUpdateCategory}
                        buttonContent="Update"
                        handleDelete={handleDeleteCategory}
                        buttonClassNames={buttonClassNames}
					/>
				</Modal>

				{isLoading && <Loader />}
			</div>
		</div>
	);
}

export default CreateCategory;
