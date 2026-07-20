import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth.js";
import { Toggle } from "./Toggle.jsx";
import { AccountDropdown } from "./AccountDropdown.jsx";
import { AssetImage } from "./AssetImage.jsx";
import { ICONS } from "../constants/icons.js";
import { selectCartCount } from "../features/cart/cartSlice.js";
import { selectWishlistCount } from "../features/wishlist/wishlistSlice.js";

const navLinkClass = ({ isActive }) =>
  `text-sm ${
    isActive
      ? "text-black border-b border-black pb-1"
      : "text-gray-700 hover:text-black"
  }`;

const iconClass = "w-5 h-5";

export function Navbar() {
  const { user } = useAuth();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const [query, setQuery] = useState("");

  return (
    <header className="w-full">
      <div className="bg-brand-dark text-white text-xs sm:text-sm text-center py-2 px-4">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <Link to="/" className="underline font-medium">
          ShopNow
        </Link>
      </div>

      <nav className="container-px grid grid-cols-[auto_1fr_auto] items-center gap-6 py-5 border-b border-gray-200">
        <Link to="/" className="text-2xl font-bold shrink-0">
          Exclusive
        </Link>

        <div className="hidden md:flex items-center justify-center gap-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          {!user && (
            <NavLink to="/signup" className={navLinkClass}>
              Sign Up
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-5 sm:gap-6 justify-self-end">
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded px-3 py-2 w-56">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-full"
            />
            <AssetImage
              src={ICONS.search}
              alt="Search"
              fallbackEmoji="🔍"
              fallbackTextClassName="text-base"
              className={`${iconClass} shrink-0`}
              imgClassName={iconClass}
            />
          </div>

          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <AssetImage
              src={ICONS.heartOutline}
              alt="Wishlist"
              fallbackEmoji="♡"
              fallbackTextClassName="text-xl"
              className={iconClass}
              imgClassName={iconClass}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative" aria-label="Cart">
            <AssetImage
              src={ICONS.cart}
              alt="Cart"
              fallbackEmoji="🛒"
              fallbackTextClassName="text-xl"
              className={iconClass}
              imgClassName={iconClass}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <Toggle
                render={(on, toggle) => (
                  <>
                    <button
                      onClick={toggle}
                      className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center overflow-hidden"
                      aria-label="Account menu"
                    >
                      <AssetImage
                        src={ICONS.user}
                        alt="Account"
                        fallbackEmoji="🙂"
                        fallbackTextClassName="text-sm"
                        className="w-4 h-4"
                        imgClassName="w-4 h-4 invert"
                      />
                    </button>
                    {on && <AccountDropdown onClose={toggle} />}
                  </>
                )}
              />
            </div>
          ) : (
            <Link to="/login" aria-label="Log in">
              <AssetImage
                src={ICONS.user}
                alt="Log in"
                fallbackEmoji="👤"
                fallbackTextClassName="text-xl"
                className={iconClass}
                imgClassName={iconClass}
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
