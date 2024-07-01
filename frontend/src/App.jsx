import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/Auth/Navigation";
import "react-toastify/ReactToastify.css";

function App() {
	return (
		<>
			<ToastContainer />
			<Navigation />
			<main className="w-[90%] ml-auto mr-auto">
				<Outlet />
			</main>
		</>
	);
}

export default App;
