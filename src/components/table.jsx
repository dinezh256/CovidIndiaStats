import React, { Component } from "react";
import * as Icon from "react-feather";
import CountUp from "react-countup";
import Updates from "./updates";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip as Retooltip,
  ReferenceDot,
} from "recharts";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import StateTable from "./stateTable";

let CreateReactClass = require("create-react-class");

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      total: [],
      delta: [],
      data: [],
    };
  }

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          items: json.statewise.filter(
            (item) => item.confirmed !== "0" && item.state !== "Total"
          ),
          total: json.statewise.filter((item) => item.state === "Total"),
          delta: json.statewise,
          data: json.cases_time_series,
        });
      })
    );
  }

  render() {
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
              <p style={{ fontSize: 8, fontFamily: "notosans" }}>
                {commaSeperated(payload[0].value)}
              </p>
            </div>
          );
        }
        return null;
      },
    });

    const { isLoaded, items, total, delta, data } = this.state;

    const dailyConfirmed = [];
    data.map((item) => dailyConfirmed.push(Number(item.dailyconfirmed)));

    const dailyActive = [];
    data.map((item) =>
      dailyActive.push(
        Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased)
      )
    );

    const dailyRecovered = [];
    data.map((item) => dailyRecovered.push(Number(item.dailyrecovered)));

    const dailyDeceased = [];
    data.map((item) => dailyDeceased.push(Number(item.dailydeceased)));

    items.sort(function (x, y) {
      return Number(y.confirmed) - Number(x.confirmed);
    });

    const useStylesBootstrap = makeStyles((theme: Theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
    }));

    function BootstrapTooltip(props: TooltipProps) {
      const classes = useStylesBootstrap();

      return (
        <Tooltip disableTouchListener arrow classes={classes} {...props} />
      );
    }

    const HtmlTooltip = withStyles((theme: Theme) => ({
      tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }))(Tooltip);

    const sparklinedata = [];
    const sparklineconfirmed = [];
    const sparklineactive = [];
    const sparklinerecovered = [];
    const sparklinedeceased = [];

    data.slice(data.length - 20, data.length).map((item) =>
      sparklinedata.push({
        confirmed: Number(item.dailyconfirmed),
        active:
          Number(item.dailyconfirmed) -
          Number(item.dailyrecovered) -
          Number(item.dailydeceased),
        recovered: Number(item.dailyrecovered),
        deceased: Number(item.dailydeceased),
        date: item.date,
      })
    );

    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklineconfirmed.push(Number(item.dailyconfirmed)));
    data
      .slice(data.length - 20, data.length)
      .map((item) =>
        sparklineactive.push(
          Number(item.dailyconfirmed) -
            Number(item.dailyrecovered) -
            Number(item.dailydeceased)
        )
      );
    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklinerecovered.push(Number(item.dailyrecovered)));
    data
      .slice(data.length - 20, data.length)
      .map((item) => sparklinedeceased.push(Number(item.dailydeceased)));

    function commaSeperated(x) {
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      let otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== "") lastThree = "," + lastThree;
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }

    if (isLoaded) {
      return (
        <React.Fragment>
          <div className="containerHome">
            <div
              className="row no gutter fadeInUp"
              id="line1"
              style={{ marginBottom: "-5px", animationDelay: "0.7s" }}
            >
              <table
                className="table table-sm table-striped table-borderless"
                style={{
                  boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                  borderRadius: "6px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className="text-info span delta sticky-top"
                      style={{ width: "25%", background: "#d9ecf5" }}
                    >
                      CONFIRMED
                    </th>
                    <th
                      className="delta span sticky-top"
                      style={{
                        width: "25%",
                        background: "#f5d2d2",
                        color: "#ff446a",
                      }}
                    >
                      ACTIVE
                    </th>
                    <th
                      className="text-success delta span sticky-top"
                      style={{ width: "25%", background: "#d5e9d5" }}
                    >
                      Recovered
                    </th>
                    <th
                      className="text-secondary delta span sticky-top"
                      style={{
                        background: "#ece7e7",
                        fontWeight: 600,
                        width: "25%",
                      }}
                    >
                      DECEASED
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  <td>
                    <h6 className="text-info delta" style={{ fontSize: 12 }}>
                      +{commaSeperated(delta[0].deltaconfirmed)}
                    </h6>
                    <h4 className="text-info delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].confirmed)}
                        duration={2.5}
                        separator=","
                      />
                    </h4>
                    <section tyle={{ justifyContent: "center" }}>
                      <ResponsiveContainer
                        width={75}
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line1">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="confirmed"
                            stroke="#42b3f4"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklineconfirmed.length - 1}
                            y={Number(sparklineconfirmed.slice(-1))}
                            r={2.5}
                            fill="#42b3f4"
                            stroke="rgba(66, 179, 244, 0.7)"
                            isFront={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h6
                      className="delta"
                      style={{ color: "#ff446a", fontSize: 12 }}
                    >
                      {((total[0].active / total[0].confirmed) * 100).toFixed(
                        1
                      )}
                      %
                    </h6>
                    <h4 className="delta" style={{ color: "#ff446a" }}>
                      <CountUp
                        start={0}
                        end={Number(total[0].active)}
                        duration={2.5}
                        separator=","
                      />
                    </h4>
                    <section style={{ justifyContent: "center" }}>
                      <ResponsiveContainer
                        width={75}
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line1">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="active"
                            stroke="#ff446a"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklineactive.length - 1}
                            y={Number(sparklineactive.slice(-1))}
                            r={2.5}
                            fill="#ff446a"
                            stroke="rgba(255, 68, 106, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h5 className="text-success delta" style={{ fontSize: 12 }}>
                      +{commaSeperated(delta[0].deltarecovered)}
                    </h5>
                    <h5 className="text-success delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].recovered)}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <section tyle={{ justifyContent: "center" }}>
                      <ResponsiveContainer
                        width={75}
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line1">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="recovered"
                            stroke="#58bd58"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklinerecovered.length - 1}
                            y={Number(sparklinerecovered.slice(-1))}
                            r={2.5}
                            fill="#58bd58"
                            stroke="rgba(88, 189, 88, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h6
                      className="text-secondary delta"
                      style={{ fontSize: 12 }}
                    >
                      +{delta[0].deltadeaths}
                    </h6>
                    <h5 className="text-secondary delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].deaths)}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <section
                      className="text-secondary"
                      style={{ justifyContent: "center" }}
                    >
                      <ResponsiveContainer
                        width={75}
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line1">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="deceased"
                            stroke="#5c5756"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklinedeceased.length - 1}
                            y={Number(sparklinedeceased.slice(-1))}
                            r={2.5}
                            fill="#5c5756"
                            stroke="rgba(92, 87, 86, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>
                </tbody>
              </table>
            </div>
            <div
              className="row no gutter container fadeInUp"
              id="line2"
              style={{
                marginTop: 15,
                marginBottom: "-5px",
                animationDelay: "0.7s",
              }}
            >
              <table
                className="table table-sm table-striped table-borderless"
                style={{
                  boxShadow: "0 0 30px rgba(0,0,0,0.25)",
                  borderRadius: "6px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className="text-info span delta sticky-top"
                      style={{ width: "25%", background: "#d9ecf5" }}
                    >
                      CONFIRMED
                    </th>
                    <th
                      className="delta span sticky-top"
                      style={{
                        width: "25%",
                        background: "#f5d2d2",
                        color: "#ff446a",
                      }}
                    >
                      ACTIVE
                    </th>
                    <th
                      className="text-success delta span sticky-top"
                      style={{ width: "25%", background: "#d5e9d5" }}
                    >
                      Recovered
                    </th>
                    <th
                      className="text-secondary delta span sticky-top"
                      style={{
                        background: "#ece7e7",
                        fontWeight: 600,
                        width: "25%",
                      }}
                    >
                      DECEASED
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  <td>
                    <h6 className="text-info delta" style={{ fontSize: 12 }}>
                      +{commaSeperated(delta[0].deltaconfirmed)}
                    </h6>
                    <h4 className="text-info delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].confirmed)}
                        duration={2.5}
                        separator=","
                      />
                    </h4>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />

                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="confirmed"
                            stroke="#42b3f4"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklineconfirmed.length - 1}
                            y={Number(sparklineconfirmed.slice(-1))}
                            r={3}
                            fill="#42b3f4"
                            stroke="rgba(66, 179, 244, 0.7)"
                            isAbove={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h6
                      className="delta"
                      style={{ color: "#ff446a", fontSize: 12 }}
                    >
                      {((total[0].active / total[0].confirmed) * 100).toFixed(
                        1
                      )}
                      %
                    </h6>
                    <h5 className="delta" style={{ color: "#ff446a" }}>
                      <CountUp
                        start={0}
                        end={Number(total[0].active)}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="active"
                            stroke="#ff446a"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklineactive.length - 1}
                            y={Number(sparklineactive.slice(-1))}
                            r={3}
                            fill="#ff446a"
                            stroke="rgba(255, 68, 106, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h6 className="text-success delta" style={{ fontSize: 12 }}>
                      +{commaSeperated(delta[0].deltarecovered)}
                    </h6>
                    <h5 className="text-success delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].recovered)}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="recovered"
                            stroke="#58bd58"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklinerecovered.length - 1}
                            y={Number(sparklinerecovered.slice(-1))}
                            r={3}
                            fill="#58bd58"
                            stroke="rgba(88, 189, 88, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>

                  <td>
                    <h6
                      className="text-secondary delta"
                      style={{ fontSize: 12 }}
                    >
                      +{delta[0].deltadeaths}
                    </h6>
                    <h5 className="text-secondary delta">
                      <CountUp
                        start={0}
                        end={Number(total[0].deaths)}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.35}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis
                            domain={[0, Math.max(...sparklineconfirmed)]}
                            hide={true}
                          />
                          <Retooltip
                            content={<CustomTooltip />}
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
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
                            dataKey="deceased"
                            stroke="#5c5756"
                            strokeWidth={2.3}
                            dot={false}
                            animationDuration={2000}
                          />
                          <ReferenceDot
                            x={sparklinedeceased.length - 1}
                            y={Number(sparklinedeceased.slice(-1))}
                            r={3}
                            fill="#5c5756"
                            stroke="rgba(92, 87, 86, 0.7)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </section>
                  </td>
                </tbody>
              </table>
            </div>
            <div className="w-100"></div>
            <div className="container">
              <div
                className="row"
                id="line2"
                style={{
                  animationDelay: "0.7s",
                }}
              >
                <Updates />
              </div>
            </div>

            <div className="w-100"></div>
            <div
              className="row"
              id="line1"
              style={{
                animationDelay: "0.7s",
              }}
            >
              <Updates />
            </div>
            <div className="w-100"></div>
            <div className="row" id="line1">
              <table
                className="table table-striped table-sm fadeInUp table-borderless"
                style={{
                  animationDelay: "0.9s",
                  marginTop: "-15px",
                  marginBottom: "-10px",
                  fontFamily: "notosans",
                }}
                align="center"
              >
                <thead className="thead-dark">
                  <tr>
                    <th className="th sticky-top">State/UT</th>
                    <th className="th text-info sticky-top">CONFIRMED</th>
                    <th className="th sticky-top" style={{ color: "#ff446a" }}>
                      ACTIVE
                    </th>
                    <th className="th text-success sticky-top">Recovered</th>
                    <th className="th text-secondary sticky-top">DEATHS</th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {items.map((item) => (
                    <tr className="tr" key={item.statecode}>
                      <td
                        className="text-secondary tdleft"
                        style={{ borderStyle: "solid", borderLeftWidth: "3px" }}
                      >
                        {item.state}
                        {item.statenotes ? (
                          <BootstrapTooltip
                            placement="right"
                            title={parse(item.statenotes)}
                          >
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="disabled"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {item.deltaconfirmed !== "0" && (
                            <Icon.ArrowUp
                              color="#42b3f4"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltaconfirmed === "0"
                            ? ""
                            : commaSeperated(item.deltaconfirmed)}
                        </span>
                        &nbsp;&nbsp;
                        {commaSeperated(item.confirmed)}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        {item.active === "0"
                          ? "-"
                          : commaSeperated(item.active)}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#28a745" }}>
                          {item.deltarecovered !== "0" && (
                            <Icon.ArrowUp
                              color="#28a745"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltarecovered === "0"
                            ? ""
                            : commaSeperated(item.deltarecovered)}
                        </span>
                        &nbsp;&nbsp;
                        {item.recovered === "0"
                          ? "-"
                          : commaSeperated(item.recovered)}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#6c757d" }}>
                          {item.deltadeaths !== "0" && (
                            <Icon.ArrowUp
                              color="#6c757d"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltadeaths === "0"
                            ? ""
                            : commaSeperated(item.deltadeaths)}
                        </span>
                        &nbsp;&nbsp;
                        {item.deaths === "0"
                          ? "-"
                          : commaSeperated(item.deaths)}
                      </td>
                    </tr>
                  ))}
                  <tr className="tr" key={total[0].statecode}>
                    <td
                      className="text-secondary tdleft"
                      style={{ borderStyle: "solid", borderLeftWidth: "3px" }}
                    >
                      {total[0].state}
                      {total[0].statenotes ? (
                        <BootstrapTooltip title={parse(total[0].statenotes)}>
                          <span style={{ verticalAlign: "0.05rem" }}>
                            <InfoTwoToneIcon
                              color="inherit"
                              fontSize="inherit"
                            />
                          </span>
                        </BootstrapTooltip>
                      ) : (
                        ""
                      )}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup text-info">
                        {total[0].deltaconfirmed !== "0" && (
                          <Icon.ArrowUp
                            color="#42b3f4"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}

                        {total[0].deltaconfirmed === "0"
                          ? ""
                          : commaSeperated(total[0].deltaconfirmed)}
                      </span>
                      &nbsp;&nbsp;{commaSeperated(total[0].confirmed)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      {total[0].active === "0"
                        ? "-"
                        : commaSeperated(total[0].active)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span
                        className="arrowup"
                        style={{ color: "#28a745", wordBreak: "keep-all" }}
                      >
                        {total[0].deltarecovered !== "0" && (
                          <Icon.ArrowUp
                            color="#28a745"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}
                        {total[0].deltarecovered === "0"
                          ? ""
                          : commaSeperated(total[0].deltarecovered)}
                      </span>
                      &nbsp;&nbsp;
                      {total[0].recovered === "0"
                        ? "-"
                        : commaSeperated(total[0].recovered)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span
                        className="arrowup"
                        style={{
                          color: "#6c757d",
                        }}
                      >
                        {total[0].deltadeaths !== "0" && (
                          <Icon.ArrowUp
                            color="#6c757d"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}
                        {total[0].deltadeaths === "0"
                          ? ""
                          : commaSeperated(total[0].deltadeaths)}
                      </span>
                      &nbsp;&nbsp;
                      <span>
                        {total[0].deaths === "0"
                          ? "-"
                          : commaSeperated(total[0].deaths)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row" id="line2">
              <table
                className="table table-sm table-striped fadeInUp table-borderless"
                style={{
                  animationDelay: "0.9s",
                  marginTop: "-15px",
                }}
                align="center"
              >
                <thead className="thead-dark">
                  <tr>
                    <th className="th-md sticky-top">State/UT</th>
                    <th className="th-md text-info sticky-top">Confirmed</th>
                    <th
                      className="th-md sticky-top"
                      style={{ color: "#ff446a" }}
                    >
                      Active
                    </th>
                    <th className="th-md text-success sticky-top">RECOVERED</th>
                    <th className="th-md text-secondary sticky-top">
                      Deceased
                    </th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {items.map((item) => (
                    <tr className="tr" key={item.statecode}>
                      <td
                        className="text-secondary td-md-left"
                        style={{ borderStyle: "solid", borderLeftWidth: "3px" }}
                      >
                        {item.state}
                        {item.statenotes ? (
                          <BootstrapTooltip
                            placement="right"
                            title={parse(item.statenotes)}
                          >
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="inherit"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td-md text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {item.deltaconfirmed !== "0" && (
                            <Icon.ArrowUp
                              color="#42b3f4"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltaconfirmed === "0"
                            ? ""
                            : commaSeperated(item.deltaconfirmed)}
                        </span>
                        &nbsp;&nbsp;{commaSeperated(item.confirmed)}
                      </td>
                      <td
                        className="delta td-md text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        {item.active === "0"
                          ? "-"
                          : commaSeperated(item.active)}
                      </td>
                      <td
                        className="delta td-md text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#28a745" }}>
                          {item.deltarecovered !== "0" && (
                            <Icon.ArrowUp
                              color="#28a745"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltarecovered === "0"
                            ? ""
                            : commaSeperated(item.deltarecovered)}
                        </span>
                        &nbsp;&nbsp;
                        {item.recovered === "0"
                          ? "-"
                          : commaSeperated(item.recovered)}
                      </td>
                      <td
                        className="delta td-md text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#6c757d" }}>
                          {item.deltadeaths !== "0" && (
                            <Icon.ArrowUp
                              color="#6c757d"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltadeaths === "0"
                            ? ""
                            : commaSeperated(item.deltadeaths)}
                        </span>
                        &nbsp;&nbsp;
                        {item.deaths === "0"
                          ? "-"
                          : commaSeperated(item.deaths)}
                      </td>
                    </tr>
                  ))}
                  <tr className="tr" key={total[0].statecode}>
                    <td
                      className="text-secondary tdleft"
                      style={{ borderStyle: "solid", borderLeftWidth: "3px" }}
                    >
                      {total[0].state}
                      {total[0].statenotes ? (
                        <HtmlTooltip title={parse(total[0].statenotes)}>
                          <span style={{ verticalAlign: "0.05rem" }}>
                            <InfoTwoToneIcon
                              color="disabled"
                              fontSize="inherit"
                            />
                          </span>
                        </HtmlTooltip>
                      ) : (
                        ""
                      )}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup text-info">
                        {total[0].deltaconfirmed !== "0" && (
                          <Icon.ArrowUp
                            color="#42b3f4"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}{" "}
                        {commaSeperated(total[0].deltaconfirmed)}
                      </span>
                      &nbsp;&nbsp;{commaSeperated(total[0].confirmed)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      {total[0].active === "0"
                        ? "-"
                        : commaSeperated(total[0].active)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#28a745" }}>
                        {total[0].deltarecovered !== "0" && (
                          <Icon.ArrowUp
                            color="#28a745"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}{" "}
                        {total[0].deltarecovered === "0"
                          ? ""
                          : commaSeperated(total[0].deltarecovered)}
                      </span>
                      &nbsp;&nbsp;
                      {total[0].recovered === "0"
                        ? "-"
                        : commaSeperated(total[0].recovered)}
                    </td>
                    <td
                      className="delta td text-secondary"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#6c757d" }}>
                        {total[0].deltadeaths !== "0" && (
                          <Icon.ArrowUp
                            color="#6c757d"
                            size={9}
                            strokeWidth={3.5}
                          />
                        )}

                        {total[0].deltadeaths === "0"
                          ? ""
                          : commaSeperated(total[0].deltadeaths)}
                      </span>
                      &nbsp;&nbsp;
                      {total[0].deaths === "0"
                        ? "-"
                        : commaSeperated(total[0].deaths)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-100"></div>
            <div
              className="row fadeInup"
              style={{
                textAlign: "center",
                transitionDelay: "1.1s",
                marginBottom: "0px",
              }}
            >
              <h5 style={{ color: "#3e4da3" }}>INDIA - DISTRICTWISE</h5>
            </div>
            <div className="w-100"></div>
            <div id="line1" style={{ alignContent: "center" }}>
              <StateTable />
            </div>
            <div className="container" style={{ width: "90%" }} id="line2">
              <StateTable />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Table;
