import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { format } from "d3";
import {
  commaSeperated,
  stateMaps,
  stateMapScale,
  stateMapTranslateX,
  stateMapTranslateY,
} from "../utils/common-functions";
import LinearGradient from "./linearGragient";

const StateChoropleth = ({
  data,
  colorLow,
  colorHigh,
  type,
  borderColor,
  stateCode,
}) => {
  const STATE_TOPO_JSON = stateMaps[stateCode];
  const PROJECTION_CONFIG = {
    scale: stateMapScale[stateCode],
    center: [stateMapTranslateX[stateCode], stateMapTranslateY[stateCode]],
  };

  const COLOR_RANGE_CONFIRMED = [
    "rgba(66, 200, 255, 0.05)",
    "rgba(66, 200, 255, 0.1)",
    "rgba(66, 200, 255, 0.2)",
    "rgba(66, 200, 255, 0.3)",
    "rgba(66, 200, 255, 0.4)",
    "rgba(66, 200, 255, 0.5)",
    "rgba(66, 200, 255, 0.55)",
    "rgba(66, 200, 255, 0.6)",
    "rgba(66, 200, 255, 0.7)",
    "rgba(66, 200, 255, 0.75)",
    "rgba(66, 200, 255, 0.76)",
    "rgba(66, 200, 255, 0.78)",
    "rgba(66, 200, 255, 0.8)",
    "rgba(66, 200, 255, 1)",
  ];

  const COLOR_RANGE_ACTIVE = [
    "rgba(221, 50, 85, 0.05)",
    "rgba(221, 50, 85, 0.1)",
    "rgba(221, 50, 85, 0.2)",
    "rgba(221, 50, 85, 0.5)",
    "rgba(221, 50, 85, 0.55)",
    "rgba(221, 50, 85, 0.6)",
    "rgba(221, 50, 85, 0.7)",
    "rgba(221, 50, 85, 0.8)",
    "rgba(240, 50, 85, 0.9)",
    "rgba(240, 50, 85, 1)",
  ];

  const COLOR_RANGE_RECOVERED = [
    "rgba(40, 167, 69, 0.05)",
    "rgba(40, 167, 69, 0.1)",
    "rgba(40, 167, 69, 0.2)",
    "rgba(40, 167, 69, 0.3)",
    "rgba(40, 167, 69, 0.4)",
    "rgba(40, 167, 69, 0.5)",
    "rgba(40, 167, 69, 0.55)",
    "rgba(40, 167, 69, 0.6)",
    "rgba(40, 167, 69, 0.7)",
    "rgba(40, 167, 69, 0.75)",
    "rgba(40, 167, 69, 0.8)",
    "rgba(40, 167, 69, 0.85)",
    "rgba(40, 167, 69, 0.9)",
    "rgba(40, 167, 69, 1)",
  ];

  const COLOR_RANGE_DESEASED = [
    "rgba(74, 79, 83, 0.05)",
    "rgba(74, 79, 83, 0.1)",
    "rgba(74, 79, 83, 0.2)",
    "rgba(74, 79, 83, 0.3)",
    "rgba(74, 79, 83, 0.4)",
    "rgba(74, 79, 83, 0.5)",
    "rgba(74, 79, 83, 0.55)",
    "rgba(74, 79, 83, 0.6)",
    "rgba(74, 79, 83, 0.7)",
    "rgba(74, 79, 83, 0.75)",
    "rgba(74, 79, 83, 0.8)",
    "rgba(74, 79, 83, 0.85)",
    "rgba(74, 79, 83, 0.9)",
    "rgba(74, 79, 83, 1)",
  ];

  let COLOR_RANGE = [];

  if (type === "confirmed") COLOR_RANGE = COLOR_RANGE_CONFIRMED;
  if (type === "active") COLOR_RANGE = COLOR_RANGE_ACTIVE;
  if (type === "recovered") COLOR_RANGE = COLOR_RANGE_RECOVERED;
  if (type === "deceased") COLOR_RANGE = COLOR_RANGE_DESEASED;

  const geographyStyle = {
    default: {
      outline: borderColor,
    },
    hover: {
      transition: "all 250ms",
      strokeWidth: 1,
      outline: "#b13f2b",
    },
    pressed: {
      outline: "#b13f2b",
    },
  };
  const [tooltipContent, setTooltipContent] = useState("");

  const gradientData = {
    fromColor: colorLow,
    toColor: colorHigh,
    min: 0,
    max: String(
      format(".2~s")(
        Math.ceil(
          data.reduce((max, item) => (item[type] > max ? item[type] : max), 0)
        )
      )
    ),
  };

  let isUpdatedData = true;

  for (let i = 0; i < data.length; i++) {
    if (data[i].district === "Unknown") {
      isUpdatedData = false;
      break;
    }
  }

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d[type]))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "0" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.district}: ${commaSeperated(Number(current[type]))} ${
          type.charAt(0).toUpperCase() + type.slice(1)
        }`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="choropleth">
      {!isUpdatedData && (
        <div>
          <h6
            class="choroplethText"
            style={{
              color: colorHigh,
              fontSize: "0.8rem",
              textAlign: "center",
              marginBottom: "-20px",
              background: colorLow,
            }}
          >
            <WarningRoundedIcon
              fontSize="small"
              color="inherit"
              style={{ verticalAlign: "-0.25rem" }}
            />{" "}
            Latest district wise COVID19 figures hasn't been provided by State
            Government
          </h6>
        </div>
      )}

      <ReactTooltip multiline={true}>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={192}
        height={220}
        data-tip=""
      >
        <Geographies geography={STATE_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find(
                (s) => s.district === geo.properties.district
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(Number(current[type])) : "#FFFFFF"}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  stroke={borderColor}
                  strokeWidth={0.4}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div>
        <h6
          style={{
            color: colorHigh,
            textTransform: "capitalize",
            textAlign: "center",
            marginTop: "-2rem",
          }}
        >
          <span class="choroplethText" style={{ background: colorLow }}>
            {type}
          </span>
        </h6>
      </div>
      <div>
        <LinearGradient data={gradientData} />
      </div>
    </div>
  );
};

export default StateChoropleth;
