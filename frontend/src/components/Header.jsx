import { useFetchTopProductsQuery } from "../redux/api/productApiSlice";

// Components
import Loader from "./Loader";
import ProductCard from "../pages/Product/ProductCard";
import ProductCarousel from "../pages/Product/ProductCarousel";

function Header() {
    const {data: products, isLoading, isError} = useFetchTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <h1>Error</h1>;
    }

    return (
        <>
            <div className="grid 2xl:grid-cols-2 grid-cols-1 justify-center items-center">
                <div className="2xl:block hidden">
                    <div className="grid grid-cols-2 justify-center">
                        {products.map((product, index) => (
                                <ProductCard key={index} product={product}/>
                        ))}
                    </div>
                </div>
                <ProductCarousel />
            </div>
        </>
    )
}

export default Header;