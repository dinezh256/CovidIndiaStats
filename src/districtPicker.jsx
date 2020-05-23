import React from "react";

const DistrictPicker = ({ districts, isLoaded, handleDistrictChange }) => {
  if (isLoaded) {
    const notDistrict = [
      "Unknown",
      "Other State",
      "Other state",
      "other state",
      "Other Region",
      "Other States*",
      "Other States",
      "Evacuees",
      "Italians",
      "Italians*",
      "BSF Camp",
      "Airport Quarantine",
      "Railway Quarantine",
    ];
    return (
      <select
        className="form-control form-control-sm"
        onChange={(e) => handleDistrictChange(e.target.value)}
      >
        <option value="" selected disabled>
          Select a District
        </option>
        {districts.map((item, i) =>
          !notDistrict.includes(item) ? (
            <option key={i} value={item}>
              {item}
            </option>
          ) : (
            ""
          )
        )}
      </select>
    );
  } else return null;
};

export default DistrictPicker;
