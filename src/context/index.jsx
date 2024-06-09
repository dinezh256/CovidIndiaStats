import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allData, setAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then(function ({ data, status }) {
        if (status === 200) {
          setAllData(data);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        allData: [allData, setAllData],
        isLoading: [isLoading, setIsLoading],
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
