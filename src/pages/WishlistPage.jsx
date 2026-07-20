import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems, removeFromWishlist, clearWishlist } from '../features/wishlist/wishlistSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';
import { selectAllProducts } from '../features/products/productsSlice.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { AssetImage } from '../components/AssetImage.jsx';
import { ICONS } from '../constants/icons.js';
import { withAuth } from '../hocs/withAuth.jsx';

function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);
  const allProducts = useSelector(selectAllProducts);
  const recommended = allProducts.slice(10, 14);

  const moveAllToBag = () => {
    items.forEach((item) =>
      dispatch(addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, img: item.img, quantity: 1 }))
    );
    dispatch(clearWishlist());
  };

  return (
    <div className="container-px py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl">Wishlist ({items.length})</h1>
        {items.length > 0 && (
          <button onClick={moveAllToBag} className="border rounded px-6 py-2">Move All To Bag</button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 mb-16">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard product={item} />
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-2 right-11 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs shadow"
                aria-label="Remove from wishlist"
              >
                <AssetImage src={ICONS.trash} alt="Remove" fallbackEmoji="🗑️" fallbackTextClassName="text-sm" className="w-4 h-4" imgClassName="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="w-3 h-6 bg-brand-red rounded-sm inline-block" />
          <h2 className="text-xl">Just For You</h2>
        </div>
        <button className="border rounded px-6 py-2">See All</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

export default withAuth(WishlistPage);
