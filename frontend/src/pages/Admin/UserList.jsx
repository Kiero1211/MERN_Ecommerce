import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "../../redux/api/userApiSlice";
import Message from "../../components/Message";

function UserList() {
	// Getting all the APIs
	const { data, refetch, isLoading, error } = useGetAllUsersQuery();
	const [deleteUserApiCall] = useDeleteUserMutation();
	const [updateUser] = useUpdateUserMutation();

	const [editableUserId, setEditableUserId] = useState("");
	const [editableUsername, setEditableUsername] = useState("");
	const [editableEmail, setEditableEmail] = useState("");

	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleUpdate = (userId) => {};

	const toggleEdit = (userId, username, email) => {};

	const AdminModule = () => {
		return (
			<div className="flex flex-col md:flex-row">
				{/* Admin menu */}
				<table className="w-full md:w-4/5 mx-auto">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left">ID</th>
							<th className="px-4 py-2 text-left">NAME</th>
							<th className="px-4 py-2 text-left">EMAIL</th>
							<th className="px-4 py-2 text-left">ADMIN</th>
						</tr>
					</thead>
					<tbody>
						{data.users.map((user, index) => {
							return (
								<tr key={index}>
									<td className="px-4 py-2">{user._id}</td>
									<td className="px-4 py-2">
										{editableUsername === user._id ? (
											<div className="flex items-center">
												<input
													type="text"
													value={editableUsername}
													onChange={(e) => setEditableUsername(e.target.value)}
													className="w-full p-2 border rounded-lg"
												/>
												<button
													className="ml-2 bg-blue-500, text-white, py-2 px-4 rounded-lg"
													onClick={() => handleUpdate(user._id)}>
													<FaCheck />
												</button>
											</div>
										) : (
											<div className="flex items-center">
												{user.username}{" "}
												<button onClick={() => toggleEdit(user._id, user.username, user.email)}>
													<FaEdit className="ml-[1rem]" />
												</button>
											</div>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Users</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error?.data.message || error.message}</Message>
			) : (
				<AdminModule />
			)}
		</div>
	);
}

export default UserList;
