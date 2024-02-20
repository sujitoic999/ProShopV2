import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container />
        <Outlet />
        <Container />
      </main>
      <Footer />
    </div>
  );
};

export default App;
