import React, { Component } from "react";
import * as Icon from "react-feather";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import Updates from "./updates";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import parse from "html-react-parser";
import Switch from "react-switch";
import ReactGa from "react-ga";
import shield from "../utils/shield.svg";
import MiniSparkline from "./miniSparkline";
import {
  commaSeperated,
  DeltaArrow,
  DeltaValue,
  stateFullName,
} from "../utils/common-functions";
import { AppContext } from "./../context/index";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isDataLoading: true,
      total: [],
      delta: [],
      data: [],
      allStatesData: [],
      sortConfirmed: true,
      sortActive: false,
      sortRecovered: false,
      sortDeceased: false,
      sortTested: false,
      sortVaccinated: false,
      sortOrder: true,
      percentageToggleActive: false,
    };
    this.onPercentageToggle = this.onPercentageToggle.bind(this);
  }

  onPercentageToggle(percentageToggleActive) {
    this.setState({ percentageToggleActive });
  }

  static contextType = AppContext;

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          total: json.statewise.filter((item) => item.state === "Total"),
          delta: json.statewise,
          data: json.cases_time_series,
        });
      })
    );
  }

  componentDidUpdate() {
    const [allData] = this.context.allData;
    const [isLoading] = this.context.isLoading;
    const { allStatesData, isDataLoading } = this.state;

    // console.table({ allData });

    if (!isLoading && isDataLoading) {
      for (let key in allData) {
        if (key !== "UN") {
          const stateKeys = Object.keys(allData[key]["dates"]);
          allStatesData.push({
            code: key,
            name: stateFullName[key],
            data: allData[key]["dates"][stateKeys[stateKeys.length - 1]],
          });
        }
      }
      this.setState({ allStatesData, isDataLoading: false });
    }
  }

  render() {
    const {
      isLoaded,
      total,
      delta,
      data,
      sortConfirmed,
      sortActive,
      sortRecovered,
      sortDeceased,
      sortTested,
      sortVaccinated,
      sortOrder,
      percentageToggleActive,
      allStatesData,
      isDataLoading,
    } = this.state;

    const getActiveNumber = (total) => {
      const confirmed = total?.confirmed;
      const recovered = total?.recovered;
      const deceased = total?.deceased;

      return confirmed - recovered - deceased;
    };

    const totalVaccinated = localStorage.getItem("lastTotalVaccinated");

    const dailyConfirmed = [];
    data.map((item) => dailyConfirmed.push(Number(item.dailyconfirmed)));

    const dailyActive = [];
    data.map((item) =>
      dailyActive.push(
        Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased)
      )
    );

    const dailyRecovered = [];
    data.map((item) => dailyRecovered.push(Number(item.dailyrecovered)));

    const dailyDeceased = [];
    data.map((item) => dailyDeceased.push(Number(item.dailydeceased)));

    if (sortConfirmed) {
      allStatesData.sort(function (x, y) {
        return sortOrder
          ? Number(y?.data?.total?.confirmed) -
              Number(x?.data?.total?.confirmed)
          : Number(x?.data?.total?.confirmed) -
              Number(y?.data?.total?.confirmed);
      });
    }
    if (sortActive) {
      allStatesData.sort(function (x, y) {
        return !sortOrder
          ? Number(getActiveNumber(y?.data?.total)) -
              Number(getActiveNumber(x?.data?.total))
          : Number(getActiveNumber(x?.data?.total)) -
              Number(getActiveNumber(y?.data?.total));
      });
    }
    if (sortRecovered) {
      allStatesData.sort(function (x, y) {
        return !sortOrder
          ? Number(y?.data?.total?.recovered) -
              Number(x?.data?.total?.recovered)
          : Number(x?.data?.total?.recovered) -
              Number(y?.data?.total?.recovered);
      });
    }
    if (sortDeceased) {
      allStatesData.sort(function (x, y) {
        return !sortOrder
          ? Number(y?.data?.total?.deceased) - Number(x?.data?.total?.deceased)
          : Number(x?.data?.total?.deceased) - Number(y?.data?.total?.deceased);
      });
    }

    if (sortTested) {
      allStatesData.sort(function (x, y) {
        return !sortOrder
          ? Number(y?.data?.total?.tested) - Number(x?.data?.total?.tested)
          : Number(x?.data?.total?.tested) - Number(y?.data?.total?.tested);
      });
    }

    if (sortVaccinated) {
      allStatesData.sort(function (x, y) {
        return !sortOrder
          ? Number(y?.data?.total?.vaccinated) -
              Number(x?.data?.total?.vaccinated)
          : Number(x?.data?.total?.vaccinated) -
              Number(y?.data?.total?.vaccinated);
      });
    }

    const sparklinedata = [];
    const sparklineconfirmed = [];
    const sparklineactive = [];
    const sparklinerecovered = [];
    const sparklinedeceased = [];

    data.slice(data.length - 20, data.length).map((item) =>
      sparklinedata.push({
        confirmed: Number(item.dailyconfirmed),
        active:
          Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased),
        recovered: Number(item.dailyrecovered),
        deceased: Number(item.dailydeceased),
        date: item.date,
      })
    );

    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklineconfirmed.push(Number(item.dailyconfirmed)));
    data
      .slice(data.length - 20, data.length)
      .map((item) =>
        sparklineactive.push(
          Number(item.dailyconfirmed) -
            Number(item.dailyrecovered) -
            Number(item.dailydeceased)
        )
      );
    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklinerecovered.push(Number(item.dailyrecovered)));
    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklinedeceased.push(Number(item.dailydeceased)));

    if (isLoaded) {
      return (
        <div className="statsTable">
          <div
            className="topStats fadeInUp"
            style={{
              marginBottom: "8px",
              animationDelay: "0.5s",
              borderRadius: "6px",
            }}
          >
            <table
              className="table table-sm table-borderless"
              style={{ marginBottom: "-1px" }}
            >
              <thead>
                <tr>
                  <th
                    className="span delta graphWidth"
                    style={{
                      color: "rgb(66, 179, 244)",
                      background: "rgba(66, 179, 244, 0.1)",
                    }}
                  >
                    CONFIRMED
                  </th>
                  <th
                    className="delta span graphWidth"
                    style={{
                      background: "rgba(255, 7, 58, 0.125)",
                      color: "rgb(255, 80, 100)",
                    }}
                  >
                    ACTIVE
                  </th>
                  <th
                    className="text-success delta span graphWidth"
                    style={{ background: "rgba(88, 189, 88, 0.2)" }}
                  >
                    RECOVERED
                  </th>
                  <th
                    className="text-secondary delta span graphWidth"
                    style={{
                      background: "rgba(92, 87, 86, 0.2)",
                      fontWeight: 600,
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
                    style={{ fontSize: 12, color: "rgb(66, 179, 244)" }}
                  >
                    {Number(delta[0].deltaconfirmed) > 0 ? (
                      ""
                    ) : (
                      <Icon.Meh
                        size={12}
                        strokeWidth={3}
                        fill="rgba(23, 162, 184, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}

                    {Number(delta[0].deltaconfirmed) > 0
                      ? "+" + commaSeperated(delta[0].deltaconfirmed)
                      : ""}
                  </h6>
                  <h6
                    style={{
                      textAlign: "center",
                      color: "rgb(66, 179, 244)",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={Number(total[0].confirmed)}
                      duration={2}
                      separator=","
                    />
                  </h6>

                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={0}
                      type={sparklineconfirmed}
                      fill="#42b3f4"
                      stroke="rgba(66, 179, 244, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h6
                    className="delta"
                    style={{ color: "#ff446a", fontSize: 12 }}
                  >
                    <Icon.Heart
                      size={12}
                      strokeWidth={3}
                      fill="#ff446a"
                      style={{ verticalAlign: "-0.2rem" }}
                    />
                  </h6>
                  <h6 style={{ color: "#ff446a", textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].active)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].active) / Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={1}
                      type={sparklineactive}
                      fill="#ff446a"
                      stroke="rgba(255, 68, 106, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h5 className="text-success delta" style={{ fontSize: 12 }}>
                    {Number(delta[0].deltarecovered) > 0 ? (
                      ""
                    ) : (
                      <Icon.Smile
                        size={12}
                        strokeWidth={3}
                        fill="rgba(23, 162, 184, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}
                    {Number(delta[0].deltarecovered) > 0
                      ? "+" + commaSeperated(delta[0].deltarecovered)
                      : ""}
                  </h5>
                  <h6 className="text-success" style={{ textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].recovered)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].recovered) /
                          Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={2}
                      type={sparklinerecovered}
                      fill="#58bd58"
                      stroke="rgba(88, 189, 88, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h6 className="text-secondary delta" style={{ fontSize: 12 }}>
                    {Number(delta[0].deltadeaths) > 0 ? (
                      ""
                    ) : (
                      <Icon.Meh
                        size={12}
                        strokeWidth={3}
                        fill="rgba(40, 167, 69, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}
                    {Number(delta[0].deltadeaths)
                      ? "+" + commaSeperated(delta[0].deltadeaths)
                      : ""}
                  </h6>
                  <h6 className="colorChange" style={{ textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].deaths)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].deaths) / Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={3}
                      type={sparklinedeceased}
                      fill="#5c5756"
                      stroke="rgba(92, 87, 86, 0.7)"
                    />
                  </section>
                </td>
              </tbody>
            </table>
            {(totalVaccinated || "") && totalVaccinated !== "-" && (
              <div className="vaccinatedPeople">
                <h6>
                  <img src={shield} className="vaccineShield" />{" "}
                  {commaSeperated(totalVaccinated)} have been Vaccinated
                </h6>
              </div>
            )}
          </div>

          <div className="w-100"></div>
          <div className="row">
            <Updates />
          </div>
          <div className="w-100"></div>
          <div
            className="indiaStateWiseHead fadeInUp"
            style={{
              textAlign: "center",
              animationDelay: "1.8s",
              marginTop: "-15px",
            }}
          >
            <h3>INDIA - STATEWISE </h3>
            <div style={{ alignItems: "right" }}>
              <div
                className="home-toggle float-left"
                style={{ marginTop: "2.5px" }}
              >
                <Switch
                  className="react-switch"
                  onChange={this.onPercentageToggle}
                  onClick={ReactGa.event({
                    category: "Switch %age",
                    action: "Switch %age clicked",
                  })}
                  checked={percentageToggleActive}
                  onColor="#6b7de4"
                  onHandleColor="#3e4da3"
                  handleDiameter={11}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0 0 5px rgba(0,0,0,0.2)"
                  activeBoxShadow="0 0 2px rgba(0,0,0,0.25)"
                  height={16}
                  width={35}
                ></Switch>
                <span
                  style={{
                    color: "#3e4da3",
                    fontWeight: "bold",
                    verticalAlign: "0.3rem",
                  }}
                >
                  &nbsp;%
                </span>
              </div>
            </div>
          </div>

          <div
            className="supportUs fadeInUp"
            style={{ animationDelay: "1.9s" }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="telegramLink"
              href="https://www.buymeacoffee.com/covidindiastats"
            >
              Support Covid India Stats
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="supportBtn"
              href="https://www.buymeacoffee.com/covidindiastats"
            >
              <FaHandHoldingHeart className="telegramIcon" />
            </a>
          </div>

          <div className="statewiseTable table-responsive">
            <table
              className="table table-sm fadeInUp table-borderless"
              style={{ animationDelay: "1.9s", fontFamily: "notosans" }}
            >
              <thead className="thead-dark">
                <tr>
                  <th className="th">State/UT</th>
                  <th
                    className="th"
                    onClick={() =>
                      this.setState({
                        sortConfirmed: true,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortTested: false,
                        sortVaccinated: false,
                        sortOrder: !sortOrder,
                      })
                    }
                    style={{ color: "rgb(66, 179, 244)" }}
                  >
                    Confirmed
                    {sortConfirmed && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                  <th
                    className="th"
                    style={{ color: "#ff446a" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: true,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortTested: false,
                        sortVaccinated: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    Active
                    {sortActive && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                  <th
                    className="th text-success"
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: true,
                        sortDeceased: false,
                        sortTested: false,
                        sortVaccinated: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    Recovered
                    {sortRecovered && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                  <th
                    className="th text-secondary"
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: true,
                        sortTested: false,
                        sortVaccinated: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    Deaths
                    {sortDeceased && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                  <th
                    className="th"
                    style={{ color: "#5969c2" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortTested: true,
                        sortVaccinated: false,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    Tested
                    {sortTested && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                  <th
                    className="th"
                    style={{ color: "#f4c430" }}
                    onClick={() =>
                      this.setState({
                        sortConfirmed: false,
                        sortActive: false,
                        sortRecovered: false,
                        sortDeceased: false,
                        sortTested: false,
                        sortVaccinated: true,
                        sortOrder: !sortOrder,
                      })
                    }
                  >
                    Vaccinated
                    {sortVaccinated && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {!isDataLoading &&
                  allStatesData.map(
                    (item, i) =>
                      item.code !== "TT" && (
                        <tr
                          className="tr"
                          key={item.code}
                          style={{
                            background:
                              i % 2 === 0 ? "rgba(63, 63, 95, 0.2)" : "",
                          }}
                        >
                          <td className="align-middle">
                            <div className="td-md-left">
                              <Link to={`/${item.code}`}>
                                <h6>{item.name}</h6>
                              </Link>
                              <h6>
                                {/* {item.statenotes ? (
                                  <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                      <Tooltip id="tooltip-right">
                                        {parse(item.statenotes)}
                                      </Tooltip>
                                    }
                                  >
                                    <span>
                                      <InfoOutlined
                                        color="inherit"
                                        fontSize="inherit"
                                        className="infoIcon"
                                      />
                                    </span>
                                  </OverlayTrigger>
                                ) : (
                                  ""
                                )} */}
                              </h6>
                            </div>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.confirmed}
                                color={"#42b3f4"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.confirmed}
                                color={"#42b3f4"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.confirmed)}
                              </h6>
                            </h6>
                          </td>
                          <td className="delta td-md align-middle">
                            <h6 className="arrowup">
                              <h6
                                className="delta td-md align-middle"
                                style={{ textAlign: "right" }}
                              >
                                {percentageToggleActive
                                  ? (
                                      (getActiveNumber(item?.data?.total) *
                                        100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(
                                      getActiveNumber(item?.data?.total)
                                    )}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.recovered}
                                color={"#28a745"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.recovered}
                                color={"#28a745"}
                              />
                              <h6 className="delta td-md align-middle">
                                {percentageToggleActive
                                  ? (
                                      (item?.data?.total?.recovered * 100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(
                                      item?.data?.total?.recovered
                                    )}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.deceased}
                                color={"#6c757d"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.deceased}
                                color={"#6c757d"}
                              />
                              <h6 className="delta td-md align-middle">
                                {percentageToggleActive
                                  ? (
                                      (item?.data?.total?.deceased * 100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(item?.data?.total?.deceased)}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.tested}
                                color={"#5969c2"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.tested}
                                color={"#5969c2"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.tested)}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.vaccinated}
                                color={"#f4c32f"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.vaccinated}
                                color={"#f4c32f"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.vaccinated)}
                              </h6>
                            </h6>
                          </td>
                        </tr>
                      )
                  )}
                {!isDataLoading &&
                  allStatesData.map(
                    (item, i) =>
                      item.code === "TT" && (
                        <tr
                          className="tr"
                          key={item.code}
                          style={{
                            background:
                              i % 2 === 0 ? "rgba(63, 63, 95, 0.2)" : "",
                          }}
                        >
                          <td className="align-middle">
                            <div className="td-md-left">
                              <Link to={`/${item.code}`}>
                                <h6>{item.name}</h6>
                              </Link>
                              <h6>
                                {/* {item.statenotes ? (
                                  <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                      <Tooltip id="tooltip-right">
                                        {parse(item.statenotes)}
                                      </Tooltip>
                                    }
                                  >
                                    <span>
                                      <InfoOutlined
                                        color="inherit"
                                        fontSize="inherit"
                                        className="infoIcon"
                                      />
                                    </span>
                                  </OverlayTrigger>
                                ) : (
                                  ""
                                )} */}
                              </h6>
                            </div>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.confirmed}
                                color={"#42b3f4"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.confirmed}
                                color={"#42b3f4"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.confirmed)}
                              </h6>
                            </h6>
                          </td>
                          <td className="delta td-md align-middle">
                            <h6 className="arrowup">
                              <h6
                                className="delta td-md align-middle"
                                style={{ textAlign: "right" }}
                              >
                                {percentageToggleActive
                                  ? (
                                      (getActiveNumber(item?.data?.total) *
                                        100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(
                                      getActiveNumber(item?.data?.total)
                                    )}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.recovered}
                                color={"#28a745"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.recovered}
                                color={"#28a745"}
                              />
                              <h6 className="delta td-md align-middle">
                                {percentageToggleActive
                                  ? (
                                      (item?.data?.total?.recovered * 100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(
                                      item?.data?.total?.recovered
                                    )}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.deceased}
                                color={"#6c757d"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.deceased}
                                color={"#6c757d"}
                              />
                              <h6 className="delta td-md align-middle">
                                {percentageToggleActive
                                  ? (
                                      (item?.data?.total?.deceased * 100) /
                                      item?.data?.total?.confirmed
                                    ).toFixed(1) + "%"
                                  : commaSeperated(item?.data?.total?.deceased)}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.tested}
                                color={"#5969c2"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.tested}
                                color={"#5969c2"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.tested)}
                              </h6>
                            </h6>
                          </td>
                          <td
                            className="delta td-md align-middle"
                            style={{ textAlign: "right" }}
                          >
                            <h6 className="arrowup">
                              <DeltaArrow
                                deltaType={item?.data?.delta?.vaccinated}
                                color={"#f4c32f"}
                              />
                              <DeltaValue
                                deltaType={item?.data?.delta?.vaccinated}
                                color={"#f4c32f"}
                              />
                              <h6 className="delta td-md align-middle">
                                {commaSeperated(item?.data?.total?.vaccinated)}
                              </h6>
                            </h6>
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Table;
