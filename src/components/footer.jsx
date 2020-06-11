import React from "react";
import * as Icon from "react-feather";
import ReactGa from "react-ga";

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
            <span className="hashTag">#DistancedButNotAlone</span>
          </h6>
        </a>
      </h6>
      <div className="row">
        <div align="center" className="col">
          <a
            href="https://t.me/covidindiastats"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "rgb(0, 136, 204)",
                marginTop: 7.5,
                width: 250,
                fontWeight: 650,
                fontSize: 15,
                alignContent: "center",
                fontFamily: "notosans",
              }}
              onClick={() =>
                ReactGa.event({
                  category: "Telegram Clicked",
                  action: "Telegram",
                })
              }
            >
              <Icon.Inbox />
              &ensp; JOIN US ON TELEGRAM
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
              onClick={() =>
                ReactGa.event({
                  category: "Facebook button Clicked",
                  action: "Facebook",
                })
              }
            >
              <Icon.Facebook />
              &ensp; LIKE ON FACEBOOK
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
              onClick={() =>
                ReactGa.event({
                  category: "Twitter button Clicked",
                  action: "Twitter",
                })
              }
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
