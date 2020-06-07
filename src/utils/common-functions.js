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
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export const stateFullName = {
  "/": "COVID INDIA STATS",
  "/indepth": "INDEPTH",
  "/global": "Global",
  "/dive": "DIVE",
  "/links": "Helpful links",
  "/faq": "faqs",
  "/notifications": "notifications",
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
