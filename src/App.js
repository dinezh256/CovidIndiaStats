import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./components/home";
import StateGraph from "./components/stateGraph";
import World from "./components/world";
import Options from "./components/options";
import FAQ from "./components/faq";
import NotFound from "./components/notFound";
import Test from "./components/test";
import { NavLink } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TableChartRoundedIcon from "@material-ui/icons/TableChartRounded";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import GraphicEqRoundedIcon from "@material-ui/icons/GraphicEqRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CSSTransition } from "react-transition-group";
import useOnclickOutside from "react-cool-onclickoutside";

import mainLogo from "./logo.png";
import ReactGa from "react-ga";

function App() {
  const history = require("history").createBrowserHistory;

  useEffect(() => {
    ReactGa.initialize("UA-163288419-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <React.Fragment>
      <Router history={history}>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/dive" component={World} />
            <Route path="/global" component={Test} />
            <Route path="/links" component={Options} />
            <Route path="/faq" component={FAQ} />
            <Route path="/indepth" component={StateGraph} />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

function Navbar(props) {
  return (
    <nav className="myNavbar">
      <ul className="myNavbar-nav">
        <NavBrand />
        <ul style={{ flex: 1 }}></ul>
        <NavItem to="/indepth" icon={<GraphicEqRoundedIcon />}></NavItem>
        <NavItem to="/global" icon={<PublicRoundedIcon />}></NavItem>
        <NavItem to="/dive" icon={<TableChartRoundedIcon />}></NavItem>
        <NavItem to="#" icon={<MoreVertIcon />}>
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useOnclickOutside(ref, () => {
    setOpen(false);
  });

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className="mynav-item">
      <NavLink
        to={props.to}
        className="icon-button fadeInRight"
        onClick={handleClick}
      >
        {props.icon}
      </NavLink>
      {open ? <div ref={ref}> {props.children} </div> : null}
    </li>
  );
}

function NavBrand() {
  return (
    <li className="mybrand-item fadeInLeft">
      <NavLink to="/" className="fadeInLeft">
        <div>
          <img alt="COVID19" src={mainLogo} className="imgAlign" />
          &ensp;
          <span
            className="title"
            style={{
              fontWeight: 600,
              fontSize: "1.5rem",
              color: "#8e99d8",
              fontFamily: "notosans",
            }}
          >
            INDIA
          </span>
        </div>
      </NavLink>
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  function DropdownItem(props) {
    return (
      <NavLink
        to={props.to}
        className="menu-item"
        onClick={ReactGa.event({
          category: "Dropdownmenu",
          action: "Dropdown clicked",
        })}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </NavLink>
    );
  }

  return (
    <div className="myDropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem to="/links" leftIcon={<LinkRoundedIcon />}>
            &nbsp; LINKS
          </DropdownItem>
          <DropdownItem to="/faq" leftIcon={<QuestionAnswerRoundedIcon />}>
            &nbsp; FAQs
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
