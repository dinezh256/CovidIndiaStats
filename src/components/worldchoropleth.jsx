import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { commaSeperated } from "../utils/common-functions";
import LinearGradient from "./linearGragient";

const WORLD_TOPO_JSON = require("../world-110m");

const PROJECTION_CONFIG = {
  scale: 33,
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
    fromColor: "rgb(245, 245, 245)",
    toColor: "rgb(100, 19, 4)",
    min: 0,
    max:
      String(
        Math.ceil(
          statesdata.reduce(
            (max, item) => (item.value > max ? item.value : max),
            0
          ) / 100000
        ) / 10
      ) + "M",
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
    <React.Fragment>
      <div>
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
      <div className="worldLinearGradient">
        <LinearGradient data={gradientData} />
      </div>
    </React.Fragment>
  );
};

export default WorldChoropleth;
