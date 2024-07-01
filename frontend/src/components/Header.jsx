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
            <div className="grid xl:grid-cols-2 xl:justify-around justify-center items-center">
                <div className="xl:block hidden">
                    <div className="grid grid-cols-2">
                        {products.map((product, index) => (
                            <div key={index}>
                                <ProductCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
                <ProductCarousel />
            </div>
        </>
    )
}

export default Header;