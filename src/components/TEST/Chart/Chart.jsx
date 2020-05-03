import React from "react";
import { Line, defaults } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Charts = ({ data: { cases, recovered, deaths }, country }) => {
  if (!cases) {
    return null;
  }

  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "average";
  defaults.global.tooltips.backgroundColor = "rgba(255, 255, 255, 0.8)";
  defaults.global.tooltips.displayColors = false;
  defaults.global.tooltips.borderColor = "#c62828";
  defaults.global.tooltips.borderWidth = 1;
  defaults.global.tooltips.titleFontColor = "#000";
  defaults.global.tooltips.bodyFontColor = "#000";
  defaults.global.tooltips.caretPadding = 4;
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "nearest";

  defaults.global.legend.display = true;
  defaults.global.legend.position = "bottom";

  defaults.global.hover.intersect = false;

  const chartOptions = {
    animation: {
      steps: 50,
      scale: false,
    },
    responsive: true,
    events: ["click", "mousemove", "mouseout", "touchstart", "touchmove"],
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 20,
      },
    },
    title: {
      display: true,
      text: `Current state in ${country ? country : `the World`}`,
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          ticks: {
            callback: function (label, index, labels) {
              return label / 1000 + "K";
            },
          },
          scaleLabel: {
            display: false,
            labelString: "1K = 1000",
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM DD",
            stepSize: 7,
            displayFormats: {
              millisecond: "MMM DD",
              second: "MMM DD",
              minute: "MMM DD",
              hour: "MMM DD",
              day: "MMM DD",
              week: "MMM DD",
              month: "MMM DD",
              quarter: "MMM DD",
              year: "MMM DD",
            },
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const lineChart = cases ? (
    <React.Fragment>
      <Line
        data={{
          labels: [
            ...Object.keys(cases).map((item) => {
              return `${new Date(item).getDate()} ${
                months[new Date(item).getMonth()]
              }`;
            }),
          ],
          datasets: [
            {
              data: Object.values(cases),
              label: "Infected",
              borderColor: "#2186b4",
              backgroundColor: "#d9ecf5",
              fill: true,
            },
            {
              data: Object.values(recovered),
              label: "Recovered",
              borderColor: "#24aa24",
              backgroundColor: "#c3e0c3",
              fill: true,
            },
            {
              data: Object.values(deaths),
              label: "Deceased",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
        options={chartOptions}
      />
    </React.Fragment>
  ) : null;

  return (
    <div className={`${styles.container} fadeInUp`}>
      {lineChart}
      <div className="w-100"></div>
      <h6 style={{ fontSize: 10 }}>
        Quick Tip: Click on the legends to remove their plot.
      </h6>
    </div>
  );
};

export default Charts;
