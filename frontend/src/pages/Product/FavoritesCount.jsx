import { useSelector } from "react-redux";
import { favoriteProductSelector } from "../../redux/selectors";

function FavoritesCount() {
    const favorites = useSelector(favoriteProductSelector);
    const favoritesLength = favorites.length;

    return (
        <div className="absolute left-5 top-9">
            {favoritesLength > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {favoritesLength}
                </span>
            )}
        </div>
    )
}

export default FavoritesCount;