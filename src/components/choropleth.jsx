import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import ReactTooltip from "react-tooltip";

const INDIA_TOPO_JSON = require("../india.topo.json");

const PROJECTION_CONFIG = {
  scale: 375,
  center: [82.8, 22.5937], // always in [East Latitude, North Longitude]
};

const COLOR_RANGE = ["rgba(173, 28, 57, 1)", "rgba(173, 28, 57, 0.9)"];

const DEFAULT_COLOR = "#ffffff";

const geographyStyle = {
  default: {
    outline: "#b13f2b",
  },
  hover: {
    fill: "rgb(228, 116, 138)",
    outline: "#ffffff",
    transition: "all 250ms",
  },
  pressed: {
    outline: "#b13f2b",
  },
};

function commaSeperated(x) {
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== "") lastThree = "," + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return res;
}

const Choropleth = ({ data: statesdata }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  const colorScale = scaleLog()
    .domain(statesdata.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "0" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.st_nm}: ${commaSeperated(
          Number(current.value)
        )} infected`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="container">
      <ReactTooltip multiline={true}>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={192}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = statesdata.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(Number(current.value)) : "#FFFFFF"}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  stroke={"#3a0910"}
                  strokeWidth={0.15}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Choropleth;
