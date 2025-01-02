import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBars,
  faUser,
  faGear,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./header.scss";

const Header = () => {
  const { navButtonClick, setNavButtonClick } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  return (
    <header className="custom-header d-flex align-items-center justify-content-between">
      <Breadcrumbs
        dashboardName="Dashboards"
        dashboardPageName="Analytics"
        pageName="Analytics"
      />
      <button
        type="button"
        className="ms-4 bg-transparent p-0 border-0"
        onClick={() => setNavButtonClick(!navButtonClick)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="header-actions d-flex align-items-center ms-auto">
        <div className="header-menu-icon">
          <i className="bi bi-list"></i>
        </div>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search here"
        />
        <div className="header-icons d-none d-md-flex align-items-center gap-4 ">
          <div className="position-relative">
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => 
              {
                setShowDropdown(!showDropdown)
                setShowDropdown2(false)
              }
              }
            />
            {showDropdown && (
              <div className="dropdown d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <Link to="/individual-settings">My Business Account</Link>
              </div>
            )}
          </div>
          <div className="position-relative">
          <FontAwesomeIcon icon={faGear}  onClick={() =>{
            setShowDropdown2(!showDropdown2)
            setShowDropdown(false)
            }}/>
            
            {showDropdown2 && (
              <div className="dropdown d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <Link to="/user-profile">Profile</Link>
              </div>
            )}
          </div>

        
          <div className="notification-icon">
            <FontAwesomeIcon icon={faBell} />
            <span className="badge">9</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
