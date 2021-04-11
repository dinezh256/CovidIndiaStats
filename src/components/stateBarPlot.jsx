import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactGa from "react-ga";
import { abbreviateNumber } from "../utils/common-functions";

function commaSeperated(x) {
  if (x !== undefined || x !== 0) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else return x;
}

const StateBarPlot = ({
  stateName,
  type,
  bgColor,
  titleClass,
  data,
  date,
  daily,
  dailyDelta,
  sparkline,
  interval,
  divideBy,
  stroke,
  color1,
  color2,
}) => {
  return (
    <div className="col">
      <section
        className="graphsection"
        style={{
          alignSelf: "center",
          backgroundColor: `${bgColor}`,
          borderRadius: "6px",
          marginTop: 10,
        }}
      >
        <h5
          className={titleClass}
          style={{
            paddingTop: "10px",
            marginBottom: "-80px",
            textAlign: "left",
            marginLeft: 10,
            fontSize: "0.8rem",
            textTransform: "uppercase",
          }}
        >
          {type}
          <h6
            style={{
              fontSize: "10px",
              color: `${color1}`,
              textTransform: "capitalize",
            }}
          >
            {Number(date.slice(-1)[0].split(" ")[0])}{" "}
            {date.slice(-1)[0].split(" ")[1]}
            <h6 style={{ fontSize: "8px" }}>
              <h5 style={{ fontSize: 14, color: `${color2}` }}>
                {Number(daily) >= 0
                  ? commaSeperated(daily)
                  : "-" + commaSeperated(Math.abs(daily))}{" "}
                <span style={{ fontSize: 9 }}>
                  {Number(dailyDelta) >= 0
                    ? `+${commaSeperated(Math.abs(dailyDelta))}`
                    : `-${commaSeperated(Math.abs(dailyDelta))}`}
                </span>
              </h5>
            </h6>
          </h6>
        </h5>

        <ResponsiveContainer width="100%" height="100%" aspect={2.2}>
          <BarChart
            data={data}
            margin={{
              top: 40,
              right: -20,
              left: 20,
              bottom: -8,
            }}
            syncId="barchart"
          >
            <XAxis
              interval={interval}
              dataKey="date"
              tick={{ stroke: stroke, strokeWidth: 0.2, fill: stroke }}
              style={{ fontSize: "0.62rem", fontFamily: "notosans" }}
              tickSize={5}
              tickLine={{ stroke: stroke }}
              tickCount={5}
              axisLine={{ stroke: stroke, strokeWidth: "1.5px" }}
            />
            <YAxis
              domain={[
                Math.floor(Math.min(...sparkline) / divideBy) * divideBy,
                Math.ceil(Math.max(...sparkline) / divideBy) * divideBy,
              ]}
              orientation="right"
              tick={{ stroke: stroke, strokeWidth: 0.2, fill: stroke }}
              tickFormatter={abbreviateNumber}
              tickSize={5}
              style={{ fontSize: "0.62rem", fontFamily: "notosans" }}
              tickLine={{ stroke: stroke }}
              tickCount={8}
              axisLine={{ stroke: stroke, strokeWidth: "1.5px" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0)",
                border: "none",
                borderRadius: "5px",
                fontSize: "0.7rem",
                fontFamily: "notosans",
                textTransform: "uppercase",
                textAlign: "left",
                lineHeight: 0.8,
              }}
              active={true}
              cursor={{ fill: "transparent" }}
              position={{ x: 120, y: 22 }}
            />
            <Bar
              dataKey="stateid"
              name={type}
              fill={stroke}
              radius={[3, 3, 0, 0]}
              onClick={() => {
                ReactGa.event({
                  category: `Graph ${stateName} ${type}bar`,
                  action: `${stateName} ${type}bar hover`,
                });
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default StateBarPlot;
