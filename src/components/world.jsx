import React, { Component } from "react";
import { getDate, getMonth } from "date-fns";
import WorldChoropleth from "./worldchoropleth";
import Footer from "./footer";
import ReactGa from "react-ga";

class World extends Component {
  state = {
    sortColumn: { order: "asc" },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      countries: [],
      worldData: [],
      on: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://corona.lmao.ninja/v2/countries?yesterday=false&sort=cases"
    ).then((res) =>
      res.json().then((json) => {
        this.setState({
          isLoaded: true,
          countries: json,
        });
      })
    );
  }

  render() {
    const { isLoaded, countries } = this.state;

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
          <div className="containerWorld">
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
            <div className="col-12">
              <table
                className="tableworld table-sm fadeInUp table-responsive table-hover table-bordered"
                align="center"
                style={{ animationDelay: "0.8s" }}
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
                          {country.todayCases === 0
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
                        {country.active === 0
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
                        {country.cases - (country.active + country.deaths) === 0
                          ? "-"
                          : commaSeperated(
                              country.cases - (country.active + country.deaths)
                            )}
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
                          {country.todayDeaths === 0
                            ? ""
                            : "+" + commaSeperated(country.todayDeaths)}
                        </b>
                        &nbsp;
                        {country.deaths === 0
                          ? "-"
                          : commaSeperated(country.deaths)}
                      </td>
                      <td className="td-world" style={{ textAlign: "right" }}>
                        {country.critical === 0
                          ? "-"
                          : commaSeperated(country.critical)}
                      </td>
                      <td className="td-world" style={{ textAlign: "center" }}>
                        {commaSeperated(country.casesPerOneMillion)}
                      </td>
                      <td className="td-world" style={{ textAlign: "center" }}>
                        {country.deathsPerOneMillion}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "center", background: "#eee" }}
                      >
                        {country.tests === 0
                          ? "-"
                          : commaSeperated(country.tests)}
                      </td>
                      <td
                        className="td-world"
                        style={{ textAlign: "center", background: "#eee" }}
                      >
                        {country.testsPerOneMillion === 0
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
