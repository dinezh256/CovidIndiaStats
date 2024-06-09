import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceDot,
} from "recharts";
import { commaSeperated } from "../utils/common-functions";
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
            style={{
              fontSize: 10,
              fontFamily: "notosans",
              color: "rgba(90, 117, 177, 1)",
            }}
          >
            {commaSeperated(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  },
});

const MiniSparkline = ({
  sparklinedata,
  min,
  max,
  type,
  fill,
  stroke,
  datakey,
}) => {
  const lineKey = ["confirmed", "active", "recovered", "deceased"];
  return (
    <ResponsiveContainer width="98%" height="100%" aspect={2.25}>
      <LineChart data={sparklinedata} syncId="line2">
        <YAxis domain={[min, max]} hide={true} />
        <Tooltip
          content={<CustomTooltip />}
          contentStyle={{
            background: "rgb(255,255,255)",
            border: "none",
            textAlign: "left",
          }}
          active={true}
          cursor={false}
          position={{ x: 0, y: 0 }}
          offset={5}
        />
        <Line
          type="monotone"
          dataKey={lineKey[datakey]}
          stroke={fill}
          strokeWidth={2}
          dot={false}
          animationDuration={2000}
        />
        <ReferenceDot
          x={type.length - 1}
          y={Number(type.slice(-1))}
          r={3.2}
          fill={fill}
          stroke={stroke}
          isFront={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniSparkline;
