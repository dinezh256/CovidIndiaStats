import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./footer";

function Options(props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Container>
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h4 className="question">
            Ministry of Health and Family Welfare, Govt. of India
          </h4>
          <a href="https://www.mohfw.gov.in">
            <span className="options-link">mohfw.gov.in</span>
          </a>
        </div>

        <div className="options fadeInUp" style={{ animationDelay: "0.4s" }}>
          <h4 className="question">WHO : Covid19 Home Page</h4>
          <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
            <span className="options-link">bit.ly/whocovid19disease</span>
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.5s" }}>
          <h4 className="question">
            Centers for Disease Control and Prevention
          </h4>
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html">
            <span className="options-link">bit.ly/cdc-ncov</span>
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h4 className="question">HELPLINE NUMBERS (by State)</h4>
          <a href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf">
            <span className="options-link">bit.ly/mohfw-helpline</span>
          </a>
        </div>
        <br id="line2" />
        <br id="line2" />
        <br id="line2" />
        <br id="line2" />
        <Footer />
      </Container>
    </div>
  );
}

export default Options;
