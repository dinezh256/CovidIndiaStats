import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allData, setAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.covid19india.org/v4/timeseries.json").then((res) =>
      res.json().then((data) => {
        setAllData(data);
        setIsLoading(false);
      })
    );
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
