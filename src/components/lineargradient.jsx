import React from "react";
import PropTypes from "prop-types";

const LinearGradient = (props) => {
  const { data } = props;
  const boxStyle = {
    height: 180,
    width: 20,
    margin: "auto",
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20,
  };
  return (
    <div>
      <div style={boxStyle}>
        <span>{data.max}</span>
        <span className="fill"></span>
        <span>{data.min}</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }}></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LinearGradient;
