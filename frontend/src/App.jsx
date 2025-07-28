import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductListing from './components/ProductListing';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import OrderTracking from './components/OrderTracking';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import LiveChat from './components/LiveChat';

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductPage addToCart={setCart} addToWishlist={setWishlist} />} />
          <Route path="/cart" element={<Cart cart={cart} updateCart={setCart} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} updateWishlist={setWishlist} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <LiveChat />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
