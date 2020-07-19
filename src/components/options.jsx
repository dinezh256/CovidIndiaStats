import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import * as Icon from "react-feather";

function Options() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Container>
        <Helmet>
          <title>Helpful Links</title>
          <meta name="description" content="Helpful Links" />
        </Helmet>

        <h4
          className="question fadeInUp"
          style={{
            textTransform: "uppercase",
            marginTop: 15,
            marginBottom: 5,
            animationDelay: "0.55s",
          }}
        >
          <Icon.Link2
            size={20}
            strokeWidth={3}
            style={{ verticalAlign: "-0.1rem" }}
            stroke="rgb(128, 42, 190)"
          />{" "}
          Important Links
        </h4>
        <div className="options fadeInUp" style={{ animationDelay: "0.6s" }}>
          <h5 className="question">
            Ministry of Health and Family Welfare, Govt. of India
          </h5>
          <a href="https://www.mohfw.gov.in" className="options-link">
            mohfw.gov.in
          </a>
        </div>

        <div className="options fadeInUp" style={{ animationDelay: "0.65s" }}>
          <h5 className="question">WHO : Covid19 Home Page</h5>
          <a
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
            className="options-link"
          >
            bit.ly/whocovid19disease
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.7s" }}>
          <h5 className="question">
            Centers for Disease Control and Prevention
          </h5>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html"
            className="options-link"
          >
            bit.ly/cdc-ncov
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.75s" }}>
          <h5 className="question">HELPLINE NUMBERS (by State)</h5>
          <a
            href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
            className="options-link"
          >
            bit.ly/mohfw-helpline
          </a>
        </div>

        <Footer />
      </Container>
    </div>
  );
}

export default Options;
