import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cart }) => {
  const [address, setAddress] = useState('');

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_paystack_key',
      email: 'customer@example.com',
      amount: cart.reduce((sum, item) => sum + item.price, 0) * 100,
      currency: 'NGN',
      callback: (response) => {
        axios.post('/api/orders', { paymentRef: response.reference, cart, address });
        alert('Payment successful!');
      },
    });
    handler.openIframe();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block mb-2">Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>₦{item.price}</span>
          </div>
        ))}
      </div>
      <button onClick={payWithPaystack} className="bg-blue-600 text-white p-2 rounded">
        Pay with Paystack
      </button>
    </motion.div>
  );
};

export default Checkout;
