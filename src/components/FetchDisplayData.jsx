import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FetchDisplayData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setPosts(response.data);
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
        <motion.div className="row">
          {posts.map((post) => (
            <motion.div key={post.id} className="col-md-4 mb-2"> 
              <motion.div 
                className="card h-100 shadow-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  className="card-img-top p-3" 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
                />
                <motion.div className="card-body">
                  <motion.h5 className="card-title fw-bold">{post.title}</motion.h5>
                  <motion.p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {post.description.substring(0, 100)}...
                  </motion.p>
                  <motion.p className= "fw-semibold fs-5 card-footer"><motion.strong>Price:</motion.strong> ${post.price}</motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FetchDisplayData;
