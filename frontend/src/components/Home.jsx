import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products?featured=true').then((res) => setFeaturedProducts(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            <h3 className="text-xl">{product.name}</h3>
            <p>₦{product.price}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
