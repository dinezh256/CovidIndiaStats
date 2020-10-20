import * as Icon from "react-feather";
import React from "react";

const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const stateNavbarName = {
  "/": "COVID INDIA STATS",
  "/INDEPTH": "INDEPTH",
  "/GLOBAL": "Global PLOTS",
  "/DIVE": "COVID GLOBAL STATS",
  "/LINKS": "Helpful links",
  "/FAQ": "faqs",
  "/NOTIFICATIONS": "notifications",
  "/AP": "COVID INDIA STATS",
  "/AN": "COVID INDIA STATS",
  "/AR": "COVID INDIA STATS",
  "/AS": "COVID INDIA STATS",
  "/BR": "COVID INDIA STATS",
  "/CH": "COVID INDIA STATS",
  "/CT": "COVID INDIA STATS",
  "/DN": "COVID INDIA STATS",
  "/DL": "COVID INDIA STATS",
  "/GA": "COVID INDIA STATS",
  "/GJ": "COVID INDIA STATS",
  "/HP": "COVID INDIA STATS",
  "/HR": "COVID INDIA STATS",
  "/JH": "COVID INDIA STATS",
  "/JK": "COVID INDIA STATS",
  "/KA": "COVID INDIA STATS",
  "/KL": "COVID INDIA STATS",
  "/LA": "COVID INDIA STATS",
  "/LD": "COVID INDIA STATS",
  "/MH": "COVID INDIA STATS",
  "/ML": "COVID INDIA STATS",
  "/MN": "COVID INDIA STATS",
  "/MP": "COVID INDIA STATS",
  "/MZ": "COVID INDIA STATS",
  "/NL": "COVID INDIA STATS",
  "/OR": "COVID INDIA STATS",
  "/PB": "COVID INDIA STATS",
  "/PY": "COVID INDIA STATS",
  "/RJ": "COVID INDIA STATS",
  "/SK": "COVID INDIA STATS",
  "/TG": "COVID INDIA STATS",
  "/TN": "COVID INDIA STATS",
  "/TR": "COVID INDIA STATS",
  "/UP": "COVID INDIA STATS",
  "/UT": "COVID INDIA STATS",
  "/WB": "COVID INDIA STATS",
  "/UN": "COVID INDIA STATS",
};

export const formatDate = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const year = unformattedDate.slice(6, 10);
  const time = unformattedDate.slice(11);
  return `${year}-${month}-${day}T${time}+05:30`;
};

export const formatDateAbsolute = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const time = unformattedDate.slice(11);
  return `${day} ${months[month]}, ${time.slice(0, 5)} IST`;
};

export function commaSeperated(x) {
  if (x !== undefined) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else return 0;
}

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return (
      parseInt(secondsPast) +
      ` second${parseInt(secondsPast) > 1 ? "s" : ""} ago`
    );
  }

  if (secondsPast < 3600) {
    return (
      parseInt(secondsPast / 60) +
      ` minute${parseInt(secondsPast / 60) > 1 ? "s" : ""} ago`
    );
  }

  if (secondsPast <= 86400) {
    return (
      parseInt(secondsPast / 3600) +
      ` hour${parseInt(secondsPast / 3600) > 1 ? "s" : ""} ago `
    );
  }
  if (secondsPast > 86400) {
    let day = timeStamp.getDate();
    var month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    var year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

export function DeltaArrow({ deltaType, color }) {
  return Number(deltaType) > 0 ? (
    <Icon.ArrowUp
      style={{ verticalAlign: -1 }}
      color={color}
      size={10}
      strokeWidth={3.5}
    />
  ) : Number(deltaType) < 0 ? (
    <Icon.ArrowDown
      style={{ verticalAlign: -1 }}
      color={color}
      size={10}
      strokeWidth={3.5}
    />
  ) : (
    ""
  );
}

export function DeltaValue({ deltaType, color }) {
  return Number(deltaType) > 0 ? (
    <span style={{ color: color }}>{commaSeperated(Number(deltaType))}</span>
  ) : Number(deltaType) < 0 ? (
    <span style={{ color: color }}>
      {commaSeperated(Math.abs(Number(deltaType)))}
    </span>
  ) : (
    ""
  );
}

export const stateID = [
  "AP",
  "AN",
  "AR",
  "AS",
  "BR",
  "CH",
  "CT",
  "DN",
  "DL",
  "GA",
  "GJ",
  "HP",
  "HR",
  "JH",
  "JK",
  "KA",
  "KL",
  "LA",
  "LD",
  "MH",
  "ML",
  "MN",
  "MP",
  "MZ",
  "NL",
  "OR",
  "PB",
  "PY",
  "RJ",
  "SK",
  "TG",
  "TN",
  "TR",
  "UP",
  "UT",
  "WB",
  "UN",
];

export const stateFullName = {
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

export const stateMaps = {
  AN: require("../maps/andamannicobarislands.json"),
  AP: require("../maps/andhrapradesh.json"),
  AR: require("../maps/arunachalpradesh.json"),
  AS: require("../maps/assam.json"),
  BR: require("../maps/bihar.json"),
  CH: require("../maps/chandigarh.json"),
  CT: require("../maps/chhattisgarh.json"),
  DL: require("../maps/delhi.json"),
  DN: require("../maps/dnh-and-dd.json"),
  GA: require("../maps/goa.json"),
  GJ: require("../maps/gujarat.json"),
  HP: require("../maps/himachalpradesh.json"),
  HR: require("../maps/haryana.json"),
  JH: require("../maps/jharkhand.json"),
  JK: require("../maps/jammukashmir.json"),
  KA: require("../maps/karnataka.json"),
  KL: require("../maps/kerala.json"),
  LA: require("../maps/ladakh.json"),
  LD: require("../maps/lakshadweep.json"),
  MH: require("../maps/maharashtra.json"),
  ML: require("../maps/meghalaya.json"),
  MN: require("../maps/manipur.json"),
  MP: require("../maps/madhyapradesh.json"),
  MZ: require("../maps/mizoram.json"),
  NL: require("../maps/nagaland.json"),
  OR: require("../maps/odisha.json"),
  PB: require("../maps/punjab.json"),
  PY: require("../maps/puducherry.json"),
  RJ: require("../maps/rajasthan.json"),
  SK: require("../maps/sikkim.json"),
  TG: require("../maps/telangana.json"),
  TN: require("../maps/tamilnadu.json"),
  TR: require("../maps/tripura.json"),
  UP: require("../maps/uttarpradesh.json"),
  UT: require("../maps/uttarakhand.json"),
  WB: require("../maps/westbengal.json"),
};

export const stateMapScale = {
  AP: 1360,
  AN: 1500,
  AR: 1800,
  AS: 1750,
  BR: 2220,
  CH: 45000,
  CT: 1600,
  DN: 4620,
  DL: 18000,
  GA: 12000,
  GJ: 1700,
  HP: 3000,
  HR: 2800,
  JH: 2350,
  JK: 2800,
  KA: 1500,
  KL: 2400,
  LA: 1400,
  LD: 2400,
  MH: 1330,
  ML: 3520,
  MN: 5000,
  MP: 1250,
  MZ: 3800,
  NL: 4700,
  OR: 1800,
  PB: 3000,
  PY: 1550,
  RJ: 1200,
  SK: 8700,
  TG: 2500,
  TN: 2040,
  TR: 6000,
  UP: 1350,
  UT: 3100,
  WB: 1700,
};

export const stateMapTranslateX = {
  AP: 80.760595,
  AN: 93.40386,
  AR: 94.546459,
  AS: 95.85860199999998,
  BR: 85.820238, //2.5 0.5
  CH: 76.775152, //0.07 0.02
  CT: 82.14647199671277, //1.8 1.6
  DN: 72.046053, //1.17 0.4
  DL: 77.099559, //0.26 0.13
  GA: 74.076874, //0.4 0.25
  GJ: 71.304952, //3.2 1.2
  HP: 77.294723,
  HR: 76.07485342176886,
  JH: 85.6801316194849,
  JK: 75.090075,
  KA: 76.385688,
  KL: 76.467656,
  LA: 76.430394,
  LD: 72.964852,
  MH: 76.804608,
  ML: 91.315752,
  MN: 93.97284500000002,
  MP: 78.43468857438199,
  MZ: 92.85672383937811,
  NL: 94.32899095285474,
  OR: 84.489054,
  PB: 75.379848,
  PY: 78.926636,
  RJ: 73.984227,
  SK: 88.514119,
  TG: 79.235913,
  TN: 78.43340535317459,
  TR: 91.75354100000002,
  UP: 80.78732627947595,
  UT: 79.323108,
  WB: 87.819663,
};

export const stateMapTranslateY = {
  AP: 15.224077,
  AN: 9.484368,
  AR: 27.250844,
  AS: 25.636603267634122,
  BR: 25.586327,
  CH: 30.707443491919514,
  CT: 20.58769199194691,
  DN: 19.859169,
  DL: 28.59471312524036,
  GA: 15.289642000000001,
  GJ: 21.920452,
  HP: 31.607701000000002,
  HR: 28.984136819668228,
  JH: 23.074665795660215,
  JK: 33.556216,
  KA: 14.694585,
  KL: 10.192489,
  LA: 34.137631,
  LD: 9.564004,
  MH: 18.206125,
  ML: 25.330005400110966,
  MN: 24.533016,
  MP: 23.169907,
  MZ: 23.044190125242905,
  NL: 25.899075200465085,
  OR: 19.612726,
  PB: 30.94208,
  PY: 13.027445,
  RJ: 26.059220531669062,
  SK: 27.551388996660787,
  TG: 17.636283,
  TN: 10.576333431067162,
  TR: 23.669184,
  UP: 26.471438,
  UT: 29.722897,
  WB: 24.1039,
};

export const statePopulation = {
  AP: 417036,
  AN: 53903393,
  AR: 1570458,
  AS: 35607039,
  BR: 124799926,
  CH: 1158473,
  CT: 29436231,
  DN: 615724,
  DL: 18710922,
  GA: 1586250,
  GJ: 63872399,
  HP: 7451955,
  HR: 28204692,
  JH: 38593948,
  JK: 13606320,
  KA: 67562686,
  KL: 35699443,
  LA: 289023,
  LD: 73183,
  MH: 123144223,
  ML: 3366710,
  MN: 3091545,
  MP: 85358965,
  MZ: 1239244,
  NL: 2249695,
  OR: 46356334,
  PB: 30141373,
  PY: 1413542,
  RJ: 81032689,
  SK: 690251,
  TG: 79.235913,
  TN: 77841267,
  TR: 4169794,
  UP: 237882725,
  UT: 11250858,
  WB: 99609303,
};
