import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: "1px",
      },
    },
  },
});

const Cards = ({
  data: {
    updated,
    cases,
    todayCases,
    deaths,
    todayDeaths,
    recovered,
    active,
    critical,
  },
}) => {
  if (!cases) {
    return null;
  }
  return (
    <div className={`${styles.container} fade-in-up ${styles.font}`}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justify="center">
          <Grid
            item
            component={Card}
            xs
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography
                style={{
                  color: "#2186b4",
                  fontWeight: 700,
                  fontFamily: "myFont",
                }}
                gutterBottom
              >
                CONFIRMED
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                <CountUp start={0} end={cases} duration={2.5} separator="," />
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                {todayCases ? "+" + todayCases : "No Change"}
              </Typography>
              <Typography
                color="textSecondary"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                  fontSize: 10,
                }}
              >
                {new Date(updated).toDateString()}
              </Typography>
            </CardContent>
          </Grid>

          <Grid
            item
            component={Card}
            xs
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography
                gutterBottom
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                <span style={{ color: "#24aa24", fontWeight: 700 }}>
                  RECOVERED
                </span>
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                <CountUp
                  start={0}
                  end={recovered}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                {((recovered / cases) * 100).toFixed(2)}%
              </Typography>
              <Typography
                color="textSecondary"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                  fontSize: 10,
                }}
              >
                {new Date(updated).toDateString()}
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs
            md={3}
            className={cx(styles.card, styles.deceased)}
          >
            <CardContent>
              <Typography
                color="secondary"
                gutterBottom
                style={{ fontWeight: 700, fontFamily: "myFont" }}
              >
                DECEASED
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                <CountUp start={0} end={deaths} duration={2.5} separator="," />
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                }}
              >
                {todayDeaths ? "+" + todayDeaths : "No Change"}
              </Typography>
              <Typography
                color="textSecondary"
                style={{
                  fontWeight: 500,
                  fontFamily: "myFont",
                  fontSize: 10,
                }}
              >
                {new Date(updated).toDateString()}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Cards;
