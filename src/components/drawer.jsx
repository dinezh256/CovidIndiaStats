import React from "react";
import { NavLink } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import FlagRoundedIcon from "@material-ui/icons/FlagRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import ReactGa from "react-ga";

import mainLogo from "../logo.png";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="MuiPaperroot"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <br />
        <br />
        <ListItem button key={"covidindiastats"}>
          <ListItemIcon>
            <img alt="COVID19" src={mainLogo} className="imgAlign" />
          </ListItemIcon>
          <ListItemText primary={"covidindiastats"} />
        </ListItem>
        <br />
        <br />
        <Divider />
        <NavLink to="/" className="sideBarItem">
          <ListItem button key={"Home"}>
            <ListItemIcon>
              {<HomeRoundedIcon fontSize="large" color="primary" />}
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>

        <NavLink to="/dive" className="sideBarItem">
          <ListItem button key={"Dive"}>
            <ListItemIcon>
              {<FlagRoundedIcon fontSize="large" color="primary" />}
            </ListItemIcon>
            <ListItemText primary={"Dive"} />
          </ListItem>
        </NavLink>
        <NavLink to="/links" className="sideBarItem">
          <ListItem button key={"Links"}>
            <ListItemIcon>
              {<LinkRoundedIcon fontSize="large" color="primary" />}
            </ListItemIcon>
            <ListItemText primary={"Links"} />
          </ListItem>
        </NavLink>
        <NavLink to="/faq" className="sideBarItem">
          <ListItem button key={"FAQ"}>
            <ListItemIcon>
              {<ForumRoundedIcon fontSize="large" color="primary" />}
            </ListItemIcon>
            <ListItemText primary={"FAQs"} />
          </ListItem>
        </NavLink>

        <Divider />
        <br />
        <h5 style={{ textAlign: "center" }}>covidindiastats.com</h5>
        <br />
        <Divider />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <h6
          style={{
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=covidindiastats.com`}
            onClick={() => {
              ReactGa.event({
                category: "FB Share",
                action: "fb clicked",
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
            title="Share COVID INDIA STATS on Facebook"
            style={{ color: "rgb(59, 89, 152)" }}
          >
            <FacebookIcon fontSize="large" />
          </a>

          <a
            href={`whatsapp://send?text=covidindiastats.com`}
            onClick={() => {
              ReactGa.event({
                category: "WA Share",
                action: "wa clicked",
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
            title="Share COVID INDIA STATS on Whatsapp"
            style={{ color: "#25D366" }}
          >
            <WhatsAppIcon fontSize="large" />
          </a>

          <a
            href={`https://twitter.com/share?url=covidindiastats.com`}
            onClick={() => {
              ReactGa.event({
                category: "Twitter Share",
                action: "T clicked",
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
            title="Share COVID INDIA STATS on Twitter"
            style={{ color: "#00ACEE" }}
          >
            <TwitterIcon fontSize="large" />
          </a>
        </h6>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <span className="menuIcon" onClick={toggleDrawer(anchor, true)}>
            {
              <MenuRoundedIcon
                style={{ verticalAlign: "-0.65rem" }}
                fontSize="large"
              />
            }
          </span>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
