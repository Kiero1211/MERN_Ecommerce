import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
	addToFavorites,
	removeFromFavorites,
	setFavorites,
} from "../../redux/features/favorties/favoriteSlice";
import {
	addFavoriteToLocalStorage,
	removesFavoriteFromLocalStorage,
	getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";
import { favoriteProductSelector } from "../../redux/selectors";
import { useEffect } from "react";

function HeartIcon({product}) {
    const dispatch = useDispatch();
    const favorites = useSelector(favoriteProductSelector);
    const isFavoriteProduct = favorites.some(favoriteProduct => favoriteProduct._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, [])

    const toggleFavorites = (e) => {
        e.stopPropagation();
        e.preventDefault()

        if (isFavoriteProduct) {
            dispatch(removeFromFavorites(product));
            removesFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            addFavoriteToLocalStorage(product);
        }

    }

	return (
        <div onClick={toggleFavorites} className="absolute p-3 top-2 right-5 cursor-pointer">
            {isFavoriteProduct ? (
                <FaHeart size={26} className="text-pink-500"/>
            ) : (
                <FaRegHeart size={26} className="text-white" />
            )}
        </div>
    );
}

export default HeartIcon;
