import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from "../features/cart/cartSlice.js";
import { useForm, rules } from "../hooks/useForm.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { AssetImage } from "../components/AssetImage.jsx";

const validationRules = {
  firstName: rules.required("First Name"),
  streetAddress: rules.required("Street Address"),
  townCity: rules.required("Town/City"),
  phone: rules.required("Phone Number"),
  email: rules.compose(rules.required("Email"), rules.email()),
};

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phone: "",
      email: "",
      saveInfo: true,
    },
    validationRules
  );

  const placeOrder = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container-px py-10">
      <p className="text-sm text-gray-400 mb-10">
        Account / My Account / Product / View Cart /{" "}
        <span className="text-black">CheckOut</span>
      </p>

      <div className="grid md:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit(placeOrder)}>
          <h1 className="text-2xl font-semibold mb-8">Billing Details</h1>

          {[
            ["firstName", "First Name*"],
            ["companyName", "Company Name"],
            ["streetAddress", "Street Address*"],
            ["apartment", "Apartment, floor, etc. (optional)"],
            ["townCity", "Town/City*"],
            ["phone", "Phone Number*"],
            ["email", "Email Address*"],
          ].map(([name, label]) => (
            <div key={name} className="mb-5">
              <label className="text-sm text-gray-600">{label}</label>
              <input
                name={name}
                value={values[name]}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-3 mt-1"
              />
              {errors[name] && (
                <p className="text-red-600 text-xs mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              name="saveInfo"
              checked={values.saveInfo}
              onChange={handleChange}
              className="accent-brand-red"
            />
            Save this information for faster check-out next time
          </label>
        </form>

        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <span className="flex items-center gap-3">
                <AssetImage
                  src={item.img}
                  alt={item.name}
                  fallbackEmoji={item.image}
                  className="w-10 h-10 rounded"
                  imgClassName="w-10 h-10 rounded"
                />
                {item.name}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t pt-4 mt-4 mb-6">
            <div className="flex justify-between py-1">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-1 font-medium">
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="flex items-center justify-between border rounded px-4 py-3 cursor-pointer">
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="accent-black"
                />
                Bank
              </span>
              <span className="flex gap-2 text-xs text-gray-400">
                bKash · Visa · MasterCard · Nagad
              </span>
            </label>
            <label className="flex items-center gap-3 px-4 py-1 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="accent-black"
              />
              Cash on delivery
            </label>
          </div>

          <div className="flex gap-3 mb-6">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon Code"
              className="flex-1 border rounded px-4 py-3"
            />
            <button
              type="button"
              className="bg-brand-red text-white rounded px-6"
            >
              Apply Coupon
            </button>
          </div>

          <button
            onClick={handleSubmit(placeOrder)}
            className="bg-brand-red text-white rounded px-10 py-3"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CheckoutPage);
