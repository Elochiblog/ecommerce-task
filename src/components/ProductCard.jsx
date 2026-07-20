import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "./Toggle.jsx";
import { AssetImage } from "./AssetImage.jsx";
import { ICONS } from "../constants/icons.js";
import { addToCart } from "../features/cart/cartSlice.js";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsWishlisted,
} from "../features/wishlist/wishlistSlice.js";

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));

  const handleToggleWishlist = (toggle) => {
    toggle();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="group relative">
      <div className="relative bg-gray-100 rounded-md h-52 flex items-center justify-center overflow-hidden">
        {product.discountPct && (
          <span className="absolute top-2 left-2 z-10 bg-brand-red text-white text-xs px-2 py-1 rounded">
            -{product.discountPct}%
          </span>
        )}
        {product.badge === "NEW" && (
          <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}

        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <Toggle
            initial={isWishlisted}
            render={(on, toggle) => (
              <button
                onClick={() => handleToggleWishlist(toggle)}
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow"
                aria-label="Toggle wishlist"
              >
                <AssetImage
                  src={
                    isWishlisted
                      ? ICONS.productHeartFilled
                      : ICONS.productHeartOutline
                  }
                  alt="Wishlist"
                  fallbackEmoji={isWishlisted ? "❤️" : "🤍"}
                  fallbackTextClassName="text-sm"
                  className="w-4 h-4"
                  imgClassName="w-4 h-4"
                />
              </button>
            )}
          />

          <Link
            to={`/product/${product.id}`}
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow"
            aria-label="View details"
          >
            <AssetImage
              src={ICONS.productEye}
              alt="View details"
              fallbackEmoji="👁️"
              fallbackTextClassName="text-sm"
              className="w-4 h-4"
              imgClassName="w-4 h-4"
            />
          </Link>
        </div>

        <AssetImage
          src={product.img}
          alt={product.name}
          fallbackEmoji={product.image}
          className="w-full h-full"
          imgClassName="w-full h-full"
        />

        {product.badge === "Add To Cart" && (
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  img: product.img,
                  quantity: 1,
                })
              )
            }
            className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2"
          >
            Add To Cart
          </button>
        )}
      </div>

      <Link
        to={`/product/${product.id}`}
        className="block mt-3 font-medium hover:underline"
      >
        {product.name}
      </Link>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-brand-red font-medium">${product.price}</span>
        {product.oldPrice && (
          <span className="text-gray-400 line-through text-sm">
            ${product.oldPrice}
          </span>
        )}
      </div>
      <div className="text-yellow-500 text-sm mt-1">
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}{" "}
        <span className="text-gray-400">({product.reviews})</span>
      </div>
    </div>
  );
}
