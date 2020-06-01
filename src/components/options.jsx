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
            marginBottom: -15,
            animationDelay: "0.2s",
          }}
        >
          <Icon.CloudRain
            size={20}
            strokeWidth={2.5}
            style={{ verticalAlign: "-0.1rem" }}
            fill="rgba(128, 42, 190, 0.6)"
            stroke="rgb(128, 42, 190)"
          />{" "}
          Cyclone Nisarga Helpline
        </h4>
        <div className="options fadeInUp" style={{ animationDelay: "0.25s" }}>
          <h4 className="question">
            National Disaster Management Authority, Government Of India
          </h4>
          <span className="options-link">011-1078, 011-26701700</span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h4 className="question">Maharashtra Control Room</h4>
          <span className="options-link">022-22027990</span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.45s" }}>
          <h4 className="question">
            Municipal Corporation of Greater Mumbai Emergency Operation Centre
            (Disaster Management Unit)
          </h4>
          <span className="options-link">
            022-22694725, 022-22694727, 022-22704403 | <Icon.Mail />{" "}
            ccrsdmp@gmail.com | <Icon.ExternalLink />{" "}
            <a
              href="http://dm.mcgm.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="options-link2"
            >
              dm.mcgm.gov.in
            </a>
          </span>
        </div>
        <h4
          className="question fadeInUp"
          style={{
            textTransform: "uppercase",
            marginTop: 15,
            marginBottom: -15,
            animationDelay: "0.55s",
          }}
        >
          <Icon.Link
            size={20}
            strokeWidth={2.5}
            style={{ verticalAlign: "-0.1rem" }}
            fill="rgba(128, 42, 190, 0.6)"
            stroke="rgb(128, 42, 190)"
          />{" "}
          Important Links
        </h4>
        <div className="options fadeInUp" style={{ animationDelay: "0.6s" }}>
          <h4 className="question">
            Ministry of Health and Family Welfare, Govt. of India
          </h4>
          <a href="https://www.mohfw.gov.in" className="options-link">
            mohfw.gov.in
          </a>
        </div>

        <div className="options fadeInUp" style={{ animationDelay: "0.65s" }}>
          <h4 className="question">WHO : Covid19 Home Page</h4>
          <a
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
            className="options-link"
          >
            bit.ly/whocovid19disease
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.7s" }}>
          <h4 className="question">
            Centers for Disease Control and Prevention
          </h4>
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html"
            className="options-link"
          >
            bit.ly/cdc-ncov
          </a>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.75s" }}>
          <h4 className="question">HELPLINE NUMBERS (by State)</h4>
          <a
            href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
            className="options-link"
          >
            bit.ly/mohfw-helpline
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
