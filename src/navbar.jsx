import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import TableChartRoundedIcon from "@material-ui/icons/TableChartRounded";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import GraphicEqRoundedIcon from "@material-ui/icons/GraphicEqRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CSSTransition } from "react-transition-group";
import useOnclickOutside from "react-cool-onclickoutside";
import mainLogo from "../logo.png";
import ReactGa from "react-ga";

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

export default Navbar;
