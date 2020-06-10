import React from "react";
import * as Icon from "react-feather";

const Footer = () => {
  return (
    <div
      className="fadeInUp"
      style={{ animationDelay: "3s", marginTop: "50px" }}
    >
      <h6
        style={{
          textAlign: "center",
          marginBottom: 25,
          fontFamily: "notosans",
        }}
      >
        Salute to the ones fighting on the frontlines
      </h6>
      <div className="row">
        <div align="center" className="col">
          <a
            href="https://github.com/dinezh256/Covid19Dashboard"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.9)",
                marginTop: 7.5,
                width: 250,
                fontWeight: 650,
                fontSize: 15,
                alignContent: "center",
                fontFamily: "notosans",
              }}
            >
              <Icon.GitHub />
              &ensp; GitHub Source
            </button>
          </a>
        </div>
        <div align="center" className="col">
          <a
            href="https://facebook.com/covidindiastats"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "rgb(59, 89, 152)",
                backgroundColor: "rgba(59, 89, 152, 0.4)",
                marginTop: 7.5,
                width: 250,
                fontWeight: 800,
                fontSize: 15,
                alignContent: "center",
                fontFamily: "notosans",
              }}
            >
              <Icon.Facebook />
              &ensp; LIKE OUR PAGE
            </button>
          </a>
        </div>
        <div align="center" className="col">
          <a
            href="https://twitter.com/covidindiastats"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "#4ea2be",
                backgroundColor: "#d9ecf5",
                marginTop: 8,
                width: 250,
                fontWeight: 700,
                fontSize: 15,
                alignContent: "center",
                fontFamily: "notosans",
              }}
            >
              <Icon.Twitter />
              &ensp; UPDATES ON TWITTER
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
