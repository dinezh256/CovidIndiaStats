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
import { format } from "d3";
import Choropleth from "./choropleth";
import ReactGa from "react-ga";
import * as Icon from "react-feather";
import WorldHomeCard from "./worldHomeCard";
import LinePlot from "./linePlot";
import BarPlot from "./barPlot";
import { commaSeperated } from "../utils/common-functions";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      tests: [],
      isLoaded: false,
      toggleActive: false,
      clickConfirmedMap: true,
      clickActiveMap: false,
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

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          data: json.cases_time_series,
          data2: json.statewise,
          tests: json.tested,
        });
      })
    );
  }

  render() {
    const {
      isLoaded,
      data,
      data2,
      toggleActive,
      tests,
      clickConfirmedMap,
      clickActiveMap,
      clickRecoveredMap,
      clickDeceasedMap,
      beginning,
      twoWeeks,
      oneMonth,
    } = this.state;
    const graphClass = window.innerWidth < 767 ? "" : "container";

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

    const dailyActiveJson = [];
    data.map((item) =>
      dailyActiveJson.push({
        dailyactive:
          Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased),
        date: item.date,
      })
    );

    const dailyRecovered = [];
    data.map((item) => dailyRecovered.push(Number(item.dailyrecovered)));
    const dailyDeceased = [];
    data.map((item) => dailyDeceased.push(Number(item.dailydeceased)));

    const totalConfirmed = [];
    data.map((item) => totalConfirmed.push(Number(item.totalconfirmed)));
    const totalActive = [];
    data.map((item) =>
      totalActive.push(
        Number(item.totalconfirmed) -
          Number(item.totalrecovered) -
          Number(item.totaldeceased)
      )
    );

    const totalActiveJson = [];
    data.map((item) =>
      totalActiveJson.push({
        totalactive:
          Number(item.totalconfirmed) -
          Number(item.totalrecovered) -
          Number(item.totaldeceased),
        date: item.date,
      })
    );
    const totalRecovered = [];
    data.map((item) => totalRecovered.push(Number(item.totalrecovered)));
    const totalDeceased = [];
    data.map((item) => totalDeceased.push(Number(item.totaldeceased)));

    const date = [];
    data.map((item) => date.push(item.date));

    const confirmedStatesData = [];
    data2.map((item) =>
      confirmedStatesData.push({
        id: item.statecode,
        state: item.state,
        value: Number(item.confirmed),
      })
    );
    const activeStatesData = [];
    data2.map((item) =>
      activeStatesData.push({
        id: item.statecode,
        state: item.state,
        value:
          Number(item.confirmed) - Number(item.recovered) - Number(item.deaths),
      })
    );
    const recoveredStatesData = [];
    data2.map((item) =>
      recoveredStatesData.push({
        id: item.statecode,
        state: item.state,
        value: Number(item.recovered),
      })
    );
    const deceasedStatesData = [];
    data2.map((item) =>
      deceasedStatesData.push({
        id: item.statecode,
        state: item.state,
        value: Number(item.deaths),
      })
    );
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

    const totalSamplesTested = [];
    tests.map((item) =>
      totalSamplesTested.push(Number(item.totalsamplestested))
    );

    const testedDates = [];
    const testedData = [];

    tests.map((item) => {
      if (Number(item.totalsamplestested)) {
        testedData.push(item.totalsamplestested);
        testedDates.push(
          `${item.updatetimestamp.split(/\//)[0]} ${
            months2[
              new Date([
                item.updatetimestamp.split(/\//)[1],
                item.updatetimestamp.split(/\//)[0],
                item.updatetimestamp.split(/\//)[2],
              ]).getMonth()
            ]
          } `
        );
      }
    });

    const removeItemIndices = [2, 4, 6, 8, 10, 12, 14, 16];
    for (let i = removeItemIndices.length - 1; i >= 0; i--) {
      testedData.splice(removeItemIndices[i], 1);
      testedDates.splice(removeItemIndices[i], 1);
    }

    const cumulativeDateFormattedTests = [];

    for (let i = 0; i < date.length; i++) {
      if (testedDates.includes(date[i])) {
        const index = testedDates.indexOf(date[i]);
        cumulativeDateFormattedTests.push({
          totaltested: testedData[index],
          date: date[i],
        });
      } else
        cumulativeDateFormattedTests.push({ totaltested: "-", date: date[i] });
    }

    const dateFormattedTests = [];

    for (let i = 0; i < date.length; i++) {
      if (testedDates.includes(date[i])) {
        const index = testedDates.indexOf(date[i]);
        dateFormattedTests.push({
          totaltested: testedData[index],
          date: date[i],
        });
      } else dateFormattedTests.push({ totaltested: 0, date: date[i] });
    }

    const dailyDateFormattedTests = [];
    let previousData = 0;

    for (let i = 0; i < dateFormattedTests.length; i++) {
      if (i === 0) {
        dailyDateFormattedTests.push({
          dailytested: dateFormattedTests[i].totaltested,
          date: dateFormattedTests[i].date,
        });
      } else {
        if (
          dateFormattedTests[i].totaltested &&
          dateFormattedTests[i - 1].totaltested
        ) {
          dailyDateFormattedTests.push({
            dailytested:
              dateFormattedTests[i].totaltested -
              dateFormattedTests[i - 1].totaltested,
            date: dateFormattedTests[i].date,
          });
          previousData = dateFormattedTests[i].totaltested;
        } else if (
          dateFormattedTests[i].totaltested === 0 &&
          dateFormattedTests[i - 1].totaltested === 0
        ) {
          dailyDateFormattedTests.push({
            dailytested: 0,
            date: dateFormattedTests[i].date,
          });
        } else if (
          dateFormattedTests[i].totaltested !== 0 &&
          dateFormattedTests[i - 1].totaltested === 0
        ) {
          dailyDateFormattedTests.push({
            dailytested: dateFormattedTests[i].totaltested - previousData,
            date: dateFormattedTests[i].date,
          });
          previousData = dateFormattedTests[i].totaltested;
        } else if (
          dateFormattedTests[i].totaltested === 0 &&
          dateFormattedTests[i - 1].totaltested !== 0
        ) {
          dailyDateFormattedTests.push({
            dailytested: 0,
            date: dateFormattedTests[i].date,
          });
        }
      }
    }

    let timelineLength = 0;

    if (isLoaded) {
      if (beginning) {
        timelineLength = 0;
      }
      if (twoWeeks) {
        timelineLength = data.length - 15;
      }
      if (oneMonth) {
        timelineLength = data.length - 30;
      }
    }

    if (isLoaded) {
      return (
        <React.Fragment>
          <div className={graphClass}>
            <div
              className="row"
              style={{
                justifyContent: "center",
                marginBottom: "25px",
              }}
            >
              {" "}
              <WorldHomeCard />
            </div>
            <div className="w-100"></div>
            <div className="row">
              <div className="col">
                <h4
                  className="fadeInUp"
                  style={{
                    justifyContent: "center",
                    animationDelay: "2.2s",
                    marginBottom: "30px",
                  }}
                >
                  INDIA MAP
                  <h6 id="line1" style={{ fontSize: 8, color: "grey" }}>
                    TAP OVER A STATE/UT
                  </h6>
                  <h6 id="line2" style={{ fontSize: 8, color: "grey" }}>
                    HOVER OVER A STATE/UT
                  </h6>
                </h4>
              </div>
              <div className="w-100"></div>
              <div
                className="container fadeInUp toggle-map"
                style={{ animationDelay: "2.3s" }}
              >
                <div className="row row-cols-4">
                  <div
                    className="col"
                    onClick={() => {
                      this.setState({
                        clickConfirmedMap: true,
                        clickActiveMap: false,
                        clickRecoveredMap: false,
                        clickDeceasedMap: false,
                      });
                    }}
                  >
                    <h6
                      className="text-info pad"
                      style={{ cursor: "pointer", background: "#d9ecf5" }}
                    >
                      CONFIRMED
                    </h6>
                  </div>
                  <div
                    className="col"
                    onClick={() => {
                      this.setState({
                        clickConfirmedMap: false,
                        clickActiveMap: true,
                        clickRecoveredMap: false,
                        clickDeceasedMap: false,
                      });
                    }}
                  >
                    <h6
                      className="pad"
                      style={{
                        color: "rgb(255, 68, 106)",
                        cursor: "pointer",
                        background: "#f5d2d2",
                      }}
                    >
                      ACTIVE
                    </h6>
                  </div>
                  <div
                    className="col"
                    onClick={() => {
                      this.setState({
                        clickActiveMap: false,
                        clickConfirmedMap: false,
                        clickRecoveredMap: true,
                        clickDeceasedMap: false,
                      });
                    }}
                  >
                    <h6
                      className="text-success pad"
                      style={{ cursor: "pointer", background: "#d5e9d5" }}
                    >
                      RECOVERED
                    </h6>
                  </div>
                  <div
                    className="col"
                    onClick={() => {
                      this.setState({
                        clickActiveMap: false,
                        clickRecoveredMap: false,
                        clickConfirmedMap: false,
                        clickDeceasedMap: true,
                      });
                    }}
                  >
                    <h6
                      className="text-secondary pad"
                      style={{ background: "#ece7e7", cursor: "pointer" }}
                    >
                      DECEASED
                    </h6>
                  </div>
                </div>
              </div>

              <div className="w-100"></div>
              <div
                className="col fadeInUp"
                style={{
                  justifyContent: "left",
                  animationDelay: "2.35s",
                }}
              >
                {clickConfirmedMap && (
                  <Choropleth
                    data={confirmedStatesData.slice(
                      1,
                      confirmedStatesData.length - 1
                    )}
                    colorLow="rgba(29, 141, 158, 0.9)"
                    colorHigh="rgba(29, 141, 158, 1)"
                    fill="rgb(18, 167, 190)"
                    type="infected"
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
                    colorLow="rgba(173, 28, 57, 0.9)"
                    colorHigh="rgba(173, 28, 57, 1)"
                    fill="rgb(228, 116, 138)"
                    type="active"
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
                    colorLow="rgba(40, 167, 69, 0.9)"
                    colorHigh="rgba(40, 167, 69, 1)"
                    fill="rgb(30, 209, 72)"
                    type="recovered"
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
                    colorLow="rgba(74, 79, 83, 0.6)"
                    colorHigh="rgba(74, 79, 83, 1)"
                    fill="rgb(108, 117, 125)"
                    type="deaths"
                    onMouseEnter={ReactGa.event({
                      category: "India map",
                      action: "India map clicked",
                    })}
                  />
                )}
              </div>
              <div className="w-100"></div>

              <div className="col fadeInUp" style={{ animationDelay: "2.4s" }}>
                <h6
                  style={{ fontSize: 10, color: "grey", fontWeight: "lighter" }}
                >
                  <span style={{ color: "#3e4da3" }}> Pro tip:</span> Tap on the
                  buttons above to toggle view
                </h6>
              </div>

              <div className="w-100"></div>
              <br />
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
                  SPREAD TRENDS{" "}
                  <h6>
                    <span
                      className="text-secondary"
                      style={{
                        fontSize: 10,
                        background: "#ece7e7",
                        borderRadius: "3px",
                      }}
                    >
                      {!toggleActive ? `CUMULATIVE` : `EVERYDAY`}
                    </span>
                  </h6>
                </h6>
              </div>
              <div
                className="col fadeInUp"
                style={{ animationDelay: "2.45s", alignItems: "right" }}
              >
                <div
                  className="home-toggle float-right"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Switch
                    className="react-switch"
                    onChange={this.onToggle}
                    onClick={ReactGa.event({
                      category: "Switch",
                      action: "Switch clicked",
                    })}
                    checked={toggleActive}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
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
                  &nbsp;1 Month{" "}
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
                  &nbsp;15 Days{" "}
                  {twoWeeks && <Icon.CheckCircle size={10} strokeWidth={3} />}
                </h6>
              </div>
            </div>
            <div
              className="row fadeInUp"
              style={{ animationDelay: "2.65s", marginTop: "-8px" }}
            >
              {!toggleActive && (
                <React.Fragment>
                  <LinePlot
                    type="confirmed"
                    bgColor="#e4f3fa"
                    titleClass="text-info"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalConfirmed}
                    daily={dailyConfirmed}
                    stroke="#0992c0"
                    lineStroke="#35aad1"
                    color1="#6ebed6"
                    color2="#55b2ce"
                    dataKey="totalconfirmed"
                  />

                  <div className="w-100"></div>
                  <LinePlot
                    type="active"
                    bgColor="#f5d2d2"
                    titleClass="text-danger"
                    data={totalActiveJson}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalActive}
                    daily={dailyActive}
                    stroke="#ff446a"
                    lineStroke="#ec7d93"
                    color1="#f16783"
                    color2="#ff446a"
                    dataKey="totalactive"
                  />
                  <div className="w-100"></div>
                  <LinePlot
                    type="recovered"
                    bgColor="#d5e9d5"
                    titleClass="text-success"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalRecovered}
                    daily={dailyRecovered}
                    stroke="#469246"
                    lineStroke="#78b978"
                    color1="#81ce81"
                    color2="#5cb85c"
                    dataKey="totalrecovered"
                  />
                  <div className="w-100"></div>
                  <LinePlot
                    type="deceased"
                    bgColor="#f3f3f3"
                    titleClass="text-secondary"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    total={totalDeceased}
                    daily={dailyDeceased}
                    stroke="#2e2d2d"
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
                        backgroundColor: "#e6e8f1",
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
                        <h6 style={{ fontSize: "12px", color: "#3f51b5" }}>
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
                        aspect={2.4}
                      >
                        <LineChart
                          data={cumulativeDateFormattedTests.slice(
                            timelineLength,
                            cumulativeDateFormattedTests.length
                          )}
                          margin={{
                            top: 40,
                            right: -30,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={5}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(
                                Math.max(...totalSamplesTested) / 100000
                              ) * 100000,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={5}
                            style={{ fontSize: 8 }}
                            tickCount={8}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            cursor={false}
                            position={{ x: 100, y: 12 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totaltested"
                            stroke="#6471b3"
                            strokeWidth="3"
                            strokeLinecap="round"
                            name="Total samples tested"
                            isAnimationActive={true}
                            connectNulls={true}
                            dot={{
                              stroke: "#3e4da3",
                              strokeWidth: 0.1,
                              fill: "#3e4da3",
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </div>
                  <div className="w-100"></div>
                </React.Fragment>
              )}
              {toggleActive && (
                <React.Fragment>
                  <BarPlot
                    type="confirmed"
                    bgColor="#e4f3fa"
                    titleClass="text-info"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyConfirmed}
                    divideBy={500}
                    dataKey="dailyconfirmed"
                    stroke="#0992c0"
                    color1="#6ebed6"
                    color2="#55b2ce"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="active"
                    bgColor="#f5d2d2"
                    titleClass="text-danger"
                    data={dailyActiveJson}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyActive}
                    divideBy={100}
                    dataKey="dailyactive"
                    stroke="#f16783"
                    color1="#f16783"
                    color2="#ff446a"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="recovered"
                    bgColor="#d5e9d5"
                    titleClass="text-success"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyRecovered}
                    divideBy={100}
                    dataKey="dailyrecovered"
                    stroke="#58bd58"
                    color1="#7ed87e"
                    color2="#5cb85c"
                  />
                  <div className="w-100"></div>
                  <BarPlot
                    type="deceased"
                    bgColor="#f3f3f3"
                    data={data}
                    date={date}
                    timelineLength={timelineLength}
                    daily={dailyDeceased}
                    divideBy={100}
                    dataKey="dailydeceased"
                    stroke="#474646"
                    color1="#808080"
                    color2="#5e5a5a"
                  />
                  <div className="w-100"></div>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        alignSelf: "center",
                        backgroundColor: "#e6e8f1",
                        borderRadius: "6px",
                        paddingTop: "5px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-75px",
                          textAlign: "left",
                          marginLeft: 10,
                          color: "#3e4da3",
                          fontSize: "0.8rem",
                        }}
                      >
                        TESTED
                        <h6 style={{ fontSize: "12px", color: "#3f51b5" }}>
                          {date.slice(-1)[0]}

                          <h5 style={{ fontSize: "0.8rem", color: "#3e4da3" }}>
                            {commaSeperated(
                              dailyDateFormattedTests[
                                dailyDateFormattedTests.length - 1
                              ].dailytested
                            )}{" "}
                            <span style={{ fontSize: 8 }}>
                              {dailyDateFormattedTests[
                                dailyDateFormattedTests.length - 1
                              ].dailytested -
                                dailyDateFormattedTests[
                                  dailyDateFormattedTests.length - 2
                                ].dailytested >=
                              0
                                ? `+${commaSeperated(
                                    Math.abs(
                                      dailyDateFormattedTests[
                                        dailyDateFormattedTests.length - 1
                                      ].dailytested -
                                        dailyDateFormattedTests[
                                          dailyDateFormattedTests.length - 2
                                        ].dailytested
                                    )
                                  )}`
                                : `-${commaSeperated(
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
                        aspect={2.4}
                      >
                        <BarChart
                          data={dailyDateFormattedTests.slice(
                            timelineLength,
                            dailyDateFormattedTests.length
                          )}
                          margin={{
                            top: 40,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                            axisLine={{ color: "#474646" }}
                            style={{ fontSize: 8 }}
                            tickSize={5}
                            tickCount={6}
                          />
                          <YAxis
                            orientation="right"
                            tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={5}
                            style={{ fontSize: 8 }}
                            tickCount={8}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            cursor={{ fill: "transparent" }}
                            position={{ x: 120, y: 16 }}
                          />
                          <Bar
                            dataKey="dailytested"
                            name="Daily Tested Samples"
                            fill="#3e4da3"
                            radius={[3, 3, 0, 0]}
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
                </React.Fragment>
              )}
              <div className="w-100"></div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Graph;
