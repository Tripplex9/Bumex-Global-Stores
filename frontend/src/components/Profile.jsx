import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => setUser(res.data))
      .catch(() => alert('Please log in'));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Addresses: {user.address.join(', ')}</p>
      <p>Loyalty Points: {user.loyaltyPoints}</p>
    </motion.div>
  );
};

export default Profile;
