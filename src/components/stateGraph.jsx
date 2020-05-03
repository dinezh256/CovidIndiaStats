import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Footer from "./footer";
import {
  Treemap,
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
import LinkTwoToneIcon from "@material-ui/icons/LinkTwoTone";
import { format } from "d3";
import BarChart from "chart-race-react/dist/index";

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

    fetch("https://api.covid19india.org/data.json").then((res) =>
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

    const months = [
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
      "Gujarat",
      "Delhi",
      "Madhya Pradesh",
      "Rajasthan",
      "Tamil Nadu",
      "Uttar Pradesh",
      "Andhra Pradesh",
      "Telangana",
      "West Bengal",
      "Jammu & Kashmir",
      "Karnataka",
      "Kerala",
      "Punjab",
      "Bihar",
      "Haryana",
      "Odisha",
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

    if (isLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div
                className="card text-center fadeOutDown"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="card-body">
                  <h5 className="text-info statewise-head">
                    TOP 10 STATES DAILY CONFIRMED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseConfirmed.slice(
                        dayWiseConfirmed.length - 18,
                        dayWiseConfirmed.length
                      )}
                      keys={[
                        "West Bengal",
                        "Telangana",
                        "Andhra Pradesh",
                        "Tamil Nadu",
                        "Uttar Pradesh",
                        "Madhya Pradesh",
                        "Rajasthan",
                        "Delhi",
                        "Gujarat",
                        "Maharashtra",
                      ]}
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
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: -40,
                        format: format("~s"),
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.8]],
                      }}
                      legends={[
                        {
                          dataFrom: "keys",
                          anchor: "bottom",
                          direction: "row",
                          justify: false,
                          translateX: 230,
                          translateY: 60,
                          itemsSpacing: 60,
                          itemWidth: 22,
                          itemHeight: 0,
                          itemDirection: "top-to-bottom",
                          itemOpacity: 0.85,
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
                      ]}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={{
                        legends: {
                          text: {
                            fontSize: 10,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div
                className="card text-center fadeOutDown"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="card-body">
                  <h5 className="text-success statewise-head">
                    TOP 10 STATES DAILY RECOVERED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseRecovered.slice(
                        dayWiseRecovered.length - 18,
                        dayWiseRecovered.length
                      )}
                      keys={[
                        "West Bengal",
                        "Telangana",
                        "Andhra Pradesh",
                        "Tamil Nadu",
                        "Uttar Pradesh",
                        "Madhya Pradesh",
                        "Rajasthan",
                        "Delhi",
                        "Gujarat",
                        "Maharashtra",
                      ]}
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
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: -40,
                        format: format("~s"),
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.8]],
                      }}
                      legends={[
                        {
                          dataFrom: "keys",
                          anchor: "bottom",
                          direction: "row",
                          justify: false,
                          translateX: -60,
                          translateY: 60,
                          itemsSpacing: 75,
                          itemWidth: 22,
                          itemHeight: 0,
                          itemDirection: "top-to-bottom",
                          itemOpacity: 0.85,
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
                      ]}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={{
                        legends: {
                          text: {
                            fontSize: 10,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h5 className="statewise-head">
                    TOP 10 STATES DAILY DECEASED CASES
                  </h5>
                  <div style={{ height: 400 }}>
                    <ResponsiveBar
                      data={dayWiseDeceased.slice(
                        dayWiseDeceased.length - 18,
                        dayWiseDeceased.length
                      )}
                      keys={[
                        "West Bengal",
                        "Telangana",
                        "Andhra Pradesh",
                        "Tamil Nadu",
                        "Uttar Pradesh",
                        "Madhya Pradesh",
                        "Rajasthan",
                        "Delhi",
                        "Gujarat",
                        "Maharashtra",
                      ]}
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
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "",
                        legendPosition: "middle",
                        legendOffset: -40,
                        format: format("~s"),
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.8]],
                      }}
                      legends={[
                        {
                          dataFrom: "keys",
                          anchor: "bottom",
                          direction: "row",
                          justify: false,
                          translateX: -350,
                          translateY: 60,
                          itemsSpacing: 75,
                          itemWidth: 22,
                          itemHeight: 0,
                          itemDirection: "top-to-bottom",
                          itemOpacity: 0.85,
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
                      ]}
                      animate={false}
                      motionStiffness={90}
                      motionDamping={20}
                      theme={{
                        legends: {
                          text: {
                            fontSize: 10,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm" id="line1">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h6 className="text-danger statewise-head">
                    DAYWISE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <ReBarChart
                      width={310}
                      height={120}
                      data={dailydata.slice(
                        dailydata.length - 50,
                        dailydata.length
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
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        style={{ fontSize: 8 }}
                        tickSize={4}
                        tickCount="8"
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(Math.max(...dailyConfirmed) / 1000) * 1000,
                        ]}
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
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h6 className="text-danger statewise-head">
                    CUMULATIVE COMPARISON
                  </h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <LineChart
                      data={cumulativedata.slice(
                        cumulativedata.length - 50,
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
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h6 className="text-danger">DAYWISE COMPARISON</h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <ReBarChart
                      width={310}
                      height={120}
                      data={dailydata.slice(
                        dailydata.length - 50,
                        dailydata.length
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
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        style={{ fontSize: 8 }}
                        tickSize={4}
                        tickCount="8"
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(Math.max(...dailyConfirmed) / 1000) * 1000,
                        ]}
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
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h6 className="text-danger">CUMULATIVE COMPARISON</h6>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
                    <LineChart
                      data={cumulativedata.slice(
                        cumulativedata.length - 50,
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
            <div className="w-100"></div>
            <div className="col-sm" id="line1">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h5 className="text-danger">
                    INDIAN PATIENTS ABROAD{" "}
                    <a
                      href="https://timesofindia.indiatimes.com/india/3336-indians-infected-abroad-785-in-kuwait-634-in-singapore/articleshow/75184154.cms"
                      style={{ verticalAlign: "0.1rem" }}
                      target="_blank"
                    >
                      <LinkTwoToneIcon color="disabled" fontSize="inherit" />
                    </a>
                    <h6 style={{ fontSize: 8, color: "grey" }}>
                      (3336 confirmed Indians cases abroad and 25 have died as
                      of 16 April across 53 countries)
                    </h6>
                  </h5>
                  <ResponsiveContainer width="100%" height="100%" aspect={1}>
                    <Treemap
                      data={abroad}
                      stroke="#fff"
                      fill="rgba(0,0,255, 0.4)"
                      dataKey="size"
                    />
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-6" id="line2">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h5 className="text-danger">
                    INDIAN PATIENTS ABROAD{" "}
                    <a
                      href="https://timesofindia.indiatimes.com/india/3336-indians-infected-abroad-785-in-kuwait-634-in-singapore/articleshow/75184154.cms"
                      style={{ verticalAlign: "0.1rem" }}
                      target="_blank"
                    >
                      <LinkTwoToneIcon color="disabled" fontSize="inherit" />
                    </a>
                    <h6 style={{ fontSize: 8, color: "grey" }}>
                      (3336 confirmed Indians cases abroad and 25 have died as
                      of 16 April across 53 countries)
                    </h6>
                  </h5>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.25}>
                    <Treemap
                      data={abroad}
                      stroke="#fff"
                      fill="rgba(0,0,255, 0.4)"
                      dataKey="size"
                      animationEasing="ease-in"
                    />
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-sm" id="line1">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h5 className="text-danger">
                    PATIENT AGE
                    <h6 style={{ fontSize: 8, color: "grey" }}>
                      (awaiting more data)
                    </h6>
                  </h5>
                  <ResponsiveContainer width="100%" height="100%" aspect={1.25}>
                    <ReBarChart
                      data={ageData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: -30,
                        bottom: -10,
                      }}
                    >
                      <XAxis
                        dataKey="agegroup"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        tickSize="2"
                        style={{ fontSize: 6.5 }}
                        interval={0}
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(
                            ageData.reduce(
                              (max, p) => (p.number > max ? p.number : max),
                              ageData[0].number
                            ) / 100.0
                          ) * 100,
                        ]}
                        orientation="left"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        tickSize="2"
                        style={{ fontSize: 6.5 }}
                        tickFormatter={format("~s")}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(255,255,255,0.8)",
                          border: "none",
                          borderRadius: "5px",
                          fontSize: 12,
                          fontFamily: "notosans",
                          textTransform: "uppercase",
                        }}
                        cursor={{ fill: "transparent" }}
                      />

                      <Bar
                        dataKey="number"
                        name="Total"
                        fill="rgba(0,0,255, 0.6)"
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-6" id="line2">
              <div
                className="card text-center fadeOutDown"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <div className="card-body">
                  <h5 className="text-danger">
                    PATIENT AGE
                    <h6 style={{ fontSize: 8, color: "grey" }}>
                      (awaiting more data)
                    </h6>
                  </h5>

                  <ResponsiveContainer width="100%" height="100%" aspect={1.25}>
                    <ReBarChart
                      data={ageData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: -20,
                        bottom: -18,
                      }}
                      barGap={1}
                    >
                      <XAxis
                        dataKey="agegroup"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        tickSize="2"
                        style={{ fontSize: 10 }}
                        interval={0}
                      />
                      <YAxis
                        domain={[
                          0,
                          Math.ceil(
                            ageData.reduce(
                              (max, p) => (p.number > max ? p.number : max),
                              ageData[0].number
                            ) / 100.0
                          ) * 100,
                        ]}
                        orientation="left"
                        tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                        tickSize="2"
                        style={{ fontSize: 10 }}
                        tickFormatter={format("~s")}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(255,255,255,0.8)",
                          border: "none",
                          borderRadius: "5px",
                          fontSize: 12,
                          fontFamily: "notosans",
                        }}
                        cursor={{ fill: "transparent" }}
                      />

                      <Bar
                        dataKey="number"
                        name="Total"
                        fill="rgba(0,0,255, 0.6)"
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="w-100"></div>
            <div
              className="container fadeInUp"
              style={{ animationDelay: "1.1s" }}
            >
              <div
                className="col"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,1)",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  alignContent: "center",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                    className="text-danger"
                  >
                    CONFIRMED CASES TIMELINE IN TOP STATES
                  </h5>
                  <BarChart
                    start={true}
                    data={timeseriesData}
                    timeline={timeline}
                    labels={labels}
                    colors={colors}
                    len={len}
                    timeout={1000}
                    delay={100}
                    timelineStyle={{
                      textAlign: "center",
                      fontSize: "15px",
                      color: "rgb(131, 131, 131)",
                      marginBottom: "10px",
                      fontWeight: 700,
                    }}
                    textBoxStyle={{
                      textAlign: "left",
                      color: "rgb(133, 131, 131)",
                      marginLeft: "20px",
                      fontSize: "10px",
                    }}
                    barStyle={{
                      height: "18px",
                      marginTop: "10px",
                      marginLeft: "15px",
                      borderRadius: "6px",
                    }}
                    width={[25, 60, 10]}
                    maxItems={18}
                  />
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
