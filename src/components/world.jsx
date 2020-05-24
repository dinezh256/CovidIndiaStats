import React, { Component } from "react";
import { getDate, getMonth } from "date-fns";
import WorldChoropleth from "./worldchoropleth";
import Footer from "./footer";
import ReactGa from "react-ga";
import { Helmet } from "react-helmet";
import * as Icon from "react-feather";
import { commaSeperated } from "../utils/common-functions";

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded1: false,
      isLoaded2: false,
      countiesTodayData: [],
      countiesYesterdayData: [],
      toggleToday: true,
      toggleYesterday: false,
    };
    this.onToggleToday = this.onToggleToday.bind(this);
    this.onToggleYesterday = this.onToggleYesterday.bind(this);
  }

  onToggleToday(toggleToday) {
    this.setState({ toggleToday });
  }
  onToggleYesterday(toggleYesterday) {
    this.setState({ toggleYesterday });
  }

  componentDidMount() {
    fetch(
      "https://corona.lmao.ninja/v2/countries?yesterday=false&sort=cases"
    ).then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded1: true,
          countiesTodayData: json,
        });
      })
    );

    fetch(
      "https://corona.lmao.ninja/v2/countries?yesterday=true&sort=cases"
    ).then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded2: true,
          countiesYesterdayData: json,
        });
      })
    );
  }

  render() {
    const {
      isLoaded1,
      countiesTodayData,
      isLoaded2,
      countiesYesterdayData,
      toggleToday,
      toggleYesterday,
    } = this.state;

    let countries = [];
    let isLoaded = "";

    if (toggleToday) {
      countries = countiesTodayData;
      isLoaded = isLoaded1;
    }

    if (toggleYesterday) {
      countries = countiesYesterdayData;
      isLoaded = isLoaded2;
    }
    const data = [];
    countries.map((country) =>
      data.push({
        cases: Number(country.cases),
        id: country.countryInfo.iso3,
        deaths: Number(country.deaths),
      })
    );

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const cases = [];
    countries.map((country) => cases.push(country.cases));
    const totalCases = cases.reduce((a, b) => a + b, 0);

    const newCases = [];
    countries.map((country) => newCases.push(country.todayCases));
    const totalNewCases = newCases.reduce((a, b) => a + b, 0);

    const deaths = [];
    countries.map((country) => deaths.push(country.deaths));
    const totalDeaths = deaths.reduce((a, b) => a + b, 0);

    const newDeaths = [];
    countries.map((country) => newDeaths.push(country.todayDeaths));
    const totalNewDeaths = newDeaths.reduce((a, b) => a + b, 0);

    const recovered = [];
    countries.map((country) => recovered.push(country.recovered));
    const totalRecovered = recovered.reduce((a, b) => a + b, 0);

    const active = [];
    countries.map((country) => active.push(country.active));
    const totalActive = active.reduce((a, b) => a + b, 0);

    const critical = [];
    countries.map((country) => critical.push(country.critical));
    const totalCritical = critical.reduce((a, b) => a + b, 0);

    const countriesdata = [];
    countries.map((item) =>
      countriesdata.push({
        id: item.countryInfo.iso3,
        state: item.country,
        value: item.cases,
        active: item.active,
      })
    );

    if (isLoaded) {
      return (
        <React.Fragment>
          <div className="containerWorld">
            <Helmet>
              <title>Global COVID19 Update</title>
            </Helmet>
            <div
              className="col-12 fadeInUp worldchoropleth"
              style={{ alignContent: "center" }}
            >
              <WorldChoropleth
                data={countriesdata}
                onMouseEnter={ReactGa.event({
                  category: "World map",
                  action: "World map clicked",
                })}
              />
            </div>
            <div className="w-100"></div>
            <div className="col-12" id="line1">
              <table
                className="tableworld table-sm table-responsive fadeInUp"
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  animationDelay: "0.6s",
                }}
              >
                <td
                  className="text-info td"
                  style={{
                    textAlign: "center",
                    background: "#d9ecf5",
                  }}
                >
                  <h5 className="world-total">TOTAL CONFIRMED CASES</h5>
                  <h6>+{commaSeperated(totalNewCases)}</h6>
                  <h5>{commaSeperated(totalCases)}</h5>
                </td>
                <td
                  className="td"
                  style={{
                    textAlign: "center",
                    background: "#f1c7c7",
                    color: "#ff446a",
                  }}
                >
                  <h5 className="world-total">TOTAL ACTIVE CASES</h5>
                  <h6>{((totalActive * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalActive)}</h5>
                </td>
                <td
                  className="text-success td"
                  style={{
                    textAlign: "center",
                    background: "#c3e0c3",
                    color: "#ff446a",
                  }}
                >
                  <h5 className="world-total">TOTAL RECOVERED CASES</h5>
                  <h6>{((totalRecovered * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalRecovered)}</h5>
                </td>
                <td
                  className="td text-secondary"
                  style={{
                    textAlign: "center",
                    background: "#d8d7d7",
                  }}
                >
                  <h5 className="world-total">TOTAL DECEASED CASES</h5>
                  <h6>+{commaSeperated(totalNewDeaths)}</h6>
                  <h5>{commaSeperated(totalDeaths)}</h5>
                </td>
                <td
                  className="td"
                  style={{
                    textAlign: "center",
                    color: "maroon",
                    background: "#e6c5c5",
                  }}
                >
                  <h5 className="world-total">TOTAL CRITICAL CASES</h5>
                  <h6>{((totalCritical * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalCritical)}</h5>
                </td>
              </table>
            </div>
            <div className="col-12" id="line2" style={{ marginTop: "-200px" }}>
              <table
                className="tableworld table-sm table-responsive fadeInUp"
                style={{
                  marginTop: -10,
                  marginBottom: 10,
                  animationDelay: "0.6s",
                }}
              >
                <td
                  className="text-info td"
                  style={{
                    textAlign: "center",
                    background: "#d9ecf5",
                  }}
                >
                  <h5 className="world-total">TOTAL CONFIRMED CASES</h5>
                  <h6>+{commaSeperated(totalNewCases)}</h6>
                  <h5>{commaSeperated(totalCases)}</h5>
                </td>
                <td
                  className="td"
                  style={{
                    textAlign: "center",
                    background: "#f1c7c7",
                    color: "#ff446a",
                  }}
                >
                  <h5 className="world-total">TOTAL ACTIVE CASES</h5>
                  <h6>{((totalActive * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalActive)}</h5>
                </td>
                <td
                  className="text-success td"
                  style={{ textAlign: "center", background: "#c3e0c3" }}
                >
                  <h5 className="world-total">TOTAL RECOVERED CASES</h5>
                  <h6>{((totalRecovered * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalRecovered)}</h5>
                </td>
                <td
                  className="td text-secondary"
                  style={{
                    textAlign: "center",
                    background: "#d8d7d7",
                  }}
                >
                  <h5 className="world-total">TOTAL DECEASED CASES</h5>
                  <h6>+{commaSeperated(totalNewDeaths)}</h6>
                  <h5>{commaSeperated(totalDeaths)}</h5>
                </td>
                <td
                  className="td"
                  style={{
                    textAlign: "center",
                    color: "maroon",
                    background: "#e6c5c5",
                  }}
                >
                  <h5 className="world-total">TOTAL CRITICAL CASES</h5>
                  <h6>{((totalCritical * 100) / totalCases).toFixed(2)}%</h6>
                  <h5>{commaSeperated(totalCritical)}</h5>
                </td>
              </table>
            </div>
            <div className="w-100"></div>
            <div className="row" style={{ marginBottom: 0 }}>
              <div className="col fadeInUp" style={{ animationDelay: "0.7s" }}>
                <h6
                  className="toggleDay"
                  onClick={() =>
                    this.setState({ toggleToday: true, toggleYesterday: false })
                  }
                >
                  TODAY{" "}
                  {toggleToday && (
                    <Icon.CheckCircle
                      size={14}
                      style={{ verticalAlign: "-0.1rem" }}
                    />
                  )}
                </h6>
              </div>
              <div className="col fadeInUp" style={{ animationDelay: "0.8s" }}>
                <h6
                  className="toggleDay"
                  onClick={() =>
                    this.setState({ toggleToday: false, toggleYesterday: true })
                  }
                >
                  YESTERDAY{" "}
                  {toggleYesterday && (
                    <Icon.CheckCircle
                      size={14}
                      style={{ verticalAlign: "-0.1rem" }}
                    />
                  )}
                </h6>
              </div>
            </div>

            <div className="w-100"></div>
            <div className="col-12">
              <table
                className="tableworld table-sm fadeInUp table-responsive table-hover table-bordered"
                align="center"
                style={{ animationDelay: "0.9s" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th className="th-cases sticky-top">COUNTRY</th>
                    <th className="th-cases sticky-top">CONFIRMED</th>
                    <th className="th-cases sticky-top">ACTIVE</th>
                    <th className="th-cases sticky-top">Recovered</th>
                    <th className="th-cases sticky-top">DECEASED</th>
                    <th className="th-cases sticky-top">critical</th>
                    <th className="th-cases sticky-top">Cases/Mil</th>
                    <th className="th-cases sticky-top">Deaths/Mil</th>
                    <th className="th-cases sticky-top">TESTS</th>
                    <th className="th-cases sticky-top">TESTS/MIL</th>
                    <th className="th-cases sticky-top">LAST UPDATED</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {countries.map((country) => (
                    <tr className="tr" key={country.country}>
                      <td
                        className="text-secondary td-world"
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        <img
                          src={country.countryInfo.flag}
                          style={{
                            width: 22.5,
                            height: 13.5,
                            verticalAlign: "-0.06rem",
                            borderRadius: "2px",
                          }}
                        />{" "}
                        {country.country}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "right", background: "#e9f5fa" }}
                      >
                        <span className="text-info">
                          {Number(country.todayCases) === 0
                            ? ""
                            : "+" + commaSeperated(country.todayCases)}
                        </span>
                        &nbsp;
                        {commaSeperated(country.cases)}
                      </td>

                      <td
                        className="td-world"
                        style={{
                          textAlign: "right",
                          background: "rgba(241, 199, 199, 0.7)",
                        }}
                      >
                        {Number(country.active) === 0
                          ? "-"
                          : commaSeperated(country.active)}
                      </td>

                      <td
                        className="td-world"
                        style={{
                          textAlign: "right",
                          background: "rgba(195, 224, 195, 0.7)",
                        }}
                      >
                        {Number(country.recovered) === 0
                          ? "-"
                          : commaSeperated(country.recovered)}
                      </td>
                      <td className="td-world" style={{ textAlign: "right" }}>
                        <b
                          align="left"
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "grey",
                          }}
                        >
                          {Number(country.todayDeaths) === 0
                            ? ""
                            : "+" + commaSeperated(country.todayDeaths)}
                        </b>
                        &nbsp;
                        {Number(country.deaths) === 0
                          ? "-"
                          : commaSeperated(country.deaths)}
                      </td>
                      <td className="td-world" style={{ textAlign: "right" }}>
                        {Number(country.critical) === 0
                          ? "-"
                          : commaSeperated(country.critical)}
                      </td>
                      <td className="td-world" style={{ textAlign: "center" }}>
                        {commaSeperated(country.casesPerOneMillion)}
                      </td>
                      <td className="td-world" style={{ textAlign: "center" }}>
                        {Number(country.deathsPerOneMillion)}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "center", background: "#eee" }}
                      >
                        {Number(country.tests) === 0
                          ? "-"
                          : commaSeperated(country.tests)}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "center", background: "#eee" }}
                      >
                        {Number(country.testsPerOneMillion) === 0
                          ? "-"
                          : commaSeperated(country.testsPerOneMillion)}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "center", background: "#eee" }}
                      >
                        {getDate(country.updated)}{" "}
                        {months[Number(getMonth(country.updated))]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Footer />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="containerHome">
          <div
            className="spinner-grow"
            role="status"
            style={{ alignContent: "center" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

export default World;
