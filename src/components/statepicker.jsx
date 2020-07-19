import React, { useEffect, useState } from "react";
import { indianstates } from "./API/index";

const StatePicker = ({ handleStateChange }) => {
  const [fetchedStates, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setStates(await indianstates());
    };
    fetchData();
  }, [setStates]);

  if (fetchedStates) {
    return (
      <select
        className="formcontrol"
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value="" selected disabled>
          Select a State/UT
        </option>
        {fetchedStates.map((item, i) =>
          item.statecode !== "UN" ? (
            <option key={i} value={item.statecode}>
              {item.state}
            </option>
          ) : (
            ""
          )
        )}
      </select>
    );
  } else return null;
};

export default StatePicker;
