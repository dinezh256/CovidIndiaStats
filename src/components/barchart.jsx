import React, { useRef, useEffect } from "react";
import {
  select,
  axisBottom,
  axisRight,
  scaleBand,
  scaleTime,
  scaleLinear
} from "d3";

const BarChart = ({ date, data, marginY, color, bg, type }) => {
  const svgRef = useRef();

  const margin = { top: 0, right: 20, bottom: 50, left: 20 };
  const width = 650 - margin.left - margin.right;

  const dateMin = new Date(date[0] + "2020");
  dateMin.setDate(dateMin.getDate() - 1);
  const dateMax = new Date(date[data.length - 1] + "2020");
  dateMax.setDate(dateMax.getDate() + 1);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleTime()
      .domain([dateMin, dateMax])
      .range([margin.left, width]);

    const barScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([margin.left, width - 1.5])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + marginY])
      .range([185, 10]);

    const xAxis = axisBottom(xScale);

    svg
      .select(".x-axis")
      .style("transform", "translateY(185px)")
      .call(xAxis)
      .style("stroke-width", 2.5);

    const yAxis = axisRight(yScale);

    svg
      .select(".y-axis")
      .style("transform", "translateX(610px")
      .call(yAxis)
      .style("stroke-width", 2.5);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => barScale(index))
      .attr("y", -184)
      .attr("width", barScale.bandwidth())
      .attr("fill", color)
      .attr("height", value => 185 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <div>
        <div>
          <span
            className="graph-head"
            style={{ color: color, background: `${bg}` }}
          >
            {type} CASES PLOT
          </span>
        </div>
        <svg
          className="svg-parent"
          style={{
            background: `${bg}`,
            marginTop: "10px",
            marginBottom: "20px"
          }}
          ref={svgRef}
          width="650"
          height="200"
          viewBox="0 0 650 200"
        >
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default BarChart;
