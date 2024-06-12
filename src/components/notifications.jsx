import React, { Component } from "react";
import { Link } from "react-router-dom";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { toTimestamp, timeSince } from "./../utils/common-functions";

class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      toggleActive: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://data.covid19india.org/v4/min/data.min.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          data: json.statewise.filter(
            (item) => item.confirmed !== "0" && item.state !== "Total"
          ),
        });
      })
    );
  }

  render() {
    const { data, isLoaded } = this.state;

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
          className="container fade-in-up"
          style={{ marginTop: "10px", marginBottom: "-7px" }}
        >
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {totalDeltaConfirmed || totalDeltaRecovered || totalDeltaDeaths ? (
              data.slice(0, 25).map(
                (item, index) =>
                  Number(item.deltaconfirmed) > 0 && (
                    <div
                      className="alert hoveralert fade-in-up"
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
                          ) +
                          "  "}
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

                        <Link key={item.statecode} to={`/${item.statecode}`}>
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
                      </h6>
                    </div>
                  )
              )
            ) : (
              <div
                className="alert hoveralert"
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
                <h6 style={{ fontSize: 12 }}>No new updates till now!</h6>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Updates;
