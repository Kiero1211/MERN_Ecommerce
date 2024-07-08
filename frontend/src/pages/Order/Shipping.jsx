import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartSelector } from "../../redux/selectors";

import ProgressStep from "../../components/ProgressStep";

import {
	saveShippingAddress,
	savePaymentMethod,
} from "../../redux/features/cart/cartSlice";

function Shipping() {
	const cart = useSelector(cartSelector);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState("Paypal");
	const [address, setAddress] = useState(
		shippingAddress.address || ""
	);
	const [city, setCity] = useState(shippingAddress.city || "");
	const [country, setCountry] = useState(
		shippingAddress.country || ""
	);
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ""
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({address, city, postalCode, country}));
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/place-order");
    }

	useEffect(() => {
		if (!shippingAddress.address) {
			navigate("/shipping");
		}
	}, [shippingAddress, navigate]);

	return (
		<div className="container mx-auto pt-10">
            <ProgressStep step1 step2/>
			<div className="mt-[10rem] flex justify-around items-center flex-wrap">
				<form onSubmit={handleSubmit} className="w-[40rem]">
					<h1 className="text-2xl font-semibold mb-4">
						Shipping
					</h1>
                    {/* Address */}
					<div className="mb-4">
						<label
							htmlFor="address"
							className="block text-white mb-2">
							Address
						</label>
						<input
							type="text"
							id="address"
							className="w-full p-2 border rounded"
							placeholder="Enter address..."
							value={address}
                            required
							onChange={(e) =>
								setAddress(e.target.value)
							}
						/>
					</div>

                    {/* City */}
					<div className="mb-4">
						<label
							htmlFor="city"
							className="block text-white mb-2">
							City
						</label>
						<input
							type="text"
							id="city"
							className="w-full p-2 border rounded"
							placeholder="Enter city..."
							value={city}
                            required
							onChange={(e) =>
								setCity(e.target.value)
							}
						/>
					</div>

                    {/* Postal Code */}
					<div className="mb-4">
						<label
							htmlFor="postalCode"
							className="block text-white mb-2">
							Postal Code
						</label>
						<input
							type="text"
							id="postalCode"
							className="w-full p-2 border rounded"
							placeholder="Enter postal code..."
							value={postalCode}
                            required
							onChange={(e) =>
								setPostalCode(e.target.value)
							}
						/>
					</div>

                    {/* Country */}
					<div className="mb-4">
						<label
							htmlFor="country"
							className="block text-white mb-2">
							Country
						</label>
						<input
							type="text"
							id="country"
							className="w-full p-2 border rounded"
							placeholder="Enter country..."
							value={country}
                            required
							onChange={(e) =>
								setCountry(e.target.value)
							}
						/>
					</div>

                    {/* Payment method */}
                    <div className="mb-4">
                        <label className="block text-gray-400">Select Method</label>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input 
                                type="radio"
                                className="form-radio text-pink-500 mr-2"
                                name="paymentMethod"
                                value="Paypal"
                                checked={paymentMethod === "Paypal"} 
                                onChange={(e) => setPaymentMethod(e.target.value)}/>
                                Stripe or Credit Card
                            </label>
                        </div>
                    </div>

                    <button className="bg-pink-500 text-white py-2 
                    px-4 rounded-full text-lg w-full" type="submit">
                        Continue
                    </button>
				</form>
			</div>
		</div>
	);
}

export default Shipping;
