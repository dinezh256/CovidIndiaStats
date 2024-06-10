import React, { Component } from "react";
import { indianstates } from "./API/index";
import StatePicker from "./statepicker";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { Theme, makeStyles } from "@material-ui/core/styles";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import {
  commaSeperated,
  DeltaArrow,
  DeltaValue,
} from "../utils/common-functions";

class StateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cross: true,
      stateData: [],
      requiredData: [],
      requiredState: "",
      back: false,
      sortConfirmed: true,
      sortActive: false,
      sortRecovered: false,
      sortDeceased: false,
      sortOrder: true,
    };
    this.onBack = this.onBack.bind(this);
    this.onSortConfirmed = this.onSortConfirmed.bind(this);
    this.onSortActive = this.onSortActive.bind(this);
    this.onSortRecovered = this.onSortRecovered.bind(this);
    this.onSortDeceased = this.onSortDeceased.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
  }

  onBack({ back }) {
    this.setState({ back });
  }

  onSortConfirmed({ sortConfirmed }) {
    this.setState({ sortConfirmed });
  }

  onSortActive({ sortActive }) {
    this.setState({ sortActive });
  }

  onSortRecovered({ sortRecovered }) {
    this.setState({ sortRecovered });
  }

  onSortDeceased({ sortDeceased }) {
    this.setState({ sortDeceased });
  }

  handleSortOrder({ sortOrder }) {
    this.setState({ sortOrder });
  }

  async componentDidMount() {
    const fetchedStates = await indianstates();
    this.setState({ stateData: fetchedStates });
  }

  handleStateChange = async (state) => {
    const requiredStateData = [];
    this.state.stateData.map((item) => {
      if (state === item.statecode) requiredStateData.push(item.districtData);
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
      back,
      sortConfirmed,
      sortActive,
      sortRecovered,
      sortDeceased,
      sortOrder,
    } = this.state;

    if (requiredData.length) {
      if (sortConfirmed) {
        requiredData[0].sort(function (x, y) {
          return sortOrder
            ? Number(y.confirmed) - Number(x.confirmed)
            : Number(x.confirmed) - Number(y.confirmed);
        });
      }
      if (sortActive) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.active) - Number(x.active)
            : Number(x.active) - Number(y.active);
        });
      }
      if (sortRecovered) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.recovered) - Number(x.recovered)
            : Number(x.recovered) - Number(y.recovered);
        });
      }
      if (sortDeceased) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.deceased) - Number(x.deceased)
            : Number(x.deceased) - Number(y.deceased);
        });
      }
    }

    const useStylesBootstrap = makeStyles((theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
    }));

    function BootstrapTooltip(props) {
      const classes = useStylesBootstrap();

      return (
        <Tooltip disableTouchListener arrow classes={classes} {...props} />
      );
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
      <>
        <div
          className="row fadeInUp"
          style={{
            alignItems: "center",
            alignContent: "center",
            animationDelay: "1.8s",
            marginBottom: "12px",
          }}
        >
          <StatePicker handleStateChange={this.handleStateChange} back={back} />
        </div>
        <div className="w-100"></div>
        <div className="w-100"></div>
        {requiredData.length && back ? (
          <div className="row">
            <div className="col-10 fadeInUp" style={{ animationDelay: "0.3s" }}>
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
                <Link
                  className="visitState"
                  key={requiredState}
                  to={`/${requiredState}`}
                >
                  <span className="viewState">
                    VISIT {stateFullName[requiredState]} MAIN PAGE
                  </span>
                </Link>
              </button>
            </div>
            <div className="col-2 fadeInUp" style={{ animationDelay: "0.35s" }}>
              <h6
                className="backButton"
                onClick={() => {
                  this.setState({
                    back: false,
                  });
                }}
              >
                HIDE
              </h6>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-100"></div>
        {requiredData.length && back ? (
          <div className="row fadeInUp" style={{ animationDelay: "0.5s" }}>
            <table
              className="table table-sm table-borderless"
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
                    onClick={() =>
                      this.setState({
                        sortConfirmed: true,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    CONFIRMED
                  </th>
                  <th
                    className="th sticky-top narrowRow"
                    style={{ color: "rgb(255, 68, 106)", textAlign: "center" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: true,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    ACTIVE
                  </th>
                  <th
                    className="th sticky-top text-success"
                    style={{ textAlign: "center" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: true,
                        sortDeceased: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    RECOVERED
                  </th>
                  <th
                    className="th sticky-top narrowRow text-secondary"
                    id="line1"
                    style={{ textAlign: "center" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: true,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    DEATHS
                  </th>
                  <th
                    className="th sticky-top text-secondary"
                    id="line2"
                    style={{ textAlign: "center", width: "70px" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: true,
                        sortOrder: !sortOrder,
                      })
                    }
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
                          color: "grey",
                          backgroundColor: "rgba(63, 63, 95, 0.2)",
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
                          <DeltaArrow
                            deltaType={district.delta.confirmed}
                            color={"#42b3f4"}
                          />
                          <DeltaValue deltaType={district.delta.confirmed} />
                        </span>
                        &nbsp;&nbsp;
                        {commaSeperated(district.confirmed)}
                      </td>
                      <td
                        className="delta td text-secondary narrowRow align-middle"
                        style={{ textAlign: "right" }}
                      >
                        {Number(district.active) > 0
                          ? commaSeperated(district.active)
                          : Number(district.active) < 0
                          ? "-" + commaSeperated(Math.abs(district.active))
                          : "-"}
                      </td>
                      <td
                        className="delta td text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-success">
                          <DeltaArrow
                            deltaType={district.delta.recovered}
                            color={"#28a745"}
                          />
                          <DeltaValue deltaType={district.delta.recovered} />
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
                          <DeltaArrow
                            deltaType={district.delta.deceased}
                            color={"#6c757d"}
                          />
                          <DeltaValue deltaType={district.delta.deceased} />
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
      </>
    );
  }
}

export default StateTable;
