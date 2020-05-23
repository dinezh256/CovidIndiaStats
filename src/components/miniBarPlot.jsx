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
  return (
    <ResponsiveContainer aspect={1.4} width="100%" height="100%">
      <BarChart
        data={barDailyData.slice(barDailyData.length - 7, barDailyData.length)}
        margin={{
          top: 35,
        }}
      >
        <XAxis hide={true} dataKey="date" />
        <YAxis hide={true} />
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
          position={{ x: -5, y: 0 }}
        />
        <Bar dataKey="stateid" name={type} fill={fill} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="label" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MiniBarPlot;
