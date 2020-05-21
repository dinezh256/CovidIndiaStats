import React, { Component } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import CountUp from "react-countup";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { worldTotalData } from "./API/index";
import { NavLink } from "react-router-dom";

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

    function commaSeperated(x) {
      if (x !== undefined || x !== 0) {
        x = x.toString();
        let lastThree = x.substring(x.length - 3);
        let otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== "") lastThree = "," + lastThree;
        let res =
          otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
      } else return x;
    }

    return (
      <React.Fragment>
        <div
          className="fadeInUp"
          style={{
            marginBottom: "-5px",
            animationDelay: "1.8s",
            boxShadow: "0 0 20px rgba(0,0,0,0.25)",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              background: "#e6e8f1",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              borderSpacing: "1px",
              textAlign: "center",
            }}
          >
            <LanguageIcon
              size="inherit"
              color="primary"
              style={{ verticalAlign: "-0.25rem" }}
            />
            <NavLink to="/dive" className="coverage">
              &nbsp; GLOBAL COVERAGE
            </NavLink>
            <ArrowRightIcon
              size="small"
              color="primary"
              style={{ verticalAlign: "-0.25rem" }}
              className="float"
            />
          </div>
          <div className="w-100"></div>
          <table className="table table-sm table-borderless">
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
                  +{commaSeperated(Number(todayCases))}
                </h6>
                <h5 className="text-info" style={{ textAlign: "center" }}>
                  <CountUp
                    start={0}
                    end={Number(cases)}
                    duration={2}
                    separator=","
                  />
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
                  {((Number(active) / Number(cases)) * 100).toFixed(1)}%
                </h6>
                <h5 style={{ color: "#ff446a", textAlign: "center" }}>
                  <CountUp
                    start={0}
                    end={Number(active)}
                    duration={2}
                    separator=","
                  />
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
                  {((Number(recovered) / Number(cases)) * 100).toFixed(1)}%
                </h5>
                <h5 className="text-success" style={{ textAlign: "center" }}>
                  <CountUp
                    start={0}
                    end={Number(recovered)}
                    duration={2}
                    separator=","
                  />
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
                  +{commaSeperated(Number(todayDeaths))}
                </h6>
                <h5 className="text-secondary" style={{ textAlign: "center" }}>
                  <CountUp
                    start={0}
                    end={Number(deaths)}
                    duration={2}
                    separator=","
                  />
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
