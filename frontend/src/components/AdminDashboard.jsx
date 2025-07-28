import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => setOrders(res.data));
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3>Orders</h3>
          {orders.map((order) => (
            <div key={order._id} className="border p-2 mb-2">
              <p>Order #{order._id}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
        <div>
          <h3>Products</h3>
          {products.map((product) => (
            <div key={product._id} className="border p-2 mb-2">
              <p>{product.name}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
