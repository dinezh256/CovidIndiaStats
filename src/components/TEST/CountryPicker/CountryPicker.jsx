import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import ReactGa from "react-ga";
import styles from "./CountryPicker.module.css";
import { countries } from "../../API/index";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await countries());
    };

    fetchAPI();
  }, [setFetchedCountries]);
  if (fetchedCountries) {
    return (
      <FormControl
        className={`${styles.formControl} fade-in-up`}
        style={{ animationDelay: "1s" }}
      >
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
          onClick={ReactGa.event({
            category: "Global options",
            action: "Global options checked",
          })}
        >
          <option value="Global">Global</option>
          {fetchedCountries.map((item, i) => (
            <option value={item.country} key={i}>
              {item.country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  } else return null;
};

export default CountryPicker;
