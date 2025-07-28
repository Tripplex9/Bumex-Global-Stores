import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', sort: 'latest' });
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q') || '';

  useEffect(() => {
    const url = query ? `/api/products/search?q=${query}` : '/api/products';
    axios.get(url, { params: filters }).then((res) => setProducts(res.data));
  }, [query, filters]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <div className="flex space-x-4 mb-4">
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
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

export default ProductListing;
