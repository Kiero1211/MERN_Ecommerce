// Add a product to localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites);
    if (!favorites.some(favoriteProduct => favoriteProduct._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// Remove a product from localStorage
export const removesFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    console.log("Before: ", favorites);
    const newFavorites = favorites.filter(favoriteProduct => favoriteProduct._id !== productId);
    console.log("After: ", newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
}

// Get favorite products from localStorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}