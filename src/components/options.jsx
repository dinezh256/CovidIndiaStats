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
            marginBottom: 5,
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
          Nisarga Helpline
          <h6 className="cycloneDetails">
            According to the India Meteorological Department (IMD), Nisarga is
            likely to make landfall between Harihareshwar in Maharashtra’s
            Raigad and Daman on 3rd June. The IMD has issued a Red alert for
            other districts: Palghar, Thane, Dhule, Nandurbar and Nashik,
            between 3rd and 4th June. In Gujarat, 10 teams of NDRF have taken
            position in south Gujarat districts of Surat, Bharuch, Navsari,
            Valsad and the Dangs and Bhavnagar and Amreli districts of
            Saurashtra to deal with any eventuality.
          </h6>
        </h4>
        <div className="options fadeInUp" style={{ animationDelay: "0.25s" }}>
          <h5 className="question">
            National Disaster Management Authority, Government Of India
          </h5>
          <span className="options-link">011-1078, 011-26701700</span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h5 className="question">Daman Disaster Management Control Room</h5>
          <span className="options-link">0260-2231377</span>
          <span className="options-link">
            <Icon.ExternalLink />{" "}
            <a
              href="https://daman.nic.in/state-disaster-managment-dd.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="options-link2"
            >
              daman.nic.in
            </a>
          </span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h5 className="question">
            Maharashtra Disaster Management Control Room
          </h5>
          <span className="options-link">022-22027990</span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.45s" }}>
          <h5 className="question">
            Maharashtra Districtwise Emergency Helpline
          </h5>
          <span className="options-link">Palghar: 0250-2332618</span>
          <span className="options-link">Thane: 022-25821281,022-25827402</span>
          <span className="options-link">Raigad: 108 / 1077</span>
          <span className="options-link">Nandurbar: 02564-210077</span>
          <span className="options-link">Nashik: 0253-2360855</span>
          <span className="options-link">
            <Icon.ExternalLink />{" "}
            <a
              href="https://mahadish.in/disaster_management"
              target="_blank"
              rel="noopener noreferrer"
              className="options-link2"
            >
              mahadish.in/disaster_management
            </a>
          </span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.45s" }}>
          <h5 className="question">
            Municipal Corporation of Greater Mumbai Emergency Operation Centre
            (Disaster Management Unit)
          </h5>
          <span className="options-link">
            022-22694725/27, 022-22704403 | <Icon.Mail /> ccrsdmp@gmail.com |{" "}
            <Icon.ExternalLink />{" "}
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
        <div className="options fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h5 className="question">Gujarat Disaster Management Control Room</h5>
          <span className="options-link">+91-79-23259283</span>
        </div>
        <div className="options fadeInUp" style={{ animationDelay: "0.45s" }}>
          <h5 className="question">Gujarat Districtwise Emergency Helpline</h5>
          <span className="options-link">Surat: 0261-2452807</span>
          <span className="options-link">Bharuch: +91-97-17393310</span>
          <span className="options-link">Navsari: 02637-259401</span>
          <span className="options-link">Valsad: 02632-243238</span>
          <span className="options-link">Dang: 02631-220346</span>
          <span className="options-link">Bhavnagar: 0278-2521554</span>
          <span className="options-link">Amreli: 8319460485</span>
          <span className="options-link">
            <Icon.ExternalLink />{" "}
            <a
              href="http://gsdma.org"
              target="_blank"
              rel="noopener noreferrer"
              className="options-link2"
            >
              gsdma.org
            </a>
          </span>
        </div>
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
