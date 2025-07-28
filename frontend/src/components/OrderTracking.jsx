import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Order Tracking</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p>Order #{order._id}</p>
          <p>Status: {order.status}</p>
          <p>Tracking: {order.trackingNumber || 'N/A'}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default OrderTracking;
