import React, { Component } from "react";
import ReactGa from "react-ga";
import { NavLink } from "react-router-dom";
import {
  formatDate,
  formatDateAbsolute,
  toTimestamp,
  timeSince,
} from "../utils/common-functions";
import * as Icon from "react-feather";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import Badge from "@material-ui/core/Badge";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import GroupWorkOutlinedIcon from "@material-ui/icons/GroupWorkOutlined";
import { Link } from "react-router-dom";

class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      toggleActive: false,
      items: [],
      lastUpdated: "",
      wasSeen: false,
    };
    this.onToggle = this.onToggle.bind(this);
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
        let localLastUpdated = localStorage.getItem("localLastUpdated");

        if (localLastUpdated === this.state.lastUpdated) {
          this.setState({ wasSeen: true });
        } else {
          this.setState({ wasSeen: false });
        }
      })
    );
  }

  close() {
    localStorage.setItem("localLastUpdated", this.state.lastUpdated);
    this.setState({ wasSeen: true });
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
            <span style={{ color: "#3f51b5" }}>
              <h4 className="updates font-weight-bold">

                <span id="line1" style={{ color: "#3f51b5" }}>
                  <NavLink to="/notifications" id="line1">
                    {!wasSeen ? (
                      <Badge
                        color="primary"
                        overlap="circle"
                        variant="dot"
                        fontSize="inherit"
                        onClick={this.close.bind(this)}
                      >
                        <span
                          className="about"
                          onClick={() =>
                            ReactGa.event({
                              category: "Notification",
                              action: "Bell clicked",
                            })
                          }
                        >
                          <Icon.Bell
                            size={20}
                            style={{ color: "rgb(62, 77, 163)" }}
                          />{" "}
                        </span>
                      </Badge>
                    ) : (
                      <span
                        className="about"
                        onClick={() =>
                          ReactGa.event({
                            category: "Notification",
                            action: "Bell clicked",
                          })
                        }
                      >
                        <Icon.Bell
                          size={20}
                          style={{ color: "rgb(62, 77, 163)" }}
                        />
                      </span>
                    )}
                  </NavLink>{" "}
                  |&nbsp;
                </span>
                <span id="line2">&nbsp;|&nbsp;</span>
                <span
                  id="line2"
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
                        color="primary"
                        overlap="circle"
                        variant="dot"
                        fontSize="inherit"
                        onClick={this.close.bind(this)}
                      >
                        <NotificationsIcon color="primary" />
                      </Badge>
                    ) : (
                      <NotificationsIcon color="primary" />
                    )
                  ) : (
                    <NotificationsOffIcon color="primary" />
                  )}
                </span>
                <span id="line2">&nbsp;|&nbsp;</span>
                <span className="updates" style={{ color: "red" }}>
                  {items.length}
                </span>
                <span className="updates" style={{ color: "#3f51b5" }}>
                  {" "}
                  STATES/UTs AFFECTED
                </span>{" "}
                <span
                  style={{
                    verticalAlign: "0.1rem",
                    cursor: "pointer",
                  }}
                >
                  <GroupWorkOutlinedIcon color="primary" fontSize="small" />
                </span>
              </h4>
            </span>
          </div>
          <div className="w-100"></div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {toggleActive &&
              (totalDeltaConfirmed ||
              totalDeltaRecovered ||
              totalDeltaDeaths ? (
                data.slice(0, 9).map(
                  (item, index) =>
                    Number(item.deltaconfirmed) > 0 && (
                      <div
                        className="alert hoveralert fadeInUp"
                        role="alert"
                        style={{
                          marginBottom: "5px",
                          border: "none",
                          background: "rgba(108,117,125,.0627451)",
                          boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                          marginTop: "10px",
                          cursor: "pointer",
                          animationDelay: `${0.1 * index}s`,
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
                            )}{" "}
                          &nbsp;
                          <span style={{ color: "green" }}>
                            <FiberManualRecordIcon fontSize="inherit" />
                          </span>
                        </h6>
                        <h6 style={{ fontSize: 12 }}>
                          {` ${Number(item.deltaconfirmed)} new case${
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
                          } in ${item.state}`}
                          {"  "}
                          {
                            <Link
                              key={item.statecode}
                              to={`/${item.statecode}`}
                            >
                              <LaunchRoundedIcon
                                style={{
                                  color: "peru",
                                  background: "rgba(255, 153, 0, 0.3)",
                                  borderRadius: "3px",
                                  padding: "2 2",
                                  fontWeight: 700,
                                  fontSize: 16,
                                }}
                              />
                            </Link>
                          }
                        </h6>
                      </div>
                    )
                )
              ) : (
                <div
                  className="alert hoveralert fadeInUp"
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
                  <h6 style={{ fontSize: 12, color: "grey" }}>
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
