import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Switch from "react-switch";
import * as Icon from "react-feather";
import Choropleth from "./choropleth";
import WorldHomeCard from "./worldHomeCard";
import LinePlot from "./linePlot";
import BarPlot from "./barPlot";
import { abbreviateNumber, commaSeperated } from "../utils/common-functions";
import ReactGa from "react-ga";
import { AppContext } from "./../context/index";
import axios from "axios";

const months2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      totalTestsData: [],
      vaccinatedData: [],
      isLoaded: false,
      isLoaded2: false,
      toggleActive: false,
      clickConfirmedMap: false,
      clickActiveMap: true,
      clickRecoveredMap: false,
      clickDeceasedMap: false,
      beginning: true,
      twoWeeks: false,
      oneMonth: false,
    };
    this.onToggle = this.onToggle.bind(this);
    this.onClickConfirmed = this.onClickConfirmed.bind(this);
    this.onClickActive = this.onClickActive.bind(this);
    this.onClickRecovered = this.onClickRecovered.bind(this);
    this.onClickDeceased = this.onClickDeceased.bind(this);
    this.handleBeginning = this.handleBeginning.bind(this);
    this.handleTwoWeeks = this.handleTwoWeeks.bind(this);
    this.handleOneMonth = this.handleOneMonth.bind(this);
  }
  onToggle(toggleActive) {
    this.setState({ toggleActive });
  }

  onClickConfirmed(clickConfirmedMap) {
    this.setState({ clickConfirmedMap });
  }
  onClickActive(clickActiveMap) {
    this.setState({ clickActiveMap });
  }
  onClickRecovered(clickRecoveredMap) {
    this.setState({ clickRecoveredMap });
  }
  onClickDeceased(clickDeceasedMap) {
    this.setState({ clickDeceasedMap });
  }

  handleBeginning({ beginning }) {
    this.setState({ beginning });
  }
  handleTwoWeeks({ twoWeeks }) {
    this.setState({ twoWeeks });
  }
  handleOneMonth({ oneMonth }) {
    this.setState({ oneMonth });
  }

  static contextType = AppContext;

  componentDidMount() {
    axios
      .get("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then(({ data, status }) => {
        if (status === 200) {
          const totalData = data["TT"].dates;
          const indiaData = Object.keys(totalData).map((key) => ({
            dateymd: key,
            dailyconfirmed: totalData[key]?.delta?.confirmed || 0,
            dailyrecovered: totalData[key]?.delta?.recovered || 0,
            dailydeceased: totalData[key]?.delta?.deceased || 0,
            dailyvaccinated: 0,
            totalconfirmed: totalData[key]?.total?.confirmed || 0,
            totalrecovered: totalData[key]?.total?.recovered || 0,
            totaldeceased: totalData[key]?.total?.deceased || 0,
            totalvaccinated: 0,
          }));
          this.setState({
            isLoaded: true,
            data: indiaData,
            data2: [],
          });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  componentDidUpdate() {
    const [allData] = this.context.allData;
    const [isLoading] = this.context.isLoading;

    const { isLoaded2, totalTestsData, vaccinatedData } = this.state;

    if (!isLoading && !isLoaded2) {
      const totalData = allData?.TT?.dates;

      for (let key in totalData) {
        totalTestsData.push({
          testedasof: key,
          deltaSamplestested:
            totalData[key]?.delta?.tested || ""
              ? totalData[key]?.delta?.tested
              : 0,
          totalsamplestested:
            totalData[key]?.total?.tested || ""
              ? totalData[key]?.total?.tested
              : 0,
        });

        const splittedDate = key?.split("-");
        if (key === "2020-01-30") {
          vaccinatedData.push({
            date: `${splittedDate[2]} ${months2[Number(splittedDate[1]) - 1]} ${
              splittedDate?.[0]
            }`,
            deltaVaccinated: 0,
            totalVaccinated: 0,
          });
        } else {
          vaccinatedData.push({
            date: `${splittedDate[2]} ${months2[Number(splittedDate[1]) - 1]} ${
              splittedDate?.[0]
            }`,
            deltaVaccinated:
              totalData[key]?.delta?.vaccinated || ""
                ? totalData[key]?.delta?.vaccinated
                : "-",
            totalVaccinated:
              totalData[key]?.delta?.vaccinated || ""
                ? totalData[key]?.total?.vaccinated
                : "-",
          });
        }
      }

      this.setState({ totalTestsData, vaccinatedData, isLoaded2: true });
    }
  }

  render() {
    const {
      isLoaded,
      isLoaded2,
      data,
      data2,
      toggleActive,
      totalTestsData,
      vaccinatedData,
      clickConfirmedMap,
      clickActiveMap,
      clickRecoveredMap,
      clickDeceasedMap,
      beginning,
      twoWeeks,
      oneMonth,
    } = this.state;

    const dailyConfirmed = [];
    const dailyActiveJson = [];
    const dailyRecovered = [];
    const dailyDeceased = [];
    const dailyActive = [];
    const totalConfirmed = [];
    const totalActive = [];
    const totalActiveJson = [];
    const totalRecovered = [];
    const totalDeceased = [];

    data.map(
      (item) =>
        (item["newDate"] = `${item.dateymd?.split("-")[2]} ${
          months2[Number(item.dateymd?.split("-")[1]) - 1]
        } ${item.dateymd?.split("-")?.[0]}`)
    );

    data.map((item) => {
      dailyConfirmed.push(Number(item.dailyconfirmed));
      dailyActive.push(
        Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased)
      );
      dailyActiveJson.push({
        dailyactive:
          Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased),
        newDate: item.newDate,
      });
      dailyRecovered.push(Number(item.dailyrecovered));
      dailyDeceased.push(Number(item.dailydeceased));
      totalConfirmed.push(Number(item.totalconfirmed));
      totalActive.push(
        Number(item.totalconfirmed) -
          Number(item.totalrecovered) -
          Number(item.totaldeceased)
      );
      totalActiveJson.push({
        totalactive:
          Number(item.totalconfirmed) -
          Number(item.totalrecovered) -
          Number(item.totaldeceased),
        newDate: item.newDate,
      });
      totalRecovered.push(Number(item.totalrecovered));
      totalDeceased.push(Number(item.totaldeceased));
    });

    const date = data.map(
      (item) =>
        `${item.dateymd?.split("-")[2]} ${
          months2[Number(item.dateymd?.split("-")[1]) - 1]
        } ${item.dateymd?.split("-")?.[0]}`
    );

    const confirmedStatesData = data2.map((item) => ({
      id: item.statecode,
      state: item.state,
      value: Number(item.confirmed),
    }));
    const activeStatesData = data2.map((item) => ({
      id: item.statecode,
      state: item.state,
      value:
        Number(item.confirmed) - Number(item.recovered) - Number(item.deaths),
    }));
    const recoveredStatesData = data2.map((item) => ({
      id: item.statecode,
      state: item.state,
      value: Number(item.recovered),
    }));
    const deceasedStatesData = data2.map((item) => ({
      id: item.statecode,
      state: item.state,
      value: Number(item.deaths),
    }));

    const grandTotal = data2.find((item) => item.statecode === "TT" && item);

    const totalSamplesTested = totalTestsData.map((item) =>
      Number(item.totalsamplestested)
    );

    const testedDates = [];
    const testedData = [];
    const dailyTestedData = [];

    totalTestsData.map((item) => {
      testedData.push(item.totalsamplestested);
      dailyTestedData.push(item.deltaSamplestested);
      testedDates.push(
        `${item.testedasof?.split("-")[2]} ${
          months2[Number(item.testedasof?.split("-")[1]) - 1]
        } ${item.testedasof?.split("-")?.[0]}`
      );
    });

    const cumulativeDateFormattedTests = [];

    for (let i = 0; i < date.length; i++) {
      const index = testedDates.indexOf(date[i]);
      cumulativeDateFormattedTests.push({
        totaltested: testedData[index],
        date: `${Number(date[i]?.split(" ")?.[0])} ${date[i]?.split(" ")[1]} `,
      });
    }

    const dateFormattedTests = [];

    for (let i = 0; i < date.length; i++) {
      const index = testedDates.indexOf(date[i]);
      dateFormattedTests.push({
        totaltested: testedData[index],
        deltaSamplestested: dailyTestedData[index],
        date: date[i],
      });
    }

    const dailyDateFormattedTests = [];

    for (let i = 0; i < dateFormattedTests.length; i++) {
      dailyDateFormattedTests.push({
        dailytested: dateFormattedTests[i].deltaSamplestested,
        date: `${Number(date[i]?.split(" ")?.[0])} ${date[i]?.split(" ")[1]} `,
      });
    }

    let timelineLength = 0;

    if (isLoaded) {
      if (beginning) {
        timelineLength = 0;
      }
      if (twoWeeks) {
        timelineLength = data.length - 30;
      }
      if (oneMonth) {
        timelineLength = data.length - 90;
      }
    }

    const formattedVaccinatedData = [];

    if (isLoaded && isLoaded2) {
      date.map((d) => {
        let res = d;
        vaccinatedData.map((d2) => {
          if (res === d2.date) {
            res = d2;
          }
        });
        if (res.date === d) {
          formattedVaccinatedData.push({
            date: `${Number(d?.split(" ")?.[0])} ${d?.split(" ")[1]} `,
            deltaVaccinated: res.deltaVaccinated,
            totalVaccinated: res.totalVaccinated,
          });
        } else {
          formattedVaccinatedData.push({
            date: `${Number(d?.split(" ")?.[0])} ${d?.split(" ")[1]} `,
            deltaVaccinated: "-",
            totalVaccinated: "-",
          });
        }
      });

      let found = false;

      let totalVaccinated = 0;
      formattedVaccinatedData
        .slice(0)
        .reverse()
        .map((item) => {
          if (item.totalVaccinated !== "-" && !found) {
            found = true;
            totalVaccinated = item.totalVaccinated;
          }
        });
      localStorage.setItem("lastTotalVaccinated", totalVaccinated);
    }

    const contentStyle = {
      background: "rgba(255,255,255,0)",
      border: "none",
      borderRadius: "5px",
      fontSize: "0.7rem",
      fontFamily: "notosans",
      textTransform: "uppercase",
      textAlign: "left",
      lineHeight: 0.8,
    };

    if (isLoaded && isLoaded2) {
      return (
        <>
          <div>
            <div
              className="row"
              style={{ justifyContent: "center", marginBottom: "25px" }}
            >
              <WorldHomeCard />
            </div>
            <div className="w-100"></div>

            <div className="row">
              <div className="indiaMapHead">
                <h3
                  className="fadeInUp"
                  style={{
                    textAlign: "center",
                    animationDelay: "2s",
                    marginBottom: "15px",
                    paddingTop: "15px",
                  }}
                >
                  MAP OF INDIA
                </h3>
                <div
                  className="fadeInUp testpad"
                  style={{ animationDelay: "2.1s" }}
                >
                  <h6>
                    TEST SAMPLES
                    <h6 style={{ fontSize: 13 }}>
                      {commaSeperated(
                        totalSamplesTested[totalSamplesTested.length - 1]
                      )}
                      <h6 style={{ fontSize: 10 }}>
                        <Icon.PlusCircle
                          size={9}
                          strokeWidth={3}
                          fill="rgba(106, 68, 255, 0.2)"
                          style={{ verticalAlign: -1 }}
                        />{" "}
                        {commaSeperated(
                          totalSamplesTested[totalSamplesTested.length - 1] -
                            totalSamplesTested[totalSamplesTested.length - 2]
                        )}
                      </h6>
                    </h6>
                  </h6>
                </div>
              </div>

              <div className="w-100"></div>
              <div
                className="fadeInUp toggle-map"
                style={{ animationDelay: "2.05s" }}
              >
                <div
                  className="mapTabs"
                  onClick={() => {
                    this.setState({
                      clickConfirmedMap: true,
                      clickActiveMap: false,
                      clickRecoveredMap: false,
                      clickDeceasedMap: false,
                    });
                  }}
                  style={{
                    color: "rgb(66, 179, 244)",
                    background: `${
                      clickConfirmedMap
                        ? "rgba(66, 179, 244, 0.3)"
                        : "rgba(66, 179, 244, 0.125)"
                    }`,
                    border: `${
                      clickConfirmedMap
                        ? "2px solid rgba(66, 179, 244, 0.3)"
                        : "2px solid transparent"
                    }`,
                  }}
                >
                  <h6 className="pad">
                    CONFIRMED
                    <h6 style={{ fontSize: 13 }}>
                      {commaSeperated(grandTotal?.[0].confirmed)}
                      <h6 style={{ fontSize: 10 }}>
                        {Number(grandTotal?.[0].deltaconfirmed) > 0 ? (
                          <Icon.PlusCircle
                            size={9}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: -1 }}
                          />
                        ) : (
                          <Icon.Meh
                            size={9}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: -1 }}
                          />
                        )}
                        {Number(grandTotal?.[0].deltaconfirmed) > 0
                          ? " " + commaSeperated(grandTotal?.[0].deltaconfirmed)
                          : ""}
                      </h6>
                    </h6>
                  </h6>
                </div>
                <div
                  className="mapTabs"
                  onClick={() => {
                    this.setState({
                      clickConfirmedMap: false,
                      clickActiveMap: true,
                      clickRecoveredMap: false,
                      clickDeceasedMap: false,
                    });
                  }}
                  style={{
                    color: "rgb(255, 80, 100)",
                    backgroundColor: `${
                      clickActiveMap
                        ? "rgba(255, 7, 58, 0.25)"
                        : "rgba(255, 7, 58, 0.125)"
                    }`,
                    border: `${
                      clickActiveMap
                        ? "2px solid rgba(255, 7, 58, 0.3)"
                        : "2px solid transparent"
                    }`,
                  }}
                >
                  <h6 className="pad">
                    ACTIVE
                    <h6 style={{ fontSize: 13 }}>
                      {commaSeperated(grandTotal?.[0].active)}
                      <h6 style={{ fontSize: 10 }}>
                        {Number(grandTotal?.[0].deltaconfirmed) -
                          Number(grandTotal?.[0].deltarecovered) -
                          Number(grandTotal?.[0].deltadeaths) >
                        0 ? (
                          <Icon.PlusCircle
                            size={9}
                            strokeWidth={3}
                            fill="rgba(255, 68, 106, 0.2)"
                            style={{ verticalAlign: -1 }}
                          />
                        ) : (
                          <Icon.Heart
                            size={9}
                            strokeWidth={3}
                            fill="rgba(255, 68, 106, 0.4)"
                            style={{ verticalAlign: -1 }}
                          />
                        )}{" "}
                        {Number(grandTotal?.[0].deltaconfirmed) -
                          Number(grandTotal?.[0].deltarecovered) -
                          Number(grandTotal?.[0].deltadeaths) >
                        0
                          ? " " +
                            commaSeperated(
                              Number(grandTotal?.[0].deltaconfirmed) -
                                Number(grandTotal?.[0].deltarecovered) -
                                Number(grandTotal?.[0].deltadeaths)
                            )
                          : ""}
                      </h6>
                    </h6>
                  </h6>
                </div>
                <div
                  className="mapTabs"
                  onClick={() => {
                    this.setState({
                      clickActiveMap: false,
                      clickConfirmedMap: false,
                      clickRecoveredMap: true,
                      clickDeceasedMap: false,
                    });
                  }}
                  style={{
                    background: `${
                      clickRecoveredMap
                        ? "rgba(88, 189, 88, 0.3)"
                        : "rgba(88, 189, 88, 0.125)"
                    }`,
                    border: `${
                      clickRecoveredMap
                        ? "2px solid rgba(88, 189, 88, 0.3)"
                        : "2px solid transparent"
                    }`,
                  }}
                >
                  <h6 className="text-success pad">
                    RECOVERED
                    <h6 style={{ fontSize: 13 }}>
                      {commaSeperated(grandTotal?.[0].recovered)}
                      <h6 style={{ fontSize: 10 }}>
                        {Number(grandTotal?.[0].deltarecovered) > 0 ? (
                          <Icon.PlusCircle
                            size={9}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: -1 }}
                          />
                        ) : (
                          <Icon.Smile
                            size={9}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: -1 }}
                          />
                        )}
                        {Number(grandTotal?.[0].deltarecovered) > 0
                          ? " " + commaSeperated(grandTotal?.[0].deltarecovered)
                          : ""}
                      </h6>
                    </h6>
                  </h6>
                </div>
                <div
                  className="mapTabs"
                  onClick={() => {
                    this.setState({
                      clickActiveMap: false,
                      clickRecoveredMap: false,
                      clickConfirmedMap: false,
                      clickDeceasedMap: true,
                    });
                  }}
                  style={{
                    background: `${
                      clickDeceasedMap
                        ? "rgba(92, 87, 86, 0.4)"
                        : "rgba(92, 87, 86, 0.125)"
                    }`,
                    border: `${
                      clickDeceasedMap
                        ? "2px solid rgba(92, 87, 86, 0.4)"
                        : "2px solid transparent"
                    }`,
                  }}
                >
                  <h6 className="text-secondary pad">
                    DECEASED
                    <h6 style={{ fontSize: 13 }}>
                      {commaSeperated(grandTotal?.[0].deaths)}
                      <h6 style={{ fontSize: 10 }}>
                        {Number(grandTotal?.[0].deltadeaths) > 0 ? (
                          <Icon.PlusCircle
                            size={9}
                            strokeWidth={3}
                            fill="rgba(179, 173, 173, 0.1)"
                            style={{ verticalAlign: -1 }}
                          />
                        ) : (
                          <Icon.Meh
                            size={9}
                            strokeWidth={3}
                            fill="rgba(179, 173, 173, 0.1)"
                            style={{ verticalAlign: -1 }}
                          />
                        )}{" "}
                        {Number(grandTotal?.[0].deltadeaths) > 0
                          ? " " + commaSeperated(grandTotal?.[0].deltadeaths)
                          : ""}
                      </h6>
                    </h6>
                  </h6>
                </div>
              </div>

              <div className="w-100"></div>
              <div
                className="col fadeInUp indiaMapChoropleth"
                style={{ justifyContent: "left", animationDelay: "2.1s" }}
              >
                {clickConfirmedMap && (
                  <Choropleth
                    data={confirmedStatesData.slice(
                      1,
                      confirmedStatesData.length - 1
                    )}
                    colorLow="rgba(66, 179, 200, 0.92)"
                    colorHigh="rgb(66, 179, 200)"
                    type="Infected"
                    borderColor="rgba(66, 179, 190, 0.9)"
                    onMouseEnter={ReactGa.event({
                      category: "India map",
                      action: "India map clicked",
                    })}
                  />
                )}
                {clickActiveMap && (
                  <Choropleth
                    data={activeStatesData.slice(
                      1,
                      activeStatesData.length - 1
                    )}
                    colorLow="rgba(221, 50, 85, 0.85)"
                    colorHigh="rgba(221, 50, 85, 1)"
                    borderColor="rgb(221, 50, 85, 0.8)"
                    fill="rgb(228, 116, 138)"
                    type="Active"
                    onMouseEnter={ReactGa.event({
                      category: "India map",
                      action: "India map clicked",
                    })}
                  />
                )}
                {clickRecoveredMap && (
                  <Choropleth
                    data={recoveredStatesData.slice(
                      1,
                      recoveredStatesData.length - 1
                    )}
                    colorLow="rgba(40, 167, 69, 0.92)"
                    colorHigh="rgba(40, 167, 69, 1)"
                    type="Recovered"
                    borderColor="rgba(40, 167, 69, 0.85)"
                    onMouseEnter={ReactGa.event({
                      category: "India map",
                      action: "India map clicked",
                    })}
                  />
                )}
                {clickDeceasedMap && (
                  <Choropleth
                    data={deceasedStatesData.slice(
                      1,
                      deceasedStatesData.length - 1
                    )}
                    colorLow="rgba(74, 79, 83, 0.8)"
                    colorHigh="rgba(74, 79, 83, 1)"
                    type="Deceased"
                    borderColor="rgba(128, 128, 128, 0.9)"
                    onMouseEnter={ReactGa.event({
                      category: "India map",
                      action: "India map clicked",
                    })}
                  />
                )}
              </div>
              <div className="w-100"></div>
              <div
                className="col fadeInUp"
                style={{
                  textAlign: "left",
                  animationDelay: "2.3s",
                  marginBottom: "-8px",
                }}
              >
                <h6
                  className="home-title"
                  style={{
                    color: "#ff446a",
                    wordBreak: "keep-all",
                    wordWrap: "normal",
                  }}
                >
                  SPREAD TRENDS
                </h6>
              </div>
              <div
                className="col fadeInUp"
                style={{ animationDelay: "2.45s", alignItems: "right" }}
              >
                <div
                  className="home-toggle float-right"
                  style={{ marginTop: "10px" }}
                >
                  <h6 className="spreadGraphType">
                    <span
                      style={{
                        fontSize: 13,
                        color: "purple",
                        background: "rgba(238, 130, 238)",
                        borderRadius: "3px",
                        paddingRight: "2px",
                        paddingLeft: "2px",
                      }}
                    >
                      {!toggleActive ? `CUMULATIVE` : `EVERYDAY`}
                    </span>
                  </h6>
                  <Switch
                    className="react-switch"
                    onChange={this.onToggle}
                    checked={toggleActive}
                    onColor="#2f8dd4"
                    onHandleColor="#114f7e"
                    handleDiameter={11}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0 0 5px rgba(0,0,0,0.2)"
                    activeBoxShadow="0 0 2px rgba(0,0,0,0.25)"
                    height={16}
                    width={35}
                  ></Switch>
                </div>
              </div>
            </div>
            <div className="w-100"></div>
            <div className="row">
              <div className="col fadeInUp" style={{ animationDelay: "2.5s" }}>
                <h6
                  className="timelineButton"
                  onClick={() =>
                    this.setState({
                      beginning: true,
                      twoWeeks: false,
                      oneMonth: false,
                    })
                  }
                >
                  &nbsp;Beginning{" "}
                  {beginning && <Icon.CheckCircle size={10} strokeWidth={3} />}
                </h6>
              </div>

              <div className="col fadeInUp" style={{ animationDelay: "2.55s" }}>
                <h6
                  className="timelineButton"
                  onClick={() =>
                    this.setState({
                      beginning: false,
                      twoWeeks: false,
                      oneMonth: true,
                    })
                  }
                >
                  &nbsp;3 Months{" "}
                  {oneMonth && <Icon.CheckCircle size={10} strokeWidth={3} />}
                </h6>
              </div>

              <div className="col fadeInUp" style={{ animationDelay: "2.6s" }}>
                <h6
                  className="timelineButton"
                  onClick={() =>
                    this.setState({
                      beginning: false,
                      twoWeeks: true,
                      oneMonth: false,
                    })
                  }
                >
                  &nbsp;1 Month{" "}
                  {twoWeeks && <Icon.CheckCircle size={10} strokeWidth={3} />}
                </h6>
              </div>
            </div>
            <div
              className="row fadeInUp"
              style={{ animationDelay: "2.65s", marginTop: "-8px" }}
            >
              {!toggleActive && (
                <>
                  <LinePlot
                    type="confirmed"
                    bgColor="rgba(150, 196, 216, 0.1)"
                    titleClass="text-info"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalConfirmed}
                    daily={dailyConfirmed}
                    stroke="rgb(66, 179, 244)"
                    lineStroke="#35aad1"
                    color1="#6ebed6"
                    color2="#55b2ce"
                    dataKey="totalconfirmed"
                  />

                  <div className="w-100"></div>
                  <LinePlot
                    type="active"
                    bgColor="rgba(255, 7, 58, 0.125)"
                    titleClass="text-danger"
                    data={totalActiveJson}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalActive}
                    daily={dailyActive}
                    stroke="rgba(255, 7, 58, 1)"
                    lineStroke="#ff446a"
                    color1="#f16783"
                    color2="#ff446a"
                    dataKey="totalactive"
                  />
                  <div className="w-100"></div>
                  <LinePlot
                    type="recovered"
                    bgColor="rgba(88, 189, 88, 0.125)"
                    titleClass="text-success"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalRecovered}
                    daily={dailyRecovered}
                    stroke="#28a745"
                    lineStroke="#78b978"
                    color1="#81ce81"
                    color2="#5cb85c"
                    dataKey="totalrecovered"
                  />
                  <div className="w-100"></div>
                  <LinePlot
                    type="deceased"
                    bgColor="rgba(49, 43, 43, 0.05)"
                    titleClass="text-secondary"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalDeceased}
                    daily={dailyDeceased}
                    stroke="#6c757d"
                    lineStroke="#666565"
                    color1="#808080"
                    color2="#5e5a5a"
                    dataKey="totaldeceased"
                  />
                  <div className="w-100"></div>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        backgroundColor: "rgba(106, 68, 200, 0.1)",
                        borderRadius: "6px",
                        paddingTop: "5px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-70px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: "0.8rem",
                          color: "#3e4da3",
                        }}
                      >
                        TESTED
                        <h6 style={{ fontSize: "12px", color: "#5969c2" }}>
                          {
                            cumulativeDateFormattedTests[
                              cumulativeDateFormattedTests.length - 1
                            ].date
                          }

                          <h5 style={{ fontSize: "0.8rem", color: "#3e4da3" }}>
                            {commaSeperated(
                              cumulativeDateFormattedTests[
                                cumulativeDateFormattedTests.length - 1
                              ].totaltested
                            )}{" "}
                            <span style={{ fontSize: 8 }}>
                              +
                              {commaSeperated(
                                cumulativeDateFormattedTests[
                                  cumulativeDateFormattedTests.length - 1
                                ].totaltested -
                                  cumulativeDateFormattedTests[
                                    cumulativeDateFormattedTests.length - 2
                                  ].totaltested
                              )}
                            </span>
                          </h5>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.2}
                      >
                        <LineChart
                          data={cumulativeDateFormattedTests.slice(
                            timelineLength,
                            cumulativeDateFormattedTests.length
                          )}
                          margin={{
                            top: 40,
                            right: -24,
                            left: 10,
                            bottom: -8,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{
                              stroke: "#6471b3",
                              fill: "#6471b3",
                              strokeWidth: 0.2,
                            }}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickSize={5}
                            tickCount={5}
                            axisLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(
                                Math.max(...totalSamplesTested) / 1000000
                              ) * 1000000,
                            ]}
                            orientation="right"
                            tick={{
                              stroke: "#6471b3",
                              fill: "#6471b3",
                              strokeWidth: 0.2,
                            }}
                            tickFormatter={abbreviateNumber}
                            tickSize={5}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickCount={8}
                            axisLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <Tooltip
                            contentStyle={contentStyle}
                            cursor={false}
                            position={{ x: 120, y: 15 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totaltested"
                            stroke="#6471b3"
                            strokeWidth="2"
                            strokeLinecap="round"
                            name="Tested"
                            isAnimationActive={true}
                            connectNulls={true}
                            dot={({ cx, cy }) =>
                              cx &&
                              cy && (
                                <svg
                                  x={cx - 2.25}
                                  y={cy - 2.25}
                                  width={4.5}
                                  height={4.5}
                                  fill="#3e4da3"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
                                </svg>
                              )
                            }
                            activeDot={{ r: 2.5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </div>

                  <div className="w-100"></div>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        backgroundColor: "rgba(255, 223, 0, 0.1)",
                        borderRadius: "6px",
                        paddingTop: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-70px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: "0.8rem",
                          color: "#f4c430",
                        }}
                      >
                        VACCINE DOSES
                        <h6 style={{ fontSize: "12px", color: "#f4c430aa" }}>
                          {
                            formattedVaccinatedData[
                              formattedVaccinatedData.length - 1
                            ].date
                          }

                          <h5
                            style={{ fontSize: "0.8rem", color: "#f4c430dd" }}
                          >
                            {commaSeperated(
                              formattedVaccinatedData[
                                formattedVaccinatedData.length - 1
                              ].totalVaccinated
                            )}{" "}
                            {formattedVaccinatedData[
                              formattedVaccinatedData.length - 1
                            ].deltaVaccinated !== "-" && (
                              <span style={{ fontSize: 8 }}>
                                +
                                {commaSeperated(
                                  formattedVaccinatedData[
                                    formattedVaccinatedData.length - 1
                                  ].deltaVaccinated
                                )}
                              </span>
                            )}
                          </h5>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.2}
                      >
                        <LineChart
                          data={formattedVaccinatedData.slice(
                            timelineLength,
                            formattedVaccinatedData.length
                          )}
                          margin={{
                            top: 40,
                            right: -24,
                            left: 10,
                            bottom: -8,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{
                              stroke: "#f4c430dd",
                              fill: "#f4c430dd",
                              strokeWidth: 0.2,
                            }}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickSize={5}
                            tickCount={5}
                            axisLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <YAxis
                            domain={[0, "auto"]}
                            orientation="right"
                            tick={{
                              stroke: "#f4c430dd",
                              fill: "#f4c430dd",
                              strokeWidth: 0.2,
                            }}
                            tickFormatter={abbreviateNumber}
                            tickSize={5}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickCount={8}
                            axisLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <Tooltip
                            contentStyle={contentStyle}
                            cursor={false}
                            position={{ x: 120, y: 15 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalVaccinated"
                            stroke="#f4c430"
                            strokeWidth="2"
                            strokeLinecap="round"
                            name="Vaccinated"
                            isAnimationActive={true}
                            connectNulls={true}
                            dot={({ cx, cy }) =>
                              cx &&
                              cy && (
                                <svg
                                  x={cx - 2.25}
                                  y={cy - 2.25}
                                  width={4.5}
                                  height={4.5}
                                  fill="#f4c430"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
                                </svg>
                              )
                            }
                            activeDot={{ r: 2.5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </div>
                  <div className="w-100"></div>
                </>
              )}
              {toggleActive && (
                <>
                  <BarPlot
                    type="confirmed"
                    bgColor="rgba(150, 196, 216, 0.1)"
                    titleClass="text-info"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyConfirmed}
                    divideBy={1000}
                    dataKey="dailyconfirmed"
                    stroke="rgb(66, 179, 244)"
                    color1="#6ebed6"
                    color2="#55b2ce"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="active"
                    bgColor="rgba(255, 7, 58, 0.125)"
                    titleClass="text-danger"
                    data={dailyActiveJson}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyActive}
                    divideBy={1000}
                    dataKey="dailyactive"
                    stroke="rgba(255, 7, 58, 1)"
                    color1="#f16783"
                    color2="#ff446a"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="recovered"
                    bgColor="rgba(177, 247, 177, 0.125)"
                    titleClass="text-success"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyRecovered}
                    divideBy={1000}
                    dataKey="dailyrecovered"
                    stroke="#28a745"
                    color1="#7ed87e"
                    color2="#5cb85c"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="deceased"
                    bgColor="rgba(49, 43, 43, 0.05)"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyDeceased}
                    divideBy={100}
                    dataKey="dailydeceased"
                    titleClass="text-secondary"
                    stroke="#6c757d"
                    color1="#808080"
                    color2="#5e5a5a"
                  />
                  <div className="w-100"></div>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        alignSelf: "center",
                        backgroundColor: "rgba(106, 68, 200, 0.125)",
                        borderRadius: "6px",
                        paddingTop: "5px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-70px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: "0.8rem",
                          color: "#3e4da3",
                        }}
                      >
                        TESTED
                        <h6 style={{ fontSize: "12px", color: "#5969c2" }}>
                          {date.slice(-1)?.[0]?.split(" ")?.[0]}{" "}
                          {date.slice(-1)?.[0]?.split(" ")[1]}
                          <h5 style={{ fontSize: "0.8rem", color: "#3e4da3" }}>
                            {commaSeperated(
                              dailyDateFormattedTests[
                                dailyDateFormattedTests.length - 1
                              ].dailytested
                            )}
                            <span style={{ fontSize: 8 }}>
                              {`${
                                dailyDateFormattedTests[
                                  dailyDateFormattedTests.length - 1
                                ].dailytested -
                                  dailyDateFormattedTests[
                                    dailyDateFormattedTests.length - 2
                                  ].dailytested >=
                                0
                                  ? "+"
                                  : "-"
                              }${commaSeperated(
                                Math.abs(
                                  dailyDateFormattedTests[
                                    dailyDateFormattedTests.length - 1
                                  ].dailytested -
                                    dailyDateFormattedTests[
                                      dailyDateFormattedTests.length - 2
                                    ].dailytested
                                )
                              )}`}
                            </span>
                          </h5>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.2}
                      >
                        <BarChart
                          data={dailyDateFormattedTests.slice(
                            timelineLength,
                            dailyDateFormattedTests.length
                          )}
                          margin={{
                            top: 40,
                            right: -24,
                            left: 10,
                            bottom: -8,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{
                              stroke: "#6471b3",
                              fill: "#6471b3",
                              strokeWidth: 0.2,
                            }}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickSize={5}
                            tickCount={5}
                            axisLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <YAxis
                            orientation="right"
                            tick={{
                              stroke: "#6471b3",
                              fill: "#6471b3",
                              strokeWidth: 0.2,
                            }}
                            tickFormatter={abbreviateNumber}
                            tickSize={5}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickCount={8}
                            axisLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#6471b3",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <Tooltip
                            contentStyle={contentStyle}
                            cursor={{ fill: "transparent" }}
                            position={{ x: 120, y: 15 }}
                          />
                          <Bar
                            dataKey="dailytested"
                            name="Tested"
                            fill="#3e4da3"
                            radius={[3, 3, 0, 0]}
                            barSize={20}
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Testedbar",
                                action: "Testedbar hover",
                              });
                            }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </section>
                  </div>
                  <div className="w-100"></div>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        alignSelf: "center",
                        backgroundColor: "rgba(255, 223, 0, 0.1)",
                        borderRadius: "6px",
                        paddingTop: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-70px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: "0.8rem",
                          color: "#f4c430",
                        }}
                      >
                        VACCINE DOSES
                        <h6 style={{ fontSize: "12px", color: "#f4c430aa" }}>
                          {date.slice(-1)?.[0]?.split(" ")?.[0]}{" "}
                          {date.slice(-1)?.[0]?.split(" ")[1]}
                          <h5
                            style={{ fontSize: "0.8rem", color: "#f4c430dd" }}
                          >
                            {commaSeperated(
                              formattedVaccinatedData[
                                formattedVaccinatedData.length - 1
                              ].deltaVaccinated
                            )}{" "}
                            <span style={{ fontSize: 8 }}>
                              {formattedVaccinatedData[
                                formattedVaccinatedData.length - 1
                              ].deltaVaccinated !== "-" &&
                                `${
                                  formattedVaccinatedData[
                                    formattedVaccinatedData.length - 1
                                  ].deltaVaccinated -
                                    formattedVaccinatedData[
                                      formattedVaccinatedData.length - 2
                                    ].deltaVaccinated >=
                                  0
                                    ? "+"
                                    : "-"
                                }${commaSeperated(
                                  Math.abs(
                                    formattedVaccinatedData[
                                      formattedVaccinatedData.length - 1
                                    ].deltaVaccinated -
                                      formattedVaccinatedData[
                                        formattedVaccinatedData.length - 2
                                      ].deltaVaccinated
                                  )
                                )}`}
                            </span>
                          </h5>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.2}
                      >
                        <BarChart
                          data={formattedVaccinatedData.slice(
                            timelineLength,
                            formattedVaccinatedData.length
                          )}
                          margin={{
                            top: 40,
                            right: -24,
                            left: 10,
                            bottom: -8,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{
                              stroke: "#f4c430dd",
                              fill: "#f4c430dd",
                              strokeWidth: 0.2,
                            }}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickSize={5}
                            tickCount={5}
                            axisLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <YAxis
                            orientation="right"
                            tick={{
                              stroke: "#f4c430dd",
                              fill: "#f4c430dd",
                              strokeWidth: 0.2,
                            }}
                            tickFormatter={abbreviateNumber}
                            tickSize={5}
                            style={{
                              fontSize: "0.62rem",
                              fontFamily: "notosans",
                            }}
                            tickCount={8}
                            axisLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                            tickLine={{
                              stroke: "#f4c430dd",
                              strokeWidth: "1.5px",
                            }}
                          />
                          <Tooltip
                            contentStyle={contentStyle}
                            cursor={{ fill: "transparent" }}
                            position={{ x: 120, y: 15 }}
                          />
                          <Bar
                            dataKey="deltaVaccinated"
                            name="Vaccinated"
                            fill="#f4c430"
                            radius={[3, 3, 0, 0]}
                            barSize={20}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </section>
                  </div>
                </>
              )}
              <div className="w-100"></div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Graph;
