import React from "react";
import * as Icon from "react-feather";
import ReactGa from "react-ga";

const Footer = () => {
  return (
    <div
      className="fade-in-up"
      style={{ animationDelay: "3s", marginTop: "50px" }}
    >
      <h6
        style={{
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Salute to the ones fighting on the frontlines
        <a
          href="https://twitter.com/covidindiastats"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6
            style={{
              textAlign: "center",
              marginTop: 5,
            }}
          >
            <span className="hash-tag">#DistancedButNotAlone</span>
          </h6>
        </a>
      </h6>
      <div className="col">
        <div align="center" className="col">
          <a
            href="https://instagram.com/covidindiastatsig"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "rgb(255, 48, 108)",
                backgroundColor: "rgba(225, 48, 108, 0.1)",
                marginTop: 5,
                width: 180,
                fontSize: 10,
                alignContent: "center",
                fontFamily: "notosans",
              }}
              onClick={() =>
                ReactGa.event({
                  category: "Instagram Clicked",
                  action: "Instagram",
                })
              }
            >
              <Icon.Instagram size="15px" />
              &ensp; OUR INSTAGRAM PAGE
            </button>
          </a>
        </div>
        <div align="center" className="col">
          <a
            href="https://facebook.com/covidindiastats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "rgb(63, 114, 195)",
                backgroundColor: "rgba(63, 114, 155, 0.1)",
                marginTop: 5,
                width: 180,
                fontSize: 10,
                alignContent: "center",
                fontFamily: "notosans",
              }}
              onClick={() =>
                ReactGa.event({
                  category: "Facebook button Clicked",
                  action: "Facebook",
                })
              }
            >
              <Icon.Facebook size="15px" />
              &ensp; OUR FACEBOOK PAGE
            </button>
          </a>
        </div>

        <div align="center" className="col">
          <a
            href="https://twitter.com/covidindiastats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "rgb(0, 192, 248)",
                backgroundColor: "rgba(0, 172, 238, 0.1)",
                marginTop: 5,
                marginBottom: 15,
                width: 180,
                fontSize: 10,
                alignContent: "center",
                fontFamily: "notosans",
              }}
              onClick={() =>
                ReactGa.event({
                  category: "Twitter button Clicked",
                  action: "Twitter",
                })
              }
            >
              <Icon.Twitter size="15px" />
              &ensp; UPDATES ON TWITTER
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
