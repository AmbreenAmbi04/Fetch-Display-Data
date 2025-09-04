import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FetchDisplayData = () => {
  const [products, setProducts] = useState([]);
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
        <motion.ol className="list-group list-group-numbered">
          {products.map((product) => (
            <motion.li
              key={product.id}
              className="list-group-item d-flex align-items-start"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                className="me-3"
              />
              <motion.div>
                <motion.h6 className="fw-bold text-dark">{product.title}</motion.h6>
                <motion.p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                  {product.description.substring(0, 80)}...
                </motion.p>
                <motion.span className="fw-semibold text-success">
                  ${product.price}
                </motion.span>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>
      )}
    </motion.div>
  );
};

export default FetchDisplayData;
