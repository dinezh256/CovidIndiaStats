import axios from "axios";

const url1 = "https://disease.sh/v3/covid-19/countries";
const url2 = "https://disease.sh/v3/covid-19/historical";
const url3 = "https://disease.sh/v3/covid-19/historical/all/?lastdays=all";
const url4 = "https://api.covid19india.org/v2/state_district_wise.json";
const url5 = "https://api.covid19india.org/state_test_data.json";
const url6 = "https://disease.sh/v3/covid-19/all";
const url7 = "https://api.covid19india.org/districts_daily.json";

export const countries = async () => {
  try {
    const { data } = await axios.get(url1);

    return data;
  } catch (error) {
  }
};

export const fetchTotal = async (country) => {
  let changeableUrl = url2;
  if (country) {
    changeableUrl = `${url2}/countries/${country}`;
  } else {
    changeableUrl = `${url2}/all`;
  }
  try {
    const {
      data: {
        updated,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        active,
        critical,
      },
    } = await axios.get(changeableUrl);

    return {
      updated,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async (country) => {
  let changeableUrl = url3;
  if (country) {
    changeableUrl = `${url2}/historical?lastdays=all`;
    try {
      const data = await axios.get(changeableUrl);

      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const {
        data: { cases, recovered, deaths },
      } = await axios.get(changeableUrl);

      return { cases, recovered, deaths };
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchChAusCan = async (country) => {
  try {
    const {
      data: {
        timeline: { cases, recovered, deaths },
      },
    } = await axios.get(`${url2}/historical/${country}?lastdays=all`);

    return { cases, recovered, deaths };
  } catch (error) {
    console.log(error);
  }
};

export const indianstates = async () => {
  try {
    const { data } = await axios.get(url4);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const statesTestData = async () => {
  try {
    const {
      data: { states_tested_data },
    } = await axios.get(url5);
    return states_tested_data;
  } catch (error) {
    console.log(error);
  }
};

export const worldTotalData = async () => {
  try {
    const {
      data: { cases, todayCases, deaths, todayDeaths, recovered, active },
    } = await axios.get(url6);
    return { cases, todayCases, deaths, todayDeaths, recovered, active };
  } catch (error) {
    console.log(error);
  }
};

export const districtsDaily = async () => {
  try {
    const {
      data: { districtsDaily },
    } = await axios.get(url7);
    return districtsDaily;
  } catch (error) {
    console.log(error);
  }
};
