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
        <a
          href="https://instagram.com/covidindiastatsig"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 2, marginRight: 2 }}
        >
          <button
            className="btn"
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#E1306C",
              marginTop: 5,
              marginBottom: 15,
              width: 38,
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
          </button>
        </a>
        <a
          href="https://facebook.com/covidindiastats"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 2, marginRight: 2 }}
        >
          <button
            className="btn"
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#3f729b",
              marginTop: 5,
              marginBottom: 15,
              width: 38,
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
          </button>
        </a>
        <a
          href="https://t.me/covidindiastats"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 2, marginRight: 2 }}
        >
          <button
            className="btn"
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "rgb(0, 136, 204)",
              marginTop: 5,
              marginBottom: 15,
              width: 38,
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
          </button>
        </a>
        <a
          href="https://twitter.com/covidindiastats"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 2, marginRight: 2 }}
        >
          <button
            className="btn"
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#00acee",
              marginTop: 5,
              marginBottom: 15,
              width: 38,
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
          </button>
        </a>
      </h6>
    </div>
  );
};

export default Footer;
