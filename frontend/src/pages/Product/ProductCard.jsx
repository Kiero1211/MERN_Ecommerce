import { Link } from "react-router-dom";
import PriceTag from "../../components/PriceTag";
import HeartIcon from "./HeartIcon";

function ProductCard({ product }) {
	return (
		<div className="ml-[2rem] p-3">
			<div className="relative">
				<img
					src={product.image}
					alt={product.name}
					className="h-auto rounded"
				/>
				<HeartIcon product={product}/>

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
