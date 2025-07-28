import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ cart, updateCart }) => {
  useEffect(() => {
    axios.post('/api/cart', { cart }).catch((err) => console.error('Cart save error:', err));
  }, [cart]);

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>₦{item.price}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-600">Remove</button>
            </div>
          ))}
          <Link to="/checkout" className="bg-blue-600 text-white p-2 rounded mt-4 inline-block">
            Proceed to Checkout
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
