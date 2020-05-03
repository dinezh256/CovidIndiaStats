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
import CountUp from "react-countup";
import LanguageIcon from "@material-ui/icons/Language";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      tests: [],
      isLoaded: false,
      toggleActive: false,
      cases: "",
      todayCases: "",
      deaths: "",
      todayDeaths: "",
      recovered: "",
      active: "",
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
          data: json.cases_time_series,
          data2: json.statewise,
          tests: json.tested,
        });
      })
    );
    fetch("https://corona.lmao.ninja/v2/all").then((res) => {
      res.json().then((json) => {
        this.setState({
          cases: json.cases,
          todayCases: json.todayCases,
          deaths: json.deaths,
          todayDeaths: json.todayDeaths,
          recovered: json.recovered,
          active: json.active,
        });
      });
    });
  }

  render() {
    const {
      isLoaded,
      data,
      data2,
      toggleActive,
      tests,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
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

    const statesdata = [];
    data2.map((item) =>
      statesdata.push({
        id: item.statecode,
        state: item.state,
        value: Number(item.confirmed),
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

    const formattedTests = [];
    tests.map((item) =>
      formattedTests.push(
        Number(item.totalsamplestested)
          ? {
              totalsamplestested: Number(item.totalsamplestested),
              totalpositivecases: Number(item.totalpositivecases),
              updatedtime: `${item.updatetimestamp.split(/\//)[0]} ${
                months2[
                  new Date([
                    item.updatetimestamp.split(/\//)[1],
                    item.updatetimestamp.split(/\//)[0],
                    item.updatetimestamp.split(/\//)[2],
                  ]).getMonth()
                ]
              }`,
            }
          : {
              updatedtime: `${item.updatetimestamp.split(/\//)[0]} ${
                months2[
                  new Date([
                    item.updatetimestamp.split(/\//)[1],
                    item.updatetimestamp.split(/\//)[0],
                    item.updatetimestamp.split(/\//)[2],
                  ]).getMonth()
                ]
              }`,
            }
      )
    );

    const removeItemFromIndices = [0, 2, 4, 6, 8, 10, 12, 14, 16];
    for (let i = removeItemFromIndices.length - 1; i >= 0; i--) {
      formattedTests.splice(removeItemFromIndices[i], 1);
    }

    const totalSamplesTested = [];
    tests.map((item) =>
      totalSamplesTested.push(Number(item.totalsamplestested))
    );

    function commaSeperated(x) {
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      let otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== "") lastThree = "," + lastThree;
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }

    if (isLoaded) {
      return (
        <React.Fragment>
          <div className={graphClass}>
            <div
              className="row"
              style={{
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <div
                className="fadeInUp"
                style={{
                  marginBottom: "-5px",
                  animationDelay: "0.7s",
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
                  />
                </div>
                <div className="w-100"></div>
                <table className="table table-sm table-borderless">
                  <thead>
                    <tr>
                      <th
                        className="text-info span delta sticky-top"
                        style={{ width: "25%" }}
                      >
                        CONFIRMED
                      </th>
                      <th
                        className="delta span sticky-top"
                        style={{
                          width: "25%",

                          color: "#ff446a",
                        }}
                      >
                        ACTIVE
                      </th>
                      <th
                        className="text-success delta span sticky-top"
                        style={{ width: "25%" }}
                      >
                        Recovered
                      </th>
                      <th
                        className="text-secondary delta span sticky-top"
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
                      <h4 className="text-info delta">
                        <CountUp
                          start={0}
                          end={Number(cases)}
                          duration={2.5}
                          separator=","
                        />
                      </h4>
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
                      <h5
                        className="delta"
                        style={{ color: "rgb(255, 68, 106)" }}
                      >
                        <CountUp
                          start={0}
                          end={Number(active)}
                          duration={2.5}
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
                        {((Number(recovered) / Number(cases)) * 100).toFixed(1)}
                        %
                      </h5>
                      <h5 className="text-success delta">
                        <CountUp
                          start={0}
                          end={Number(recovered)}
                          duration={2.5}
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
                      <h5 className="text-secondary delta">
                        <CountUp
                          start={0}
                          end={Number(deaths)}
                          duration={2.5}
                          separator=","
                        />
                      </h5>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-100"></div>
            <div className="row">
              <div className="col">
                <h4
                  className="fadeInUp"
                  style={{
                    justifyContent: "center",
                    animationDelay: "1s",
                  }}
                >
                  INDIA MAP
                  <h6 style={{ fontSize: 8 }}>HOVER OVER A STATE/UT</h6>
                </h4>
              </div>
              <div className="w-100"></div>
              <div
                className="col fadeInUp"
                style={{
                  justifyContent: "left",
                  animationDelay: "1s",
                  marginTop: "5px",
                }}
              >
                <Choropleth
                  data={statesdata.slice(1, statesdata.length - 1)}
                  onMouseEnter={ReactGa.event({
                    category: "India map",
                    action: "India map clicked",
                  })}
                />
              </div>
              <div className="w-100"></div>
              <br />
              <div
                className="col fadeInUp"
                style={{ textAlign: "left", animationDelay: "1s" }}
              >
                <h3 className="home-title" style={{ color: "#ff446a" }}>
                  SPREAD TRENDS{" "}
                  <h6>
                    <span
                      className="text-secondary"
                      style={{
                        fontSize: 8,
                        background: "#ece7e7",
                        borderRadius: "3px",
                      }}
                    >
                      {!toggleActive ? `CUMULATIVE` : `EVERYDAY`}
                    </span>
                  </h6>
                </h3>
              </div>
              <div className="col fadeInUp" style={{ animationDelay: "1s" }}>
                <div
                  className="home-toggle"
                  style={{ alignContent: "right", marginLeft: "12rem" }}
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
                    width={30}
                  ></Switch>
                </div>
              </div>
            </div>

            <div
              className="row fadeInUp"
              style={{ animationDelay: "1s", marginTop: "-8px" }}
            >
              {!toggleActive && (
                <React.Fragment>
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        backgroundColor: "#e4f3fa",
                        borderRadius: "6px",
                        paddingTop: "5px",
                      }}
                    >
                      <h5
                        className="text-info"
                        style={{
                          paddingTop: "5px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                        }}
                      >
                        CONFIRMED
                        <h6 style={{ fontSize: "12px", color: "#6ebed6" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#55b2ce" }}>
                              {commaSeperated(totalConfirmed.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                +{commaSeperated(dailyConfirmed.slice(-1)[0])}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <LineChart
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...totalConfirmed) / 1000) *
                                1000,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
                            style={{ fontSize: 8 }}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalconfirmed"
                            stroke="#35aad1"
                            strokeWidth="3"
                            strokeLinecap="round"
                            animationEasing="ease-in"
                            name="Confirmed"
                            dot={{
                              stroke: "#0992c0",
                              strokeWidth: 0.1,
                              fill: "#0992c0",
                            }}
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph confirmed",
                                action: "confirmed hover",
                              });
                            }}
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
                        backgroundColor: "#f5d2d2",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                          color: "#ff446a",
                        }}
                      >
                        ACTIVE
                        <h6 style={{ fontSize: "12px", color: "#f16783" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#ff446a" }}>
                              {commaSeperated(totalActive.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                +{commaSeperated(dailyActive.slice(-1)[0])}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <LineChart
                          data={totalActiveJson.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...totalActive) / 1000) * 1000,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
                            style={{ fontSize: 8 }}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalactive"
                            stroke="#ec7d93"
                            strokeWidth="3"
                            animationEasing="ease-in"
                            strokeLinecap="round"
                            name="Active"
                            dot={{
                              stroke: "#ff446a",
                              strokeWidth: 0.1,
                              fill: "#ff446a",
                            }}
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Active",
                                action: "Active hover",
                              });
                            }}
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
                        alignSelf: "center",
                        backgroundColor: "#d5e9d5",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        className="text-success"
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                        }}
                      >
                        RECOVERED
                        <h6 style={{ fontSize: "12px", color: "#81ce81" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#5cb85c" }}>
                              {commaSeperated(totalRecovered.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                +{commaSeperated(dailyRecovered.slice(-1)[0])}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <LineChart
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...totalRecovered) / 1000) *
                                1000,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
                            style={{ fontSize: 8 }}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalrecovered"
                            stroke="#78b978"
                            strokeWidth="3"
                            name="Recovered"
                            animationEasing="ease-in"
                            dot={{
                              stroke: "#469246",
                              strokeWidth: 0.1,
                              fill: "#469246",
                            }}
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Recovered",
                                action: "Recovered hover",
                              });
                            }}
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
                        alignSelf: "center",
                        backgroundColor: "#f3f3f3",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          color: "#464545",
                          fontSize: 16,
                        }}
                      >
                        DECEASED
                        <h6 style={{ fontSize: "12px", color: "#808080" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#5e5a5a" }}>
                              {commaSeperated(totalDeceased.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                +{commaSeperated(dailyDeceased.slice(-1)[0])}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <LineChart
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="linechart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                            axisLine={{ color: "#474646" }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...totalDeceased) / 100) * 100,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
                            style={{ fontSize: 8 }}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totaldeceased"
                            stroke="#666565"
                            strokeWidth="3"
                            animationEasing="ease-in"
                            name="Deceased"
                            dot={{
                              stroke: "#2e2d2d",
                              strokeWidth: 0.1,
                              fill: "#2e2d2d",
                            }}
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Deceased",
                                action: "Deceased hover",
                              });
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                    <section
                      className="graphsection fadeInUp"
                      style={{
                        backgroundColor: "#e6e8f1",
                        borderRadius: "6px",
                        paddingTop: "5px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "5px",
                          marginBottom: "-75px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                          color: "#3e4da3",
                        }}
                      >
                        TESTS
                        <h6 style={{ fontSize: "12px", color: "#3f51b5" }}>
                          {
                            tests[tests.length - 1].updatetimestamp.split(
                              /\//
                            )[0]
                          }{" "}
                          {
                            months2[
                              Number(
                                tests[tests.length - 1].updatetimestamp.split(
                                  /\//
                                )[1] - 1
                              )
                            ]
                          }
                          <h6 style={{ fontSize: "8px" }}>
                            {Number(
                              tests[tests.length - 1].updatetimestamp.split(
                                /\//
                              )[0]
                            ) === new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#3e4da3" }}>
                              {commaSeperated(
                                tests[tests.length - 1].totalsamplestested
                              )}{" "}
                              <span style={{ fontSize: 8 }}>
                                +
                                {commaSeperated(
                                  tests[tests.length - 1].totalsamplestested -
                                    tests[tests.length - 2].totalsamplestested
                                )}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <LineChart
                          data={formattedTests}
                          margin={{
                            top: 8,
                            right: -30,
                            left: 10,
                            bottom: -12,
                          }}
                        >
                          <XAxis
                            dataKey="updatedtime"
                            tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
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
                            tickSize={4}
                            style={{ fontSize: 8 }}
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
                            position={{ x: 100, y: 3 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalsamplestested"
                            stroke="#6471b3"
                            strokeWidth="3"
                            strokeLinecap="round"
                            animationEasing="ease-in"
                            name="Total samples tested"
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
                  <div className="col">
                    <section
                      className="graphsection"
                      style={{
                        alignSelf: "center",
                        backgroundColor: "#e4f3fa",
                        borderRadius: "6px",
                      }}
                    >
                      <h5
                        className="text-info"
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                        }}
                      >
                        CONFIRMED
                        <h6 style={{ fontSize: "12px", color: "#6ebed6" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#55b2ce" }}>
                              {commaSeperated(dailyConfirmed.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                {dailyConfirmed.slice(-1)[0] -
                                  dailyConfirmed.slice(-2)[0] >
                                0
                                  ? `+${commaSeperated(
                                      Math.abs(
                                        dailyConfirmed.slice(-2)[0] -
                                          dailyConfirmed.slice(-1)[0]
                                      )
                                    )}`
                                  : `-${commaSeperated(
                                      Math.abs(
                                        dailyConfirmed.slice(-2)[0] -
                                          dailyConfirmed.slice(-1)[0]
                                      )
                                    )}`}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>

                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <BarChart
                          width={310}
                          height={120}
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={8}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...dailyConfirmed) / 500) *
                                500,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
                            style={{ fontSize: 8 }}
                            tickCount={6}
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
                            active={true}
                            cursor={{ fill: "transparent" }}
                            position={{ x: 120, y: 5 }}
                          />
                          <Bar
                            dataKey="dailyconfirmed"
                            name="Confirmed"
                            fill="#0992c0"
                            animationEasing="ease-in"
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Confirmedbar",
                                action: "Confirmedbar hover",
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

                        backgroundColor: "#f5d2d2",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                          color: "#ff446a",
                        }}
                      >
                        ACTIVE
                        <h6 style={{ fontSize: "12px", color: "#f16783" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#ff446a" }}>
                              {commaSeperated(dailyActive.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                {dailyActive.slice(-1)[0] -
                                  dailyActive.slice(-2)[0] >
                                0
                                  ? `+${commaSeperated(
                                      Math.abs(
                                        dailyActive.slice(-2)[0] -
                                          dailyActive.slice(-1)[0]
                                      )
                                    )}`
                                  : `-${commaSeperated(
                                      Math.abs(
                                        dailyActive.slice(-2)[0] -
                                          dailyActive.slice(-1)[0]
                                      )
                                    )}`}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>

                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <BarChart
                          width={310}
                          height={120}
                          data={dailyActiveJson.slice(
                            10,
                            dailyActiveJson.length
                          )}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={6}
                          />
                          <YAxis
                            domain={[
                              Math.min(...dailyActive),
                              Math.ceil(Math.max(...dailyActive) / 100) * 100,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
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
                            position={{ x: 120, y: 6 }}
                          />

                          <Bar
                            dataKey="dailyactive"
                            name="Active"
                            fill="#f16783"
                            animationEasing="ease-in"
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Activebar",
                                action: "Activebar hover",
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
                        backgroundColor: "#d5e9d5",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        className="text-success"
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          fontSize: 16,
                        }}
                      >
                        RECOVERED
                        <h6 style={{ fontSize: "12px", color: "#7ed87e" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#5cb85c" }}>
                              {commaSeperated(dailyRecovered.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                {dailyRecovered.slice(-1)[0] -
                                  dailyRecovered.slice(-2)[0] >
                                0
                                  ? `+${commaSeperated(
                                      Math.abs(
                                        dailyRecovered.slice(-1)[0] -
                                          dailyRecovered.slice(-2)[0]
                                      )
                                    )}`
                                  : `-${commaSeperated(
                                      Math.abs(
                                        dailyRecovered.slice(-1)[0] -
                                          dailyRecovered.slice(-2)[0]
                                      )
                                    )}`}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <BarChart
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
                            right: -32,
                            left: 10,
                            bottom: -12,
                          }}
                          syncId="barchart"
                        >
                          <XAxis
                            dataKey="date"
                            tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                            style={{ fontSize: 8 }}
                            tickSize={4}
                            tickCount={6}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...dailyRecovered) / 100) *
                                100,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Bar
                            dataKey="dailyrecovered"
                            name="Recovered"
                            fill="#58bd58"
                            animationEasing="ease-in"
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Recoveredbar",
                                action: "Recoveredbar hover",
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
                        backgroundColor: "#f3f3f3",
                        borderRadius: "6px",
                        marginTop: "8px",
                      }}
                    >
                      <h5
                        style={{
                          paddingTop: "8px",
                          marginBottom: "-80px",
                          textAlign: "left",
                          marginLeft: 10,
                          color: "#464545",
                          fontSize: 16,
                        }}
                      >
                        DECEASED
                        <h6 style={{ fontSize: "12px", color: "#808080" }}>
                          {date.slice(-1)[0]}
                          <h6 style={{ fontSize: "8px" }}>
                            {new Date(date.slice(-1)[0]).getDate() ===
                            new Date().getDate()
                              ? "Today"
                              : "Yesterday"}
                            <h5 style={{ fontSize: 14, color: "#5e5a5a" }}>
                              {commaSeperated(dailyDeceased.slice(-1)[0])}{" "}
                              <span style={{ fontSize: 8 }}>
                                {dailyDeceased.slice(-1)[0] -
                                  dailyDeceased.slice(-2)[0] >
                                0
                                  ? `+${commaSeperated(
                                      Math.abs(
                                        dailyDeceased.slice(-1)[0] -
                                          dailyDeceased.slice(-2)[0]
                                      )
                                    )}`
                                  : `-${commaSeperated(
                                      Math.abs(
                                        dailyDeceased.slice(-1)[0] -
                                          dailyDeceased.slice(-2)[0]
                                      )
                                    )}`}
                              </span>
                            </h5>
                          </h6>
                        </h6>
                      </h5>
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={2.7}
                      >
                        <BarChart
                          data={data.slice(10, data.length)}
                          margin={{
                            top: 8,
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
                            tickSize={4}
                            tickCount={6}
                          />
                          <YAxis
                            domain={[
                              0,
                              Math.ceil(Math.max(...dailyDeceased) / 10) * 10,
                            ]}
                            orientation="right"
                            tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                            tickFormatter={format("~s")}
                            tickSize={4}
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
                            position={{ x: 120, y: 6 }}
                          />
                          <Bar
                            dataKey="dailydeceased"
                            name="Deceased"
                            fill="#474646"
                            animationEasing="ease-in"
                            onMouseEnter={() => {
                              ReactGa.event({
                                category: "Graph Deceasedbar",
                                action: "Deceasedbar hover",
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
