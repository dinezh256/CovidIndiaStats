import React, { Component } from "react";
import * as Icon from "react-feather";
import { FaHandHoldingHeart } from "react-icons/fa";
import CountUp from "react-countup";
import Updates from "./updates";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import parse from "html-react-parser";
import Switch from "react-switch";
import MiniSparkline from "./miniSparkline";
import ReactGa from "react-ga";
import {
  commaSeperated,
  DeltaArrow,
  DeltaValue,
} from "../utils/common-functions";
import { Link } from "react-router-dom";

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
  }

  onPercentageToggle(percentageToggleActive) {
    this.setState({ percentageToggleActive });
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

    if (isLoaded) {
      return (
        <div className="statsTable">
          <div
            className="topStats fadeInUp"
            style={{
              marginBottom: "8px",
              animationDelay: "0.5s",
              borderRadius: "6px",
            }}
          >
            <table
              className="table table-sm table-borderless"
              style={{ marginBottom: "-1px" }}
            >
              <thead>
                <tr>
                  <th
                    className="span delta graphWidth"
                    style={{
                      color: "rgb(66, 179, 244)",
                      background: "rgba(66, 179, 244, 0.1)",
                    }}
                  >
                    CONFIRMED
                  </th>
                  <th
                    className="delta span graphWidth"
                    style={{
                      background: "rgba(255, 7, 58, 0.125)",
                      color: "rgb(255, 80, 100)",
                    }}
                  >
                    ACTIVE
                  </th>
                  <th
                    className="text-success delta span graphWidth"
                    style={{ background: "rgba(88, 189, 88, 0.2)" }}
                  >
                    Recovered
                  </th>
                  <th
                    className="text-secondary delta span graphWidth"
                    style={{
                      background: "rgba(92, 87, 86, 0.2)",
                      fontWeight: 600,
                    }}
                  >
                    DECEASED
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                <td>
                  <h6
                    className="delta"
                    style={{ fontSize: 12, color: "rgb(66, 179, 244)" }}
                  >
                    {Number(delta[0].deltaconfirmed) > 0 ? (
                      ""
                    ) : (
                      <Icon.Meh
                        size={12}
                        strokeWidth={3}
                        fill="rgba(23, 162, 184, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}

                    {Number(delta[0].deltaconfirmed) > 0
                      ? "+" + commaSeperated(delta[0].deltaconfirmed)
                      : ""}
                  </h6>
                  <h6
                    style={{
                      textAlign: "center",
                      color: "rgb(66, 179, 244)",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={Number(total[0].confirmed)}
                      duration={2}
                      separator=","
                    />
                  </h6>

                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={0}
                      type={sparklineconfirmed}
                      fill="#42b3f4"
                      stroke="rgba(66, 179, 244, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h6
                    className="delta"
                    style={{ color: "#ff446a", fontSize: 12 }}
                  >
                    <Icon.Heart
                      size={12}
                      strokeWidth={3}
                      fill="#ff446a"
                      style={{ verticalAlign: "-0.2rem" }}
                    />
                  </h6>
                  <h6 style={{ color: "#ff446a", textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].active)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].active) / Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={1}
                      type={sparklineactive}
                      fill="#ff446a"
                      stroke="rgba(255, 68, 106, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h5 className="text-success delta" style={{ fontSize: 12 }}>
                    {Number(delta[0].deltarecovered) > 0 ? (
                      ""
                    ) : (
                      <Icon.Smile
                        size={12}
                        strokeWidth={3}
                        fill="rgba(23, 162, 184, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}
                    {Number(delta[0].deltarecovered) > 0
                      ? "+" + commaSeperated(delta[0].deltarecovered)
                      : ""}
                  </h5>
                  <h6 className="text-success" style={{ textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].recovered)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].recovered) /
                          Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={2}
                      type={sparklinerecovered}
                      fill="#58bd58"
                      stroke="rgba(88, 189, 88, 0.7)"
                    />
                  </section>
                </td>

                <td>
                  <h6 className="text-secondary delta" style={{ fontSize: 12 }}>
                    {Number(delta[0].deltadeaths) > 0 ? (
                      ""
                    ) : (
                      <Icon.Meh
                        size={12}
                        strokeWidth={3}
                        fill="rgba(40, 167, 69, 0.2)"
                        style={{ verticalAlign: "-0.2rem" }}
                      />
                    )}
                    {Number(delta[0].deltadeaths)
                      ? "+" + commaSeperated(delta[0].deltadeaths)
                      : ""}
                  </h6>
                  <h6 className="colorChange" style={{ textAlign: "center" }}>
                    {!percentageToggleActive ? (
                      <CountUp
                        start={0}
                        end={Number(total[0].deaths)}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      (
                        (Number(total[0].deaths) / Number(total[0].confirmed)) *
                        100
                      ).toFixed(1) + "%"
                    )}
                  </h6>
                  <section
                    style={{
                      justifyContent: "center",
                      paddingBottom: "-10px",
                    }}
                  >
                    <MiniSparkline
                      sparklinedata={sparklinedata}
                      datakey={3}
                      type={sparklinedeceased}
                      fill="#5c5756"
                      stroke="rgba(92, 87, 86, 0.7)"
                    />
                  </section>
                </td>
              </tbody>
            </table>
          </div>

          <div className="joinTelegram">
            <a
              className="telegramLink"
              href="https://www.buymeacoffee.com/covidindiastats"
            >
              <FaHandHoldingHeart className="telegramIcon" /> SUPPORT
              COVIDINDIASTATS
            </a>
          </div>
          <div className="w-100"></div>
          <div className="row">
            <Updates />
          </div>
          <div className="w-100"></div>
          <div
            className="indiaStateWiseHead fadeInUp"
            style={{
              textAlign: "center",
              animationDelay: "1.8s",
              marginTop: "-15px",
            }}
          >
            <h3>INDIA - STATEWISE </h3>
            <div style={{ alignItems: "right" }}>
              <div
                className="home-toggle float-left"
                style={{ marginTop: "2.5px" }}
              >
                <Switch
                  className="react-switch"
                  onChange={this.onPercentageToggle}
                  onClick={ReactGa.event({
                    category: "Switch %age",
                    action: "Switch %age clicked",
                  })}
                  checked={percentageToggleActive}
                  onColor="#6b7de4"
                  onHandleColor="#3e4da3"
                  handleDiameter={11}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0 0 5px rgba(0,0,0,0.2)"
                  activeBoxShadow="0 0 2px rgba(0,0,0,0.25)"
                  height={16}
                  width={35}
                ></Switch>
                <span
                  style={{
                    color: "#3e4da3",
                    fontWeight: "bold",
                    verticalAlign: "0.3rem",
                  }}
                >
                  &nbsp;%
                </span>
              </div>
            </div>
          </div>

          <div className="statewiseTable table-responsive">
            <table
              className="table table-sm fadeInUp table-borderless"
              style={{ animationDelay: "1.9s", fontFamily: "notosans" }}
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
                    CNFRMD
                    {sortConfirmed && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
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
                    {sortActive && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
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
                    RCVRD
                    {sortRecovered && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
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
                    DECSD
                    {sortDeceased && (
                      <SortRoundedIcon
                        fontSize="inherit"
                        style={{
                          color: "#ffc107",
                          verticalAlign: "-0.1rem",
                        }}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {items.map((item, i) => (
                  <tr
                    className="tr"
                    key={item.statecode}
                    style={{
                      background: i % 2 === 0 ? "rgba(63, 63, 95, 0.2)" : "",
                    }}
                  >
                    <td className="align-middle">
                      <div className="td-md-left">
                        <Link to={`/${item.statecode}`}>
                          <h6>{item.state} &nbsp;</h6>
                        </Link>
                        <h6>
                          {item.statenotes ? (
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {parse(item.statenotes)}
                                </Tooltip>
                              }
                            >
                              <span>
                                <InfoOutlined
                                  color="inherit"
                                  fontSize="inherit"
                                  className="infoIcon"
                                />
                              </span>
                            </OverlayTrigger>
                          ) : (
                            ""
                          )}
                        </h6>
                      </div>
                    </td>
                    <td
                      className="delta td-md align-middle"
                      style={{ textAlign: "right" }}
                    >
                      <Link to={`/${item.statecode}`}>
                        <h6 className="arrowup">
                          <DeltaArrow
                            deltaType={item.deltaconfirmed}
                            color={"#42b3f4"}
                          />
                          <DeltaValue
                            deltaType={item.deltaconfirmed}
                            color={"#42b3f4"}
                          />
                          <h6 className="delta td-md align-middle">
                            {commaSeperated(item.confirmed)}
                          </h6>
                        </h6>
                      </Link>
                    </td>
                    <td className="delta td-md align-middle">
                      <h6 className="arrowup">
                        <h6
                          className="delta td-md align-middle"
                          style={{ textAlign: "right" }}
                        >
                          {percentageToggleActive
                            ? ((item.active * 100) / item.confirmed).toFixed(
                                1
                              ) + "%"
                            : commaSeperated(item.active)}
                        </h6>
                      </h6>
                    </td>
                    <td
                      className="delta td-md align-middle"
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      <Link to={`/${item.statecode}`}>
                        <h6 className="arrowup">
                          <DeltaArrow
                            deltaType={item.deltarecovered}
                            color={"#28a745"}
                          />
                          <DeltaValue
                            deltaType={item.deltarecovered}
                            color={"#28a745"}
                          />
                          <h6 className="delta td-md align-middle">
                            {percentageToggleActive
                              ? (
                                  (item.recovered * 100) /
                                  item.confirmed
                                ).toFixed(1) + "%"
                              : commaSeperated(item.recovered)}
                          </h6>
                        </h6>
                      </Link>
                    </td>
                    <td
                      className="delta td-md align-middle"
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      <Link to={`/${item.statecode}`}>
                        <h6 className="arrowup">
                          <DeltaArrow
                            deltaType={item.deltadeaths}
                            color={"#6c757d"}
                          />
                          <DeltaValue
                            deltaType={item.deltadeaths}
                            color={"#6c757d"}
                          />
                          <h6 className="delta td-md align-middle">
                            {percentageToggleActive
                              ? ((item.deaths * 100) / item.confirmed).toFixed(
                                  1
                                ) + "%"
                              : commaSeperated(item.deaths)}
                          </h6>
                        </h6>
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr
                  className="tr"
                  key={total[0].statecode}
                  style={{ background: "rgba(105, 90, 205, 0.2)" }}
                >
                  <td className="align-middle">
                    <div className="td-md-left">
                      <h6 style={{ marginTop: "6px" }}>INDIA</h6>
                    </div>
                  </td>
                  <td
                    className="delta td-md align-middle"
                    style={{ textAlign: "right" }}
                  >
                    <h6 className="arrowup text-info">
                      <DeltaArrow
                        deltaType={total[0].deltaconfirmed}
                        color={"#42b3f4"}
                      />
                      <DeltaValue
                        deltaType={total[0].deltaconfirmed}
                        color={"#42b3f4"}
                      />
                      <h6 className="delta td-md align-middle">
                        {commaSeperated(total[0].confirmed)}
                      </h6>
                    </h6>
                  </td>
                  <td
                    className="delta td-md align-middle"
                    style={{ textAlign: "right" }}
                  >
                    <h6 className="arrowup">
                      <h6 className="align-middle">
                        {total[0].active === "0"
                          ? "-"
                          : commaSeperated(total[0].active)}
                      </h6>
                    </h6>
                  </td>
                  <td
                    className="delta td-md text-secondary align-middle"
                    style={{ textAlign: "right" }}
                  >
                    <h6 className="arrowup">
                      <DeltaArrow
                        deltaType={total[0].deltarecovered}
                        color={"#28a745"}
                      />
                      <DeltaValue
                        deltaType={total[0].deltarecovered}
                        color={"#28a745"}
                      />
                      <h6 className="delta td-md align-middle">
                        {total[0].recovered === "0"
                          ? "-"
                          : commaSeperated(total[0].recovered)}
                      </h6>
                    </h6>
                  </td>
                  <td
                    className="delta td-md align-middle"
                    style={{ textAlign: "right" }}
                  >
                    <h6 className="arrowup">
                      <DeltaArrow
                        deltaType={total[0].deltadeaths}
                        color={"#6c757d"}
                      />
                      <DeltaValue
                        deltaType={total[0].deltadeaths}
                        color={"#6c757d"}
                      />
                      <h6 className="delta td-md align-middle">
                        {commaSeperated(total[0].deaths)}
                      </h6>
                    </h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Table;
