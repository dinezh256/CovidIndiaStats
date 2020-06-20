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

const BarPlot = ({
  type,
  bgColor,
  titleClass,
  data,
  date,
  timelineLength,
  daily,
  divideBy,
  dataKey,
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

            <h5
              style={{
                fontSize: "0.8rem",
                color: `${color2}`,
                textTransform: "capitalize",
              }}
            >
              {commaSeperated(daily.slice(-1)[0])}{" "}
              <span style={{ fontSize: 8 }}>
                {daily.slice(-1)[0] - daily.slice(-2)[0] >= 0
                  ? `+${commaSeperated(
                      Math.abs(daily.slice(-2)[0] - daily.slice(-1)[0])
                    )}`
                  : `-${commaSeperated(
                      Math.abs(daily.slice(-2)[0] - daily.slice(-1)[0])
                    )}`}
              </span>
            </h5>
          </h6>
        </h5>

        <ResponsiveContainer width="100%" height="100%" aspect={2.4}>
          <BarChart
            width={310}
            height={120}
            data={data.slice(timelineLength, data.length)}
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
              tick={{ stroke: stroke, strokeWidth: 0.2, fill: stroke }}
              style={{ fontSize: 8, fontFamily: "notosans" }}
              tickSize={5}
              tickLine={{ stroke: stroke }}
              tickCount={8}
              axisLine={{ stroke: stroke, strokeWidth: "1.5px" }}
            />
            <YAxis
              domain={[
                Math.floor(Math.min(...daily) / divideBy) * divideBy,
                Math.ceil(Math.max(...daily) / divideBy) * divideBy,
              ]}
              orientation="right"
              tick={{ stroke: stroke, strokeWidth: 0.2, fill: stroke }}
              tickFormatter={format("~s")}
              tickSize={5}
              style={{ fontSize: 8, fontFamily: "notosans" }}
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
              position={{ x: 120, y: 15 }}
            />
            <Bar
              dataKey={dataKey}
              name={type}
              fill={stroke}
              radius={[3, 3, 0, 0]}
              barSize={20}
              onMouseEnter={() => {
                ReactGa.event({
                  category: `Graph ${type}bar`,
                  action: `${type}bar hover`,
                });
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default BarPlot;
