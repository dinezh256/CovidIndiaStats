import React from "react";
import * as Icon from "react-feather";

const Footer = () => {
  return (
    <div
      className="fadeInUp"
      style={{ animationDelay: "1s", marginTop: "50px" }}
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
              }}
            >
              <Icon.GitHub />
              &ensp; GitHub Source
            </button>
          </a>
        </div>
        <div align="center" className="col">
          <a
            href="https://api.covid19india.org/"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "#28a745",
                backgroundColor: "#c3e0c3",
                marginTop: 7.5,
                width: 250,
                fontWeight: 650,
                fontSize: 15,
                alignContent: "center",
              }}
            >
              <Icon.Database />
              &ensp; PATIENT DATABASE
            </button>
          </a>
        </div>
        <div align="center" className="col">
          <a
            href="https://twitter.com/ncovind"
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
                marginTop: 10,
                width: 250,
                fontWeight: 650,
                fontSize: 15,
                alignContent: "center",
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
