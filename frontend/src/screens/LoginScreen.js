import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth); //checking whether user is logged in or not

  const { search } = useLocation(); //search part beasically contains content of ? in current url
  //  like in http://localhost:3000/login?redirect=/shipping   "redirect=/shipping" part will be there.
  console.log("useLocation Address-----", useLocation());
  const sp = new URLSearchParams(search);
  console.log("URL search Params----", sp);
  const redirect = sp.get("redirect") || "/"; //if we're on login screen with redirect parameter
  // then we'll be redirected to redirect screen after login screen
  console.log("new created redirect---", redirect);

  //here useParams() can't do anything because useParams() works for route parameter

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("login information.....", res);
      // here what we're doing is first we're seding our data to backend to set current user as logged in
      // now again receiving logged in user data from backend and setting the information to localStorage with help of set credentials method
      dispatch(setCredentials({ ...res }));
      // why we've destructured res object?
      // Consistency: Ensures that all properties from the API response are included in the Redux state.
      // Future-proofing: If the res object changes (e.g., additional fields are added by the API), the destructuring approach will automatically handle these without requiring code changes.
      // Simplicity: It reduces the need for repetitive code, making it easier to read and maintain.
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
