import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../redux/selectors";
import {FaTrash} from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(cartSelector);
    const { cartItems } = cart;

    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({...product, quantity}))
    }

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    }

    const handleCheckout = () => {
        navigate("/shipping");
    }

    return (
        <>
            <div className="container flex flex-col justify-around items-start flex wrap mx-auto pt-8">
                {cartItems.length === 0 ? (
                    <div>Your cart is empty <Link to="/shop">Go To Shop</Link></div>
                ) : (
                    <div className="w-[80%] mx-auto">
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

                        {cartItems.map((item, index) => {
                            console.log(item);
                            return (
                            <div key={index} className="flex items-center mb-[1rem] pb-2">
                                <div className="w-[10rem] h-[10rem]">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                                </div>

                                <div className="flex-1 ml-4">
                                    <Link to={`/product/${item._id}`} className="text-pink-500">
                                        {item.name}
                                    </Link>

                                    <div className="mt-2 text-white">{item.brand}</div>
                                    <div className="mt-2 text-white font-bold">$ {item.price}</div> 
                                </div>

                                <div className="w-24">
                                    <select 
                                        className="w-full p-1 border rounded text-black"
                                        value={item.quantity}
                                        onChange={(e) => handleAddToCart(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.stock).keys()].map(index => (
                                                <option value={index + 1} key={index}>{index + 1}</option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <button className="text-red-500 mr-[5rem]" onClick={() => handleRemoveFromCart(item)}>
                                    <FaTrash className="ml-[1rem] mt-[0.5rem]" />
                                </button>
                            </div>
                            )
                        })}
                    </div>
                )}

                <div className="mt-8 w-[40rem] mx-auto">
                    <div className="p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">
                            Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                        </h2>

                        <div className="text-2xl font-bold">
                            $ {(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)).toFixed(2)}
                        </div>

                        <button 
                            className="bg-pink-600 mt-4 py-2 px-4 rounded-full text-lg w-full"
                            disabled={cartItems.length === 0}
                            onClick={() => handleCheckout()}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;