import { Link } from "react-router-dom";
import PriceTag from "../../components/PriceTag";
import HeartIcon from "./HeartIcon";

function ProductCard({ product }) {
	return (
		<div className="w-[20rem] ml-[2rem] p-3">
			<div className="relative">
				<div className="relative">
					<img
						src={product.image}
						alt={product.name}
						className="h-full object-cover rounded"
					/>
					<HeartIcon product={product}/>
				</div>

				<div className="p-2">
					<Link to={`/product/${product._id}`}>
						<h2 className="flex justify-between items-center">
							<div>{product.name}</div>
							<PriceTag value={product.price}/>
						</h2>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
