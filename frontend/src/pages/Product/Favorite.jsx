import { useSelector } from "react-redux";
import { favoriteProductSelector } from "../../redux/selectors";
import SingleProduct from "./SingleProduct";

function Favorite() {
    const favorites = useSelector(favoriteProductSelector);

    return (
        <div className="ml-[13rem]">
            <h1 className="text-lg font-bold ml-[3rem] pt-[3rem]">
                FAVORITE PRODUCTS
            </h1>
            <div className="flex flex-wrap">
                {favorites.map((product, index) => {
                    return <SingleProduct key={index} details={product} />
                })}
            </div>
        </div>
    )
}

export default Favorite;