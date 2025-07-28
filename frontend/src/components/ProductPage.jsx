import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = ({ addToCart, addToWishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p>₦{product.price} {product.discount && <span>(-{product.discount}%)</span>}</p>
          <p>{product.description}</p>
          <div>
            <button
              onClick={() => addToCart([...cart, { id: product._id, name: product.name, price: product.price }])}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist([...wishlist, { id: product._id, name: product.name }])}
              className="bg-gray-600 text-white p-2 rounded ml-2"
            >
              Add to Wishlist
            </button>
          </div>
          <div className="mt-4">
            <h3>Reviews</h3>
            {product.reviews.map((review) => (
              <div key={review._id}>{review.rating} stars: {review.comment}</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
