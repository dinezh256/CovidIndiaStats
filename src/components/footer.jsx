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
      <div className="col">
        <div align="center" className="col">
          <a
            href="https://instagram.com/covidindiaastats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "#E1306C",
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
                color: "white",
                backgroundColor: "#3f729b",
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
            href="https://t.me/covidindiastats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn"
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "rgb(0, 136, 204)",
                marginTop: 5,
                width: 180,

                fontSize: 10,
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
              <Icon.Inbox size="15px" />
              &ensp; INSTANT UPDATES ON TELEGRAM
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
                color: "white",
                backgroundColor: "#00acee",
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
