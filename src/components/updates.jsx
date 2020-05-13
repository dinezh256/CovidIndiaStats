import React, { Component } from "react";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import Badge from "@material-ui/core/Badge";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import NotificationsOffTwoToneIcon from "@material-ui/icons/NotificationsOffTwoTone";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import GroupWorkTwoToneIcon from "@material-ui/icons/GroupWorkTwoTone";
import { formatDate, formatDateAbsolute } from "../utils/common-functions";
import ReactGa from "react-ga";

class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      toggleActive: false,
      items: [],
      wasSeen: localStorage.getItem("wasSeen") ? true : false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  close() {
    localStorage.setItem("wasSeen", "true");
    this.setState({ wasSeen: true });
  }

  onToggle(toggleActive) {
    this.setState({ toggleActive });
  }

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          data: json.statewise.filter(
            (item) => item.confirmed !== "0" && item.state !== "Total"
          ),
          lastUpdated: json.statewise[0].lastupdatedtime,
          items: json.statewise.filter(
            (item) => item.confirmed !== "0" && item.state !== "Total"
          ),
        });
      })
    );
    this.setState({ wasSeen: false });
  }

  render() {
    const {
      data,
      isLoaded,
      toggleActive,
      lastUpdated,
      items,
      wasSeen,
    } = this.state;

    function toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    }

    function timeSince(timeStamp) {
      var now = new Date(),
        secondsPast = (now.getTime() - timeStamp) / 1000;

      if (secondsPast < 60) {
        return (
          parseInt(secondsPast) +
          ` second${parseInt(secondsPast) > 1 ? "s" : ""} ago`
        );
      }

      if (secondsPast < 3600) {
        return (
          parseInt(secondsPast / 60) +
          ` minute${parseInt(secondsPast / 60) > 1 ? "s" : ""} ago`
        );
      }

      if (secondsPast <= 86400) {
        return (
          parseInt(secondsPast / 3600) +
          ` hour${parseInt(secondsPast / 3600) > 1 ? "s" : ""} ago `
        );
      }
      if (secondsPast > 86400) {
        let day = timeStamp.getDate();
        var month = timeStamp
          .toDateString()
          .match(/ [a-zA-Z]*/)[0]
          .replace(" ", "");
        var year =
          timeStamp.getFullYear() === now.getFullYear()
            ? ""
            : " " + timeStamp.getFullYear();
        return day + " " + month + year;
      }
    }

    let totalDeltaConfirmed = 0;
    data.map((item) => (totalDeltaConfirmed += Number(item.deltaconfirmed)));
    let totalDeltaRecovered = 0;
    data.map((item) => (totalDeltaRecovered += Number(item.deltarecovered)));
    let totalDeltaDeaths = 0;
    data.map((item) => (totalDeltaDeaths += Number(item.deltadeaths)));

    data.sort(function (x, y) {
      let a = x.lastupdatedtime.split(/\//);
      let b = y.lastupdatedtime.split(/\//);
      return (
        toTimestamp([b[1], b[0], b[2]].join("/")) -
        toTimestamp([a[1], a[0], a[2]].join("/"))
      );
    });

    if (isLoaded) {
      return (
        <div
          className="container fadeInUp"
          style={{ marginTop: "10px", marginBottom: "-7px" }}
        >
          <div
            className="home-toggle"
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span className="font-weight-bold" style={{ color: "#3f51b5" }}>
              <h4
                className=" total"
                style={{
                  textTransform: "uppercase",
                }}
              >
                <span style={{ verticalAlign: "0.1rem", cursor: "pointer" }}>
                  <QueryBuilderTwoToneIcon color="primary" fontSize="small" />
                </span>
                &nbsp;
                <span style={{ color: "#3f51b5" }}>
                  {isNaN(Date.parse(formatDate(lastUpdated)))
                    ? ""
                    : formatDateAbsolute(lastUpdated)}
                </span>
                &nbsp;|&nbsp;
                <span
                  onClick={() => {
                    ReactGa.event({
                      category: "Icon",
                      action: "update clicked",
                    });
                    this.setState({ toggleActive: !toggleActive });
                  }}
                  style={{ verticalAlign: "0.1rem", cursor: "pointer" }}
                >
                  {!toggleActive ? (
                    !wasSeen ? (
                      <Badge
                        color="secondary"
                        overlap="circle"
                        variant="dot"
                        fontSize="inherit"
                        onClick={this.close.bind(this)}
                      >
                        <NotificationsNoneOutlinedIcon color="primary" />
                      </Badge>
                    ) : (
                      <NotificationsNoneOutlinedIcon color="primary" />
                    )
                  ) : (
                    <NotificationsOffTwoToneIcon color="disabled" />
                  )}
                </span>
                &nbsp;|&nbsp;
                <span style={{ color: "red" }}>{items.length}</span>
                <span style={{ color: "#3f51b5" }}>
                  {" "}
                  STATES/UTs AFFECTED
                </span>{" "}
                <span
                  style={{
                    verticalAlign: "0.1rem",
                    cursor: "pointer",
                  }}
                >
                  <GroupWorkTwoToneIcon color="primary" fontSize="small" />
                </span>
              </h4>
            </span>
          </div>
          <div className="w-100"></div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {toggleActive && (
              <div
                className="alert"
                role="alert"
                style={{
                  marginBottom: "5px",
                  border: "none",
                  background: "rgba(108,117,125,.0627451)",
                  boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                <h6
                  className="align-middle"
                  style={{ fontSize: 12, color: "#3a3838" }}
                >
                  <h6 style={{ fontSize: 12, color: "#3a3838" }}>
                    NEW! Added separate page for every State/UT. Select any
                    State/UT below.
                  </h6>
                  <span style={{ color: "#11789b" }}>ATTENTION</span>: We are
                  now{" "}
                  <a
                    style={{ color: "navy" }}
                    href="https://www.covidindiastats.com"
                  >
                    {" "}
                    covidindiastats.com{" "}
                  </a>
                </h6>
              </div>
            )}
            {toggleActive &&
              (totalDeltaConfirmed ||
              totalDeltaRecovered ||
              totalDeltaDeaths ? (
                data.slice(0, 9).map(
                  (item) =>
                    Number(item.deltaconfirmed) !== 0 && (
                      <div
                        className="alert hoveralert"
                        role="alert"
                        style={{
                          marginBottom: "5px",
                          border: "none",
                          background: "rgba(108,117,125,.0627451)",
                          boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <h6 style={{ fontSize: 10, color: "grey" }}>
                          {"about " +
                            timeSince(
                              new Date(
                                [
                                  item.lastupdatedtime.split(/\//)[1],
                                  item.lastupdatedtime.split(/\//)[0],
                                  item.lastupdatedtime.split(/\//)[2],
                                ].join("/")
                              ).getTime()
                            ) +
                            "  "}
                          <span
                            style={{ verticalAlign: "0.09rem", fontSize: 7 }}
                          >
                            <FiberManualRecordIcon
                              fontSize="inherit"
                              color="action"
                            />
                          </span>
                        </h6>
                        <h6
                          style={{ fontSize: 12, color: "#3a3838" }}
                        >{` ${Number(item.deltaconfirmed)} new case${
                          Number(item.deltaconfirmed) > 1 ? "s" : ""
                        }${
                          Number(item.deltarecovered) > 0
                            ? (Number(item.deltadeaths) ? ", " : " and ") +
                              item.deltarecovered +
                              " recovered"
                            : ""
                        }${
                          Number(item.deltadeaths) > 0
                            ? (Number(item.deltarecovered) ||
                              Number(item.deltaconfirmed)
                                ? " and "
                                : ", ") +
                              item.deltadeaths +
                              " died"
                            : ""
                        } in ${item.state}`}</h6>
                      </div>
                    )
                )
              ) : (
                <div
                  className="alert"
                  role="alert"
                  style={{
                    marginBottom: "5px",
                    border: "none",
                    background: "rgba(108,117,125,.0627451)",
                    boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                    marginTop: "10px",
                    animation: "ease-in",
                    animationDuration: "1s",
                    cursor: "pointer",
                  }}
                >
                  <h6 style={{ fontSize: 12, color: "#3a3838" }}>
                    {" "}
                    No new updates!
                  </h6>
                </div>
              ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Updates;
