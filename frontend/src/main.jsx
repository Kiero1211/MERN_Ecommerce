import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";

// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

//User
import Profile from "./pages/User/Profile.jsx";

//Admin
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route element={<PrivateRoute/>}>
				<Route path="/profile" element={<Profile />}/>
			</Route>

			<Route path="/login" element={<Login />}/>	
			<Route path="/register" element={<Register />}/>	

			{/* Admin */}
			<Route path="/admin" element={<AdminRoutes />}>
				<Route path="user-list" element={<UserList />}/>
				<Route path="create-category" element={<CategoryList />}/>
				<Route path="create-product"> 
					<Route index element={<ProductList />}/>
					<Route path="update/:id" element={<ProductUpdate/>}/>
				</Route>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
