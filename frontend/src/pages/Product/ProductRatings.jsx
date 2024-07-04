import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";


function ProductRatings({value, text, color = "yellow-500"}) {
    const filledStars = Math.floor(value);
    const halfStars = value - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStars;

    return (
        <div className="flex items-center">
            {[...Array(filledStars)].map((_, index) => {
                return <FaStar key={index} className={`text-${color} ml-1`} />
            })}

            {halfStars === 1 ? <FaStarHalfAlt className={`text-${color} ml-1`}/> : null}

            {[...Array(emptyStars)].map((_, index) => {
                return <FaRegStar key={index} className={`text-${color} ml-1`} />
            })}

            <span className={`rating-text ml-[0.5rem] text-${color}`}>{text !== null && text}</span>
        </div>
    )
}

export default ProductRatings;