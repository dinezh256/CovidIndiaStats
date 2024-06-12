import React, { useEffect, useState } from "react";
import { indianstates } from "./API/index";

const StatePicker = ({ handleStateChange, back }) => {
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
        className="form-control"
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value="" selected={!back} disabled>
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
