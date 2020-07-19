import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import SwipeableTemporaryDrawer from "./drawer";
import NightsStayRoundedIcon from "@material-ui/icons/NightsStayRounded";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import { stateFullName } from "./../utils/common-functions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: stateFullName.hasOwnProperty(
        window.location.pathname.toUpperCase()
      )
        ? stateFullName[window.location.pathname.toUpperCase()].toUpperCase()
        : "COVID INDIA STATS".toUpperCase(),
    };
  }

  changeTitle = (newTitle) => {
    this.setState({
      title: newTitle,
    });
  };

  componentDidMount() {
    this.props.history.listen(() => {
      {
        stateFullName.hasOwnProperty(window.location.pathname.toUpperCase())
          ? this.changeTitle(
              stateFullName[
                window.location.pathname.toUpperCase()
              ].toUpperCase()
            )
          : this.changeTitle("COVID INDIA STATS");
      }
    });
  }

  render() {
    const SunMoon = ({ darkMode }) => {
      return (
        <div onClick={darkMode.toggle}>
          <div className="SunMoon">
            {darkMode.value ? (
              <WbSunnyRoundedIcon
                style={{ color: "#ffc107", height: "2rem", width: "2rem" }}
              />
            ) : (
              <NightsStayRoundedIcon
                style={{ color: "slateblue", height: "2rem", width: "2rem" }}
              />
            )}
          </div>
        </div>
      );
    };

    return (
      <nav className="myNavbar">
        <ul className="myNavbar-nav">
          <SwipeableTemporaryDrawer />
          <ul style={{ flex: 0.56 }} id="line1"></ul>
          <ul style={{ flex: 0.5 }} id="line2"></ul>
          <NavLink to="/" className="fadeInLeft">
            <div>
              <span className="title">{this.state.title}</span>
            </div>
          </NavLink>

          <ul style={{ flex: 0.5 }}></ul>

          <SunMoon darkMode={this.props.darkMode} />
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
