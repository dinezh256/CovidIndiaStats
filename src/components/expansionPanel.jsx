import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "55%",
    flexShrink: 0.9,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function commaSeperated(x) {
  if (x !== undefined) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else return 0;
}

function ControlledExpansionPanels({ data, stateData, state, population }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <h6>
        Population of {state}: {commaSeperated(population)}
      </h6>
      <br />
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          background: "rgba(23, 162, 184, 0.2)",
          fontFamily: "notosans",
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}
            style={{ color: "rgb(23, 162, 184)", fontFamily: "notosans" }}
          >
            Cases Per Million
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{
              color: "rgba(23, 162, 184, 0.7)",
              fontFamily: "notosans",
              fontSize: 11,
            }}
          >
            {Number(population)
              ? (
                  (Number(stateData[0].confirmed) / Number(population)) *
                  1000000
                ).toFixed(2)
              : "0"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{
              fontSize: 12,
              color: "rgb(23, 162, 184)",
              fontFamily: "notosans",
            }}
          >
            {Number(population)
              ? Math.round(
                  (Number(stateData[0].confirmed) / Number(population)) *
                    1000000
                )
              : "0"}{" "}
            have tested positive in {state} for every 1 million people.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{
          background: "rgba(255, 68, 106, 0.2)",
          fontFamily: "notosans",
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            className={classes.heading}
            style={{ color: "rgb(255, 68, 106)", fontFamily: "notosans" }}
          >
            Active Percentage
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{
              color: "rgba(255, 68, 106, 0.7)",
              fontFamily: "notosans",
              fontSize: 11,
            }}
          >
            {Number(stateData[0].confirmed)
              ? (
                  (Number(stateData[0].active) /
                    Number(stateData[0].confirmed)) *
                  100
                ).toFixed(2)
              : "0"}
            %
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{
              color: "rgb(255, 68, 106)",
              fontFamily: "notosans",
              fontSize: 12,
            }}
          >
            {Number(stateData[0].confirmed)
              ? Math.round(
                  (Number(stateData[0].active) /
                    Number(stateData[0].confirmed)) *
                    100
                )
              : "0"}{" "}
            are currently infected from COVID19 for every 100 confirmed cases.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{
          background: "rgba(40, 167, 69, 0.2)",
          fontFamily: "notosans",
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            className={classes.heading}
            style={{
              color: "rgb(40, 167, 69)",
              fontFamily: "notosans",
              fontSize: 14,
            }}
          >
            Recovery Rate
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{
              color: "rgba(40, 167, 69, 0.7)",
              fontFamily: "notosans",
              fontSize: 11,
            }}
          >
            {Number(stateData[0].confirmed)
              ? (
                  (Number(stateData[0].recovered) /
                    Number(stateData[0].confirmed)) *
                  100
                ).toFixed(2)
              : "0"}
            %
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{
              color: "rgb(40, 167, 69)",
              fontFamily: "notosans",
              fontSize: 12,
            }}
          >
            {Number(stateData[0].confirmed)
              ? Math.round(
                  (Number(stateData[0].recovered) /
                    Number(stateData[0].confirmed)) *
                    100
                )
              : "0"}{" "}
            have recovered from COVID19 for every 100 confirmed cases.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        style={{
          background: "rgba(74, 79, 83, 0.2)",
          fontFamily: "notosans",
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            className={classes.heading}
            style={{
              color: "rgb(74, 79, 83)",
              fontFamily: "notosans",
              fontSize: 14,
            }}
          >
            Mortality Rate
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{
              color: "rgba(74, 79, 83, 0.7)",
              fontFamily: "notosans",
              fontSize: 11,
            }}
          >
            {Number(stateData[0].confirmed)
              ? (
                  (Number(stateData[0].deaths) /
                    Number(stateData[0].confirmed)) *
                  100
                ).toFixed(2)
              : "0"}
            %
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{
              color: "rgb(74, 79, 83)",
              fontFamily: "notosans",
              fontSize: 12,
            }}
          >
            {Math.round(
              (Number(stateData[0].deaths) / Number(stateData[0].confirmed)) *
                100
            ) > 0 && Number(stateData[0].confirmed)
              ? `Unfortunately, ${Math.round(
                  (Number(stateData[0].deaths) /
                    Number(stateData[0].confirmed)) *
                    100
                )} ${
                  Math.round(
                    (Number(stateData[0].deaths) /
                      Number(stateData[0].confirmed)) *
                      100
                  ) > 1
                    ? "lives have"
                    : "life has"
                } left us for every 100 confirmed cases.`
              : "No life has been lost for every 100 confirmed cases."}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        style={{
          background: "rgba(62, 77, 163, 0.2)",
          fontFamily: "notosans",
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography
            className={classes.heading}
            style={{
              color: "rgb(62, 77, 163)",
              fontFamily: "notosans",
              fontSize: 14,
            }}
          >
            Tests Per Million
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{
              color: "rgba(62, 77, 163, 0.7)",
              fontFamily: "notosans",
              fontSize: 11,
            }}
          >
            {data[0] !== undefined
              ? commaSeperated(Number(data[0].testspermillion))
              : "0"}{" "}
            {data[0] !== undefined
              ? `as of
            ${data[0].date}`
              : ""}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{
              color: "rgb(62, 77, 163)",
              fontFamily: "notosans",
              fontSize: 12,
            }}
          >
            {data[0] !== undefined
              ? commaSeperated(Number(data[0].testspermillion))
              : "0"}{" "}
            persons have been tested for every 1 million people.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default ControlledExpansionPanels;
