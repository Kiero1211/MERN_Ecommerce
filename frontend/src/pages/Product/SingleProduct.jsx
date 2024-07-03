import { Link } from "react-router-dom";
import PriceTag from "../../components/PriceTag";
import HeartIcon from "./HeartIcon";

function SingleProduct({details}) {
 return (
    <Link to={`product/${details._id}`} className="w-[30rem] p-3 relative">
        <div className="relative">
            <img src={details.image} alt={details.name} className="block w-full h-[100%] object-cover rounded-lg" />
            <HeartIcon product={details} />
        </div>

        <div className="p-4">
            <h2 className="flex justify-between items-center text-lg">
                {details.name}
                <PriceTag value={details.price}/>
            </h2>
        </div>
    </Link>
 )
}

export default SingleProduct;