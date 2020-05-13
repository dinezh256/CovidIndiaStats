import React, { Component } from "react";
import { indianstates } from "./API/index";
import StatePicker from "./statepicker";
import * as Icon from "react-feather";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { Theme, makeStyles } from "@material-ui/core/styles";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

class StateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cross: true,
      stateData: [],
      requiredData: [],
      requiredState: "",
      zones: null,
      zonesLoaded: false,
      back: false,
    };
    this.onBack = this.onBack.bind(this);
  }

  onBack({ back }) {
    this.setState({ back });
  }

  async componentDidMount() {
    fetch("https://api.covid19india.org/zones.json").then((res) =>
      res.json().then((json) => {
        this.setState({ zones: json.zones, zonesLoaded: true });
      })
    );

    const fetchedStates = await indianstates();
    this.setState({ stateData: fetchedStates });
  }

  handleStateChange = async (state) => {
    const requiredStateData = [];
    this.state.stateData.map((item) => {
      if (state === item.statecode) requiredStateData.push(item.districtData);
    });
    requiredStateData[0].sort(function (x, y) {
      return Number(y.confirmed) - Number(x.confirmed);
    });
    this.setState({
      requiredData: requiredStateData,
      requiredState: state,
      back: true,
    });
  };

  render() {
    const {
      requiredData,
      requiredState,
      zonesLoaded,
      zones,
      back,
    } = this.state;

    const useStylesBootstrap = makeStyles((theme: Theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
    }));

    function BootstrapTooltip(props: TooltipProps) {
      const classes = useStylesBootstrap();

      return (
        <Tooltip disableTouchListener arrow classes={classes} {...props} />
      );
    }

    function commaSeperated(x) {
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      let otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== "") lastThree = "," + lastThree;
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }

    function districtZone(district) {
      const redZone = [];
      const orangeZone = [];
      const greenZone = [];
      if (zonesLoaded) {
        zones.map((item) => {
          if (item.zone === "Red") redZone.push(item.district);
        });
        zones.map((item) => {
          if (item.zone === "Orange") orangeZone.push(item.district);
        });
        zones.map((item) => {
          if (item.zone === "Green") greenZone.push(item.district);
        });
      }
      if (redZone.includes(district)) {
        return "#ff446a";
      }
      if (orangeZone.includes(district)) {
        return "rgb(255, 153, 0)";
      }
      if (greenZone.includes(district)) {
        return "rgb(40, 167, 69)";
      } else return "rgb(150, 150, 150)";
    }

    const stateFullName = {
      AP: "Andhra Pradesh",
      AN: "A & N Islands",
      AR: "Arunachal Pradesh",
      AS: "Assam",
      BR: "Bihar",
      CH: "Chandigarh",
      CT: "Chattisgarh",
      DN: "DNH DU",
      DL: "Delhi",
      GA: "Goa",
      GJ: "Gujarat",
      HP: "Himachal Pradesh",
      HR: "Haryana",
      JH: "Jharkhand",
      JK: "Jammu & Kashmir",
      KA: "Karnataka",
      KL: "Kerala",
      LA: "Ladakh",
      LD: "Lakshadweep",
      MH: "Maharashtra",
      ML: "Meghalaya",
      MN: "Manipur",
      MP: "Madhya Pradesh",
      MZ: "Mizoram",
      NL: "Nagaland",
      OR: "Odisha",
      PB: "Punjab",
      PY: "Puducherry",
      RJ: "Rajasthan",
      SK: "Sikkim",
      TG: "Telangana",
      TN: "Tamil Nadu",
      TR: "Tripura",
      UP: "Uttar Pradesh",
      UT: "Uttarakhand",
      WB: "West Bengal",
    };

    return (
      <React.Fragment>
        <div
          className="row fadeInUp"
          style={{
            alignItems: "center",
            alignContent: "center",
            animationDelay: "1.8s",
            marginBottom: "12px",
          }}
        >
          <StatePicker handleStateChange={this.handleStateChange} />
        </div>
        <div className="w-100"></div>
        {requiredData.length && back ? (
          <React.Fragment>
            <div className="row">
              <h6
                style={{
                  fontSize: 9,
                  color: "grey",
                  textAlign: "left",
                  marginBottom: -35,
                }}
              >
                District not mentioned? Might be in the GreenZone{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.indiatoday.in/india/story/red-orange-green-zones-full-current-update-list-districts-states-india-coronavirus-1673358-2020-05-01"
                >
                  <Icon.Link size={12} color="#3e4da3" strokeWidth={3} />
                </a>
              </h6>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        <div className="w-100"></div>
        {requiredData.length && back ? (
          <div className="row">
            <div className="col-10">
              <button
                className="btnMainPage btn"
                style={{
                  textAlign: "center",
                  color: "rgba(255, 100, 0, 1)",
                  backgroundColor: "rgba(255, 153, 0, 0.3)",
                  width: 300,
                  fontWeight: 600,
                  fontSize: 12,
                  alignContent: "center",
                  textDecoration: "none",
                  marginBottom: 10,
                  marginTop: -15,
                }}
              >
                <Link key={requiredState} to={`/${requiredState}`}>
                  <span className="viewState">
                    VISIT {stateFullName[requiredState]} MAIN PAGE
                  </span>
                </Link>
              </button>
            </div>
            <div className="col-2">
              <h6
                className="backButton"
                onClick={() => {
                  this.setState({
                    back: false,
                  });
                }}
              >
                BACK
              </h6>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-100"></div>
        {requiredData.length && back ? (
          <div className="row fadeInUp" style={{ transitionDelay: "0.3s" }}>
            <table
              className="table table-sm table-striped table-borderless"
              style={{
                minWidth: "350px",
                tableLayout: "fixed",
                width: "100%",
                marginBottom: "-15px",
                marginTop: "-20px",
              }}
              align="center"
            >
              <thead className="thead-dark">
                <tr>
                  <th className="th wideRow sticky-top" id="line1">
                    DISTRICT
                  </th>
                  <th
                    className="th sticky-top"
                    id="line2"
                    style={{ width: "175px" }}
                  >
                    DISTRICT
                  </th>
                  <th
                    className="th sticky-top text-info"
                    style={{ textAlign: "center" }}
                  >
                    CONFIRMED
                  </th>
                  <th
                    className="th sticky-top narrowRow"
                    style={{ color: "rgb(255, 68, 106)", textAlign: "center" }}
                  >
                    ACTIVE
                  </th>
                  <th
                    className="th sticky-top text-success"
                    style={{ textAlign: "center" }}
                  >
                    RECOVERED
                  </th>
                  <th
                    className="th sticky-top narrowRow text-secondary"
                    id="line1"
                    style={{ textAlign: "center" }}
                  >
                    DEATHS
                  </th>
                  <th
                    className="th sticky-top text-secondary"
                    id="line2"
                    style={{ textAlign: "center", width: "70px" }}
                  >
                    DECEASED
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {requiredData.map((item) =>
                  item.map((district) => (
                    <tr className="tr">
                      <td
                        className="tdleft align-middle"
                        style={{
                          color: `${districtZone(district.district)}`,
                          borderLeftWidth: "5px",
                          borderStyle: "solid",
                        }}
                      >
                        {district.district}
                        {district.notes ? (
                          <BootstrapTooltip title={parse(district.notes)}>
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="inherit"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {Number(district.delta.confirmed) !== 0 && (
                            <Icon.ArrowUp
                              color="#42b3f4"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-info">
                            {Number(district.delta.confirmed) === 0
                              ? ""
                              : commaSeperated(district.delta.confirmed)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {commaSeperated(district.confirmed)}
                      </td>
                      <td
                        className="delta td text-secondary narrowRow align-middle"
                        style={{ textAlign: "right" }}
                      >
                        {Number(district.active)
                          ? commaSeperated(district.active)
                          : "-"}
                      </td>
                      <td
                        className="delta td text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-success">
                          {Number(district.delta.recovered) !== 0 && (
                            <Icon.ArrowUp
                              color="#28a745"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-success align-middle">
                            {Number(district.delta.recovered) === 0
                              ? ""
                              : commaSeperated(district.delta.recovered)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {Number(district.recovered)
                          ? commaSeperated(district.recovered)
                          : "-"}
                      </td>
                      <td
                        className="delta td text-secondary narrowRow align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-secondary">
                          {Number(district.delta.deceased) !== 0 && (
                            <Icon.ArrowUp
                              color="#6c757d"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-secondary align-middle">
                            {Number(district.delta.deceased) === 0
                              ? ""
                              : commaSeperated(district.delta.deceased)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {Number(district.deceased)
                          ? commaSeperated(district.deceased)
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default StateTable;
