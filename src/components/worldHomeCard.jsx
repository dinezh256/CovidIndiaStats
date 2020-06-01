import React, { Component } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import CountUp from "react-countup";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { worldTotalData } from "./API/index";
import { NavLink } from "react-router-dom";
import { commaSeperated } from "../utils/common-functions";

class WorldHomeCard extends Component {
  state = {
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
  };
  async componentDidMount() {
    const {
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
    } = await worldTotalData();
    this.setState({
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
    });
  }
  render() {
    const {
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
    } = this.state;

    return (
      <React.Fragment>
        <div
          className="fadeInUp worldHomeCard"
          style={{
            marginBottom: "-5px",
            animationDelay: "1.8s",
            boxShadow: "0 0 20px rgba(0,0,0,0.25)",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              background: "#e6e8f1",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              borderSpacing: "1px",
              textAlign: "center",
            }}
          >
            <NavLink to="/dive" className="coverage">
              <LanguageIcon
                size="inherit"
                color="primary"
                style={{ verticalAlign: "-0.25rem" }}
              />
              &nbsp; GLOBAL COVERAGE
              <ArrowRightIcon
                size="small"
                color="primary"
                style={{ verticalAlign: "-0.25rem" }}
                className="float"
              />
            </NavLink>
          </div>
          <div className="w-100"></div>
          <table
            className="table table-sm table-borderless"
            style={{ paddingTop: "10px" }}
          >
            <thead>
              <tr>
                <th className="text-info span delta" style={{ width: "25%" }}>
                  CONFIRMED
                </th>
                <th
                  className="delta span"
                  style={{
                    width: "25%",

                    color: "#ff446a",
                  }}
                >
                  ACTIVE
                </th>
                <th
                  className="text-success delta span"
                  style={{ width: "25%" }}
                >
                  Recovered
                </th>
                <th
                  className="text-secondary delta span"
                  style={{
                    fontWeight: 600,
                    width: "25%",
                  }}
                >
                  DECEASED
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              <td>
                <h6
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(23, 162, 184, 0.7)",
                  }}
                >
                  +
                  {todayCases !== undefined
                    ? commaSeperated(Number(todayCases))
                    : ""}
                </h6>
                <h5
                  className="text-info"
                  style={{ textAlign: "center", paddingTop: "5px" }}
                >
                  {cases !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(cases)}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    ""
                  )}
                </h5>
              </td>

              <td>
                <h6
                  className="delta"
                  style={{
                    color: "rgba(255, 68, 106, 0.7)",
                    fontSize: 12,
                  }}
                >
                  {cases !== undefined
                    ? ((Number(active) / Number(cases)) * 100).toFixed(1)
                    : ""}
                  %
                </h6>
                <h5
                  style={{
                    color: "#ff446a",
                    textAlign: "center",
                    paddingTop: "5px",
                  }}
                >
                  {active !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(active)}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    ""
                  )}
                </h5>
              </td>

              <td>
                <h5
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(40, 167, 69, 0.7)",
                  }}
                >
                  {cases !== undefined
                    ? ((Number(recovered) / Number(cases)) * 100).toFixed(1)
                    : ""}
                  %
                </h5>
                <h5
                  className="text-success"
                  style={{ textAlign: "center", paddingTop: "5px" }}
                >
                  {recovered !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(recovered)}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    ""
                  )}
                </h5>
              </td>

              <td>
                <h6
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(108, 117, 125, 0.7)",
                  }}
                >
                  +
                  {todayDeaths !== undefined
                    ? commaSeperated(Number(todayDeaths))
                    : ""}
                </h6>
                <h5
                  className="text-secondary"
                  style={{ textAlign: "center", paddingTop: "5px" }}
                >
                  {deaths !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(deaths)}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    ""
                  )}
                </h5>
              </td>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default WorldHomeCard;
