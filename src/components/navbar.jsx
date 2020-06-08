import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import SwipeableTemporaryDrawer from "./drawer";
import * as Icon from "react-feather";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import { stateFullName } from "./../utils/common-functions";
import ReactGa from "react-ga";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: stateFullName[
        window.location.pathname.toUpperCase()
      ].toUpperCase(),
    };
  }

  changeTitle = (newTitle) => {
    this.setState({
      title: newTitle,
    });
  };

  componentDidMount() {
    this.props.history.listen(() => {
      this.changeTitle(
        stateFullName[window.location.pathname.toUpperCase()].toUpperCase()
      );
    });
  }

  render() {
    return (
      <nav className="myNavbar">
        <ul className="myNavbar-nav">
          <SwipeableTemporaryDrawer />
          <ul style={{ flex: 0.55 }} id="line1"></ul>
          <NavLink to="/" className="fadeInLeft">
            <div>
              <span className="title">{this.state.title}</span>
            </div>
          </NavLink>
          <ul style={{ flex: 0.45 }}></ul>
          <ul style={{ flex: 0.55 }} id="line2"></ul>

          <NavLink to="/notifications" id="line1">
            <span className="about">
              <Icon.Bell size={24} />
            </span>
          </NavLink>
          <NavLink to="/faq" id="line2">
            <span
              className="about"
              onClick={() =>
                ReactGa.event({
                  category: "Notification",
                  action: "Bell clicked",
                })
              }
            >
              <ForumRoundedIcon fontSize="large" />
            </span>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
