import React, { Component } from "react";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import CountUp from "react-countup";
import { worldTotalData } from "./API/index";
import { NavLink } from "react-router-dom";
import { commaSeperated } from "../utils/common-functions";
import * as Icon from "react-feather";

class WorldHomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: 0,
      todayCases: 0,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      active: 0,
      showData: false,
    };
    this.onClickShow = this.onClickShow.bind(this);
  }

  onClickShow(showData) {
    this.setState({ showData });
  }

  async componentDidMount() {
    const { cases, todayCases, deaths, todayDeaths, recovered, active } =
      await worldTotalData();
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
      showData,
    } = this.state;

    return (
      <div
        className="fadeInUp worldHomeCard"
        style={{
          marginBottom: "-5px",
          animationDelay: "1.8s",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            borderSpacing: "1px",
            textAlign: "center",
          }}
        >
          <NavLink to="/global" className="coverage">
            <PublicRoundedIcon
              size="inherit"
              color="primary"
              style={{ verticalAlign: "-0.25rem" }}
            />
            &nbsp; GLOBAL STATS
          </NavLink>
          <span
            style={{
              cursor: "pointer",
              verticalAlign: "0.15rem",
              marginLeft: "35px",
            }}
            onClick={() => this.setState({ showData: !showData })}
          >
            {!showData ? (
              <Icon.ChevronUp className="showUp" color="#3f51b5" />
            ) : (
              <Icon.ChevronDown className="showDown" color="#3f51b5" />
            )}
          </span>
        </div>
        <div className="w-100"></div>

        {!showData && (
          <table className="table table-sm table-borderless">
            <thead>
              <tr>
                <th
                  className="span delta"
                  style={{ color: "rgb(66, 179, 244)", width: "25%" }}
                >
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
              <tr>
                <td>
                  <h6
                    className="delta"
                    style={{
                      fontSize: 12,
                      color: "rgba(66, 179, 244, 0.7)",
                    }}
                  >
                    +
                    {todayCases !== undefined
                      ? commaSeperated(Number(todayCases))
                      : ""}
                  </h6>
                  <h6
                    style={{ color: "rgb(66, 179, 244)", textAlign: "center" }}
                  >
                    {cases !== undefined ? (
                      <CountUp
                        start={0}
                        end={Number(cases)}
                        duration={2}
                        separator=","
                        formattingFn={(number) => commaSeperated(number)}
                      />
                    ) : (
                      ""
                    )}
                  </h6>
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
                  <h6
                    style={{
                      color: "#ff446a",
                      textAlign: "center",
                    }}
                  >
                    {active !== undefined ? (
                      <CountUp
                        start={0}
                        end={Number(active)}
                        duration={2}
                        separator=","
                        formattingFn={(number) => commaSeperated(number)}
                      />
                    ) : (
                      ""
                    )}
                  </h6>
                </td>
                <td>
                  <h6
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
                  </h6>
                  <h6 className="text-success" style={{ textAlign: "center" }}>
                    {recovered !== undefined ? (
                      <CountUp
                        start={0}
                        end={Number(recovered)}
                        duration={2}
                        separator=","
                        formattingFn={(number) => commaSeperated(number)}
                      />
                    ) : (
                      ""
                    )}
                  </h6>
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
                  <h6
                    className="text-secondary"
                    style={{ textAlign: "center" }}
                  >
                    {deaths !== undefined ? (
                      <CountUp
                        start={0}
                        end={Number(deaths)}
                        duration={2}
                        separator=","
                        formattingFn={(number) => commaSeperated(number)}
                      />
                    ) : (
                      ""
                    )}
                  </h6>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default WorldHomeCard;
