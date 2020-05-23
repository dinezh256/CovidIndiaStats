import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactGa from "react-ga";
import { format } from "d3";

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

const LinePlot = ({
  type,
  bgColor,
  titleClass,
  data,
  date,
  timelineLength,
  total,
  daily,
  dataKey,
  stroke,
  lineStroke,
  color1,
  color2,
}) => {
  return (
    <div className="col">
      <section
        className="graphsection"
        style={{
          backgroundColor: `${bgColor}`,
          borderRadius: "6px",
          paddingTop: "5px",
          marginBottom: "10px",
        }}
      >
        <h5
          className={titleClass}
          style={{
            paddingTop: "5px",
            marginBottom: "-70px",
            textAlign: "left",
            marginLeft: 10,
            fontSize: "0.8rem",
            textTransform: "uppercase",
          }}
        >
          {type}
          <h6
            style={{
              fontSize: "12px",
              color: `${color1}`,
              textTransform: "capitalize",
            }}
          >
            {date.slice(-1)[0]}
            <h6
              style={{
                fontSize: "0.8rem",
                color: `${color2}`,
                textTransform: "capitalize",
              }}
            >
              {commaSeperated(total.slice(-1)[0])}{" "}
              <span style={{ fontSize: 8 }}>
                +{commaSeperated(daily.slice(-1)[0])}
              </span>
            </h6>
          </h6>
        </h5>
        <ResponsiveContainer width="100%" height="100%" aspect={2.4}>
          <LineChart
            data={data.slice(timelineLength, data.length)}
            margin={{
              top: 40,
              right: -32,
              left: 10,
              bottom: -12,
            }}
            syncId="linechart"
          >
            <XAxis
              dataKey="date"
              tick={{ stroke: `${stroke}`, strokeWidth: 0.2 }}
              style={{ fontSize: 8 }}
              tickSize={5}
              tickCount={8}
            />
            <YAxis
              domain={[0, Math.ceil(Math.max(...total) / 1000) * 1000]}
              orientation="right"
              tick={{ stroke: `${stroke}`, strokeWidth: 0.2 }}
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
              position={{ x: 120, y: 15 }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={lineStroke}
              strokeWidth="3"
              strokeLinecap="round"
              name={type}
              connectNulls={true}
              dot={{
                stroke: `${stroke}`,
                strokeWidth: 0.1,
                fill: `${stroke}`,
              }}
              onMouseEnter={() => {
                ReactGa.event({
                  category: `Graph ${type}`,
                  action: `${type} hover`,
                });
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default LinePlot;
