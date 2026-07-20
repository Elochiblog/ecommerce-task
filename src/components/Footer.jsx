import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 mt-20">
      <div className="container-px grid grid-cols-2 md:grid-cols-5 gap-8 py-16">
        <div>
          <h3 className="text-white text-xl font-bold mb-5">Exclusive</h3>
          <p className="text-white mb-3">Subscribe</p>
          <p className="text-sm mb-3">Get 10% off your first order</p>
          <div className="flex border border-gray-500 rounded px-2 py-2 w-full max-w-[200px]">
            <input
              placeholder="Enter your email"
              className="bg-transparent outline-none text-sm w-full"
            />
            <span>➤</span>
          </div>
        </div>
        <div>
          <h4 className="text-white mb-5">Support</h4>
          <p className="text-sm mb-3">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-sm mb-3">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>
        <div>
          <h4 className="text-white mb-5">Account</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/">Shop</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-5">Quick Link</h4>
          <ul className="space-y-3 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">Download App</h4>
          <p className="text-xs mb-2">Save $3 with App New User Only</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-6 border-t border-gray-700">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}
