// import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import React from "react";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice"; //this is custom hook for API Call
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
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

  const { pageNumber, keyword } = useParams();

  console.log("pageNumberpageNumber", pageNumber);
  console.log("keywordkeyword", keyword);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  console.log("pagination data", data);

  return (
    <Container>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
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
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </Container>
  );
}

export default HomeScreen;
