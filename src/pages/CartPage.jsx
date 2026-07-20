import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { AssetImage } from "../components/AssetImage.jsx";

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="container-px py-10">
      <p className="text-sm text-gray-400 mb-10">
        Home / <span className="text-black">Cart</span>
      </p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="text-brand-red underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border rounded-md overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-white px-6 py-4 font-medium shadow-sm">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center px-6 py-4 border-t"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <AssetImage
                      src={item.img}
                      alt={item.name}
                      fallbackEmoji={item.image}
                      className="w-12 h-12 rounded"
                      imgClassName="w-12 h-12 rounded"
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="absolute -top-2 -left-2 w-5 h-5 bg-brand-red text-white rounded-full text-xs flex items-center justify-center"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                  <span>{item.name}</span>
                </div>
                <span>${item.price}</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                  className="border rounded w-16 px-2 py-1"
                />
                <div className="flex justify-end items-center gap-4">
                  <span>${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <div className="block">
              <Link to="/" className="border rounded px-6 py-3">
                Return To Shop
              </Link>
            </div>

            <div className="border rounded-md p-6 w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-4">Cart Total</h3>
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between py-2 mb-4">
                <span>Total:</span>
                <span>${subtotal}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-brand-red text-white rounded py-3"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withAuth(CartPage);
