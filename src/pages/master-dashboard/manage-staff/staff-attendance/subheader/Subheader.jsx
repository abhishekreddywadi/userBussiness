import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap-daterangepicker/daterangepicker.css";
import './subheader.scss'

const Subheader = ({
  itemOneData,
  itemTwoData,
  itemThreeData,
  itemOneTitle,
  itemTwoTitle,
  itemThreeTitle,
  showCenterItem = true,
  showRightItem = true,
  customNavClass
}) => {
  return (
    <div className="row submenu">
      <div className="container-fluid " id="submenu-container">
        <div className="row">
          <nav className="navbar sub-head-nav col-12 flex-column">
            <div className="dropdown mr-auto d-flex d-sm-none">
              <button
                className="btn dropdown-toggle btn-sm btn-primary"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Dashboard
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Featured
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  popular
                </a>
              </div>
            </div>
            <Tabs
              defaultActiveKey="home"
              id="fill-tab-example"
              className={`${customNavClass} nav nav-pills mr-auto d-none d-sm-flex`}
              fill
            >
              <Tab eventKey="home" title={itemOneTitle} className="nav-item">
                {itemOneData}
              </Tab>
              <Tab eventKey="profile" title={itemTwoTitle} className="nav-item">
                {itemTwoData}
              </Tab>
              <Tab eventKey="longer-tab" title={itemThreeTitle} className="nav-item">
                {itemThreeData}
              </Tab>
            </Tabs>

            {showRightItem && (
              <ul className="nav nav-pills ms-auto d-none d-xl-flex header-right-pills">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Today
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    This week
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    This Month
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
