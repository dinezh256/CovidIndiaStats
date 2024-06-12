import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Footer from "./footer";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  LineChart,
  Legend,
} from "recharts";
import { format } from "d3";
import { Helmet } from "react-helmet";

class StateGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      data2: [],
    };
  }

  componentDidMount() {
    fetch("https://api.covid19india.org/states_daily.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          data: json.states_daily,
        });
      })
    );

    fetch("https://data.covid19india.org/v4/min/data.min.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          data2: json.cases_time_series,
        });
      })
    );
  }
  render() {
    const { isLoaded, data, data2 } = this.state;

    const dailyRecovered = [];
    data2.map((item) => dailyRecovered.push(Number(item.dailyrecovered)));
    const dailyDeceased = [];
    data2.map((item) => dailyDeceased.push(Number(item.dailydeceased)));
    const dailyConfirmed = [];
    data2.map((item) => dailyConfirmed.push(Number(item.dailyconfirmed)));
    const dailyActive = [];
    data2.map((item) =>
      dailyActive.push(
        Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased)
      )
    );

    const totalRecovered = [];
    data2.map((item) => totalRecovered.push(Number(item.totalrecovered)));
    const totalDeceased = [];
    data2.map((item) => totalDeceased.push(Number(item.totaldeceased)));
    const totalConfirmed = [];
    data2.map((item) => totalConfirmed.push(Number(item.totalconfirmed)));

    const dayWiseConfirmed = [];
    const dayWiseRecovered = [];
    const dayWiseDeceased = [];

    const dailydata = [];
    data2.map((item) =>
      dailydata.push({
        date: item.date,
        dailyconfirmed: Number(item.dailyconfirmed),
        dailyrecovered: Number(item.dailyrecovered),
        dailydeceased: Number(item.dailydeceased),
        dailyactive:
          Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased),
      })
    );
    const cumulativedata = [];
    data2.map((item) =>
      cumulativedata.push({
        date: item.date,
        totalconfirmed: Number(item.totalconfirmed),
        totalrecovered: Number(item.totalrecovered),
        totaldeceased: Number(item.totaldeceased),
      })
    );

    const abroad = [
      {
        name: "Sri Lanka: 1",
        size: 1,
      },
      {
        name: "Rwanda: 1",
        size: 1,
      },
      {
        name: "Kuwait: 786",
        size: 786,
      },
      {
        name: "Singapore: 635",
        size: 635,
      },
      {
        name: "Qatar: 420",
        size: 420,
      },
      {
        name: "Iran: 309",
        size: 309,
      },
      {
        name: "Oman: 297",
        size: 297,
      },
      {
        name: "UAE: 238",
        size: 238,
      },
      {
        name: "Saudi Arabia: 186",
        size: 186,
      },
      {
        name: "Hong Kong: 1",
        size: 1,
      },
      {
        name: "Bahrain: 135",
        size: 135,
      },
      {
        name: "Italy: 91",
        size: 91,
      },
      {
        name: "Malaysia: 37",
        size: 37,
      },
      {
        name: "Portugal: 36",
        size: 36,
      },
      {
        name: "USA: 24",
        size: 24,
      },
      {
        name: "Ghana: 24",
        size: 24,
      },
      {
        name: "Switzerland: 15",
        size: 15,
      },
      {
        name: "France: 13",
        size: 13,
      },
    ];

    const ageData = [
      {
        agegroup: "1-10",
        number: 98,
      },
      {
        agegroup: "11-20",
        number: 228,
      },
      {
        agegroup: "21-30",
        number: 514,
      },
      {
        agegroup: "31-40",
        number: 537,
      },
      {
        agegroup: "41-50",
        number: 383,
      },
      {
        agegroup: "51-60",
        number: 306,
      },
      {
        agegroup: "61-70",
        number: 204,
      },
      {
        agegroup: "71-80",
        number: 61,
      },
      {
        agegroup: "81-90",
        number: 10,
      },
      {
        agegroup: "91-100",
        number: 3,
      },
    ];

    data.map((item) => {
      if (item.status === "Confirmed") {
        dayWiseConfirmed.push(item);
      }

      if (item.status === "Recovered") {
        dayWiseRecovered.push(item);
      }

      if (item.status === "Deceased") {
        dayWiseDeceased.push(item);
      }
    });

    dayWiseConfirmed.map((item) => {
      item["Maharashtra"] = item["mh"];
      item["Gujarat"] = item["gj"];
      item["Delhi"] = item["dl"];
      item["Rajasthan"] = item["rj"];
      item["Madhya Pradesh"] = item["mp"];
      item["Uttar Pradesh"] = item["up"];
      item["Tamil Nadu"] = item["tn"];
      item["Andhra Pradesh"] = item["ap"];
      item["Telangana"] = item["tg"];
      item["West Bengal"] = item["wb"];
      item["Jammu & Kashmir"] = item["jk"];
      item["Karnataka"] = item["ka"];
      item["Kerala"] = item["kl"];
      item["Bihar"] = item["br"];
      item["Punjab"] = item["pb"];
      item["Haryana"] = item["hr"];
      item["Odisha"] = item["or"];
      item["Jharkhand"] = item["jh"];
    });

    dayWiseRecovered.map((item) => {
      item["Maharashtra"] = item["mh"];
      item["Gujarat"] = item["gj"];
      item["Delhi"] = item["dl"];
      item["Rajasthan"] = item["rj"];
      item["Madhya Pradesh"] = item["mp"];
      item["Uttar Pradesh"] = item["up"];
      item["Tamil Nadu"] = item["tn"];
      item["Andhra Pradesh"] = item["ap"];
      item["Telangana"] = item["tg"];
      item["West Bengal"] = item["wb"];
      item["Jammu & Kashmir"] = item["jk"];
      item["Karnataka"] = item["ka"];
      item["Kerala"] = item["kl"];
      item["Bihar"] = item["br"];
      item["Punjab"] = item["pb"];
      item["Haryana"] = item["hr"];
      item["Odisha"] = item["or"];
      item["Jharkhand"] = item["jh"];
    });

    dayWiseDeceased.map((item) => {
      item["Maharashtra"] = item["mh"];
      item["Gujarat"] = item["gj"];
      item["Delhi"] = item["dl"];
      item["Rajasthan"] = item["rj"];
      item["Madhya Pradesh"] = item["mp"];
      item["Uttar Pradesh"] = item["up"];
      item["Tamil Nadu"] = item["tn"];
      item["Andhra Pradesh"] = item["ap"];
      item["Telangana"] = item["tg"];
      item["West Bengal"] = item["wb"];
      item["Jammu & Kashmir"] = item["jk"];
      item["Karnataka"] = item["ka"];
      item["Kerala"] = item["kl"];
      item["Bihar"] = item["br"];
      item["Punjab"] = item["pb"];
      item["Haryana"] = item["hr"];
      item["Odisha"] = item["or"];
      item["Jharkhand"] = item["jh"];
    });

    const timeline = [];
    dayWiseConfirmed.map((item) => timeline.push(item.date));

    const timeseriesData = [
      "Maharashtra",
      "Tamil Nadu",
      "Gujarat",
      "Delhi",
      "Rajasthan",
      "Madhya Pradesh",
      "Uttar Pradesh",
      "West Bengal",
      "Andhra Pradesh",
      "Punjab",
      "Telangana",
      "Karnataka",
      "Bihar",
      "Jammu & Kashmir",
      "Haryana",
      "Odisha",
      "Kerala",
      "Jharkhand",
    ].reduce(
      (res, item) => ({
        ...res,
        ...{
          [item]: dayWiseConfirmed
            .map((state) => {
              return Number(state[item]);
            })
            .reduce(function (r, a) {
              r.push(((r.length && r[r.length - 1]) || 0) + a);
              return r;
            }, []),
        },
      }),
      {}
    );

    const randomColor = () => {
      return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${
        255 * Math.random()
      })`;
    };

    const len = timeseriesData[Object.keys(timeseriesData)[0]].length;
    const keys = Object.keys(timeseriesData);
    const colors = keys.reduce(
      (res, item) => ({
        ...res,
        ...{ [item]: randomColor() },
      }),
      {}
    );

    const labels = keys.reduce((res, item, idx) => {
      return {
        ...res,
        ...{
          [item]: (
            <div
              style={{
                textAlign: "right",
                fontSize: 11,
                lineHeight: "0.7rem",
                verticalAlign: "middle",
              }}
            >
              <div>{item}</div>
            </div>
          ),
        },
      };
    }, {});

    const theme = {
      axis: {
        fontSize: "14px",
        tickColor: "#ccc",
        ticks: {
          line: {
            stroke: "slateblue",
          },
          text: {
            fill: "slateblue",
          },
        },
        legend: {
          text: {
            fill: "slateblue",
          },
        },
      },
      grid: {
        line: {
          stroke: "#eeeeee",
        },
      },
      tooltip: {
        container: {
          background: "#333",
          color: "white",
          fontFamily: "notosans",
        },
      },
    };

    const adjustedLegends = (x, y, space) => {
      return [
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: x,
          translateY: y,
          itemsSpacing: space,
          itemWidth: 22,
          itemHeight: 0,
          itemDirection: "top-to-bottom",
          itemOpacity: 0.85,
          itemTextColor: "slateblue",
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ];
    };

    const axisBottom = {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -45,
      legend: "",
      legendPosition: "middle",
      legendOffset: 32,
    };
    const axisLeft = {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -40,
      format: format("~s"),
    };

    const stateKeys = [
      "West Bengal",
      "Telangana",
      "Andhra Pradesh",
      "Tamil Nadu",
      "Uttar Pradesh",
      "Karnataka",
      "Rajasthan",
      "Delhi",
      "Gujarat",
      "Maharashtra",
    ];

    if (isLoaded) {
      return (
        <div className="container">
          <Helmet>
            <title>Covid India Stats - Indepth</title>
            <meta
              name="description"
              content="Indepth report on spread of Coronavirus (COVID-19) in India"
            />
          </Helmet>
          <div className="row">
            <div className="col-sm">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  animationDelay: "0.1s",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h5 className="text-info statewise-head">
                    TOP 10 STATES DAILY CONFIRMED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseConfirmed.slice(
                        dayWiseConfirmed.length - 18,
                        dayWiseConfirmed.length
                      )}
                      keys={stateKeys}
                      indexBy="date"
                      margin={{ top: 20, right: 0, bottom: 100, left: 34 }}
                      padding={0.3}
                      colors={{ scheme: "category10" }}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={axisBottom}
                      axisLeft={axisLeft}
                      enableLabel={false}
                      legends={adjustedLegends(220, 60, 55)}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  marginBottom: "20px",
                  animationDelay: "0.3s",
                }}
              >
                <div>
                  <h5 className="text-success statewise-head">
                    TOP 10 STATES DAILY RECOVERED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseRecovered.slice(
                        dayWiseRecovered.length - 18,
                        dayWiseRecovered.length
                      )}
                      keys={stateKeys}
                      indexBy="date"
                      margin={{ top: 20, right: 0, bottom: 100, left: 30 }}
                      padding={0.3}
                      colors={{ scheme: "category10" }}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={axisBottom}
                      axisLeft={axisLeft}
                      enableLabel={false}
                      legends={adjustedLegends(-80, 60, 90)}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  marginBottom: "20px",
                  animationDelay: "0.3s",
                }}
              >
                <div>
                  <h5 className="statewise-head">
                    TOP 10 STATES DAILY DECEASED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseDeceased.slice(
                        dayWiseDeceased.length - 18,
                        dayWiseDeceased.length
                      )}
                      keys={stateKeys}
                      indexBy="date"
                      margin={{ top: 20, right: 0, bottom: 100, left: 30 }}
                      padding={0.3}
                      colors={{ scheme: "category10" }}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={axisBottom}
                      axisLeft={axisLeft}
                      enableLabel={false}
                      legends={adjustedLegends(-370, 60, 80)}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm" id="line1">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  animationDelay: "0.3s",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  <h6 className="text-danger statewise-head">
                    DAYWISE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <ReBarChart
                      width={310}
                      height={120}
                      data={dailydata.slice(
                        dailydata.length - 75,
                        dailydata.length
                      )}
                      margin={{
                        top: 8,
                        right: 10,
                        left: -32,
                        bottom: -12,
                      }}
                      syncId="barchart"
                      stackOffset="sign"
                    >
                      <XAxis
                        dataKey="date"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        style={{ fontSize: 8 }}
                        tickSize={4}
                        tickCount="8"
                      />
                      <YAxis
                        orientation="left"
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
                          lineHeight: 0.5,
                        }}
                        active={true}
                        cursor={{ fill: "transparent" }}
                        position={{ x: 50, y: 5 }}
                      />
                      <Legend
                        iconType="square"
                        verticalAlign="bottom"
                        height={20}
                        align="right"
                      />
                      <Bar
                        dataKey="dailyactive"
                        name="Active"
                        fill="rgba(255,0,0,0.8)"
                        stackId="a"
                        barSize={8}
                      />
                      <Bar
                        dataKey="dailyrecovered"
                        name="Recovered"
                        fill="#58bd58"
                        stackId="a"
                      />
                      <Bar
                        dataKey="dailydeceased"
                        name="Deceased"
                        fill="#474646"
                        stackId="a"
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-sm" id="line1">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  animationDelay: "0.3s",
                  marginTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  <h6 className="text-danger statewise-head">
                    CUMULATIVE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <LineChart
                      data={cumulativedata.slice(
                        cumulativedata.length - 75,
                        cumulativedata.length
                      )}
                      margin={{
                        top: 8,
                        right: 10,
                        left: -32,
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
                        tickCount="8"
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(Math.max(...totalConfirmed) / 1000) * 1000,
                        ]}
                        orientation="left"
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
                          lineHeight: 0.5,
                        }}
                        cursor={false}
                        position={{ x: 50, y: 6 }}
                      />
                      <Legend
                        iconType="square"
                        verticalAlign="bottom"
                        height={20}
                        align="right"
                      />
                      <Line
                        type="monotone"
                        dataKey="totalconfirmed"
                        stroke="#57b9da"
                        strokeWidth="3"
                        name="Confirmed"
                        dot={{
                          stroke: "#0992c0",
                          strokeWidth: 0.02,
                          fill: "#0992c0",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalrecovered"
                        stroke="#79c979"
                        strokeWidth="3"
                        name="Recovered"
                        dot={{
                          stroke: "#58bd58",
                          strokeWidth: 0.02,
                          fill: "#58bd58",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totaldeceased"
                        stroke="#8b8a8a"
                        strokeWidth="3"
                        name="Deceased"
                        dot={{
                          stroke: "#474646",
                          strokeWidth: 0.02,
                          fill: "#474646",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-6" id="line2">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  animationDelay: "0.3s",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  <h6 className="text-danger statewise-head">
                    DAYWISE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <ReBarChart
                      width={310}
                      height={120}
                      data={dailydata.slice(
                        dailydata.length - 75,
                        dailydata.length
                      )}
                      margin={{
                        top: 8,
                        right: 10,
                        left: -32,
                        bottom: -12,
                      }}
                      syncId="barchart"
                      stackOffset="sign"
                    >
                      <XAxis
                        dataKey="date"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        style={{ fontSize: 8 }}
                        tickSize={4}
                        tickCount="8"
                      />
                      <YAxis
                        orientation="left"
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
                          lineHeight: 0.5,
                        }}
                        active={true}
                        cursor={{ fill: "transparent" }}
                        position={{ x: 120, y: 5 }}
                      />
                      <Legend
                        iconType="square"
                        verticalAlign="bottom"
                        height={20}
                        align="right"
                      />
                      <Bar
                        dataKey="dailyactive"
                        name="Active"
                        fill="rgba(255,0,0,0.8)"
                        barSize={8}
                        stackId="a"
                      />

                      <Bar
                        dataKey="dailydeceased"
                        name="Deceased"
                        fill="#474646"
                        stackId="a"
                      />
                      <Bar
                        dataKey="dailyrecovered"
                        name="Recovered"
                        fill="#58bd58"
                        stackId="a"
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-6" id="line2">
              <div
                className="text-center fade-in-up"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                  animationDelay: "0.3s",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  <h6 className="text-danger statewise-head">
                    CUMULATIVE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <LineChart
                      data={cumulativedata.slice(
                        cumulativedata.length - 75,
                        cumulativedata.length
                      )}
                      margin={{
                        top: 8,
                        right: 10,
                        left: -34,
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
                        tickCount="8"
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(Math.max(...totalConfirmed) / 1000) * 1000,
                        ]}
                        orientation="left"
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
                          lineHeight: 0.5,
                        }}
                        cursor={false}
                        position={{ x: 120, y: 6 }}
                      />
                      <Legend
                        iconType="circle"
                        verticalAlign="bottom"
                        height={20}
                        align="right"
                      />
                      <Line
                        type="monotone"
                        dataKey="totalconfirmed"
                        stroke="#57b9da"
                        strokeWidth="3"
                        name="Confirmed"
                        dot={{
                          stroke: "#0992c0",
                          strokeWidth: 0.02,
                          fill: "#0992c0",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalrecovered"
                        stroke="#79c979"
                        strokeWidth="3"
                        name="Recovered"
                        dot={{
                          stroke: "#58bd58",
                          strokeWidth: 0.02,
                          fill: "#58bd58",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totaldeceased"
                        stroke="#8b8a8a"
                        strokeWidth="3"
                        name="Deceased"
                        dot={{
                          stroke: "#474646",
                          strokeWidth: 0.02,
                          fill: "#474646",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="containerHome">
          <div
            className="spinner-grow"
            role="status"
            style={{ alignContent: "center" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

export default StateGraph;
