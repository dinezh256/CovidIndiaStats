import React, { Component } from "react";
import * as Icon from "react-feather";
import { Container } from "react-bootstrap";
import Footer from "./footer";
import { NavLink } from "react-router-dom";

class FAQ extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ marginBottom: "20px" }}>
          <h2 className="faq-heading fadeOutDown" align="center">
            WE ARE NOT OFFICIAL
          </h2>
          <br />
          <Container>
            <div className="FAQ">
              <h4 className="question fadeOutDown">
                <span className="faqicon">
                  <Icon.Feather size={20} />{" "}
                </span>{" "}
                What are your Sources?
              </h4>
              <h5 className="answer fadeInUp">
                <span className="faqicon">
                  <Icon.Clipboard size={20} />{" "}
                </span>{" "}
                Our sources are World Health Organisation, Centers for Disease
                Control and Prevention, Minstry of Health and Family Welfare
                India, Indian and State Government media briefs.
              </h5>

              <h4 className="question fadeOutDown">
                <span className="faqicon">
                  <Icon.Feather size={20} />{" "}
                </span>{" "}
                Which APIs have been used to fetch Data?
              </h4>
              <h5 className="answer fadeInUp">
                <span className="faqicon">
                  <Icon.Clipboard size={20} />{" "}
                </span>{" "}
                Two APIs have been called.
                <br />
                &emsp;
                <span className="faqicon">
                  <Icon.Server size={14} /> api.covid19india.org
                </span>
                <br />
                &emsp;
                <span className="faqicon">
                  <Icon.Server size={14} /> corona.lmao.ninja
                </span>
              </h5>

              <h4 className="question fadeOutDown">
                <span className="faqicon">
                  <Icon.Feather size={20} />{" "}
                </span>{" "}
                How can we help fight this pandemic?
              </h4>
              <h5 className="answer fadeInUp">
                <span className="faqicon">
                  <Icon.Clipboard size={20} />{" "}
                </span>{" "}
                In one way or another we are dependent on each other. Enroute
                outside only during an emergency, else stay inside your home,
                use social media. Give time to your parents. Help the old ones.
                Call the state representatives if you see any symptoms in
                anyone. More help on the{" "}
                <NavLink to="/links" style={{ color: "inherit" }}>
                  links
                </NavLink>{" "}
                tab.
              </h5>
            </div>
            <br id="line2" />
            <br id="line2" />
            <br id="line2" />
            <br id="line2" />
            <Footer />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default FAQ;
