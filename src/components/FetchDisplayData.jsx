import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FetchDisplayData = () => {
const [posts, setPosts] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

 useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

 return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mt-4"
    >
      {loading && <motion.p>Loading...</motion.p>}

      {error && <motion.p style={{ color: "red" }}>Error: {error.message}</motion.p>}

      {!loading && !error && (
        <motion.ul>
          {posts.map((post) => (
            <motion.li key={post.id} whileHover={{ scale: 1.05 }}>
              {post.title}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default FetchDisplayData;