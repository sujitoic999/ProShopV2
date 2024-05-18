// import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import React from "react";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from "axios";

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     // Make an HTTP request using axios
  //     const { data } = await axios.get("/api/products");
  //     // Update state with the fetched data
  //     setProducts(data);
  //   };
  //   // Call the async function
  //   fetchProducts();
  // }, []);

  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default HomeScreen;
