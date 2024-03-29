import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import React from "react";
import axios from "axios";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      // Make an HTTP request using axios
      const { data } = await axios.get("/api/products");
      // Update state with the fetched data
      setProducts(data);
    };
    // Call the async function
    fetchProducts();
  }, []);

  return (
    <Container>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} xl={3} key={product._id}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomeScreen;
