import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { SignUpPage } from './pages/SignUpPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ProductDetailsPage } from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
