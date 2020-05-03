import React, { useRef, useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";

const LinePlot = ({
  dayWiseConfirmed,
  dayWiseRecovered,
  dayWiseDeceased,
  name,
}) => {
  const states = {
    "Andaman and Nicobar Islands": "an",
    "Andhra Pradesh": "ap",
    "Arunachal Pradesh": "ar",
    Assam: "as",
    Bihar: "br",
    Chandigarh: "ch",
    Chhattisgarh: "ct",
    "Daman and Diu": "dd",
    Delhi: "dl",
    "Dadra and Nagar Haveli": "dn",
    Goa: "ga",
    Gujarat: "gj",
    "Himachal Pradesh": "hp",
    Haryana: "hr",
    Jharkhand: "jh",
    "Jammu and Kashmir": "jk",
    Karnataka: "ka",
    Kerala: "kl",
    Ladakh: "la",
    Lakshadweep: "ld",
    Maharashtra: "mh",
    Meghalaya: "ml",
    Manipur: "mn",
    "Madhya Pradesh": "mp",
    Mizoram: "mz",
    Nagaland: "nl",
    Odisha: "or",
    Punjab: "pb",
    Puducherry: "py",
    Rajasthan: "rj",
    Sikkim: "sk",
    Telangana: "tg",
    "Tamil Nadu": "tn",
    Tripura: "tr",
    Total: "tt",
    "Uttar Pradesh": "up",
    Uttarakhand: "ut",
    "West Bengal": "wb",
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <LineChart
              width={400}
              height={200}
              data={dayWiseConfirmed}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 250]} orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={states[name]}
                stroke="#8884d8"
                legendType="circle"
                name={name + " Confirmed"}
              />
            </LineChart>
          </div>
          <div className="col-sm">
            <LineChart
              width={400}
              height={200}
              data={dayWiseRecovered}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 50]} orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={states[name]}
                stroke="#8884d8"
                legendType="circle"
                name={name + " Recovered"}
              />
            </LineChart>
          </div>
          <div className="col-sm">
            <LineChart
              width={400}
              height={200}
              data={dayWiseDeceased}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 30]} orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={states[name]}
                stroke="#8884d8"
                legendType="circle"
                name={name + " Deceased"}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinePlot;
