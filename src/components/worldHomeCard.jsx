import React, { memo, useEffect, useState } from "react";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import CountUp from "react-countup";
import { worldTotalData } from "./API/index";
import { NavLink } from "react-router-dom";
import { commaSeperated } from "../utils/common-functions";
import * as Icon from "react-feather";

const WorldHomeCard = () => {
  const [cardData, setCardData] = useState({
    cases: 0,
    todayCases: 0,
    todayDeaths: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    showData: false,
  });

  useEffect(() => {
    fetchWorldData();
  }, []);

  async function fetchWorldData() {
    const { cases, todayCases, deaths, todayDeaths, recovered, active } =
      await worldTotalData();
    setCardData({ cases, todayCases, deaths, todayDeaths, recovered, active });
  }

  return (
    <div
      className="fade-in-up world-home-card"
      style={{
        marginBottom: "-5px",
        animationDelay: "1.2s",
        borderRadius: "5px",
      }}
    >
      <NavLink
        to="/global"
        className="coverage"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <PublicRoundedIcon
          size="inherit"
          color="primary"
          style={{ verticalAlign: "-0.25rem" }}
        />
        <span>GLOBAL STATS</span>
        <span
          style={{ cursor: "pointer", verticalAlign: "0.15rem" }}
          onClick={() =>
            setCardData((prev) => ({ ...prev, showData: !prev.showData }))
          }
        >
          {!cardData.showData ? (
            <Icon.ChevronUp className="show-up" color="#3f51b5" />
          ) : (
            <Icon.ChevronDown className="showDown" color="#3f51b5" />
          )}
        </span>
      </NavLink>

      <div className="w-100"></div>

      {!cardData.showData && (
        <table className="table table-sm table-borderless">
          <thead>
            <tr>
              <th
                className="span delta"
                style={{ color: "rgb(66, 179, 244)", width: "25%" }}
              >
                CONFIRMED
              </th>
              <th
                className="delta span"
                style={{
                  width: "25%",
                  color: "#ff446a",
                }}
              >
                ACTIVE
              </th>
              <th className="text-success delta span" style={{ width: "25%" }}>
                Recovered
              </th>
              <th
                className="text-secondary delta span"
                style={{
                  fontWeight: 600,
                  width: "25%",
                }}
              >
                DECEASED
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr>
              <td>
                <h6
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(66, 179, 244, 0.7)",
                  }}
                >
                  +
                  {cardData.todayCases !== undefined
                    ? commaSeperated(Number(cardData.todayCases))
                    : ""}
                </h6>
                <h6 style={{ color: "rgb(66, 179, 244)", textAlign: "center" }}>
                  {cardData.cases !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(cardData.cases)}
                      duration={2}
                      separator=","
                      formattingFn={(number) => commaSeperated(number)}
                    />
                  ) : (
                    ""
                  )}
                </h6>
              </td>
              <td>
                <h6
                  className="delta"
                  style={{
                    color: "rgba(255, 68, 106, 0.7)",
                    fontSize: 12,
                  }}
                >
                  {cardData.cases !== undefined
                    ? (
                        (Number(cardData.active) / Number(cardData.cases)) *
                        100
                      ).toFixed(1)
                    : ""}
                  %
                </h6>
                <h6
                  style={{
                    color: "#ff446a",
                    textAlign: "center",
                  }}
                >
                  {cardData.active !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(cardData.active)}
                      duration={2}
                      separator=","
                      formattingFn={(number) => commaSeperated(number)}
                    />
                  ) : (
                    ""
                  )}
                </h6>
              </td>
              <td>
                <h6
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(40, 167, 69, 0.7)",
                  }}
                >
                  {cardData.cases !== undefined
                    ? (
                        (Number(cardData.recovered) / Number(cardData.cases)) *
                        100
                      ).toFixed(1)
                    : ""}
                  %
                </h6>
                <h6 className="text-success" style={{ textAlign: "center" }}>
                  {cardData.recovered !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(cardData.recovered)}
                      duration={2}
                      separator=","
                      formattingFn={(number) => commaSeperated(number)}
                    />
                  ) : (
                    ""
                  )}
                </h6>
              </td>
              <td>
                <h6
                  className="delta"
                  style={{
                    fontSize: 12,
                    color: "rgba(108, 117, 125, 0.7)",
                  }}
                >
                  +
                  {cardData.todayDeaths !== undefined
                    ? commaSeperated(Number(cardData.todayDeaths))
                    : ""}
                </h6>
                <h6 className="text-secondary" style={{ textAlign: "center" }}>
                  {cardData.deaths !== undefined ? (
                    <CountUp
                      start={0}
                      end={Number(cardData.deaths)}
                      duration={2}
                      separator=","
                      formattingFn={(number) => commaSeperated(number)}
                    />
                  ) : (
                    ""
                  )}
                </h6>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default memo(WorldHomeCard);
