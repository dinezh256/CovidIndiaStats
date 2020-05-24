import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { commaSeperated } from "../utils/common-functions";

const WORLD_TOPO_JSON = require("../world-110m");

const PROJECTION_CONFIG = {
  scale: 33,
  // always in [East Latitude, North Longitude]
};

const COLOR_RANGE = ["#641304", "#b9381e"];

const DEFAULT_COLOR = "#ffffff";

const geographyStyle = {
  default: {
    outline: "#b13f2b",
  },
  hover: {
    fill: "#e08878",
    transition: "all 250ms",
    outline: "#f13f2b",
  },
  pressed: {
    outline: "#b13f2b",
  },
};

const WorldChoropleth = ({ data: statesdata }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: statesdata.reduce(
      (max, item) => (item.value > max ? item.value : max),
      0
    ),
  };

  const colorScale = scaleLog()
    .domain(statesdata.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "0" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.NAME}: ${commaSeperated(
          Number(current.value)
        )} infected & ${commaSeperated(Number(current.active))} active`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={210}
        height={210}
        data-tip=""
      >
        <Geographies geography={WORLD_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = statesdata.find(
                (s) => s.id === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  stroke={"#e2808f"}
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

export default WorldChoropleth;
