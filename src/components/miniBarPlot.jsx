import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const MiniBarPlot = ({ barDailyData, type, fill }) => {
  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 11;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };
  return (
    <ResponsiveContainer aspect={1} width="100%" height="100%">
      <BarChart
        data={barDailyData.slice(barDailyData.length - 7, barDailyData.length)}
        margin={{
          top: 53,
          bottom: -15,
        }}
      >
        <XAxis
          dataKey="date"
          tick={{
            stroke: fill,
            fill: fill,
            strokeWidth: 0.2,
          }}
          interval={0}
          axisLine={{ color: "rgba(255,255,255,0)", strokeWidth: 0 }}
          style={{ fontSize: "0.5rem", fontFamily: "notosans" }}
          tickSize={5}
          tickLine={{ stroke: fill }}
        />
        <YAxis hide={true} />
        <Tooltip
          contentStyle={{
            background: "rgba(255,255,255,0)",
            color: "rgba(62, 77, 163, 1)",
            border: "none",
            borderRadius: "5px",
            fontSize: "10px",
            fontFamily: "notosans",
            textTransform: "uppercase",
            textAlign: "left",
            lineHeight: 0.8,
          }}
          active={true}
          cursor={{ fill: "transparent" }}
          position={{ x: -5, y: 0 }}
        />
        <Bar
          dataKey="stateid"
          name={type}
          fill={fill}
          radius={[5, 5, 0, 0]}
          barSize={20}
        >
          {type !== "active" && (
            <LabelList dataKey="label" content={renderCustomizedLabel} />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MiniBarPlot;
