import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const response = await axios.get(`/api/products/search?q=${e.target.value}`);
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white p-4 sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Bumex Global Stores</Link>
        <nav className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 rounded text-black"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
