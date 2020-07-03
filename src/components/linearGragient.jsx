import React from "react";
import PropTypes from "prop-types";

const LinearGradient = (props) => {
  const { data } = props;
  const boxStyle = {
    width: "22rem",
    margin: "auto",
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 12,
  };
  return (
    <div>
      <div style={boxStyle} className="display-flex">
        <span style={{ marginRight: 5, color: data.toColor }}>{data.min}</span>
        <span className="fill"></span>
        <div style={{ ...boxStyle, ...gradientStyle }}></div>
        <span style={{ marginLeft: 5, color: data.toColor }}>{data.max}</span>
      </div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LinearGradient;
