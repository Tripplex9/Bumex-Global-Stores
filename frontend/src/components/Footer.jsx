import { motion } from 'framer-motion';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-blue-600 text-white p-4 text-center"
  >
    © 2025 Bumex Global Stores. All rights reserved.
  </motion.footer>
);

export default Footer;
