import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <h1>Oops..</h1>
      <h6>
        The page you are looking for isn't available, please head back to{" "}
        <Link to="/">Home</Link>
      </h6>
    </Container>
  );
};

export default NotFound;
