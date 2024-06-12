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

const StateLinePlot = ({
  stateName,
  bgColor,
  titleClass,
  type,
  date,
  total,
  daily,
  stroke,
  lineStroke,
  color1,
  color2,
  divideBy,
  interval,
}) => {
  return (
    <div className="col">
      <section
        className="graph-wrapper"
        style={{
          backgroundColor: `${bgColor}`,
          borderRadius: "6px",
          paddingTop: "5px",
          marginTop: 10,
        }}
      >
        <h5
          className={titleClass}
          style={{
            paddingTop: "5px",
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
            <h5
              style={{
                fontSize: 14,
                color: `${color2}`,
                textTransform: "capitalize",
              }}
            >
              {commaSeperated(total[total.length - 1].stateid)}{" "}
              <span style={{ fontSize: 9 }}>
                {daily >= 0
                  ? "+" + commaSeperated(daily)
                  : "-" + commaSeperated(Math.abs(daily))}
              </span>
            </h5>
          </h6>
        </h5>
        <ResponsiveContainer width="100%" height="100%" aspect={2.2}>
          <LineChart
            data={total}
            margin={{
              top: 40,
              right: -20,
              left: 20,
              bottom: -8,
            }}
            syncId="linechart"
          >
            <XAxis
              dataKey="date"
              interval={"preserveStartEnd"}
              tick={{ stroke: stroke, strokeWidth: 0.2, fill: stroke }}
              style={{ fontSize: "0.62rem", fontFamily: "notosans" }}
              tickSize={5}
              tickLine={{ stroke: stroke }}
              tickCount={5}
              axisLine={{ stroke: stroke, strokeWidth: "1.5px" }}
            />
            <YAxis
              domain={[
                0,
                Math.ceil(
                  Math.max.apply(
                    Math,
                    total.map(function (item) {
                      return Number(item.stateid);
                    })
                  ) / divideBy
                ) * divideBy,
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
              cursor={false}
              position={{ x: 120, y: 22 }}
            />
            <Line
              type="monotone"
              dataKey="stateid"
              stroke={lineStroke}
              strokeWidth="3"
              strokeLinecap="round"
              name={type}
              dot={({ cx, cy }) => (
                <svg
                  x={cx - 2.25}
                  y={cy - 2.25}
                  width={4.5}
                  height={4.5}
                  fill={stroke}
                  viewBox="0 0 1024 1024"
                >
                  <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
                </svg>
              )}
              activeDot={{ r: 2.5 }}
              onClick={() => {
                ReactGa.event({
                  category: `Graph state ${type} ${stateName}`,
                  action: `${type} state hover`,
                });
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default StateLinePlot;
