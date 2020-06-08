import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import CountUp from "react-countup";
import Updates from "./updates";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
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
import { commaSeperated } from "../utils/common-functions";
import StateTable from "./stateTable";
import ReactGa from "react-ga";
import Switch from "react-switch";

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
      sortConfirmed: true,
      sortActive: false,
      sortRecovered: false,
      sortDeceased: false,
      sortOrder: true,
      percentageToggleActive: false,
    };
    this.onPercentageToggle = this.onPercentageToggle.bind(this);
    this.onSortConfirmed = this.onSortConfirmed.bind(this);
    this.onSortActive = this.onSortActive.bind(this);
    this.onSortRecovered = this.onSortRecovered.bind(this);
    this.onSortDeceased = this.onSortDeceased.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
  }

  onPercentageToggle(percentageToggleActive) {
    this.setState({ percentageToggleActive });
  }

  onSortConfirmed({ sortConfirmed }) {
    this.setState({ sortConfirmed });
  }

  onSortActive({ sortActive }) {
    this.setState({ sortActive });
  }

  onSortRecovered({ sortRecovered }) {
    this.setState({ sortRecovered });
  }

  onSortDeceased({ sortDeceased }) {
    this.setState({ sortDeceased });
  }

  handleSortOrder({ sortOrder }) {
    this.setState({ sortOrder });
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

    const {
      isLoaded,
      items,
      total,
      delta,
      data,
      sortConfirmed,
      sortActive,
      sortRecovered,
      sortDeceased,
      sortOrder,
      percentageToggleActive,
    } = this.state;

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

    if (sortConfirmed) {
      items.sort(function (x, y) {
        return sortOrder
          ? Number(y.confirmed) - Number(x.confirmed)
          : Number(x.confirmed) - Number(y.confirmed);
      });
    }
    if (sortActive) {
      items.sort(function (x, y) {
        return !sortOrder
          ? Number(y.active) - Number(x.active)
          : Number(x.active) - Number(y.active);
      });
    }
    if (sortRecovered) {
      items.sort(function (x, y) {
        return !sortOrder
          ? Number(y.recovered) - Number(x.recovered)
          : Number(x.recovered) - Number(y.recovered);
      });
    }
    if (sortDeceased) {
      items.sort(function (x, y) {
        return !sortOrder
          ? Number(y.deaths) - Number(x.deaths)
          : Number(x.deaths) - Number(y.deaths);
      });
    }

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
        <Tooltip
          disableTouchListener
          classes={classes}
          {...props}
          TransitionComponent={Zoom}
        />
      );
    }

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

    const min = Math.min(
      ...sparklineconfirmed.slice(
        sparklineconfirmed.length - 20,
        sparklineconfirmed.length
      ),
      ...sparklineactive.slice(
        sparklineactive.length - 20,
        sparklineactive.length
      ),
      ...sparklinerecovered.slice(
        sparklinerecovered.length - 20,
        sparklinerecovered.length
      ),
      ...sparklinedeceased.slice(
        sparklinedeceased.length - 20,
        sparklinedeceased.length
      )
    );

    const max = Math.max(
      ...sparklineconfirmed.slice(
        sparklineconfirmed.length - 20,
        sparklineconfirmed.length
      ),
      ...sparklineactive.slice(
        sparklineactive.length - 20,
        sparklineactive.length
      ),
      ...sparklinerecovered.slice(
        sparklinerecovered.length - 20,
        sparklinerecovered.length
      ),
      ...sparklinedeceased.slice(
        sparklinedeceased.length - 20,
        sparklinedeceased.length
      )
    );

    if (isLoaded) {
      return (
        <React.Fragment>
          <div className="containerHome">
            <div
              className="fadeInUp"
              id="line1"
              style={{
                marginBottom: "8px",
                animationDelay: "0.5s",
                boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                borderRadius: "6px",
              }}
            >
              <table className="table table-sm table-borderless">
                <thead>
                  <tr>
                    <th
                      className="text-info span delta sticky-top graphWidth"
                      style={{ background: "#d9ecf5" }}
                    >
                      CONFIRMED
                    </th>
                    <th
                      className="delta span sticky-top graphWidth"
                      style={{
                        background: "#f5d2d2",
                        color: "#ff446a",
                      }}
                    >
                      ACTIVE
                    </th>
                    <th
                      className="text-success delta span sticky-top graphWidth"
                      style={{ background: "#d5e9d5" }}
                    >
                      Recovered
                    </th>
                    <th
                      className="text-secondary delta span sticky-top graphWidth"
                      style={{
                        background: "#ece7e7",
                        fontWeight: 600,
                      }}
                    >
                      DECEASED
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  <tr>
                    <td>
                      <h6 className="text-info delta" style={{ fontSize: 12 }}>
                        {delta[0].deltaconfirmed > 0 ? (
                          <Icon.PlusCircle
                            size={10}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: 0.5 }}
                          />
                        ) : (
                          <Icon.Meh
                            size={10}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: 1 }}
                          />
                        )}

                        {delta[0].deltaconfirmed > 0
                          ? " " + commaSeperated(delta[0].deltaconfirmed)
                          : ""}
                      </h6>
                      <h5 className="text-info" style={{ textAlign: "center" }}>
                        <CountUp
                          start={0}
                          end={Number(total[0].confirmed)}
                          duration={2}
                          separator=","
                        />
                      </h5>
                      <section tyle={{ justifyContent: "center" }}>
                        <ResponsiveContainer
                          width={76}
                          height="100%"
                          aspect={2.25}
                        >
                          <LineChart data={sparklinedata} syncId="line1">
                            <YAxis domain={[min, max]} hide={true} />
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
                              strokeWidth={2.2}
                              dot={false}
                              animationDuration={2000}
                            />
                            <ReferenceDot
                              x={sparklineconfirmed.length - 1}
                              y={Number(sparklineconfirmed.slice(-1))}
                              r={3}
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
                      <h5 style={{ color: "#ff446a", textAlign: "center" }}>
                        <CountUp
                          start={0}
                          end={Number(total[0].active)}
                          duration={2}
                          separator=","
                        />
                      </h5>
                      <section style={{ justifyContent: "center" }}>
                        <ResponsiveContainer
                          width={76}
                          height="100%"
                          aspect={2.25}
                        >
                          <LineChart data={sparklinedata} syncId="line1">
                            <YAxis domain={[min, max]} hide={true} />
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
                              strokeWidth={2.2}
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
                      <h5
                        className="text-success delta"
                        style={{ fontSize: 12 }}
                      >
                        {delta[0].deltarecovered ? (
                          <Icon.PlusCircle
                            size={10}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: 0.5 }}
                          />
                        ) : (
                          <Icon.Smile
                            size={10}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: 0.5 }}
                          />
                        )}
                        {delta[0].deltarecovered
                          ? " " + commaSeperated(delta[0].deltarecovered)
                          : ""}
                      </h5>
                      <h5
                        className="text-success"
                        style={{ textAlign: "center" }}
                      >
                        <CountUp
                          start={0}
                          end={Number(total[0].recovered)}
                          duration={2}
                          separator=","
                        />
                      </h5>
                      <section tyle={{ justifyContent: "center" }}>
                        <ResponsiveContainer
                          width={76}
                          height="100%"
                          aspect={2.25}
                        >
                          <LineChart data={sparklinedata} syncId="line1">
                            <YAxis domain={[min, max]} hide={true} />
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
                              strokeWidth={2.2}
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
                        {Number(delta[0].deltadeaths) ? (
                          <Icon.PlusCircle
                            size={10}
                            strokeWidth={3}
                            fill="rgba(40, 167, 69, 0.2)"
                            style={{ verticalAlign: 0.5 }}
                          />
                        ) : (
                          <Icon.Meh
                            size={10}
                            strokeWidth={3}
                            fill="rgba(40, 167, 69, 0.2)"
                            style={{ verticalAlign: 0.5 }}
                          />
                        )}{" "}
                        {Number(delta[0].deltadeaths)
                          ? " " + commaSeperated(delta[0].deltadeaths)
                          : ""}
                      </h6>
                      <h5
                        className="text-secondary"
                        style={{ textAlign: "center" }}
                      >
                        <CountUp
                          start={0}
                          end={Number(total[0].deaths)}
                          duration={2}
                          separator=","
                        />
                      </h5>
                      <section
                        className="text-secondary"
                        style={{ justifyContent: "center" }}
                      >
                        <ResponsiveContainer
                          width={76}
                          height="100%"
                          aspect={2.25}
                        >
                          <LineChart data={sparklinedata} syncId="line1">
                            <YAxis domain={[min, max]} hide={true} />
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
                              strokeWidth={2.2}
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
                  </tr>
                </tbody>
              </table>
              <div className="col">
                <div
                  style={{
                    borderSpacing: "1px",
                    textAlign: "center",
                    marginTop: "-18px",
                    marginBottom: "-5px",
                  }}
                >
                  <NavLink
                    to="/links"
                    className="cycloneLink"
                    onClick={() => {
                      ReactGa.event({
                        action: "Cyclone",
                        event: "Cyclone",
                      });
                    }}
                  >
                    <h1 className="cyclone">
                      <Icon.CloudRain
                        size={15}
                        style={{ verticalAlign: "-0.1rem" }}
                        fill="rgba(128, 42, 190, 0.8)"
                      />
                      &nbsp; &nbsp; Cyclone Nisarga Helpline &nbsp;
                      <ArrowRightIcon
                        size="inherit"
                        color="inherit"
                        className="float"
                        style={{ verticalAlign: "-0.42rem" }}
                      />
                    </h1>
                  </NavLink>
                </div>
              </div>
            </div>
            <div
              className="fadeInUp"
              id="line2"
              style={{
                marginTop: 14,
                animationDelay: "0.5s",
                boxShadow: "0 0 30px rgba(0,0,0,0.25)",
                borderRadius: "6px",
                width: "95%",
                marginBottom: 6,
              }}
            >
              <table className="table table-sm table-striped table-borderless">
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
                      {delta[0].deltaconfirmed > 0 ? (
                        <Icon.PlusCircle
                          size={10}
                          strokeWidth={3}
                          fill="rgba(23, 162, 184, 0.2)"
                          style={{ verticalAlign: -0.25 }}
                        />
                      ) : (
                        <Icon.Meh
                          size={10}
                          strokeWidth={3}
                          fill="rgba(23, 162, 184, 0.2)"
                          style={{ verticalAlign: -0.25 }}
                        />
                      )}

                      {delta[0].deltaconfirmed > 0
                        ? " " + commaSeperated(delta[0].deltaconfirmed)
                        : ""}
                    </h6>
                    <h5 className="text-info" style={{ textAlign: "center" }}>
                      <CountUp
                        start={0}
                        end={Number(total[0].confirmed)}
                        duration={2}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.25}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis domain={[min, max]} hide={true} />

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
                            strokeWidth={2.2}
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
                    <h5 style={{ color: "#ff446a", textAlign: "center" }}>
                      <CountUp
                        start={0}
                        end={Number(total[0].active)}
                        duration={2}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.25}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis domain={[min, max]} hide={true} />
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
                            strokeWidth={2.2}
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
                      {delta[0].deltarecovered ? (
                        <Icon.PlusCircle
                          size={10}
                          strokeWidth={3}
                          fill="rgba(23, 162, 184, 0.2)"
                          style={{ verticalAlign: -0.5 }}
                        />
                      ) : (
                        <Icon.Smile
                          size={10}
                          strokeWidth={3}
                          fill="rgba(23, 162, 184, 0.2)"
                          style={{ verticalAlign: -0.5 }}
                        />
                      )}
                      {delta[0].deltarecovered
                        ? " " + commaSeperated(delta[0].deltarecovered)
                        : ""}
                    </h6>
                    <h5
                      className="text-success"
                      style={{ textAlign: "center" }}
                    >
                      <CountUp
                        start={0}
                        end={Number(total[0].recovered)}
                        duration={2}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.25}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis domain={[min, max]} hide={true} />
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
                            strokeWidth={2.2}
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
                      {Number(delta[0].deltadeaths) ? (
                        <Icon.PlusCircle
                          size={10}
                          strokeWidth={3}
                          fill="rgba(40, 167, 69, 0.2)"
                          style={{ verticalAlign: -0.5 }}
                        />
                      ) : (
                        <Icon.Meh
                          size={10}
                          strokeWidth={3}
                          fill="rgba(40, 167, 69, 0.2)"
                          style={{ verticalAlign: -0.5 }}
                        />
                      )}{" "}
                      {Number(delta[0].deltadeaths)
                        ? " " + commaSeperated(delta[0].deltadeaths)
                        : ""}
                    </h6>
                    <h5
                      className="text-secondary"
                      style={{ textAlign: "center" }}
                    >
                      <CountUp
                        start={0}
                        end={Number(total[0].deaths)}
                        duration={2}
                        separator=","
                      />
                    </h5>
                    <section style={{ alignContent: "center" }}>
                      <ResponsiveContainer
                        width="95%"
                        height="100%"
                        aspect={2.25}
                      >
                        <LineChart data={sparklinedata} syncId="line2">
                          <YAxis domain={[min, max]} hide={true} />
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
                            strokeWidth={2.2}
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
              <div
                style={{
                  borderSpacing: "1px",
                  textAlign: "center",
                  marginTop: "-18px",
                  marginBottom: "-4px",
                }}
              >
                <NavLink
                  to="/links"
                  className="cycloneLink"
                  onClick={() => {
                    ReactGa.event({
                      action: "Cyclone",
                      event: "Cyclone",
                    });
                  }}
                >
                  <h1 className="cyclone">
                    <Icon.CloudRain
                      size={15}
                      style={{ verticalAlign: "-0.1rem" }}
                      fill="rgba(128, 42, 190, 0.8)"
                    />{" "}
                    Cyclone Nisarga Helpline
                    <ArrowRightIcon
                      size="inherit"
                      color="inherit"
                      className="float"
                      style={{ verticalAlign: "-0.42rem" }}
                    />
                  </h1>
                </NavLink>
              </div>
            </div>
            <div className="w-100"></div>
            <div className="container">
              <div className="row" id="line2">
                <Updates />
              </div>
            </div>
            <div className="w-100"></div>
            <div className="row" id="line1">
              <Updates />
            </div>
            <div className="w-100"></div>
            <div
              className="row fadeInUp"
              style={{
                textAlign: "center",
                animationDelay: "1.8s",
                marginTop: "-20px",
              }}
            >
              <h5 style={{ color: "#3e4da3" }}>
                INDIA - STATEWISE{" "}
                <BootstrapTooltip
                  title={"Data tallied with State bulletins and MoHFW"}
                >
                  <span>
                    <InfoTwoToneIcon
                      color="inherit"
                      fontSize="small"
                      style={{ verticalAlign: "-0.15rem" }}
                    />
                  </span>
                </BootstrapTooltip>
              </h5>
              <div
                className="col fadeInUp"
                style={{ animationDelay: "1.8s", alignItems: "right" }}
              >
                <div
                  className="home-toggle float-left"
                  style={{
                    marginTop: "2px",
                  }}
                >
                  <Switch
                    className="react-switch"
                    onChange={this.onPercentageToggle}
                    onClick={ReactGa.event({
                      category: "Switch",
                      action: "Switch clicked",
                    })}
                    checked={percentageToggleActive}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={11}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0 0 5px rgba(0,0,0,0.2)"
                    activeBoxShadow="0 0 2px rgba(0,0,0,0.25)"
                    height={16}
                    width={35}
                  ></Switch>
                </div>
                <span
                  style={{
                    color: "#3e4da3",
                    fontWeight: "bold",
                  }}
                >
                  &nbsp;%age
                </span>
              </div>
            </div>
            <div className="w-100"></div>
            <div
              id="line1"
              style={{
                alignContent: "center",
                marginBottom: "20px",
                marginTop: "-15px",
              }}
            >
              <StateTable />
            </div>
            <div
              className="container"
              style={{
                width: "93.7%",
                marginBottom: "20px",
                marginTop: "-15px",
              }}
              id="line2"
            >
              <StateTable />
            </div>
            <div className="w-100"></div>
            <div className="row" id="line1">
              <table
                className="table table-striped table-sm fadeInUp table-borderless"
                style={{
                  animationDelay: "1.9s",
                  marginTop: "-15px",
                  marginBottom: "-10px",
                  fontFamily: "notosans",
                }}
                align="center"
              >
                <thead className="thead-dark">
                  <tr>
                    <th className="th sticky-top">State/UT</th>
                    <th
                      className="th text-info sticky-top"
                      onClick={() =>
                        this.setState({
                          sortConfirmed: true,
                          sortActive: false,
                          sortRecovered: false,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      CONFIRMED
                    </th>
                    <th
                      className="th sticky-top"
                      style={{ color: "#ff446a" }}
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: true,
                          sortRecovered: false,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      ACTIVE
                    </th>
                    <th
                      className="th text-success sticky-top"
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: false,
                          sortRecovered: true,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      Recovered
                    </th>
                    <th
                      className="th text-secondary sticky-top"
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: false,
                          sortRecovered: false,
                          sortDeceased: true,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      DEATHS
                    </th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {items.map((item) => (
                    <tr className="tr" key={item.statecode}>
                      <td
                        className="text-secondary td-md-left align-middle"
                        style={{ borderStyle: "solid", borderLeftWidth: "5px" }}
                      >
                        {item.state}
                        {item.statenotes ? (
                          <BootstrapTooltip
                            placement="right"
                            title={parse(item.statenotes)}
                          >
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="primary"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {item.deltaconfirmed > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#42b3f4"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltaconfirmed > "0"
                            ? commaSeperated(item.deltaconfirmed)
                            : ""}
                        </span>
                        &nbsp;{commaSeperated(item.confirmed)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        {percentageToggleActive
                          ? ((item.active * 100) / item.confirmed).toFixed(1) +
                            "%"
                          : item.active === "0"
                          ? "-"
                          : commaSeperated(item.active)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#28a745" }}>
                          {item.deltarecovered > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#28a745"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltarecovered > "0"
                            ? commaSeperated(item.deltarecovered)
                            : ""}
                        </span>
                        &nbsp;
                        {percentageToggleActive
                          ? ((item.recovered * 100) / item.confirmed).toFixed(
                              1
                            ) + "%"
                          : item.recovered === "0"
                          ? "-"
                          : commaSeperated(item.recovered)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#6c757d" }}>
                          {item.deltadeaths > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#6c757d"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltadeaths > "0"
                            ? commaSeperated(item.deltadeaths)
                            : ""}
                        </span>
                        &nbsp;
                        {percentageToggleActive
                          ? ((item.deaths * 100) / item.confirmed).toFixed(1) +
                            "%"
                          : item.deaths === "0"
                          ? "-"
                          : commaSeperated(item.deaths)}
                      </td>
                    </tr>
                  ))}
                  <tr
                    className="tr"
                    key={total[0].statecode}
                    style={{ background: "rgba(165, 173, 165, 0.3)" }}
                  >
                    <td
                      className="text-secondary tdleft align-middle"
                      style={{ borderStyle: "solid", borderLeftWidth: "5px" }}
                    >
                      {total[0].state}
                      {total[0].statenotes ? (
                        <BootstrapTooltip title={parse(total[0].statenotes)}>
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
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup text-info">
                        {Number(total[0].deltaconfirmed) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#42b3f4"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}
                        {Number(total[0].deltaconfirmed) > 0
                          ? commaSeperated(total[0].deltaconfirmed)
                          : ""}
                      </span>
                      &nbsp;{commaSeperated(total[0].confirmed)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      {total[0].active === "0"
                        ? "-"
                        : commaSeperated(total[0].active)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#28a745" }}>
                        {Number(total[0].deltarecovered) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#28a745"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}{" "}
                        {Number(total[0].deltarecovered) > 0
                          ? commaSeperated(total[0].deltarecovered)
                          : ""}
                      </span>
                      &nbsp;
                      {total[0].recovered === "0"
                        ? "-"
                        : commaSeperated(total[0].recovered)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#6c757d" }}>
                        {Number(total[0].deltadeaths) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#6c757d"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}

                        {Number(total[0].deltadeaths) > 0
                          ? commaSeperated(total[0].deltadeaths)
                          : ""}
                      </span>
                      &nbsp;
                      {commaSeperated(total[0].deaths)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row container" id="line2">
              <table
                className="table table-sm table-striped fadeInUp table-borderless"
                style={{
                  animationDelay: "1.9s",
                  marginTop: "-15px",
                }}
                align="center"
              >
                <thead className="thead-dark">
                  <tr>
                    <th className="th-md sticky-top" style={{ width: "185px" }}>
                      State/UT
                    </th>
                    <th
                      className="th-md text-info sticky-top"
                      style={{ textAlign: "center" }}
                      onClick={() =>
                        this.setState({
                          sortConfirmed: true,
                          sortActive: false,
                          sortRecovered: false,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      Confirmed
                    </th>
                    <th
                      className="th-md sticky-top"
                      style={{ color: "#ff446a", textAlign: "center" }}
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: true,
                          sortRecovered: false,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      Active
                    </th>
                    <th
                      className="th-md text-success sticky-top"
                      style={{ textAlign: "center" }}
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: false,
                          sortRecovered: true,
                          sortDeceased: false,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      RECOVERED
                    </th>
                    <th
                      className="th-md text-secondary sticky-top"
                      style={{ textAlign: "center" }}
                      onClick={() =>
                        this.setState({
                          sortConfirmed: false,
                          sortActive: false,
                          sortRecovered: false,
                          sortDeceased: true,
                          sortOrder: !sortOrder,
                        })
                      }
                    >
                      Deceased
                    </th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {items.map((item) => (
                    <tr className="tr" key={item.statecode}>
                      <td
                        className="text-secondary td-md-left align-middle"
                        style={{ borderStyle: "solid", borderLeftWidth: "5px" }}
                      >
                        {item.state}
                        {item.statenotes ? (
                          <BootstrapTooltip
                            placement="right"
                            title={parse(item.statenotes)}
                          >
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="primary"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {item.deltaconfirmed > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#42b3f4"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltaconfirmed > "0"
                            ? commaSeperated(item.deltaconfirmed)
                            : ""}
                        </span>
                        &nbsp;{commaSeperated(item.confirmed)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        {percentageToggleActive
                          ? ((item.active * 100) / item.confirmed).toFixed(1) +
                            "%"
                          : item.active === "0"
                          ? "-"
                          : commaSeperated(item.active)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#28a745" }}>
                          {item.deltarecovered > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#28a745"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltarecovered > "0"
                            ? commaSeperated(item.deltarecovered)
                            : ""}
                        </span>
                        &nbsp;
                        {percentageToggleActive
                          ? ((item.recovered * 100) / item.confirmed).toFixed(
                              1
                            ) + "%"
                          : item.recovered === "0"
                          ? "-"
                          : commaSeperated(item.recovered)}
                      </td>
                      <td
                        className="delta td-md text-secondary align-middle"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup" style={{ color: "#6c757d" }}>
                          {item.deltadeaths > "0" && (
                            <Icon.ArrowUp
                              style={{ verticalAlign: -1 }}
                              color="#6c757d"
                              size={10}
                              strokeWidth={3.5}
                            />
                          )}

                          {item.deltadeaths > "0"
                            ? commaSeperated(item.deltadeaths)
                            : ""}
                        </span>
                        &nbsp;
                        {percentageToggleActive
                          ? ((item.deaths * 100) / item.confirmed).toFixed(1) +
                            "%"
                          : item.deaths === "0"
                          ? "-"
                          : commaSeperated(item.deaths)}
                      </td>
                    </tr>
                  ))}
                  <tr
                    className="tr"
                    key={total[0].statecode}
                    style={{ background: "rgba(165, 173, 165, 0.3)" }}
                  >
                    <td
                      className="text-secondary tdleft align-middle"
                      style={{ borderStyle: "solid", borderLeftWidth: "5px" }}
                    >
                      {total[0].state}
                      {total[0].statenotes ? (
                        <BootstrapTooltip title={parse(total[0].statenotes)}>
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
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup text-info">
                        {Number(total[0].deltaconfirmed) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#42b3f4"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}
                        {Number(total[0].deltaconfirmed) > 0
                          ? commaSeperated(total[0].deltaconfirmed)
                          : ""}
                      </span>
                      &nbsp;{commaSeperated(total[0].confirmed)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      {total[0].active === "0"
                        ? "-"
                        : commaSeperated(total[0].active)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#28a745" }}>
                        {Number(total[0].deltarecovered) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#28a745"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}{" "}
                        {Number(total[0].deltarecovered) > 0
                          ? commaSeperated(total[0].deltarecovered)
                          : ""}
                      </span>
                      &nbsp;
                      {total[0].recovered === "0"
                        ? "-"
                        : commaSeperated(total[0].recovered)}
                    </td>
                    <td
                      className="delta td text-secondary align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <span className="arrowup" style={{ color: "#6c757d" }}>
                        {Number(total[0].deltadeaths) > 0 && (
                          <Icon.ArrowUp
                            style={{ verticalAlign: -1 }}
                            color="#6c757d"
                            size={10}
                            strokeWidth={3.5}
                          />
                        )}

                        {Number(total[0].deltadeaths) > 0
                          ? commaSeperated(total[0].deltadeaths)
                          : ""}
                      </span>
                      &nbsp;
                      {commaSeperated(total[0].deaths)}
                    </td>
                  </tr>
                </tbody>
              </table>
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
