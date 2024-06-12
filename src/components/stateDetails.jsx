import React, { Component } from "react";
import { indianstates } from "./API/index";
import * as Icon from "react-feather";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import ColorizeRoundedIcon from "@material-ui/icons/ColorizeRounded";
import Switch from "react-switch";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  formatDate,
  formatDateAbsolute,
  commaSeperated,
  statePopulation,
  stateID,
  stateFullName,
  abbreviateNumber,
} from "../utils/common-functions";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip as Retooltip,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import StateLinePlot from "./stateLinePlot";
import StateBarPlot from "./stateBarPlot";
import ReactGa from "react-ga";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import ControlledExpansionPanels from "./expansionPanel";
import MiniBarPlot from "./miniBarPlot";
import MiniStateSparkline from "./miniStateSparkline";
import NotFound from "./notFound";
import StateChoropleth from "./stateChoropleth";
import { AppContext } from "./../context/index";

class StateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateData: [],
      isLoaded: false,
      totalStateData: [],
      totalStateDataLoaded: false,
      statesDailyData: [],
      statesDailyDataLoaded: false,
      districtsDaily: [],
      districtsDailyLoaded: false,
      toggleSwitch: false,
      toggleConfirmed: true,
      toggleActive: false,
      toggleRecovered: false,
      toggleDeceased: false,
      viewTable: false,
      viewAll: false,
      beginning: true,
      twoWeeks: false,
      oneMonth: false,
      isLoaded2: false,
      totalTestsData: [],
      vaccinatedData: [],
      currentStateCode: this.props.match.params.stateid.toUpperCase(),
    };
    this.onSwitch = this.onSwitch.bind(this);
    this.onClickConfirmed = this.onClickConfirmed.bind(this);
    this.onClickActive = this.onClickActive.bind(this);
    this.onClickRecovered = this.onClickRecovered.bind(this);
    this.onClickDeceased = this.onClickDeceased.bind(this);
    this.onViewTable = this.onViewTable.bind(this);
    this.onViewAll = this.onViewAll.bind(this);
    this.handleBeginning = this.handleBeginning.bind(this);
    this.handleTwoWeeks = this.handleTwoWeeks.bind(this);
    this.handleOneMonth = this.handleOneMonth.bind(this);
  }

  onSwitch(toggleSwitch) {
    this.setState({ toggleSwitch });
  }

  onClickConfirmed(toggleConfirmed) {
    this.setState({ toggleConfirmed });
  }
  onClickActive(toggleActive) {
    this.setState({ toggleActive });
  }
  onClickRecovered(toggleRecovered) {
    this.setState({ toggleRecovered });
  }
  onClickDeceased(toggleDeceased) {
    this.setState({ toggleDeceased });
  }

  onViewTable(viewTable) {
    this.setState({ viewTable });
  }
  onViewAll(viewAll) {
    this.setState({ viewAll });
  }

  handleBeginning({ beginning }) {
    this.setState({ beginning });
  }
  handleTwoWeeks({ twoWeeks }) {
    this.setState({ twoWeeks });
  }
  handleOneMonth({ oneMonth }) {
    this.setState({ oneMonth });
  }

  static contextType = AppContext;

  async componentDidMount() {
    const fetchedStates = await indianstates();
    this.setState({ stateData: fetchedStates, isLoaded: true });

    const { currentStateCode } = this.state;

    const requiredData = [];
    fetchedStates.map((item) => {
      if (
        currentStateCode === item.statecode &&
        stateID.includes(currentStateCode)
      )
        requiredData.push(item.districtData);
    });
    this.setState({ requiredData });

    fetch("https://data.covid19india.org/v4/min/data.min.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          totalStateData: json.statewise,
          totalStateDataLoaded: true,
        });
      })
    );
    fetch("https://api.covid19india.org/states_daily.json").then((res) =>
      res.json().then((json) => {
        this.setState({
          statesDailyData: json.states_daily,
          statesDailyDataLoaded: true,
        });
      })
    );
  }

  componentDidUpdate() {
    const [allData] = this.context.allData;
    const [isLoading] = this.context.isLoading;
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

    const { isLoaded2, totalTestsData, vaccinatedData, currentStateCode } =
      this.state;

    if (!isLoading && !isLoaded2) {
      const totalData = allData[currentStateCode]?.dates;

      for (let key in totalData) {
        const splittedDate = key.split("-");

        totalTestsData.push({
          date: `${splittedDate[2]} ${months[Number(splittedDate[1]) - 1]} ${
            splittedDate[0]
          }`,
          deltaSamplestested:
            totalData[key]?.delta?.tested || ""
              ? totalData[key]?.delta?.tested
              : "-",
          totalsamplestested:
            totalData[key]?.total?.tested || ""
              ? totalData[key]?.total?.tested
              : "-",
        });

        if (key === "2020-01-30") {
          vaccinatedData.push({
            date: `${splittedDate[2]} ${months[Number(splittedDate[1]) - 1]} ${
              splittedDate[0]
            }`,
            deltaVaccinated: 0,
            totalVaccinated: 0,
          });
        } else {
          vaccinatedData.push({
            date: `${splittedDate[2]} ${months[Number(splittedDate[1]) - 1]} ${
              splittedDate[0]
            }`,
            deltaVaccinated:
              totalData[key]?.delta?.vaccinated || ""
                ? totalData[key]?.delta?.vaccinated
                : "-",
            totalVaccinated:
              totalData[key]?.delta?.vaccinated || ""
                ? totalData[key]?.total?.vaccinated
                : "-",
          });
        }
      }

      this.setState({ totalTestsData, vaccinatedData, isLoaded2: true });
    }
  }

  render() {
    const {
      stateData,
      isLoaded,
      isLoaded2,
      totalStateData,
      totalStateDataLoaded,
      statesDailyData,
      statesDailyDataLoaded,
      requiredDistrictData,
      currentStateCode,
      toggleConfirmed,
      toggleActive,
      toggleRecovered,
      toggleDeceased,
      toggleSwitch,
      viewAll,
      beginning,
      twoWeeks,
      oneMonth,
      totalTestsData,
      vaccinatedData,
    } = this.state;

    const contentStyle = {
      background: "rgba(255,255,255,0)",
      border: "none",
      borderRadius: "5px",
      fontSize: "0.7rem",
      fontFamily: "notosans",
      textTransform: "uppercase",
      textAlign: "left",
      lineHeight: 0.8,
    };

    const months = [
      "",
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

    if (requiredDistrictData) {
      for (let i = 0; i < requiredDistrictData.length; i++) {
        requiredDistrictData[i].newDate =
          String(Number(requiredDistrictData[i].date.split(/\-/)[2])) +
          " " +
          String(months[Number(requiredDistrictData[i].date.split(/\-/)[1])]);
      }
    }

    for (let i = 0; i < statesDailyData.length; i++) {
      statesDailyData[i].newdate =
        String(Number(statesDailyData[i].date.split(/\-/)[0])) +
        " " +
        statesDailyData[i].date.split(/\-/)[1] +
        " 20" +
        statesDailyData[i].date.split(/\-/)[2];
    }

    const topDistricts = [];

    stateData.map((item) => {
      if (
        currentStateCode === item.statecode &&
        stateID.includes(currentStateCode)
      )
        topDistricts.push(item.districtData);
    });

    if (isLoaded && toggleConfirmed && stateID.includes(currentStateCode)) {
      topDistricts[0].sort(function (x, y) {
        return Number(y.confirmed) - Number(x.confirmed);
      });
    }

    if (isLoaded && toggleActive) {
      topDistricts[0].sort(function (x, y) {
        return Number(y.active) - Number(x.active);
      });
    }

    if (isLoaded && toggleRecovered) {
      topDistricts[0].sort(function (x, y) {
        return Number(y.recovered) - Number(x.recovered);
      });
    }

    if (isLoaded && toggleDeceased) {
      topDistricts[0].sort(function (x, y) {
        return Number(y.deceased) - Number(x.deceased);
      });
    }

    const requiredStateTotalData = [];
    if (totalStateDataLoaded) {
      totalStateData.map((item) => {
        if (currentStateCode === item.statecode)
          requiredStateTotalData.push(item);
      });
    }

    const requiredConfirmedStateDailyData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Confirmed")
          requiredConfirmedStateDailyData.push(item);
      });
    }

    const date = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Confirmed") date.push(item.newdate);
      });
    }

    const requiredRecoveredStateDailyData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Recovered")
          requiredRecoveredStateDailyData.push(item);
      });
    }

    const requiredDeceasedStateDailyData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Deceased")
          requiredDeceasedStateDailyData.push(item);
      });
    }

    const requiredActiveStateDailyData = [];
    const sparklineDailyActiveData = [];

    const sparklineTotalConfirmedData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Confirmed")
          sparklineTotalConfirmedData.push(
            Number(item[this.props.match.params.stateid.toLowerCase()])
          );
      });
    }

    const barDailyConfirmedData = [];

    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Confirmed" && stateID.includes(currentStateCode))
          barDailyConfirmedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
            label: Number(item[this.props.match.params.stateid.toLowerCase()]),
          });
      });
    }

    const dailyConfirmed = [];
    const dailyDeltaConfirmed = [];

    for (let i = barDailyConfirmedData.length - 1; i > 0; i--) {
      dailyConfirmed.push(barDailyConfirmedData[i].stateid);
      dailyDeltaConfirmed.push(
        barDailyConfirmedData[i].stateid - barDailyConfirmedData[i - 1].stateid
      );
      if (
        barDailyConfirmedData[i].label - barDailyConfirmedData[i - 1].label >=
          0 &&
        barDailyConfirmedData[i - 1].label > 0
      )
        barDailyConfirmedData[i].label = `+${(
          ((barDailyConfirmedData[i].label -
            barDailyConfirmedData[i - 1].label) /
            barDailyConfirmedData[i - 1].label) *
          100
        ).toFixed(1)}%`;
      if (
        barDailyConfirmedData[i].label - barDailyConfirmedData[i - 1].label <=
          0 &&
        barDailyConfirmedData[i - 1].label > 0
      )
        barDailyConfirmedData[i].label = `${(
          ((barDailyConfirmedData[i].label -
            barDailyConfirmedData[i - 1].label) /
            barDailyConfirmedData[i - 1].label) *
          100
        ).toFixed(1)}%`;
      if (
        barDailyConfirmedData[i - 1].label === 0 &&
        barDailyConfirmedData[i].label !== 0
      )
        barDailyConfirmedData[i].label = "+100.0%";
      if (
        barDailyConfirmedData[i - 1].label === 0 &&
        barDailyConfirmedData[i].label === 0
      )
        barDailyConfirmedData[i].label = "+0%";
    }

    const lineTotalConfirmedData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Confirmed")
          lineTotalConfirmedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
          });
      });
    }
    for (let i = 1; i <= lineTotalConfirmedData.length - 1; i++) {
      lineTotalConfirmedData[i].stateid =
        lineTotalConfirmedData[i].stateid +
        lineTotalConfirmedData[i - 1].stateid;
    }

    const sparklineDailyRecoveredData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Recovered" && stateID.includes(currentStateCode))
          sparklineDailyRecoveredData.push(
            Number(item[this.props.match.params.stateid.toLowerCase()])
          );
      });
    }

    const barDailyRecoveredData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Recovered" && stateID.includes(currentStateCode))
          barDailyRecoveredData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
            label: Number(item[this.props.match.params.stateid.toLowerCase()]),
          });
      });
    }

    const dailyRecovered = [];
    const dailyDeltaRecovered = [];

    for (let i = barDailyRecoveredData.length - 1; i > 0; i--) {
      dailyRecovered.push(barDailyRecoveredData[i].stateid);
      dailyDeltaRecovered.push(
        barDailyRecoveredData[i].stateid - barDailyRecoveredData[i - 1].stateid
      );
      if (
        barDailyRecoveredData[i].label - barDailyRecoveredData[i - 1].label >=
          0 &&
        barDailyRecoveredData[i - 1].label > 0
      )
        barDailyRecoveredData[i].label = `+${(
          ((barDailyRecoveredData[i].label -
            barDailyRecoveredData[i - 1].label) /
            barDailyRecoveredData[i - 1].label) *
          100
        ).toFixed(1)}%`;
      if (
        barDailyRecoveredData[i].label - barDailyRecoveredData[i - 1].label <=
          0 &&
        barDailyRecoveredData[i - 1].label > 0
      )
        barDailyRecoveredData[i].label = `${(
          ((barDailyRecoveredData[i].label -
            barDailyRecoveredData[i - 1].label) /
            barDailyRecoveredData[i - 1].label) *
          100
        ).toFixed(1)}%`;
      if (
        barDailyRecoveredData[i - 1] === 0 &&
        Number(barDailyRecoveredData[i]) !== 0
      )
        barDailyRecoveredData[i] = "+100.0%";
      if (barDailyRecoveredData[i - 1] === 0 && barDailyRecoveredData[i] === 0)
        barDailyRecoveredData[i] = "+0%";
    }

    const lineTotalRecoveredData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Recovered" && stateID.includes(currentStateCode))
          lineTotalRecoveredData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
          });
      });
    }
    for (let i = 1; i <= lineTotalRecoveredData.length - 1; i++) {
      lineTotalRecoveredData[i].stateid =
        lineTotalRecoveredData[i].stateid +
        lineTotalRecoveredData[i - 1].stateid;
    }

    const sparklineDailyDeceasedData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Deceased" && stateID.includes(currentStateCode))
          sparklineDailyDeceasedData.push(
            Number(item[this.props.match.params.stateid.toLowerCase()])
          );
      });
    }

    for (let i = 0; i < sparklineTotalConfirmedData.length; i++) {
      sparklineDailyActiveData.push(
        sparklineTotalConfirmedData[i] -
          sparklineDailyRecoveredData[i] -
          sparklineDailyDeceasedData[i]
      );
      requiredActiveStateDailyData.push({
        stateid:
          sparklineTotalConfirmedData[i] -
          sparklineDailyRecoveredData[i] -
          sparklineDailyDeceasedData[i],
      });
    }

    const barDailyDeceasedData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Deceased" && stateID.includes(currentStateCode))
          barDailyDeceasedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
            label: Number(item[this.props.match.params.stateid.toLowerCase()]),
          });
      });
    }

    const dailyDeceased = [];
    const dailyDeltaDeceased = [];

    for (let i = barDailyDeceasedData.length - 1; i > 0; i--) {
      dailyDeceased.push(barDailyDeceasedData[i].stateid);
      dailyDeltaDeceased.push(
        barDailyDeceasedData[i].stateid - barDailyDeceasedData[i - 1].stateid
      );

      if (
        barDailyDeceasedData[i].label - barDailyDeceasedData[i - 1].label >=
          0 &&
        barDailyDeceasedData[i - 1].label > 0
      )
        barDailyDeceasedData[i].label = `+${(
          ((barDailyDeceasedData[i].label - barDailyDeceasedData[i - 1].label) /
            barDailyDeceasedData[i - 1].label) *
          100
        ).toFixed(1)}%`;
      if (
        barDailyDeceasedData[i].label - barDailyDeceasedData[i - 1].label <=
          0 &&
        barDailyDeceasedData[i - 1].label > 0
      )
        barDailyDeceasedData[i].label = `${(
          ((barDailyDeceasedData[i].label - barDailyDeceasedData[i - 1].label) /
            barDailyDeceasedData[i - 1].label) *
          100
        ).toFixed(1)}%`;

      if (
        barDailyDeceasedData[i - 1].label === 0 &&
        barDailyDeceasedData[i].label !== 0
      )
        barDailyDeceasedData[i].label = "+100.0%";

      if (
        barDailyDeceasedData[i - 1].label === 0 &&
        barDailyDeceasedData[i].label === 0
      )
        barDailyDeceasedData[i].label = "+0%";
    }

    const lineTotalDeceasedData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Deceased" && stateID.includes(currentStateCode))
          lineTotalDeceasedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date:
              item.newdate.split(" ")[0] +
              " " +
              item.newdate.split(" ")[1] +
              " ",
          });
      });
    }
    for (let i = 1; i <= lineTotalDeceasedData.length - 1; i++) {
      lineTotalDeceasedData[i].stateid =
        lineTotalDeceasedData[i].stateid + lineTotalDeceasedData[i - 1].stateid;
    }

    const lineTotalActiveData = [];
    for (let i = 0; i <= lineTotalDeceasedData.length - 1; i++) {
      lineTotalActiveData.push({
        stateid:
          Number(lineTotalConfirmedData[i].stateid) -
          Number(lineTotalRecoveredData[i].stateid) -
          Number(lineTotalDeceasedData[i].stateid),
        date: lineTotalConfirmedData[i].date,
      });
    }

    const barDailyActiveData = [];
    for (let i = 0; i <= barDailyDeceasedData.length - 1; i++)
      barDailyActiveData.push({
        stateid:
          Number(barDailyConfirmedData[i].stateid) -
          Number(barDailyRecoveredData[i].stateid) -
          Number(barDailyDeceasedData[i].stateid),
        date: barDailyRecoveredData[i].date,
      });

    const min = Math.min(
      ...sparklineTotalConfirmedData.slice(
        sparklineTotalConfirmedData.length - 20,
        sparklineTotalConfirmedData.length
      ),
      ...sparklineDailyActiveData.slice(
        sparklineDailyActiveData.length - 20,
        sparklineDailyActiveData.length
      ),
      ...sparklineDailyRecoveredData.slice(
        sparklineDailyRecoveredData.length - 20,
        sparklineDailyRecoveredData.length
      ),
      ...sparklineDailyDeceasedData.slice(
        sparklineDailyDeceasedData.length - 20,
        sparklineDailyDeceasedData.length
      )
    );

    const max = Math.max(
      ...sparklineTotalConfirmedData.slice(
        sparklineTotalConfirmedData.length - 20,
        sparklineTotalConfirmedData.length
      ),
      ...sparklineDailyActiveData.slice(
        sparklineDailyActiveData.length - 20,
        sparklineDailyActiveData.length
      ),
      ...sparklineDailyRecoveredData.slice(
        sparklineDailyRecoveredData.length - 20,
        sparklineDailyRecoveredData.length
      ),
      ...sparklineDailyDeceasedData.slice(
        sparklineDailyDeceasedData.length - 20,
        sparklineDailyDeceasedData.length
      )
    );

    const formattedVaccinatedData = [];
    const formattedTestedData = [];

    if (isLoaded && isLoaded2) {
      date.map((d) => {
        let res = d;
        vaccinatedData.map((d2) => {
          if (res === d2.date) {
            res = d2;
          }
        });
        if (res.date === d) {
          formattedVaccinatedData.push({
            date: `${Number(d.split(" ")[0])} ${d.split(" ")[1]} `,
            deltaVaccinated: res.deltaVaccinated,
            totalVaccinated: res.totalVaccinated,
          });
        } else {
          formattedVaccinatedData.push({
            date: `${Number(d.split(" ")[0])} ${d.split(" ")[1]} `,
            deltaVaccinated: "-",
            totalVaccinated: "-",
          });
        }
      });
    }

    if (isLoaded && isLoaded2) {
      date.map((d) => {
        let res = d;
        totalTestsData.map((d2) => {
          if (res === d2.date) {
            res = d2;
          }
        });
        if (res.date === d) {
          formattedTestedData.push({
            date: `${Number(d.split(" ")[0])} ${d.split(" ")[1]} `,
            deltaTested: res.deltaSamplestested,
            totalTested: res.totalsamplestested,
          });
        } else {
          formattedTestedData.push({
            date: `${Number(d.split(" ")[0])} ${d.split(" ")[1]} `,
            deltaTested: "-",
            totalTested: "-",
          });
        }
      });
    }

    const expansionPanelData = [];

    for (let i = formattedTestedData.length - 1; i >= 0; i--) {
      if (formattedTestedData[i].totalTested) {
        expansionPanelData.push(formattedTestedData[i]);
        break;
      }
    }

    let timelineLength = 0;

    if (isLoaded) {
      if (beginning) {
        timelineLength = 0;
      }
      if (oneMonth) {
        timelineLength = lineTotalConfirmedData.length - 90;
      }
      if (twoWeeks) {
        timelineLength = lineTotalConfirmedData.length - 30;
      }
    }

    const showAllDistricts = (item) => {
      if (viewAll) return item.length;
      else return 7;
    };

    if (totalStateDataLoaded && currentStateCode === "DL") {
      requiredStateTotalData[0].district = "Delhi";
      requiredStateTotalData[0].deceased = requiredStateTotalData[0].deaths;
    }

    if (
      isLoaded &&
      isLoaded2 &&
      totalStateDataLoaded &&
      statesDailyDataLoaded &&
      stateID.includes(currentStateCode)
    ) {
      return (
        <>
          <div className="containerStates">
            <Helmet>
              <title>{stateFullName[currentStateCode]} Covid Dashboard</title>
              <meta
                name="description"
                content={`Track the spread of Coronavirus (COVID-19) in ${stateFullName[currentStateCode]}`}
              />
            </Helmet>
            <div className="row fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="col-7" style={{ marginTop: 12 }}>
                <h6
                  style={{
                    fontFamily: "notosans",
                    textTransform: "uppercase",
                    textAlign: "left",
                    color: "rgb(226, 42, 79)",
                  }}
                >
                  {stateFullName[currentStateCode]}
                  <OverlayTrigger
                    key={"bottom"}
                    placement={"bottom"}
                    overlay={
                      <Tooltip id={`tooltip-${"bottom"}`}>
                        <strong>
                          {"Data tallied with State bulletins, MoHFW and ICMR"}
                        </strong>
                      </Tooltip>
                    }
                  >
                    <span>
                      <InfoTwoToneIcon
                        color="inherit"
                        fontSize="inherit"
                        style={{ verticalAlign: "-0.15rem" }}
                      />
                    </span>
                  </OverlayTrigger>
                </h6>
              </div>

              <div className="col-5" style={{ marginTop: 12 }}>
                <h6
                  style={{
                    fontFamily: "notosans",
                    textTransform: "uppercase",
                    textAlign: "right",
                    color: "slateblue",
                    fontSize: 12,
                  }}
                >
                  <span style={{ verticalAlign: "0.1rem", cursor: "pointer" }}>
                    <QueryBuilderTwoToneIcon
                      color="inherit"
                      fontSize="inherit"
                    />
                  </span>{" "}
                  {isNaN(
                    Date.parse(
                      formatDate(requiredStateTotalData[0].lastupdatedtime)
                    )
                  )
                    ? ""
                    : formatDateAbsolute(
                        requiredStateTotalData[0].lastupdatedtime
                      )}
                </h6>
              </div>
              <div className="w-100"></div>

              <div
                className="col fade-in-up"
                style={{ alignContent: "center", animationDelay: "0.6s" }}
              >
                <div className="row" style={{ marginBottom: -5 }}>
                  <div className="col-7" style={{ textAlign: "left" }}>
                    <h6 style={{ fontSize: 12, color: "slateblue" }}>
                      <ColorizeRoundedIcon fontSize="small" /> Total Tests:{" "}
                      {expansionPanelData[0] === undefined
                        ? "0"
                        : commaSeperated(expansionPanelData[0].totalTested)}
                    </h6>
                  </div>
                  <div className="col-5" style={{ textAlign: "right" }}>
                    <h6 style={{ fontSize: 12, color: "slateblue" }}>
                      {expansionPanelData[0] !== undefined
                        ? `as of ${expansionPanelData[0].date}`
                        : ""}
                    </h6>
                  </div>
                </div>

                <table
                  className="table-borderless table table-sm fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <tr className="tr">
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleConfirmed
                            ? "solid rgba(10, 111, 145, 0.8) 7px"
                            : "solid rgba(128, 128, 128, 1) 7px"
                        }`,
                      }}
                      onClick={() => {
                        this.setState({
                          toggleConfirmed: true,
                          toggleActive: false,
                          toggleRecovered: false,
                          toggleDeceased: false,
                        });
                      }}
                    >
                      <h6
                        className="text-info"
                        style={{
                          fontSize: "0.8rem",
                          background: "rgba(66, 179, 244, 0.1)",
                        }}
                      >
                        CONFIRMED
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(23, 162, 184, 0.7)",
                        }}
                      >
                        {Number(requiredStateTotalData[0].deltaconfirmed) >
                        0 ? (
                          <Icon.PlusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : Number(requiredStateTotalData[0].deltaconfirmed) <
                          0 ? (
                          <Icon.MinusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : (
                          <Icon.Meh
                            size={12}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        )}{" "}
                        {Number(requiredStateTotalData[0].deltaconfirmed) > 0
                          ? commaSeperated(
                              requiredStateTotalData[0].deltaconfirmed
                            )
                          : Number(requiredStateTotalData[0].deltaconfirmed) < 0
                          ? commaSeperated(
                              Math.abs(requiredStateTotalData[0].deltaconfirmed)
                            )
                          : ""}
                      </h6>
                      <h5 className="text-info">
                        {commaSeperated(requiredStateTotalData[0].confirmed)}
                      </h5>
                      <MiniStateSparkline
                        requiredStateDailyData={requiredConfirmedStateDailyData}
                        dataKey={this.props.match.params.stateid.toLowerCase()}
                        min={min}
                        max={max}
                        sparklineData={sparklineTotalConfirmedData}
                        stroke="#42b3f4"
                      />
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleActive
                            ? "solid rgba(201, 25, 60, 0.8) 7px"
                            : "solid rgba(128, 128, 128, 1) 7px"
                        }`,
                      }}
                      onClick={() => {
                        this.setState({
                          toggleConfirmed: false,
                          toggleActive: true,
                          toggleRecovered: false,
                          toggleDeceased: false,
                        });
                      }}
                    >
                      <h6
                        style={{
                          fontSize: "0.8rem",
                          color: "rgb(255, 80, 100)",
                          background: "rgba(255, 7, 58, 0.125)",
                        }}
                      >
                        ACTIVE
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(255, 68, 106, 0.7)",
                        }}
                      >
                        {Number(requiredStateTotalData[0].deltaconfirmed) -
                          Number(requiredStateTotalData[0].deltarecovered) -
                          Number(requiredStateTotalData[0].deltadeaths) >
                        0 ? (
                          <Icon.PlusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(255, 68, 106, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : (
                          <Icon.Heart
                            size={12}
                            strokeWidth={3}
                            fill="rgba(255, 68, 106, 0.4)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        )}{" "}
                        {Number(requiredStateTotalData[0].deltaconfirmed) -
                          Number(requiredStateTotalData[0].deltarecovered) -
                          Number(requiredStateTotalData[0].deltadeaths) >
                        0
                          ? commaSeperated(
                              Number(requiredStateTotalData[0].deltaconfirmed) -
                                Number(
                                  requiredStateTotalData[0].deltarecovered
                                ) -
                                Number(requiredStateTotalData[0].deltadeaths)
                            )
                          : ""}
                      </h6>
                      <h5 style={{ color: "#ff446a" }}>
                        {commaSeperated(requiredStateTotalData[0].active)}
                      </h5>
                      <MiniStateSparkline
                        requiredStateDailyData={requiredActiveStateDailyData}
                        dataKey="stateid"
                        min={min}
                        max={max}
                        sparklineData={sparklineDailyActiveData}
                        stroke="#ff446a"
                      />
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleRecovered
                            ? "solid rgba(64, 145, 64, 0.8) 7px"
                            : "solid rgba(128, 128, 128, 1) 7px"
                        }`,
                      }}
                      onClick={() => {
                        this.setState({
                          toggleConfirmed: false,
                          toggleActive: false,
                          toggleRecovered: true,
                          toggleDeceased: false,
                        });
                      }}
                    >
                      <h6
                        className="text-success"
                        style={{
                          fontSize: "0.8rem",
                          background: "rgba(88, 189, 88, 0.125)",
                        }}
                      >
                        RECOVERED
                      </h6>
                      <h6
                        style={{
                          color: "rgba(40, 167, 69, 0.7)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {Number(requiredStateTotalData[0].deltarecovered) >
                        0 ? (
                          <Icon.PlusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : Number(requiredStateTotalData[0].deltarecovered) <
                          0 ? (
                          <Icon.MinusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(40, 167, 69, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : (
                          <Icon.Meh
                            size={12}
                            strokeWidth={3}
                            fill="rgba(40, 167, 69, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        )}{" "}
                        {Number(requiredStateTotalData[0].deltarecovered) > 0
                          ? commaSeperated(
                              requiredStateTotalData[0].deltarecovered
                            )
                          : Number(requiredStateTotalData[0].deltarecovered) < 0
                          ? commaSeperated(
                              Math.abs(requiredStateTotalData[0].deltarecovered)
                            )
                          : ""}
                      </h6>
                      <h5 className="text-success">
                        {commaSeperated(requiredStateTotalData[0].recovered)}
                      </h5>
                      <MiniStateSparkline
                        requiredStateDailyData={requiredRecoveredStateDailyData}
                        dataKey={this.props.match.params.stateid.toLowerCase()}
                        min={min}
                        max={max}
                        sparklineData={sparklineDailyRecoveredData}
                        stroke="#58bd58"
                      />
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleDeceased
                            ? "solid rgb(74, 79, 83) 7px"
                            : "solid rgba(128, 128, 128, 1) 7px"
                        }`,
                      }}
                      onClick={() => {
                        this.setState({
                          toggleConfirmed: false,
                          toggleActive: false,
                          toggleRecovered: false,
                          toggleDeceased: true,
                        });
                      }}
                    >
                      <h6
                        className="text-secondary"
                        style={{
                          fontSize: "0.8rem",
                          background: "rgba(92, 87, 86, 0.2)",
                        }}
                      >
                        DECEASED
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(108, 117, 125, 0.7)",
                        }}
                      >
                        {Number(requiredStateTotalData[0].deltadeaths) > 0 ? (
                          <Icon.PlusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(23, 162, 184, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : Number(requiredStateTotalData[0].deltadeaths) <
                          0 ? (
                          <Icon.MinusCircle
                            size={12}
                            strokeWidth={3}
                            fill="rgba(108, 117, 125, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        ) : (
                          <Icon.Meh
                            size={12}
                            strokeWidth={3}
                            fill="rgba(108, 117, 125, 0.2)"
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        )}{" "}
                        {Number(requiredStateTotalData[0].deltadeaths) > 0
                          ? commaSeperated(
                              requiredStateTotalData[0].deltadeaths
                            )
                          : Number(requiredStateTotalData[0].deltadeaths) < 0
                          ? commaSeperated(
                              Math.abs(requiredStateTotalData[0].deltadeaths)
                            )
                          : ""}
                      </h6>
                      <h5 className="text-secondary">
                        {commaSeperated(requiredStateTotalData[0].deaths)}
                      </h5>
                      <MiniStateSparkline
                        requiredStateDailyData={requiredDeceasedStateDailyData}
                        dataKey={this.props.match.params.stateid.toLowerCase()}
                        min={min}
                        max={max}
                        sparklineData={sparklineDailyDeceasedData}
                        stroke="#5c5756"
                      />
                    </td>
                  </tr>
                </table>

                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "0.7s" }}
                  >
                    {toggleConfirmed && (
                      <StateChoropleth
                        data={
                          currentStateCode === "DL"
                            ? requiredStateTotalData
                            : topDistricts[0]
                        }
                        colorLow="rgba(66, 200, 255, 0.1)"
                        colorHigh="rgba(66, 200, 255, 1)"
                        type="confirmed"
                        borderColor="rgb(120, 190, 220)"
                        stateCode={`${currentStateCode}`}
                      />
                    )}
                    {toggleActive && (
                      <StateChoropleth
                        data={
                          currentStateCode === "DL"
                            ? requiredStateTotalData
                            : topDistricts[0]
                        }
                        type="active"
                        stateCode={`${currentStateCode}`}
                        colorLow="rgba(221, 50, 85, 0.1)"
                        colorHigh="rgba(221, 50, 85, 1)"
                        borderColor="rgb(255, 100, 100)"
                      />
                    )}
                    {toggleRecovered && (
                      <StateChoropleth
                        data={
                          currentStateCode === "DL"
                            ? requiredStateTotalData
                            : topDistricts[0]
                        }
                        type="recovered"
                        stateCode={`${currentStateCode}`}
                        colorLow="rgba(40, 167, 69, 0.1)"
                        colorHigh="rgba(40, 167, 69, 1)"
                        borderColor="rgba(40, 255, 69)"
                      />
                    )}
                    {toggleDeceased && (
                      <StateChoropleth
                        data={
                          currentStateCode === "DL"
                            ? requiredStateTotalData
                            : topDistricts[0]
                        }
                        stateCode={`${currentStateCode}`}
                        colorLow="rgba(74, 79, 83, 0.1)"
                        colorHigh="rgba(74, 79, 83, 1)"
                        type="deceased"
                        borderColor="rgb(150, 150, 150)"
                      />
                    )}
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col-6 fade-in-up"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <div>
                      <h6 style={{ color: "slateblue" }}>
                        TOP DISTRICTS{" "}
                        {topDistricts[0].length > 7 && (
                          <span
                            style={{
                              cursor: "pointer",
                              verticalAlign: "0.15rem",
                              marginLeft: "5px",
                            }}
                            onClick={() => this.setState({ viewAll: !viewAll })}
                          >
                            {viewAll ? (
                              <Icon.ChevronUp
                                className="showUp"
                                color="#3f51b5"
                              />
                            ) : (
                              <Icon.ChevronDown
                                className="showDown"
                                color="#3f51b5"
                              />
                            )}
                          </span>
                        )}
                      </h6>
                      {isLoaded && toggleConfirmed ? (
                        <ul>
                          {topDistricts.map((item) =>
                            item
                              .slice(0, showAllDistricts(item))
                              .map((district) => (
                                <li
                                  key={district.district}
                                  style={{
                                    color: "slategrey",

                                    fontSize: 12,
                                    fontFamily: "notosans",
                                  }}
                                >
                                  {commaSeperated(district.confirmed)}{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {district.district}
                                  </span>
                                  &nbsp;
                                  <span
                                    style={{
                                      color: "rgba(66, 179, 244, 0.9)",
                                      fontSize: 11,
                                    }}
                                  >
                                    {district.delta.confirmed > 0 ? (
                                      <Icon.ArrowUp size={11} strokeWidth={3} />
                                    ) : district.delta.confirmed < 0 ? (
                                      <Icon.ArrowDown
                                        size={11}
                                        strokeWidth={3}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {district.delta.confirmed > 0
                                      ? commaSeperated(district.delta.confirmed)
                                      : district.delta.confirmed < 0
                                      ? commaSeperated(
                                          Math.abs(district.delta.confirmed)
                                        )
                                      : ""}
                                  </span>
                                </li>
                              ))
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {isLoaded && toggleActive ? (
                        <ul>
                          {topDistricts.map((item) =>
                            item
                              .slice(0, showAllDistricts(item))
                              .map((district) => (
                                <li
                                  key={district.district}
                                  style={{
                                    color: "slategrey",

                                    fontSize: 12,
                                    fontFamily: "notosans",
                                  }}
                                >
                                  {commaSeperated(district.active)}{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {district.district}
                                  </span>
                                </li>
                              ))
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {isLoaded && toggleRecovered ? (
                        <ul>
                          {topDistricts.map((item) =>
                            item
                              .slice(0, showAllDistricts(item))
                              .map((district) => (
                                <li
                                  key={district.district}
                                  style={{
                                    color: "slategrey",

                                    fontSize: 12,
                                    fontFamily: "notosans",
                                  }}
                                >
                                  {commaSeperated(district.recovered)}{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {district.district}
                                  </span>
                                  &nbsp;
                                  <span
                                    style={{
                                      color: "rgba(88, 189, 88, 0.9)",
                                      fontSize: 11,
                                    }}
                                  >
                                    {district.delta.recovered > 0 ? (
                                      <Icon.ArrowUp size={11} strokeWidth={3} />
                                    ) : district.delta.recovered < 0 ? (
                                      <Icon.ArrowDown
                                        size={11}
                                        strokeWidth={3}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {district.delta.recovered > 0
                                      ? commaSeperated(district.delta.recovered)
                                      : district.delta.recovered < 0
                                      ? commaSeperated(
                                          Math.abs(district.delta.recovered)
                                        )
                                      : ""}
                                  </span>
                                </li>
                              ))
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {" "}
                      {isLoaded && toggleDeceased ? (
                        <ul>
                          {topDistricts.map((item) =>
                            item
                              .slice(0, showAllDistricts(item))
                              .map((district) => (
                                <li
                                  key={district.district}
                                  style={{
                                    fontFamily: "notosans",
                                    fontSize: 12,
                                  }}
                                >
                                  <span
                                    style={{ fontSize: 12, color: "slategrey" }}
                                  >
                                    {district.deceased}
                                  </span>{" "}
                                  <span
                                    style={{ fontSize: 11, color: "slategrey" }}
                                  >
                                    {district.district}
                                  </span>
                                  &nbsp;
                                  <span style={{ fontSize: 11 }}>
                                    {district.delta.deceased > 0 ? (
                                      <Icon.ArrowUp size={11} strokeWidth={3} />
                                    ) : district.delta.deceased < 0 ? (
                                      <Icon.ArrowDown
                                        size={11}
                                        strokeWidth={3}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {district.delta.deceased > 0
                                      ? commaSeperated(district.delta.deceased)
                                      : district.delta.deceased < 0
                                      ? commaSeperated(
                                          Math.abs(district.delta.deceased)
                                        )
                                      : ""}
                                  </span>
                                </li>
                              ))
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    {toggleConfirmed && (
                      <MiniBarPlot
                        barDailyData={barDailyConfirmedData}
                        type="confirmed"
                        fill="rgb(16, 133, 172)"
                      />
                    )}

                    {toggleActive && (
                      <MiniBarPlot
                        barDailyData={barDailyActiveData}
                        type="active"
                        fill="rgb(211, 25, 60)"
                      />
                    )}

                    {toggleRecovered && (
                      <MiniBarPlot
                        barDailyData={barDailyRecoveredData}
                        type="recovered"
                        fill="rgb(64, 145, 64)"
                      />
                    )}

                    {toggleDeceased && (
                      <MiniBarPlot
                        barDailyData={barDailyDeceasedData}
                        type="deceased"
                        fill="#6c757d"
                      />
                    )}
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col fade-in-up"
                    style={{
                      paddingLeft: "3.2%",
                      paddingRight: "3.2%",
                      animationDelay: "1s",
                    }}
                  >
                    <ControlledExpansionPanels
                      data={expansionPanelData}
                      stateData={requiredStateTotalData}
                      state={stateFullName[currentStateCode]}
                      population={statePopulation[currentStateCode]}
                    />
                  </div>
                </div>
                <div className="w-100"></div>
                <div
                  className="row fade-in-up"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="col">
                    <div className="row" style={{ alignContent: "center" }}>
                      <div
                        align="center"
                        className="col fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <h6 className="feedbackBtn">
                          <a
                            href="https://forms.gle/N6V7VTgcmBtxkU4Q9"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Provide your valuable feedback"
                          >
                            <Icon.FileText size={30} />{" "}
                          </a>
                        </h6>
                        <h6 className="feedbackBtn">
                          Please provide your valuable feedback
                        </h6>
                      </div>
                      <div
                        className="col fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <div className="row shareBtn">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=covidindiastats.com/${currentStateCode}`}
                            onClick={() => {
                              ReactGa.event({
                                category: "FB Share",
                                action: "fb clicked",
                              });
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Share COVID INDIA STATS on Facebook"
                            style={{ color: "rgb(59, 89, 152)" }}
                          >
                            <FacebookIcon fontSize="large" />
                          </a>
                          <a
                            href={`whatsapp://send?text=Track the spread of Covid19 from State to district level covidindiastats.com/${currentStateCode}`}
                            onClick={() => {
                              ReactGa.event({
                                category: "WA Share",
                                action: "wa clicked",
                              });
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Share COVID INDIA STATS on Whatsapp"
                            style={{ color: "#25D366" }}
                          >
                            <WhatsAppIcon fontSize="large" />
                          </a>
                          <a
                            href={`http://twitter.com/share?text=@covidindiastats Track the spread of Covid19 from State to District level.&url=covidindiastats.com/${currentStateCode}`}
                            onClick={() => {
                              ReactGa.event({
                                category: "Twitter Share",
                                action: "T clicked",
                              });
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Share COVID INDIA STATS on Twitter"
                            style={{ color: "#00ACEE" }}
                          >
                            <TwitterIcon fontSize="large" />
                          </a>
                          <h6 className="likeShare">
                            Help this information reach your dear ones
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100"></div>
              </div>

              <div className="col-sm">
                <div className="row">
                  <div
                    className="col fade-in-up"
                    style={{
                      textAlign: "left",
                      animationDelay: "1.2s",
                      marginBottom: "-8px",
                    }}
                  >
                    <h6
                      className="home-title"
                      style={{
                        color: "#ff446a",
                        wordBreak: "keep-all",
                        wordWrap: "normal",
                        fontSize: "1.2rem",
                      }}
                    >
                      SPREAD TRENDS
                    </h6>
                  </div>

                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.3s", alignItems: "right" }}
                  >
                    <div
                      className="home-toggle float-right"
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      <Switch
                        className="react-switch"
                        onChange={this.onSwitch}
                        checked={toggleSwitch}
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
                  </div>
                  <div className="w-100"></div>
                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.4s" }}
                  >
                    <h6 style={{ color: "rgb(226, 42, 79)" }}>
                      {stateFullName[currentStateCode]}
                    </h6>
                  </div>
                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.4s" }}
                  >
                    <h6 style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: 13,
                          color: "purple",
                          background: "rgba(238, 130, 238)",
                          borderRadius: "3px",
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        {!toggleSwitch ? `CUMULATIVE` : `EVERYDAY`}
                      </span>
                    </h6>
                  </div>
                </div>

                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <h6
                      className="timeline-button"
                      onClick={() =>
                        this.setState({
                          beginning: true,
                          twoWeeks: false,
                          oneMonth: false,
                        })
                      }
                    >
                      &nbsp;Beginning{" "}
                      {beginning && (
                        <Icon.CheckCircle size={10} strokeWidth={3} />
                      )}
                    </h6>
                  </div>

                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.6s" }}
                  >
                    <h6
                      className="timeline-button"
                      onClick={() =>
                        this.setState({
                          beginning: false,
                          twoWeeks: false,
                          oneMonth: true,
                        })
                      }
                    >
                      &nbsp;3 Months{" "}
                      {oneMonth && (
                        <Icon.CheckCircle size={10} strokeWidth={3} />
                      )}
                    </h6>
                  </div>

                  <div
                    className="col fade-in-up"
                    style={{ animationDelay: "1.7s" }}
                  >
                    <h6
                      className="timeline-button"
                      onClick={() =>
                        this.setState({
                          beginning: false,
                          twoWeeks: true,
                          oneMonth: false,
                        })
                      }
                    >
                      &nbsp;1 Month{" "}
                      {twoWeeks && (
                        <Icon.CheckCircle size={10} strokeWidth={3} />
                      )}
                    </h6>
                  </div>
                </div>

                <div className="w-100"></div>

                <div
                  className="row fade-in-up"
                  style={{ animationDelay: "1.8s", marginTop: "-25px" }}
                >
                  {!toggleSwitch && (
                    <>
                      <StateLinePlot
                        stateName={stateFullName[currentStateCode]}
                        bgColor="rgba(150, 196, 216, 0.1)"
                        titleClass="text-info"
                        type="confirmed"
                        date={date}
                        total={lineTotalConfirmedData.slice(
                          timelineLength,
                          lineTotalConfirmedData.length
                        )}
                        daily={dailyConfirmed[0]}
                        stroke="rgb(66, 179, 244)"
                        lineStroke="#35aad1"
                        color1="#6ebed6"
                        color2="#55b2ce"
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            lineTotalConfirmedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 100
                            ? 100
                            : 10
                        }
                      />
                      <div className="w-100"></div>
                      <StateLinePlot
                        stateName={stateFullName[currentStateCode]}
                        bgColor="rgba(255, 7, 58, 0.125)"
                        titleClass="text-danger"
                        type="active"
                        date={date}
                        total={lineTotalActiveData.slice(
                          timelineLength,
                          lineTotalActiveData.length
                        )}
                        daily={
                          dailyConfirmed[0] -
                          dailyRecovered[0] -
                          dailyDeceased[0]
                        }
                        stroke="rgba(255, 7, 58, 1)"
                        lineStroke="#ff446a"
                        color1="#f16783"
                        color2="#ff446a"
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            lineTotalConfirmedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 100
                            ? 100
                            : 10
                        }
                      />
                      <div className="w-100"></div>
                      <StateLinePlot
                        stateName={stateFullName[currentStateCode]}
                        bgColor="rgba(177, 247, 177, 0.1)"
                        titleClass="text-success"
                        type="recovered"
                        date={date}
                        total={lineTotalRecoveredData.slice(
                          timelineLength,
                          lineTotalRecoveredData.length
                        )}
                        daily={dailyRecovered[0]}
                        stroke="#469246"
                        lineStroke="#5cb85c"
                        color1="#5cb85c"
                        color2="#5cb85c"
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            lineTotalRecoveredData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 100
                            ? 100
                            : 10
                        }
                      />
                      <div className="w-100"></div>
                      <StateLinePlot
                        stateName={stateFullName[currentStateCode]}
                        bgColor="rgba(49, 43, 43, 0.05)"
                        titleClass="text-secondary"
                        type="deceased"
                        date={date}
                        total={lineTotalDeceasedData.slice(
                          timelineLength,
                          lineTotalDeceasedData.length
                        )}
                        daily={dailyDeceased[0]}
                        stroke="#6c757d"
                        lineStroke="#666565"
                        color1="#808080"
                        color2="#5e5a5a"
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            lineTotalDeceasedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 10
                            ? 100
                            : 10
                        }
                      />
                      <div className="w-100"></div>
                      <div className="w-100"></div>

                      <div className="col">
                        <section
                          className="graph-wrapper"
                          style={{
                            backgroundColor: "rgba(106, 68, 200, 0.1)",
                            borderRadius: "6px",
                            paddingTop: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: "0.8rem",
                              color: "slateblue",
                            }}
                          >
                            TESTED
                            <h6 style={{ fontSize: "10px", color: "#3f51b5" }}>
                              {
                                formattedTestedData[
                                  formattedTestedData.length - 1
                                ].date
                              }
                              <h5 style={{ fontSize: 14, color: "slateblue" }}>
                                {commaSeperated(
                                  formattedTestedData[
                                    formattedTestedData.length - 1
                                  ].totalTested
                                )}
                                <span style={{ fontSize: 9 }}>
                                  {formattedTestedData[
                                    formattedTestedData.length - 1
                                  ].deltaTested !== "-"
                                    ? formattedTestedData[
                                        formattedTestedData.length - 1
                                      ].deltaTested
                                      ? "+" +
                                        commaSeperated(
                                          formattedTestedData[
                                            formattedTestedData.length - 1
                                          ].deltaTested
                                        )
                                      : ""
                                    : "-"}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.2}
                          >
                            <LineChart
                              data={formattedTestedData.slice(
                                timelineLength,
                                formattedTestedData.length
                              )}
                              margin={{
                                top: 40,
                                right: -20,
                                left: 20,
                                bottom: -8,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{
                                  stroke: "#6471b3",
                                  fill: "#6471b3",
                                  strokeWidth: 0.2,
                                }}
                                interval={"preserveStartEnd"}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickSize={5}
                                tickCount={5}
                                tickLine={{ stroke: "#6471b3" }}
                                axisLine={{
                                  stroke: "#6471b3",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <YAxis
                                domain={[0, "auto"]}
                                orientation="right"
                                tick={{
                                  stroke: "#6471b3",
                                  fill: "#6471b3",
                                  strokeWidth: 0.2,
                                }}
                                tickFormatter={abbreviateNumber}
                                tickSize={5}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickCount={8}
                                tickLine={{ stroke: "#6471b3" }}
                                axisLine={{
                                  stroke: "#6471b3",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <Retooltip
                                contentStyle={contentStyle}
                                cursor={false}
                                position={{ x: 120, y: 22 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="totalTested"
                                stroke="#6471b3"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Tested"
                                isAnimationActive={true}
                                connectNulls={true}
                                dot={({ cx, cy }) =>
                                  cx &&
                                  cy && (
                                    <svg
                                      x={cx - 2.25}
                                      y={cy - 2.25}
                                      width={4.5}
                                      height={4.5}
                                      fill="#3e4da3"
                                      viewBox="0 0 1024 1024"
                                    >
                                      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
                                    </svg>
                                  )
                                }
                                activeDot={{ r: 2.5 }}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "State test Data Tested",
                                    action: "test line hover",
                                  });
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </section>
                      </div>
                      <div className="w-100"></div>
                      <div className="col">
                        <section
                          className="graph-wrapper"
                          style={{
                            backgroundColor: "rgba(255, 223, 0, 0.1)",
                            borderRadius: "6px",
                            paddingTop: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: "0.8rem",
                              color: "#f4c430",
                            }}
                          >
                            VACCINE DOSES
                            <h6
                              style={{ fontSize: "12px", color: "#f4c430aa" }}
                            >
                              {
                                formattedVaccinatedData[
                                  formattedVaccinatedData.length - 1
                                ].date
                              }

                              <h5
                                style={{
                                  fontSize: "0.8rem",
                                  color: "#f4c430dd",
                                }}
                              >
                                {commaSeperated(
                                  formattedVaccinatedData[
                                    formattedVaccinatedData.length - 1
                                  ].totalVaccinated
                                )}{" "}
                                {formattedVaccinatedData[
                                  formattedVaccinatedData.length - 1
                                ].deltaVaccinated !== "-" && (
                                  <span style={{ fontSize: 8 }}>
                                    +
                                    {commaSeperated(
                                      formattedVaccinatedData[
                                        formattedVaccinatedData.length - 1
                                      ].deltaVaccinated
                                    )}
                                  </span>
                                )}
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.2}
                          >
                            <LineChart
                              data={formattedVaccinatedData.slice(
                                timelineLength,
                                formattedVaccinatedData.length
                              )}
                              margin={{
                                top: 40,
                                right: -20,
                                left: 20,
                                bottom: -8,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{
                                  stroke: "#f4c430dd",
                                  fill: "#f4c430dd",
                                  strokeWidth: 0.2,
                                }}
                                interval={"preserveStartEnd"}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickSize={5}
                                tickCount={5}
                                axisLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                                tickLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <YAxis
                                domain={[0, "auto"]}
                                orientation="right"
                                tick={{
                                  stroke: "#f4c430dd",
                                  fill: "#f4c430dd",
                                  strokeWidth: 0.2,
                                }}
                                tickFormatter={abbreviateNumber}
                                tickSize={5}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickCount={8}
                                axisLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                                tickLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <Retooltip
                                contentStyle={contentStyle}
                                cursor={false}
                                position={{ x: 120, y: 22 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="totalVaccinated"
                                stroke="#f4c430"
                                strokeWidth="2"
                                strokeLinecap="round"
                                name="Vaccinated"
                                isAnimationActive={true}
                                connectNulls={true}
                                dot={({ cx, cy }) =>
                                  cx &&
                                  cy && (
                                    <svg
                                      x={cx - 2.25}
                                      y={cy - 2.25}
                                      width={4.5}
                                      height={4.5}
                                      fill="#f4c430"
                                      viewBox="0 0 1024 1024"
                                    >
                                      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
                                    </svg>
                                  )
                                }
                                activeDot={{ r: 2.5 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </section>
                      </div>
                    </>
                  )}
                  {toggleSwitch && (
                    <>
                      <StateBarPlot
                        stateName={stateFullName[currentStateCode]}
                        type="confirmed"
                        bgColor="rgba(150, 196, 216, 0.1)"
                        titleClass="text-info"
                        data={barDailyConfirmedData.slice(
                          timelineLength,
                          barDailyConfirmedData.length
                        )}
                        date={date}
                        daily={dailyConfirmed[0]}
                        dailyDelta={dailyDeltaConfirmed[0]}
                        sparkline={sparklineTotalConfirmedData}
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            barDailyConfirmedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 100
                            ? 100
                            : 10
                        }
                        stroke="rgb(66, 179, 244)"
                        color1="#6ebed6"
                        color2="#55b2ce"
                      />
                      <div className="w-100"></div>
                      <StateBarPlot
                        stateName={stateFullName[currentStateCode]}
                        type="active"
                        bgColor="rgba(255, 7, 58, 0.125)"
                        titleClass="text-danger"
                        data={barDailyActiveData.slice(
                          timelineLength,
                          barDailyActiveData.length
                        )}
                        date={date}
                        daily={
                          dailyConfirmed[0] -
                          dailyRecovered[0] -
                          dailyDeceased[0]
                        }
                        dailyDelta={
                          dailyDeltaConfirmed[0] -
                          dailyDeltaRecovered[0] -
                          dailyDeltaDeceased[0]
                        }
                        sparkline={sparklineDailyActiveData}
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            barDailyConfirmedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 100
                            ? 100
                            : 10
                        }
                        stroke="rgba(255, 7, 58, 1)"
                        color1="#f16783"
                        color2="#ff446a"
                      />
                      <div className="w-100"></div>
                      <StateBarPlot
                        stateName={stateFullName[currentStateCode]}
                        type="recovered"
                        bgColor="rgba(177, 247, 177, 0.1)"
                        titleClass="text-success"
                        data={barDailyRecoveredData.slice(
                          timelineLength,
                          barDailyRecoveredData.length
                        )}
                        date={date}
                        daily={dailyRecovered[0]}
                        dailyDelta={dailyDeltaRecovered[0]}
                        sparkline={sparklineDailyRecoveredData}
                        divideBy={
                          Math.max.apply(
                            Math,
                            barDailyRecoveredData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 50
                            ? 50
                            : 10
                        }
                        stroke="#28a745"
                        color1="#7ed87e"
                        color2="#5cb85c"
                      />
                      <div className="w-100"></div>
                      <StateBarPlot
                        stateName={stateFullName[currentStateCode]}
                        type="deceased"
                        bgColor="rgba(49, 43, 43, 0.05)"
                        titleClass="text-secondary"
                        data={barDailyDeceasedData.slice(
                          timelineLength,
                          barDailyDeceasedData.length
                        )}
                        date={date}
                        daily={dailyDeceased[0]}
                        dailyDelta={dailyDeltaDeceased[0]}
                        sparkline={sparklineDailyDeceasedData}
                        interval={"preserveStartEnd"}
                        divideBy={
                          Math.max.apply(
                            Math,
                            barDailyDeceasedData.map(function (item) {
                              return Number(item.stateid);
                            })
                          ) >= 50
                            ? 50
                            : 5
                        }
                        stroke="#6c757d"
                        color1="#808080"
                        color2="#5e5a5a"
                      />
                      <div className="w-100"></div>

                      <div className="col">
                        <section
                          className="graph-wrapper"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "rgba(106, 68, 200, 0.1)",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "10px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              color: "slateblue",
                              fontSize: "0.8rem",
                            }}
                          >
                            TESTED
                            <h6
                              style={{
                                fontSize: "10px",
                                color: "#3f51b5",
                                textTransform: "capitalize",
                              }}
                            >
                              {
                                formattedTestedData[
                                  formattedTestedData.length - 1
                                ].date
                              }

                              <h5 style={{ fontSize: 14, color: "slateblue" }}>
                                {commaSeperated(
                                  formattedTestedData[
                                    formattedTestedData.length - 1
                                  ].deltaTested
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  {formattedTestedData[
                                    formattedTestedData.length - 1
                                  ].deltaTested &&
                                  formattedTestedData[
                                    formattedTestedData.length - 2
                                  ].deltaTested
                                    ? formattedTestedData[
                                        formattedTestedData.length - 1
                                      ].deltaTested -
                                        formattedTestedData[
                                          formattedTestedData.length - 2
                                        ].deltaTested >
                                      0
                                      ? `+${commaSeperated(
                                          Math.abs(
                                            formattedTestedData[
                                              formattedTestedData.length - 1
                                            ].deltaTested -
                                              formattedTestedData[
                                                formattedTestedData.length - 2
                                              ].deltaTested
                                          )
                                        )}`
                                      : `-${commaSeperated(
                                          Math.abs(
                                            formattedTestedData[
                                              formattedTestedData.length - 1
                                            ].deltaTested -
                                              formattedTestedData[
                                                formattedTestedData.length - 2
                                              ].deltaTested
                                          )
                                        )}`
                                    : ""}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.2}
                          >
                            <BarChart
                              data={formattedTestedData.slice(
                                timelineLength,
                                formattedTestedData.length
                              )}
                              margin={{
                                top: 40,
                                right: -20,
                                left: 20,
                                bottom: -8,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{
                                  stroke: "#6471b3",
                                  fill: "#6471b3",
                                  strokeWidth: 0.2,
                                }}
                                interval={"preserveStartEnd"}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickSize={5}
                                tickLine={{ stroke: "#6471b3" }}
                                tickCount={8}
                                axisLine={{
                                  stroke: "#6471b3",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <YAxis
                                domain={[
                                  Math.floor(
                                    Math.min.apply(
                                      Math,
                                      formattedTestedData.map(function (item) {
                                        return Number(item.deltaTested);
                                      })
                                    ) / 1000
                                  ) * 1000,
                                  Math.ceil(
                                    Math.max.apply(
                                      Math,
                                      formattedTestedData.map(function (item) {
                                        return Number(item.deltaTested);
                                      })
                                    ) / 1000
                                  ) * 1000,
                                ]}
                                orientation="right"
                                tick={{
                                  stroke: "#6471b3",
                                  fill: "#6471b3",
                                  strokeWidth: 0.2,
                                }}
                                tickFormatter={abbreviateNumber}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickSize={5}
                                tickLine={{ stroke: "#6471b3" }}
                                tickCount={8}
                                axisLine={{
                                  stroke: "#6471b3",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "0.7rem",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 22 }}
                              />
                              <Bar
                                dataKey="deltaTested"
                                name="Tested"
                                fill="slateblue"
                                radius={[2, 2, 0, 0]}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph TestedBar State",
                                    action: "State Testedbar hover",
                                  });
                                }}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </section>
                      </div>
                      <div className="w-100"></div>
                      <div className="col">
                        <section
                          className="graph-wrapper"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "rgba(255, 223, 0, 0.1)",
                            borderRadius: "6px",
                            paddingTop: "5px",
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: "0.8rem",
                              color: "#f4c430",
                            }}
                          >
                            VACCINE DOSES
                            <h6
                              style={{ fontSize: "12px", color: "#f4c430aa" }}
                            >
                              {date.slice(-1)[0].split(" ")[0]}{" "}
                              {date.slice(-1)[0].split(" ")[1]}
                              <h5
                                style={{
                                  fontSize: "0.8rem",
                                  color: "#f4c430dd",
                                }}
                              >
                                {commaSeperated(
                                  formattedVaccinatedData[
                                    formattedVaccinatedData.length - 1
                                  ].deltaVaccinated
                                )}{" "}
                                <span style={{ fontSize: 8 }}>
                                  {formattedVaccinatedData[
                                    formattedVaccinatedData.length - 1
                                  ].deltaVaccinated !== "-" &&
                                    `${
                                      formattedVaccinatedData[
                                        formattedVaccinatedData.length - 1
                                      ].deltaVaccinated -
                                        formattedVaccinatedData[
                                          formattedVaccinatedData.length - 2
                                        ].deltaVaccinated >=
                                      0
                                        ? "+"
                                        : "-"
                                    }${commaSeperated(
                                      Math.abs(
                                        formattedVaccinatedData[
                                          formattedVaccinatedData.length - 1
                                        ].deltaVaccinated -
                                          formattedVaccinatedData[
                                            formattedVaccinatedData.length - 2
                                          ].deltaVaccinated
                                      )
                                    )}`}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.2}
                          >
                            <BarChart
                              data={formattedVaccinatedData.slice(
                                timelineLength,
                                formattedVaccinatedData.length
                              )}
                              margin={{
                                top: 40,
                                right: -20,
                                left: 20,
                                bottom: -8,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{
                                  stroke: "#f4c430dd",
                                  fill: "#f4c430dd",
                                  strokeWidth: 0.2,
                                }}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                interval={"preserveStartEnd"}
                                tickSize={5}
                                tickCount={5}
                                axisLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                                tickLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <YAxis
                                orientation="right"
                                tick={{
                                  stroke: "#f4c430dd",
                                  fill: "#f4c430dd",
                                  strokeWidth: 0.2,
                                }}
                                tickFormatter={abbreviateNumber}
                                tickSize={5}
                                style={{
                                  fontSize: "0.62rem",
                                  fontFamily: "notosans",
                                }}
                                tickCount={8}
                                axisLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                                tickLine={{
                                  stroke: "#f4c430dd",
                                  strokeWidth: "1.5px",
                                }}
                              />
                              <Retooltip
                                contentStyle={contentStyle}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 15 }}
                              />
                              <Bar
                                dataKey="deltaVaccinated"
                                name="Vaccinated"
                                fill="#f4c430"
                                radius={[3, 3, 0, 0]}
                                barSize={20}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </section>
                      </div>
                    </>
                  )}
                </div>
                <div className="row fadeInup">
                  <div
                    className="col-6 fade-in-up"
                    style={{ animationDelay: "1.9s" }}
                  >
                    <a
                      href="https://www.icmr.gov.in/pdf/covid/labs/COVID_Testing_Labs_28062020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkTestLabsBtn"
                    >
                      <h6 className="testLabsBtn">
                        <Icon.Download
                          strokeWidth={3}
                          size={9}
                          style={{ verticalAlign: "-0.1rem" }}
                        />{" "}
                        Testing Labs
                      </h6>
                    </a>
                  </div>
                  <div
                    className="col-6 fade-in-up"
                    style={{ animationDelay: "2s" }}
                  >
                    <a
                      href="https://covid.icmr.org.in/index.php/testing-facilities"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkTestLabsBtn"
                    >
                      <h6 className="testLabsBtn">
                        <Icon.MapPin
                          strokeWidth={3}
                          size={9}
                          style={{ verticalAlign: "-0.1rem" }}
                        />{" "}
                        Laboratory Locations
                      </h6>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      );
    } else {
      if (stateID.includes(currentStateCode)) {
        return (
          <div style={{ textAlign: "center" }}>
            <div
              className="spinner-grow"
              role="status"
              style={{ alignContent: "center" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      } else return <NotFound />;
    }
  }
}
export default StateDetails;
