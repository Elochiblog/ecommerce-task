import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById, selectAllProducts } from '../features/products/productsSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../features/wishlist/wishlistSlice.js';
import { Toggle } from '../components/Toggle.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { AssetImage } from '../components/AssetImage.jsx';
import { ICONS } from '../constants/icons.js';

export function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const allProducts = useSelector(selectAllProducts);
  const isWishlisted = useSelector(selectIsWishlisted(product?.id));
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(product?.sizes ? 2 : null);

  if (!product) {
    return (
      <div className="container-px py-20 text-center">
        <p>Product not found.</p>
        <Link to="/" className="text-brand-red underline">Back to home</Link>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.img, product.img, product.img, product.img];
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container-px py-10">
      <p className="text-sm text-gray-400 mb-10">
        Account / {product.category} / <span className="text-black">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`bg-gray-100 rounded-md h-20 flex items-center justify-center overflow-hidden ${activeImage === i ? 'ring-2 ring-black' : ''}`}
              >
                <AssetImage src={src} alt={`${product.name} thumbnail ${i + 1}`} fallbackEmoji={product.image} className="w-full h-full" imgClassName="w-full h-full" />
              </button>
            ))}
          </div>
          <div className="bg-gray-100 rounded-md h-[420px] flex items-center justify-center overflow-hidden">
            <AssetImage src={gallery[activeImage]} alt={product.name} fallbackEmoji={product.image} className="w-full h-full" imgClassName="w-full h-full" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <div className="text-yellow-500 mb-3">
            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}{' '}
            <span className="text-gray-400 text-sm">({product.reviews} Reviews) | <span className="text-green-600">In Stock</span></span>
          </div>
          <p className="text-xl mb-4">${product.price}.00</p>
          <p className="text-gray-600 mb-6 pb-6 border-b">{product.description}</p>

          {product.colors && (
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm">Colours:</span>
              {product.colors.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(i)}
                  className={`w-6 h-6 rounded-full border-2 ${activeColor === i ? 'border-black' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          )}

          {product.sizes && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm">Size:</span>
              {product.sizes.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(i)}
                  className={`w-9 h-9 rounded flex items-center justify-center text-sm border ${activeSize === i ? 'bg-brand-red text-white border-brand-red' : 'border-gray-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2">+</button>
            </div>

            <button
              onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, img: product.img, quantity }))}
              className="bg-brand-red text-white px-8 py-2 rounded"
            >
              Buy Now
            </button>

            <Toggle
              initial={isWishlisted}
              render={(on, toggle) => (
                <button
                  onClick={() => {
                    toggle();
                    isWishlisted ? dispatch(removeFromWishlist(product.id)) : dispatch(addToWishlist(product));
                  }}
                  className="w-10 h-10 border rounded flex items-center justify-center"
                  aria-label="Toggle wishlist"
                >
                  <AssetImage
                    src={isWishlisted ? ICONS.productHeartFilled : ICONS.productHeartOutline}
                    alt="Wishlist"
                    fallbackEmoji={isWishlisted ? '❤️' : '🤍'}
                    fallbackTextClassName="text-lg"
                    className="w-5 h-5"
                    imgClassName="w-5 h-5"
                  />
                </button>
              )}
            />
          </div>

          <div className="border rounded-md">
            <div className="flex items-start gap-4 p-4 border-b">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs underline">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-medium text-sm">Return Delivery</p>
                <p className="text-xs">Free 30 Days Delivery Returns. <span className="underline">Details</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-8">
          <span className="w-3 h-6 bg-brand-red rounded-sm inline-block" />
          <h2 className="text-2xl font-semibold">Related Item</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
