import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { commaSeperated } from "../utils/common-functions";

const PROJECTION_CONFIG = {
    scale: 375,
    center: [82.8, 22.5937], // always in [East Latitude, North Longitude]
  };


const StateChoropleth = ({data, colorLow, colorHigh, fill, type}) => {
    
    return (  );
}
 
export default StateChoropleth;

export default StateChoropleth;
