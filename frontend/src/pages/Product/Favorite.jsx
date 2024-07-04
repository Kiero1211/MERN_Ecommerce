import { useSelector } from "react-redux";
import { favoriteProductSelector } from "../../redux/selectors";
import SingleProduct from "./SingleProduct";

function Favorite() {
    const favorites = useSelector(favoriteProductSelector);

    return (
        <div className="ml-[rem]">
            <h1 className="text-lg font-bold ml-[3rem] pt-[3rem]">
                FAVORITE PRODUCTS
            </h1>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 justify-center gap-10">
                {favorites.map((product, index) => {
                    return <SingleProduct key={index} details={product} />
                })}
            </div>
        </div>
    )
}

export default Favorite;