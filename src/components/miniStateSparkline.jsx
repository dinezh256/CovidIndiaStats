import React from "react";
import { commaSeperated } from "../utils/common-functions";
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import PropTypes from "prop-types";
import CreateReactClass from "create-react-class";

const CustomTooltip = CreateReactClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;

      return (
        <div>
          <p
            style={{ fontSize: 10, fontFamily: "notosans", color: "slateblue" }}
          >
            {Number(payload[0].value) > 0
              ? commaSeperated(payload[0].value)
              : "-" + commaSeperated(Math.abs(payload[0].value))}
          </p>
        </div>
      );
    }
    return null;
  },
});

const MiniStateSparkline = ({
  requiredStateDailyData,
  dataKey,
  min,
  max,
  sparklineData,
  stroke,
}) => {
  return (
    <section style={{ alignContent: "center" }}>
      <ResponsiveContainer width="95%" height="100%" aspect={2.35}>
        <LineChart
          data={requiredStateDailyData.slice(
            requiredStateDailyData.length - 20,
            requiredStateDailyData.length
          )}
          syncId="line2"
        >
          <YAxis domain={[min, max]} hide={true} />

          <Tooltip
            content={<CustomTooltip />}
            contentStyle={{
              background: "rgba(255,255,255,0)",
              border: "none",
              textAlign: "left",
            }}
            active={true}
            cursor={false}
            position={{ x: -5, y: 0 }}
            offset={5}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={2.2}
            dot={false}
            animationDuration={2000}
          />
          <ReferenceDot
            x={
              sparklineData.slice(
                sparklineData.length - 20,
                sparklineData.length
              ).length - 1
            }
            y={Number(sparklineData.slice(-1))}
            r={3}
            fill={stroke}
            stroke={stroke}
            isAbove={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default MiniStateSparkline;
