import React, { Component } from "react";
import { indianstates, statesTestData, districtsDaily } from "./API/index";
import * as Icon from "react-feather";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import Switch from "react-switch";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { format } from "d3";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { formatDate, formatDateAbsolute } from "../utils/common-functions";
import parse from "html-react-parser";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip as Retooltip,
  ReferenceDot,
  BarChart,
  Bar,
  XAxis,
  LabelList,
} from "recharts";
import ReactGa from "react-ga";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import ControlledExpansionPanels from "./expansionPanel";
import DistrictPicker from "./districtPicker";
let CreateReactClass = require("create-react-class");

class StateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateData: [],
      isLoaded: false,
      zones: null,
      zonesLoaded: false,
      totalStateData: [],
      totalStateDataLoaded: false,
      statesDailyData: [],
      statesDailyDataLoaded: false,
      testData: [],
      testDataLoaded: false,
      districtsDaily: [],
      districtsDailyLoaded: false,
      toggleSwitch: false,
      toggleConfirmed: true,
      toggleActive: false,
      toggleRecovered: false,
      toggleDeceased: false,
      viewTable: false,
      back: true,
      sortConfirmed: true,
      sortActive: false,
      sortRecovered: false,
      sortDeceased: false,
      sortOrder: true,
    };
    this.onSwitch = this.onSwitch.bind(this);
    this.onClickConfirmed = this.onClickConfirmed.bind(this);
    this.onClickActive = this.onClickActive.bind(this);
    this.onClickRecovered = this.onClickRecovered.bind(this);
    this.onClickDeceased = this.onClickDeceased.bind(this);
    this.onViewTable = this.onViewTable.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSortConfirmed = this.onSortConfirmed.bind(this);
    this.onSortActive = this.onSortActive.bind(this);
    this.onSortRecovered = this.onSortRecovered.bind(this);
    this.onSortDeceased = this.onSortDeceased.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
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

  onBack({ back }) {
    this.setState({ back });
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

  handleDistrictChange = async (district) => {
    const stateFullName = {
      AP: "Andhra Pradesh",
      AN: "Andaman and Nicobar Islands",
      AR: "Arunachal Pradesh",
      AS: "Assam",
      BR: "Bihar",
      CH: "Chandigarh",
      CT: "Chhattisgarh",
      DN: "Dadra and Nagar Haveli and Daman and Diu",
      DL: "Delhi",
      GA: "Goa",
      GJ: "Gujarat",
      HP: "Himachal Pradesh",
      HR: "Haryana",
      JH: "Jharkhand",
      JK: "Jammu and Kashmir",
      KA: "Karnataka",
      KL: "Kerala",
      LA: "Ladakh",
      LD: "Lakshadweep",
      MH: "Maharashtra",
      ML: "Meghalaya",
      MN: "Manipur",
      MP: "Madhya Pradesh",
      MZ: "Mizoram",
      NL: "Nagaland",
      OR: "Odisha",
      PB: "Punjab",
      PY: "Puducherry",
      RJ: "Rajasthan",
      SK: "Sikkim",
      TG: "Telangana",
      TN: "Tamil Nadu",
      TR: "Tripura",
      UP: "Uttar Pradesh",
      UT: "Uttarakhand",
      WB: "West Bengal",
      UN: "State Unassigned",
    };
    const requiredDistrictData = this.state.districtsDaily[
      stateFullName[this.props.match.params.stateid.toUpperCase()]
    ][district];

    this.setState({
      requiredDistrictData: requiredDistrictData,
      requiredDistrict: district,
      districtHide: true,
    });
  };

  async componentDidMount() {
    const fetchedStates = await indianstates();
    this.setState({ stateData: fetchedStates, isLoaded: true });

    const requiredData = [];
    fetchedStates.map((item) => {
      if (this.props.match.params.stateid.toUpperCase() === item.statecode)
        requiredData.push(item.districtData);
    });
    this.setState({ requiredData });

    const fetchedStateTestData = await statesTestData();
    this.setState({ testData: fetchedStateTestData, testDataLoaded: true });

    const fetchedDistrictsDaily = await districtsDaily();
    this.setState({
      districtsDaily: fetchedDistrictsDaily,
      districtsDailyLoaded: true,
    });

    fetch("https://api.covid19india.org/zones.json").then((res) =>
      res.json().then((json) => {
        this.setState({ zones: json.zones, zonesLoaded: true });
      })
    );

    fetch("https://api.covid19india.org/data.json").then((res) =>
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

  render() {
    const {
      stateData,
      isLoaded,
      zones,
      zonesLoaded,
      totalStateData,
      totalStateDataLoaded,
      requiredData,
      statesDailyData,
      statesDailyDataLoaded,
      testData,
      testDataLoaded,
      districtsDaily,
      districtsDailyLoaded,
      requiredDistrictData,
      toggleConfirmed,
      toggleActive,
      toggleRecovered,
      toggleDeceased,
      toggleSwitch,
      viewTable,
      back,
      sortConfirmed,
      sortActive,
      sortRecovered,
      sortDeceased,
      sortOrder,
    } = this.state;

    const stateFullName = {
      AP: "Andhra Pradesh",
      AN: "Andaman and Nicobar Islands",
      AR: "Arunachal Pradesh",
      AS: "Assam",
      BR: "Bihar",
      CH: "Chandigarh",
      CT: "Chhattisgarh",
      DN: "Dadra and Nagar Haveli and Daman and Diu",
      DL: "Delhi",
      GA: "Goa",
      GJ: "Gujarat",
      HP: "Himachal Pradesh",
      HR: "Haryana",
      JH: "Jharkhand",
      JK: "Jammu and Kashmir",
      KA: "Karnataka",
      KL: "Kerala",
      LA: "Ladakh",
      LD: "Lakshadweep",
      MH: "Maharashtra",
      ML: "Meghalaya",
      MN: "Manipur",
      MP: "Madhya Pradesh",
      MZ: "Mizoram",
      NL: "Nagaland",
      OR: "Odisha",
      PB: "Punjab",
      PY: "Puducherry",
      RJ: "Rajasthan",
      SK: "Sikkim",
      TG: "Telangana",
      TN: "Tamil Nadu",
      TR: "Tripura",
      UP: "Uttar Pradesh",
      UT: "Uttarakhand",
      WB: "West Bengal",
      UN: "State Unassigned",
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
          String(requiredDistrictData[i].date.split(/\-/)[2]) +
          " " +
          String(months[Number(requiredDistrictData[i].date.split(/\-/)[1])]);
      }
    }

    const requiredDistricts = [];
    if (districtsDailyLoaded) {
      requiredDistricts.push(
        Object.keys(
          districtsDaily[
            stateFullName[this.props.match.params.stateid.toUpperCase()]
          ]
        )
      );
    }

    if (requiredData) {
      if (sortConfirmed) {
        requiredData[0].sort(function (x, y) {
          return sortOrder
            ? Number(y.confirmed) - Number(x.confirmed)
            : Number(x.confirmed) - Number(y.confirmed);
        });
      }
      if (sortActive) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.active) - Number(x.active)
            : Number(x.active) - Number(y.active);
        });
      }
      if (sortRecovered) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.recovered) - Number(x.recovered)
            : Number(x.recovered) - Number(y.recovered);
        });
      }
      if (sortDeceased) {
        requiredData[0].sort(function (x, y) {
          return !sortOrder
            ? Number(y.deceased) - Number(x.deceased)
            : Number(x.deceased) - Number(y.deceased);
        });
      }
    }

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

    for (let i = 0; i < statesDailyData.length; i++) {
      statesDailyData[i].newdate =
        statesDailyData[i].date.split(/\-/)[0] +
        " " +
        statesDailyData[i].date.split(/\-/)[1];
    }

    const confirmedTopDistricts = [];
    stateData.map((item) => {
      if (this.props.match.params.stateid.toUpperCase() === item.statecode)
        confirmedTopDistricts.push(item.districtData);
    });
    if (isLoaded && toggleConfirmed) {
      confirmedTopDistricts[0].sort(function (x, y) {
        return Number(y.confirmed) - Number(x.confirmed);
      });
    }
    const activeTopDistricts = [];
    stateData.map((item) => {
      if (this.props.match.params.stateid.toUpperCase() === item.statecode)
        activeTopDistricts.push(item.districtData);
    });
    if (isLoaded && toggleActive) {
      activeTopDistricts[0].sort(function (x, y) {
        return Number(y.active) - Number(x.active);
      });
    }

    const recoveredTopDistricts = [];
    stateData.map((item) => {
      if (this.props.match.params.stateid.toUpperCase() === item.statecode)
        recoveredTopDistricts.push(item.districtData);
    });
    if (isLoaded && toggleRecovered) {
      recoveredTopDistricts[0].sort(function (x, y) {
        return Number(y.recovered) - Number(x.recovered);
      });
    }

    const deceasedTopDistricts = [];
    stateData.map((item) => {
      if (this.props.match.params.stateid.toUpperCase() === item.statecode)
        deceasedTopDistricts.push(item.districtData);
    });
    if (isLoaded && toggleDeceased) {
      deceasedTopDistricts[0].sort(function (x, y) {
        return Number(y.deceased) - Number(x.deceased);
      });
    }

    const requiredStateTotalData = [];
    if (totalStateDataLoaded) {
      totalStateData.map((item) => {
        if (this.props.match.params.stateid.toUpperCase() === item.statecode)
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
        if (item.status === "Confirmed")
          barDailyConfirmedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date: item.newdate,
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
            date: item.newdate,
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
        if (item.status === "Recovered")
          sparklineDailyRecoveredData.push(
            Number(item[this.props.match.params.stateid.toLowerCase()])
          );
      });
    }

    const barDailyRecoveredData = [];
    if (statesDailyDataLoaded) {
      statesDailyData.map((item) => {
        if (item.status === "Recovered")
          barDailyRecoveredData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date: item.newdate,
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
        if (item.status === "Recovered")
          lineTotalRecoveredData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date: item.newdate,
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
        if (item.status === "Deceased")
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
        if (item.status === "Deceased")
          barDailyDeceasedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date: item.newdate,
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
        if (item.status === "Deceased")
          lineTotalDeceasedData.push({
            stateid: Number(
              item[this.props.match.params.stateid.toLowerCase()]
            ),
            date: item.newdate,
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

    const maxConfirmed = Math.max(
      ...sparklineTotalConfirmedData.slice(
        sparklineTotalConfirmedData.length - 20,
        sparklineTotalConfirmedData.length
      )
    );
    const maxActive = Math.max(
      ...sparklineDailyActiveData.slice(
        sparklineDailyActiveData.length - 20,
        sparklineDailyActiveData.length
      )
    );
    const maxRecovered = Math.max(
      ...sparklineDailyRecoveredData.slice(
        sparklineDailyRecoveredData.length - 20,
        sparklineDailyRecoveredData.length
      )
    );
    const maxDeceased = Math.max(
      ...sparklineDailyDeceasedData.slice(
        sparklineDailyDeceasedData.length - 20,
        sparklineDailyDeceasedData.length
      )
    );

    const minConfirmed = Math.min(
      ...sparklineTotalConfirmedData.slice(
        sparklineTotalConfirmedData.length - 20,
        sparklineTotalConfirmedData.length
      )
    );
    const minActive = Math.min(
      ...sparklineDailyActiveData.slice(
        sparklineDailyActiveData.length - 20,
        sparklineDailyActiveData.length
      )
    );
    const minRecovered = Math.min(
      ...sparklineDailyRecoveredData.slice(
        sparklineDailyRecoveredData.length - 20,
        sparklineDailyRecoveredData.length
      )
    );
    const minDeceased = Math.min(
      ...sparklineDailyDeceasedData.slice(
        sparklineDailyDeceasedData.length - 20,
        sparklineDailyDeceasedData.length
      )
    );

    const max = Math.max(maxConfirmed, maxActive, maxRecovered, maxDeceased);
    const min = Math.min(minConfirmed, minActive, minRecovered, minDeceased);

    const requiredStateTestData = [];
    testData.map((item) => {
      if (
        item.state ===
          stateFullName[this.props.match.params.stateid.toUpperCase()] &&
        this.props.match.params.stateid.toUpperCase() !== "LD"
      )
        requiredStateTestData.push(item);
    });

    for (let i = 0; i < requiredStateTestData.length; i++) {
      requiredStateTestData[i].date =
        requiredStateTestData[i].updatedon.split(/\//)[0] +
        " " +
        months[Number(requiredStateTestData[i].updatedon.split(/\//)[1])];
    }

    const expansionPanelData = [];
    const expansionPanelDataPopulation = [];

    for (let i = requiredStateTestData.length - 1; i >= 0; i--) {
      if (requiredStateTestData[i].testspermillion) {
        expansionPanelData.push(requiredStateTestData[i]);
        break;
      }
    }
    for (let i = requiredStateTestData.length - 1; i >= 0; i--) {
      if (requiredStateTestData[i].populationncp2019projection) {
        expansionPanelDataPopulation.push(
          requiredStateTestData[i].populationncp2019projection
        );
        break;
      }
    }

    const cumulativeTestDataArray = [];
    const cumulativeTestDataDateArray = [];

    requiredStateTestData.map((item) => {
      cumulativeTestDataArray.push(Number(item.totaltested));
      cumulativeTestDataDateArray.push(item.date);
    });

    const dateFormattedTestData = [];

    for (let i = 0; i < date.length; i++) {
      if (cumulativeTestDataDateArray.includes(date[i])) {
        const index = cumulativeTestDataDateArray.indexOf(date[i]);
        if (cumulativeTestDataArray[index]) {
          dateFormattedTestData.push({
            totaltested: cumulativeTestDataArray[index],
            date: date[i],
          });
        } else
          dateFormattedTestData.push({
            date: date[i],
          });
      } else dateFormattedTestData.push({ date: date[i] });
    }

    const formattedTestData = [];
    for (let i = 0; i < date.length; i++) {
      if (cumulativeTestDataDateArray.includes(date[i])) {
        const index = cumulativeTestDataDateArray.indexOf(date[i]);
        formattedTestData.push({
          totaltested: cumulativeTestDataArray[index],
          date: date[i],
        });
      } else formattedTestData.push({ totaltested: 0, date: date[i] });
    }

    const dailyFormattedTestData = [];
    let previousData = 0;

    for (let i = 0; i < formattedTestData.length; i++) {
      if (i === 0)
        dailyFormattedTestData.push({
          dailytested: formattedTestData[i].totaltested,
          date: formattedTestData[i].date,
        });
      else {
        if (
          formattedTestData[i].totaltested &&
          formattedTestData[i - 1].totaltested
        ) {
          dailyFormattedTestData.push({
            dailytested:
              formattedTestData[i].totaltested -
              formattedTestData[i - 1].totaltested,
            date: formattedTestData[i].date,
          });
          previousData = formattedTestData[i].totaltested;
        } else if (
          formattedTestData[i].totaltested === 0 &&
          formattedTestData[i - 1].totaltested === 0
        ) {
          dailyFormattedTestData.push({
            dailytested: 0,
            date: formattedTestData[i].date,
          });
        } else if (
          formattedTestData[i].totaltested !== 0 &&
          formattedTestData[i - 1].totaltested === 0
        ) {
          dailyFormattedTestData.push({
            dailytested: formattedTestData[i].totaltested - previousData,
            date: formattedTestData[i].date,
          });
          previousData = formattedTestData[i].totaltested;
        } else if (
          formattedTestData[i].totaltested === 0 &&
          formattedTestData[i - 1].totaltested !== 0
        ) {
          dailyFormattedTestData.push({
            dailytested: 0,
            date: formattedTestData[i].date,
          });
        }
      }
    }

    const lastTotalTestedData = [];
    for (let i = dateFormattedTestData.length - 1; i >= 0; i--)
      if (
        Number(dateFormattedTestData[i].totaltested) !== 0 &&
        dateFormattedTestData[i].totaltested !== undefined
      ) {
        lastTotalTestedData.push({
          totaltested: dateFormattedTestData[i].totaltested,
          date: dateFormattedTestData[i].date,
        });
        break;
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
        <Tooltip disableTouchListener arrow classes={classes} {...props} />
      );
    }

    function commaSeperated(x) {
      if (x !== undefined) {
        x = x.toString();
        let lastThree = x.substring(x.length - 3);
        let otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== "") lastThree = "," + lastThree;
        let res =
          otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
      } else return 0;
    }

    function districtZone(district) {
      const redZone = [];
      const orangeZone = [];
      const greenZone = [];
      if (zonesLoaded) {
        zones.map((item) => {
          if (item.zone === "Red") redZone.push(item.district);
        });
        zones.map((item) => {
          if (item.zone === "Orange") orangeZone.push(item.district);
        });
        zones.map((item) => {
          if (item.zone === "Green") greenZone.push(item.district);
        });
      }

      if (redZone.includes(district)) {
        return "#ff446a";
      }
      if (orangeZone.includes(district)) {
        return "rgb(255, 153, 0)";
      }
      if (greenZone.includes(district)) {
        return "rgb(40, 167, 69)";
      } else return "rgb(150, 150, 150)";
    }
    if (
      isLoaded &&
      zonesLoaded &&
      totalStateDataLoaded &&
      statesDailyDataLoaded &&
      testDataLoaded
    ) {
      return (
        <React.Fragment>
          <div className="container">
            <Helmet>
              <title>
                {stateFullName[this.props.match.params.stateid.toUpperCase()]}{" "}
                Covid Dashboard
              </title>
              <meta
                name="description"
                content={`Track the spread of Coronavirus (COVID-19) in ${
                  stateFullName[this.props.match.params.stateid.toUpperCase()]
                }`}
              />
            </Helmet>
            <div className="row fadeInUp" style={{ animationDelay: "0.4s" }}>
              <div className="col-7" style={{ marginTop: 12 }}>
                <h5
                  style={{
                    fontFamily: "notosans",
                    textTransform: "uppercase",
                    textAlign: "left",
                    color: "rgb(226, 42, 79)",
                  }}
                >
                  {stateFullName[this.props.match.params.stateid.toUpperCase()]}
                </h5>
              </div>
              <div className="col-5" style={{ marginTop: 12 }}>
                <h6
                  style={{
                    fontFamily: "notosans",
                    textTransform: "uppercase",
                    textAlign: "right",
                    color: "rgba(62, 77, 163, 0.8)",
                    fontSize: 10,
                  }}
                >
                  <span style={{ verticalAlign: "0.1rem", cursor: "pointer" }}>
                    <QueryBuilderTwoToneIcon
                      color="primary"
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
                className="col fadeInUp"
                style={{ alignContent: "center", animationDelay: "0.6s" }}
              >
                <div className="row" style={{ marginBottom: -5 }}>
                  <div className="col" style={{ textAlign: "left" }}>
                    <h6
                      style={{ fontSize: 9, marginLeft: 5, color: "#3e4da3" }}
                    >
                      Total samples tested:{" "}
                      {lastTotalTestedData[0] === undefined
                        ? "0"
                        : commaSeperated(lastTotalTestedData[0].totaltested)}
                    </h6>
                  </div>
                  <div className="col" style={{ textAlign: "right" }}>
                    <h6
                      style={{ fontSize: 9, marginRight: 5, color: "#3e4da3" }}
                    >
                      {lastTotalTestedData[0] !== undefined
                        ? `as of ${lastTotalTestedData[0].date}`
                        : ""}
                    </h6>
                  </div>
                </div>

                <table
                  className="table-borderless table table-sm fadeInUp"
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
                            : ""
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
                        style={{ fontSize: "0.9rem", background: "#d9ecf5" }}
                      >
                        CONFIRMED
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(23, 162, 184, 0.7)",
                        }}
                      >
                        +
                        {commaSeperated(
                          requiredStateTotalData[0].deltaconfirmed
                        )}
                      </h6>
                      <h5 className="text-info">
                        {commaSeperated(requiredStateTotalData[0].confirmed)}
                      </h5>
                      <section style={{ alignContent: "center" }}>
                        <ResponsiveContainer
                          width="95%"
                          height="100%"
                          aspect={2.35}
                        >
                          <LineChart
                            data={requiredConfirmedStateDailyData.slice(
                              requiredConfirmedStateDailyData.length - 20,
                              requiredConfirmedStateDailyData.length
                            )}
                            syncId="line2"
                          >
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
                              position={{ x: -5, y: 0 }}
                              offset={5}
                            />
                            <Line
                              type="monotone"
                              dataKey={this.props.match.params.stateid.toLowerCase()}
                              stroke="#42b3f4"
                              strokeWidth={2.3}
                              dot={false}
                              animationDuration={2000}
                            />
                            <ReferenceDot
                              x={
                                sparklineTotalConfirmedData.slice(
                                  sparklineTotalConfirmedData.length - 20,
                                  sparklineTotalConfirmedData.length
                                ).length - 1
                              }
                              y={Number(sparklineTotalConfirmedData.slice(-1))}
                              r={3}
                              fill="#42b3f4"
                              stroke="rgba(66, 179, 244, 0.7)"
                              isAbove={true}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </section>
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleActive ? "solid rgba(201, 25, 60, 0.8) 7px" : ""
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
                          fontSize: "0.9rem",
                          color: "#ff446a",
                          background: "#f5d2d2",
                        }}
                      >
                        ACTIVE
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255, 68, 106, 0.7)",
                        }}
                      >
                        {Number(requiredStateTotalData[0].confirmed)
                          ? (
                              (requiredStateTotalData[0].active /
                                requiredStateTotalData[0].confirmed) *
                              100
                            ).toFixed(2)
                          : "0"}
                        %
                      </h6>
                      <h5 style={{ color: "#ff446a" }}>
                        {commaSeperated(requiredStateTotalData[0].active)}
                      </h5>
                      <section style={{ alignContent: "center" }}>
                        <ResponsiveContainer
                          width="95%"
                          height="100%"
                          aspect={2.35}
                        >
                          <LineChart
                            data={requiredActiveStateDailyData.slice(
                              requiredActiveStateDailyData.length - 20,
                              requiredActiveStateDailyData.length
                            )}
                            syncId="line2"
                          >
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
                              position={{ x: -5, y: 0 }}
                              offset={5}
                            />
                            <Line
                              type="monotone"
                              dataKey="stateid"
                              stroke="#ff446a"
                              strokeWidth={2.3}
                              dot={false}
                              animationDuration={2000}
                            />
                            <ReferenceDot
                              x={
                                sparklineDailyActiveData.slice(
                                  sparklineDailyActiveData.length - 20,
                                  sparklineDailyActiveData.length
                                ).length - 1
                              }
                              y={Number(sparklineDailyActiveData.slice(-1))}
                              r={3}
                              fill="#ff446a"
                              stroke="rgba(255, 68, 106, 0.7)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </section>
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleRecovered
                            ? "solid rgba(64, 145, 64, 0.8) 7px"
                            : ""
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
                        style={{ fontSize: "0.9rem", background: "#d5e9d5" }}
                      >
                        RECOVERED
                      </h6>
                      <h6
                        style={{
                          color: "rgba(40, 167, 69, 0.7)",
                          fontSize: "0.8rem",
                        }}
                      >
                        +
                        {commaSeperated(
                          requiredStateTotalData[0].deltarecovered
                        )}
                      </h6>
                      <h5 className="text-success">
                        {commaSeperated(requiredStateTotalData[0].recovered)}
                      </h5>
                      <section style={{ alignContent: "center" }}>
                        <ResponsiveContainer
                          width="95%"
                          height="100%"
                          aspect={2.35}
                        >
                          <LineChart
                            data={requiredRecoveredStateDailyData.slice(
                              requiredRecoveredStateDailyData.length - 20,
                              requiredRecoveredStateDailyData.length
                            )}
                            syncId="line2"
                          >
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
                              position={{ x: -5, y: 0 }}
                              offset={5}
                            />
                            <Line
                              type="monotone"
                              dataKey={this.props.match.params.stateid.toLowerCase()}
                              stroke="#58bd58"
                              strokeWidth={2.3}
                              dot={false}
                              animationDuration={2000}
                            />
                            <ReferenceDot
                              x={
                                sparklineDailyRecoveredData.slice(
                                  sparklineDailyRecoveredData.length - 20,
                                  sparklineDailyRecoveredData.length
                                ).length - 1
                              }
                              y={Number(sparklineDailyRecoveredData.slice(-1))}
                              r={3}
                              fill="#58bd58"
                              stroke="rgba(88, 189, 88, 0.7)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </section>
                    </td>
                    <td
                      className="td stateTable"
                      style={{
                        textAlign: "center",
                        width: "25%",
                        borderBottom: `${
                          toggleDeceased ? "solid rgb(74, 79, 83) 7px" : ""
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
                        style={{ fontSize: "0.9rem", background: "#ece7e7" }}
                      >
                        DECEASED
                      </h6>
                      <h6
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(108, 117, 125, 0.7)",
                        }}
                      >
                        +{commaSeperated(requiredStateTotalData[0].deltadeaths)}
                      </h6>
                      <h5 className="text-secondary">
                        {commaSeperated(requiredStateTotalData[0].deaths)}
                      </h5>
                      <section style={{ alignContent: "center" }}>
                        <ResponsiveContainer
                          width="95%"
                          height="100%"
                          aspect={2.35}
                        >
                          <LineChart
                            data={requiredDeceasedStateDailyData.slice(
                              requiredDeceasedStateDailyData.length - 20,
                              requiredDeceasedStateDailyData.length
                            )}
                            syncId="line2"
                          >
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
                              position={{ x: -5, y: 0 }}
                              offset={5}
                            />
                            <Line
                              type="monotone"
                              dataKey={this.props.match.params.stateid.toLowerCase()}
                              stroke="#5c5756"
                              strokeWidth={2.3}
                              dot={false}
                              animationDuration={2000}
                            />
                            <ReferenceDot
                              x={
                                sparklineDailyDeceasedData.slice(
                                  sparklineDailyDeceasedData.length - 20,
                                  sparklineDailyDeceasedData.length
                                ).length - 1
                              }
                              y={Number(sparklineDailyDeceasedData.slice(-1))}
                              r={3}
                              fill="#5c5756"
                              stroke="rgba(92, 87, 86, 0.7)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </section>
                    </td>
                  </tr>
                </table>

                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col-6 fadeInUp"
                    style={{ transitionDelay: "0.9s" }}
                  >
                    {<br id="line2" />}
                    {<br id="line2" />}
                    {isLoaded && toggleConfirmed ? (
                      <div>
                        <h6
                          style={{
                            color: "rgba(62, 77, 163, 0.7)",
                            fontWeight: 700,
                          }}
                        >
                          TOP DISTRICTS
                        </h6>
                        <ul>
                          {confirmedTopDistricts.map((item) =>
                            item.slice(0, 5).map((district) => (
                              <li
                                key={district.district}
                                style={{
                                  color: `${districtZone(district.district)}`,
                                  fontWeight: 600,
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
                                    color: "rgba(66, 179, 244, 0.6)",
                                    fontSize: 11,
                                  }}
                                >
                                  {district.delta.confirmed ? (
                                    <Icon.ArrowUp size={12} />
                                  ) : (
                                    ""
                                  )}
                                  {district.delta.confirmed
                                    ? district.delta.confirmed
                                    : ""}
                                </span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                    {isLoaded && toggleActive ? (
                      <div>
                        <h6 style={{ color: "rgba(62, 77, 163, 0.7)" }}>
                          TOP DISTRICTS
                        </h6>
                        <ul>
                          {activeTopDistricts.map((item) =>
                            item.slice(0, 5).map((district) => (
                              <li
                                key={district.district}
                                style={{
                                  color: `${districtZone(district.district)}`,
                                  fontWeight: 600,
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
                      </div>
                    ) : (
                      ""
                    )}

                    {isLoaded && toggleRecovered ? (
                      <div>
                        <h6 style={{ color: "rgba(62, 77, 163, 0.7)" }}>
                          TOP DISTRICTS
                        </h6>
                        <ul>
                          {recoveredTopDistricts.map((item) =>
                            item.slice(0, 5).map((district) => (
                              <li
                                key={district.district}
                                style={{
                                  color: `${districtZone(district.district)}`,
                                  fontWeight: 600,
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
                                  {district.delta.recovered ? (
                                    <Icon.ArrowUp size={12} />
                                  ) : (
                                    ""
                                  )}
                                  {district.delta.recovered
                                    ? district.delta.recovered
                                    : ""}
                                </span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                    {isLoaded && toggleDeceased ? (
                      <div>
                        <h6 style={{ color: "rgba(62, 77, 163, 0.7)" }}>
                          TOP DISTRICTS
                        </h6>
                        <ul>
                          {deceasedTopDistricts.map((item) =>
                            item.slice(0, 5).map((district) => (
                              <li
                                key={district.district}
                                style={{
                                  color: `${districtZone(district.district)}`,
                                  fontWeight: 600,
                                  fontFamily: "notosans",
                                  fontSize: 12,
                                }}
                              >
                                {district.deceased}{" "}
                                <span style={{ fontSize: 11 }}>
                                  {district.district}
                                </span>
                                &nbsp;
                                <span
                                  style={{
                                    color: "rgba(74, 79, 83, 0.8)",
                                    fontSize: 11,
                                  }}
                                >
                                  {district.delta.deceased ? (
                                    <Icon.ArrowUp size={12} />
                                  ) : (
                                    ""
                                  )}
                                  {district.delta.deceased
                                    ? district.delta.deceased
                                    : ""}
                                </span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-6">
                    {toggleConfirmed && (
                      <ResponsiveContainer
                        aspect={1.4}
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={barDailyConfirmedData.slice(
                            barDailyConfirmedData.length - 7,
                            barDailyConfirmedData.length
                          )}
                          margin={{
                            top: 35,
                          }}
                        >
                          <XAxis hide={true} dataKey="date" />
                          <YAxis hide={true} />
                          <Retooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            active={true}
                            cursor={{ fill: "transparent" }}
                            position={{ x: -5, y: 0 }}
                          />
                          <Bar
                            dataKey="stateid"
                            name="Confirmed"
                            fill="rgb(10, 111, 145)"
                            radius={[5, 5, 0, 0]}
                          >
                            <LabelList dataKey="label" position="top" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {toggleActive && (
                      <ResponsiveContainer
                        aspect={1.4}
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={barDailyActiveData.slice(
                            barDailyActiveData.length - 7,
                            barDailyActiveData.length
                          )}
                          margin={{
                            top: 35,
                          }}
                        >
                          <XAxis hide={true} dataKey="date" />
                          <YAxis hide={true} />
                          <Retooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            active={true}
                            cursor={{ fill: "transparent" }}
                            position={{ x: -5, y: 0 }}
                          />
                          <Bar
                            dataKey="stateid"
                            name="Active"
                            fill="rgb(211, 25, 60)"
                            radius={[5, 5, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {toggleRecovered && (
                      <ResponsiveContainer
                        aspect={1.4}
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={barDailyRecoveredData.slice(
                            barDailyRecoveredData.length - 7,
                            barDailyRecoveredData.length
                          )}
                          margin={{
                            top: 35,
                          }}
                        >
                          <XAxis hide={true} dataKey="date" />
                          <YAxis hide={true} />
                          <Retooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            active={true}
                            cursor={{ fill: "transparent" }}
                            position={{ x: -5, y: 0 }}
                          />
                          <Bar
                            dataKey="stateid"
                            name="Recovered"
                            fill="rgb(64, 145, 64)"
                            radius={[5, 5, 0, 0]}
                          >
                            <LabelList dataKey="label" position="top" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {toggleDeceased && (
                      <ResponsiveContainer
                        aspect={1.4}
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={barDailyDeceasedData.slice(
                            barDailyDeceasedData.length - 7,
                            barDailyDeceasedData.length
                          )}
                          margin={{
                            top: 35,
                          }}
                        >
                          <XAxis hide={true} dataKey="date" />
                          <YAxis hide={true} />
                          <Retooltip
                            contentStyle={{
                              background: "rgba(255,255,255,0)",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "8px",
                              fontFamily: "notosans",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: 0.8,
                            }}
                            active={true}
                            cursor={{ fill: "transparent" }}
                            position={{ x: -5, y: 0 }}
                          />
                          <Bar
                            dataKey="stateid"
                            name="Deceased"
                            fill="#474646"
                            radius={[5, 5, 0, 0]}
                          >
                            <LabelList dataKey="label" position="top" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="row">
                  <div
                    className="col fadeInUp"
                    style={{
                      paddingLeft: "3.2%",
                      paddingRight: "3.2%",
                      animationDelay: "1s",
                    }}
                  >
                    <ControlledExpansionPanels
                      data={expansionPanelData}
                      stateData={requiredStateTotalData}
                      state={
                        stateFullName[
                          this.props.match.params.stateid.toUpperCase()
                        ]
                      }
                      population={expansionPanelDataPopulation}
                    />
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="row fadeInUp" style={{ animationDelay: "1s" }}>
                  <div className="col">
                    {back && (
                      <h6
                        className="btnViewAll"
                        onClick={() => {
                          this.setState({ viewTable: true, back: false });
                          ReactGa.event({
                            category: "View Button",
                            action: "View Button Clicked",
                          });
                        }}
                      >
                        VIEW ALL DISTRICTS{" "}
                        <Icon.ArrowDownCircle
                          size={12}
                          style={{ verticalAlign: "-0.1rem" }}
                        />
                      </h6>
                    )}
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="col">
                  {requiredData.length && viewTable ? (
                    <React.Fragment>
                      <div className="col">
                        <h6
                          className="btnBackAll"
                          onClick={() => {
                            this.setState({ viewTable: false, back: true });
                          }}
                        >
                          HIDE ALL DISTRICTS{" "}
                          <Icon.ArrowUpCircle
                            size={12}
                            style={{ verticalAlign: "-0.1rem" }}
                          />
                        </h6>
                      </div>
                      <div className="w-100"></div>
                      <div
                        className="row fadeInUp"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <table
                          className="table table-sm table-striped table-borderless"
                          style={{
                            minWidth: "290px",
                            tableLayout: "fixed",
                            width: "100%",
                          }}
                          align="center"
                        >
                          <thead className="thead-dark">
                            <tr>
                              <th
                                className="th wideRow sticky-top"
                                id="line1"
                                style={{ width: "57px" }}
                              >
                                DISTRICT
                              </th>
                              <th
                                className="th sticky-top"
                                id="line2"
                                style={{ width: "175px" }}
                              >
                                DISTRICT
                              </th>
                              <th
                                className="th sticky-top text-info smallRow"
                                style={{ textAlign: "center" }}
                                id="line1"
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
                              </th>
                              <th
                                className="th sticky-top text-info"
                                style={{ textAlign: "center" }}
                                id="line2"
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
                                className="th sticky-top smallRow"
                                style={{
                                  color: "rgb(255, 68, 106)",
                                  textAlign: "center",
                                }}
                                id="line1"
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
                                className="th sticky-top narrowRow"
                                style={{
                                  color: "rgb(255, 68, 106)",
                                  textAlign: "center",
                                }}
                                id="line2"
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
                                className="th sticky-top text-success smallRow"
                                style={{ textAlign: "center" }}
                                id="line1"
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
                              </th>
                              <th
                                className="th sticky-top text-success"
                                style={{ textAlign: "center" }}
                                id="line2"
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
                                className="th sticky-top text-secondary smallRow"
                                id="line1"
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
                                DEATHS
                              </th>
                              <th
                                className="th sticky-top text-secondary"
                                id="line2"
                                style={{ textAlign: "center", width: "70px" }}
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
                                DECEASED
                              </th>
                            </tr>
                          </thead>
                          <tbody className="tbody">
                            {requiredData.map((item) =>
                              item.map((district) => (
                                <tr className="tr">
                                  <td
                                    className="tdleft align-middle"
                                    style={{
                                      color: `${districtZone(
                                        district.district
                                      )}`,
                                      borderLeftWidth: "5px",
                                      borderStyle: "solid",
                                    }}
                                  >
                                    {district.district}
                                    {district.notes ? (
                                      <BootstrapTooltip
                                        title={parse(district.notes)}
                                      >
                                        <span
                                          style={{ verticalAlign: "0.05rem" }}
                                        >
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
                                    className="delta td text-secondary align-middle"
                                    style={{ textAlign: "right" }}
                                  >
                                    <span className="arrowup text-info">
                                      {Number(district.delta.confirmed) !==
                                        0 && (
                                        <Icon.ArrowUp
                                          color="#42b3f4"
                                          size={9}
                                          strokeWidth={3.5}
                                        />
                                      )}
                                      <b className="deltainc-md text-info">
                                        {Number(district.delta.confirmed) === 0
                                          ? ""
                                          : commaSeperated(
                                              district.delta.confirmed
                                            )}
                                      </b>
                                    </span>
                                    &nbsp;&nbsp;
                                    {commaSeperated(district.confirmed)}
                                  </td>
                                  <td
                                    className="delta td text-secondary narrowRow align-middle"
                                    style={{ textAlign: "right" }}
                                  >
                                    {Number(district.active)
                                      ? commaSeperated(district.active)
                                      : "-"}
                                  </td>
                                  <td
                                    className="delta td text-secondary align-middle"
                                    style={{ textAlign: "right" }}
                                  >
                                    <span className="arrowup text-success">
                                      {Number(district.delta.recovered) !==
                                        0 && (
                                        <Icon.ArrowUp
                                          color="#28a745"
                                          size={9}
                                          strokeWidth={3.5}
                                        />
                                      )}
                                      <b className="deltainc-md text-success align-middle">
                                        {Number(district.delta.recovered) === 0
                                          ? ""
                                          : commaSeperated(
                                              district.delta.recovered
                                            )}
                                      </b>
                                    </span>
                                    &nbsp;&nbsp;
                                    {Number(district.recovered)
                                      ? commaSeperated(district.recovered)
                                      : "-"}
                                  </td>
                                  <td
                                    className="delta td text-secondary narrowRow align-middle"
                                    style={{ textAlign: "right" }}
                                  >
                                    <span className="arrowup text-secondary">
                                      {Number(district.delta.deceased) !==
                                        0 && (
                                        <Icon.ArrowUp
                                          color="#6c757d"
                                          size={9}
                                          strokeWidth={3.5}
                                        />
                                      )}
                                      <b className="deltainc-md text-secondary align-middle">
                                        {Number(district.delta.deceased) === 0
                                          ? ""
                                          : commaSeperated(
                                              district.delta.deceased
                                            )}
                                      </b>
                                    </span>
                                    &nbsp;&nbsp;
                                    {Number(district.deceased)
                                      ? commaSeperated(district.deceased)
                                      : "-"}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className="row" style={{ alignContent: "center" }}>
                      <div
                        align="center"
                        className="col-6 fadeInUp"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <h6 className="feedbackBtn">
                          <a
                            href="https://forms.gle/N6V7VTgcmBtxkU4Q9"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Provide us your valuable feedback"
                            style={{ color: "rgb(59, 89, 152)" }}
                          >
                            <Icon.FileText size={19} />{" "}
                          </a>
                        </h6>
                        <h6 className="feedbackBtn">Feedback</h6>
                      </div>
                      <div
                        className="col-6 fadeInUp"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <div className="row shareBtn">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=covidindiastats.com/${this.props.match.params.stateid.toUpperCase()}`}
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
                            <FacebookIcon size="inherit" />
                          </a>
                          <a
                            href={`whatsapp://send?text=covidindiastats.com/${this.props.match.params.stateid.toUpperCase()}`}
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
                            <WhatsAppIcon size="inherit" />
                          </a>
                          <a
                            href={`https://twitter.com/share?url=covidindiastats.com/${this.props.match.params.stateid.toUpperCase()}`}
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
                            <TwitterIcon size="inherit" />
                          </a>
                          <h6 className="likeShare">Like it, Share</h6>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-100"></div>
                <div className="row">
                  <div className="col">
                    <DistrictPicker
                      districts={requiredDistricts[0]}
                      isLoaded={districtsDailyLoaded}
                      handleDistrictChange={this.handleDistrictChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="row">
                  <div
                    className="col fadeInUp"
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
                      }}
                    >
                      SPREAD TRENDS{" "}
                      <h6>
                        <span
                          className="text-secondary"
                          style={{
                            fontSize: 10,
                            background: "#ece7e7",
                            borderRadius: "3px",
                          }}
                        >
                          {!toggleSwitch ? `CUMULATIVE` : `EVERYDAY`}
                        </span>
                      </h6>
                    </h6>
                  </div>
                  <div
                    className="col fadeInUp"
                    style={{ animationDelay: "1.3s", alignItems: "right" }}
                  >
                    <div
                      className="home-toggle float-right"
                      style={{
                        marginTop: "10px",
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
                </div>

                <div className="w-100"></div>
                <div
                  className="row fadeInUp"
                  style={{ animationDelay: "1.3s", marginTop: "-8px" }}
                >
                  {!toggleSwitch && (
                    <React.Fragment>
                      <div className="col">
                        <h6 style={{ color: "rgb(226, 42, 79)" }}>
                          {
                            stateFullName[
                              this.props.match.params.stateid.toUpperCase()
                            ]
                          }
                        </h6>
                        <section
                          className="graphsection"
                          style={{
                            backgroundColor: "#e4f3fa",
                            borderRadius: "6px",
                            paddingTop: "5px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            className="text-info"
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                            }}
                          >
                            CONFIRMED
                            <h6 style={{ fontSize: "12px", color: "#6ebed6" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#55b2ce" }}>
                                {commaSeperated(
                                  lineTotalConfirmedData[
                                    lineTotalConfirmedData.length - 1
                                  ].stateid
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  +{commaSeperated(dailyConfirmed[0])}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <LineChart
                              data={lineTotalConfirmedData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    requiredStateTotalData[0].confirmed / 100
                                  ) * 100,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={false}
                                position={{ x: 120, y: 16 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="stateid"
                                stroke="#35aad1"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Confirmed"
                                isAnimationActive={true}
                                dot={{
                                  stroke: "#0992c0",
                                  strokeWidth: 0.1,
                                  fill: "#0992c0",
                                }}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph state confirmed",
                                    action: "confirmed state hover",
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
                          className="graphsection"
                          style={{
                            backgroundColor: "#f5d2d2",
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
                              fontSize: 16,
                              color: "#ff446a",
                            }}
                          >
                            ACTIVE
                            <h6 style={{ fontSize: "12px", color: "#f16783" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#ff446a" }}>
                                {commaSeperated(
                                  lineTotalActiveData[
                                    lineTotalActiveData.length - 1
                                  ].stateid
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  +{commaSeperated(dailyRecovered[0])}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <LineChart
                              data={lineTotalActiveData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    Math.max.apply(
                                      Math,
                                      lineTotalActiveData.map(function (item) {
                                        return Number(item.stateid);
                                      })
                                    ) / 100
                                  ) * 100,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={false}
                                position={{ x: 120, y: 16 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="stateid"
                                stroke="#ec7d93"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Active"
                                isAnimationActive={true}
                                dot={{
                                  stroke: "#ff446a",
                                  strokeWidth: 0.1,
                                  fill: "#ff446a",
                                }}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph state active",
                                    action: "active state hover",
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
                          className="graphsection"
                          style={{
                            backgroundColor: "#d5e9d5",
                            borderRadius: "6px",
                            paddingTop: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <h5
                            className="text-success"
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                            }}
                          >
                            RECOVERED
                            <h6 style={{ fontSize: "12px", color: "#5cb85c" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#5cb85c" }}>
                                {commaSeperated(
                                  lineTotalRecoveredData[
                                    lineTotalRecoveredData.length - 1
                                  ].stateid
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  +{commaSeperated(dailyRecovered[0])}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <LineChart
                              data={lineTotalRecoveredData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    requiredStateTotalData[0].recovered / 50
                                  ) * 50,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={false}
                                position={{ x: 120, y: 16 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="stateid"
                                stroke="#78b978"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Recovered"
                                isAnimationActive={true}
                                dot={{
                                  stroke: "#469246",
                                  strokeWidth: 0.1,
                                  fill: "#469246",
                                }}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph state recovered",
                                    action: "state recovered hover",
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
                          className="graphsection"
                          style={{
                            backgroundColor: "#f3f3f3",
                            borderRadius: "6px",
                            paddingTop: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <h5
                            className="text-secondary"
                            style={{
                              paddingTop: "5px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                            }}
                          >
                            DECEASED
                            <h6 style={{ fontSize: "12px", color: "#808080" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#5e5a5a" }}>
                                {commaSeperated(
                                  lineTotalDeceasedData[
                                    lineTotalDeceasedData.length - 1
                                  ].stateid
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  +{commaSeperated(dailyDeceased[0])}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <LineChart
                              data={lineTotalDeceasedData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    requiredStateTotalData[0].deaths / 10
                                  ) * 10,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={false}
                                position={{ x: 120, y: 16 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="stateid"
                                stroke="#666565"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Deceased"
                                isAnimationActive={true}
                                dot={{
                                  stroke: "#2e2d2d",
                                  strokeWidth: 0.1,
                                  fill: "#2e2d2d",
                                }}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph state deceased",
                                    action: "state deceased hover",
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
                          className="graphsection"
                          style={{
                            backgroundColor: "#e6e8f1",
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
                              fontSize: 16,
                              color: "#3e4da3",
                            }}
                          >
                            TESTED
                            <h6 style={{ fontSize: "12px", color: "#3f51b5" }}>
                              {
                                dateFormattedTestData[
                                  dateFormattedTestData.length - 1
                                ].date
                              }

                              <h5 style={{ fontSize: 14, color: "#3e4da3" }}>
                                {commaSeperated(
                                  dateFormattedTestData[
                                    dateFormattedTestData.length - 1
                                  ].totaltested
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  {dateFormattedTestData[
                                    dateFormattedTestData.length - 1
                                  ].totaltested &&
                                  dateFormattedTestData[
                                    dateFormattedTestData.length - 2
                                  ].totaltested
                                    ? "+" +
                                      commaSeperated(
                                        dateFormattedTestData[
                                          dateFormattedTestData.length - 1
                                        ].totaltested -
                                          dateFormattedTestData[
                                            dateFormattedTestData.length - 2
                                          ].totaltested
                                      )
                                    : ""}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <LineChart
                              data={dateFormattedTestData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="linechart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    Math.max(...cumulativeTestDataArray) / 1000
                                  ) * 1000,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={false}
                                position={{ x: 120, y: 16 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="totaltested"
                                stroke="#6471b3"
                                strokeWidth="3"
                                strokeLinecap="round"
                                name="Tested"
                                isAnimationActive={true}
                                connectNulls={true}
                                dot={{
                                  stroke: "#3e4da3",
                                  strokeWidth: 0.1,
                                  fill: "#3e4da3",
                                }}
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
                    </React.Fragment>
                  )}
                  {toggleSwitch && (
                    <React.Fragment>
                      <div className="col">
                        <h6 style={{ color: "rgb(226, 42, 79)" }}>
                          {
                            stateFullName[
                              this.props.match.params.stateid.toUpperCase()
                            ]
                          }
                        </h6>
                        <section
                          className="graphsection"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#e4f3fa",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            className="text-info"
                            style={{
                              paddingTop: "8px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                            }}
                          >
                            CONFIRMED
                            <h6 style={{ fontSize: "12px", color: "#6ebed6" }}>
                              {date[date.length - 1]}
                              <h6 style={{ fontSize: "8px" }}>
                                <h5 style={{ fontSize: 14, color: "#55b2ce" }}>
                                  {commaSeperated(dailyConfirmed[0])}{" "}
                                  <span style={{ fontSize: 9 }}>
                                    {dailyDeltaConfirmed[0] > 0
                                      ? `+${commaSeperated(
                                          Math.abs(dailyDeltaConfirmed[0])
                                        )}`
                                      : `-${commaSeperated(
                                          Math.abs(dailyDeltaConfirmed[0])
                                        )}`}
                                  </span>
                                </h5>
                              </h6>
                            </h6>
                          </h5>

                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <BarChart
                              data={barDailyConfirmedData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={8}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    Math.max(...sparklineTotalConfirmedData) /
                                      100
                                  ) * 100,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#0992c0", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={6}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                active={true}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 16 }}
                              />
                              <Bar
                                dataKey="stateid"
                                name="Confirmed"
                                fill="#0992c0"
                                radius={[2, 2, 0, 0]}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph state Confirmedbar",
                                    action: "State Confirmedbar hover",
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
                          className="graphsection"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#f5d2d2",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "8px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                              color: "#ff446a",
                            }}
                          >
                            ACTIVE
                            <h6 style={{ fontSize: "12px", color: "#f16783" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#ff446a" }}>
                                {commaSeperated(
                                  barDailyActiveData[
                                    barDailyActiveData.length - 1
                                  ].stateid
                                )}{" "}
                                <span style={{ fontSize: 8 }}>
                                  {barDailyActiveData[
                                    barDailyActiveData.length - 1
                                  ].stateid -
                                    barDailyActiveData[
                                      barDailyActiveData.length - 2
                                    ].stateid >
                                  0
                                    ? `+${commaSeperated(
                                        Math.abs(
                                          barDailyActiveData[
                                            barDailyActiveData.length - 1
                                          ].stateid -
                                            barDailyActiveData[
                                              barDailyActiveData.length - 2
                                            ].stateid
                                        )
                                      )}`
                                    : `-${commaSeperated(
                                        Math.abs(
                                          barDailyActiveData[
                                            barDailyActiveData.length - 1
                                          ].stateid -
                                            barDailyActiveData[
                                              barDailyActiveData.length - 2
                                            ].stateid
                                        )
                                      )}`}
                                </span>
                              </h5>
                            </h6>
                          </h5>

                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <BarChart
                              data={barDailyActiveData}
                              margin={{
                                top: 35,
                                right: -32,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={6}
                              />
                              <YAxis
                                domain={[
                                  Math.floor(
                                    Math.min(...sparklineDailyActiveData) / 100
                                  ) * 100,
                                  Math.ceil(
                                    Math.max(...sparklineDailyActiveData) / 100
                                  ) * 100,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#f16783", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 16 }}
                              />

                              <Bar
                                dataKey="stateid"
                                name="Active"
                                fill="#f16783"
                                radius={[2, 2, 0, 0]}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph Activebar State",
                                    action: "State Activebar hover",
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
                          className="graphsection"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#d5e9d5",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            className="text-success"
                            style={{
                              paddingTop: "8px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              fontSize: 16,
                            }}
                          >
                            RECOVERED
                            <h6 style={{ fontSize: "12px", color: "#7ed87e" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#5cb85c" }}>
                                {commaSeperated(dailyRecovered[0])}{" "}
                                <span style={{ fontSize: 8 }}>
                                  {dailyDeltaRecovered[0] > 0
                                    ? `+${commaSeperated(
                                        Math.abs(dailyDeltaRecovered[0])
                                      )}`
                                    : `-${commaSeperated(
                                        Math.abs(dailyDeltaRecovered[0])
                                      )}`}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <BarChart
                              data={barDailyRecoveredData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={6}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    Math.max(...sparklineDailyRecoveredData) /
                                      50
                                  ) * 50,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#58bd58", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 16 }}
                              />
                              <Bar
                                dataKey="stateid"
                                name="Recovered"
                                fill="#58bd58"
                                radius={[2, 2, 0, 0]}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph State Recoveredbar",
                                    action: "State Recoveredbar hover",
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
                          className="graphsection"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#f3f3f3",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "8px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              color: "#464545",
                              fontSize: 16,
                            }}
                          >
                            DECEASED
                            <h6 style={{ fontSize: "12px", color: "#808080" }}>
                              {date[date.length - 1]}

                              <h5 style={{ fontSize: 14, color: "#5e5a5a" }}>
                                {commaSeperated(dailyDeceased[0])}{" "}
                                <span style={{ fontSize: 9 }}>
                                  {dailyDeltaDeceased[0] > 0
                                    ? `+${commaSeperated(
                                        Math.abs(dailyDeltaDeceased[0])
                                      )}`
                                    : `-${commaSeperated(
                                        Math.abs(dailyDeltaDeceased[0])
                                      )}`}
                                </span>
                              </h5>
                            </h6>
                          </h5>
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={2.6}
                          >
                            <BarChart
                              data={barDailyDeceasedData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                                axisLine={{ color: "#474646" }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={6}
                              />
                              <YAxis
                                domain={[
                                  0,
                                  Math.ceil(
                                    Math.max(...sparklineDailyDeceasedData) / 10
                                  ) * 10,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#474646", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 16 }}
                              />
                              <Bar
                                dataKey="stateid"
                                name="Deceased"
                                fill="#474646"
                                radius={[2, 2, 0, 0]}
                                onClick={() => {
                                  ReactGa.event({
                                    category: "Graph State Deceasedbar",
                                    action: " State Deceasedbar hover",
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
                          className="graphsection"
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#e6e8f1",
                            borderRadius: "6px",
                            marginTop: 10,
                          }}
                        >
                          <h5
                            style={{
                              paddingTop: "8px",
                              marginBottom: "-80px",
                              textAlign: "left",
                              marginLeft: 10,
                              color: "#3e4da3",
                              fontSize: 16,
                            }}
                          >
                            TESTED
                            <h6 style={{ fontSize: "12px", color: "#3f51b5" }}>
                              {
                                dailyFormattedTestData[
                                  dailyFormattedTestData.length - 1
                                ].date
                              }

                              <h5 style={{ fontSize: 14, color: "#3e4da3" }}>
                                {commaSeperated(
                                  dailyFormattedTestData[
                                    dailyFormattedTestData.length - 1
                                  ].dailytested
                                )}{" "}
                                <span style={{ fontSize: 9 }}>
                                  {dailyFormattedTestData[
                                    dailyFormattedTestData.length - 1
                                  ].dailytested &&
                                  dailyFormattedTestData[
                                    dailyFormattedTestData.length - 2
                                  ].dailytested
                                    ? dailyFormattedTestData[
                                        dailyFormattedTestData.length - 1
                                      ].dailytested -
                                        dailyFormattedTestData[
                                          dailyFormattedTestData.length - 2
                                        ].dailytested >
                                      0
                                      ? `+${commaSeperated(
                                          Math.abs(
                                            dailyFormattedTestData[
                                              dailyFormattedTestData.length - 1
                                            ].dailytested -
                                              dailyFormattedTestData[
                                                dailyFormattedTestData.length -
                                                  2
                                              ].dailytested
                                          )
                                        )}`
                                      : `-${commaSeperated(
                                          Math.abs(
                                            dailyFormattedTestData[
                                              dailyFormattedTestData.length - 1
                                            ].dailytested -
                                              dailyFormattedTestData[
                                                dailyFormattedTestData.length -
                                                  2
                                              ].dailytested
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
                            aspect={2.6}
                          >
                            <BarChart
                              data={dailyFormattedTestData}
                              margin={{
                                top: 35,
                                right: -30,
                                left: 10,
                                bottom: -12,
                              }}
                              syncId="barchart"
                            >
                              <XAxis
                                dataKey="date"
                                tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                                axisLine={{ color: "#6471b3" }}
                                style={{ fontSize: 8 }}
                                tickSize={5}
                                tickCount={6}
                              />
                              <YAxis
                                domain={[
                                  Math.floor(
                                    Math.min.apply(
                                      Math,
                                      dailyFormattedTestData.map(function (
                                        item
                                      ) {
                                        return Number(item.dailytested);
                                      })
                                    ) / 1000
                                  ) * 1000,
                                  Math.ceil(
                                    Math.max.apply(
                                      Math,
                                      dailyFormattedTestData.map(function (
                                        item
                                      ) {
                                        return Number(item.dailytested);
                                      })
                                    ) / 1000
                                  ) * 1000,
                                ]}
                                orientation="right"
                                tick={{ stroke: "#6471b3", strokeWidth: 0.2 }}
                                tickFormatter={format("~s")}
                                tickSize={5}
                                style={{ fontSize: 8 }}
                                tickCount={8}
                              />
                              <Retooltip
                                contentStyle={{
                                  background: "rgba(255,255,255,0)",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "8px",
                                  fontFamily: "notosans",
                                  textTransform: "uppercase",
                                  textAlign: "left",
                                  lineHeight: 0.8,
                                }}
                                cursor={{ fill: "transparent" }}
                                position={{ x: 120, y: 16 }}
                              />
                              <Bar
                                dataKey="dailytested"
                                name="Tested"
                                fill="#3e4da3"
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
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </React.Fragment>
      );
    } else
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

export default StateDetails;
