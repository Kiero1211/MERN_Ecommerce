// Redux
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchProductsQuery } from "./redux/api/productApiSlice";

// Components
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";

function Home() {
    const {keyword} = useParams();
    const {data: products, isLoading, isError} = useFetchProductsQuery({keyword});


    return (
        <>
            {!keyword ? <Header /> : null}
        </>
    );
}

export default Home;