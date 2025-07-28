import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';

const Wishlist = ({ wishlist, updateWishlist }) => {
  useEffect(() => {
    axios.post('/api/wishlist', { wishlist }).catch((err) => console.error('Wishlist save error:', err));
  }, [wishlist]);

  const removeItem = (id) => {
    updateWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)} className="text-red-600">Remove</button>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default Wishlist;
