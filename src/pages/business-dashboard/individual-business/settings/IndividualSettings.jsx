import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../../context/UserContext";
import { useLocation } from "react-router-dom";
import { Tab, Row, Col, Nav, Container, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Header from "../../../../components/header/Header";
import IDCard from "../../../../assets/id-card-white.png";
import Membership from "./membership/Membership";
import Accounts from "./accounts/Accounts";
import Shield from "../../../../assets/shield.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import "./individualSettings.scss";

function IndividualSettings() {
  const { navButtonClick } = useContext(UserContext);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(() => {
    if (location.pathname.includes("/individual-settings")) return "membership";
    if (location.pathname.includes("/individual-account")) return "account";
    if (location.pathname.includes("/business-setting"))
      return "business-account";
  });

  useEffect(() => {
    if (location.pathname.includes("/individual-settings")) {
      setActiveKey("membership");
    }
    if (location.pathname.includes("/individual-account")) {
      setActiveKey("account");
    }
    if (location.pathname.includes("/business-setting")) {
      setActiveKey("business-account");
    }
  }, [location.pathname]);

  const handleSelect = (key) => {
    if (key) {
      setActiveKey(key);
    }
  };

  return (
    <div
      className={`dashboard individual-setting ${
        navButtonClick && "dashboard-full"
      }`}
    >
      <Container>
        <Header />
        <div className="individual-settings-container">
          <div className="individual-settings-left">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeKey}
              onSelect={handleSelect}
            >
              <Row>
                <Col
                  sm={12}
                  md={5}
                  lg={3}
                  style={{ backgroundColor: "#ffc4ce" }}
                >
                  <div className="individual-setting-profile">
                    <span className="profile-icon"></span>
                    <div className="individual-setting-profile-details">
                      <h6>Ramya Pandit</h6>
                      <p>MASTER ID: ABCD_1234567890</p>
                    </div>
                    <img src={IDCard} alt="id-card" />
                  </div>
                  <div className="individual-profile-container">
                    <div className="profile-picture"></div>
                    <div>
                      <p className="profile-id mb-0" style={{ lineHeight: 1 }}>
                        MIB ID
                      </p>
                      <span className="text-white" style={{ fontSize: 9 }}>
                        MB_123456789
                      </span>
                    </div>
                    <div className="icon-container">
                      <div className="icon-box">
                        <span className="icon">
                          <svg
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path>
                          </svg>
                        </span>
                        <div className="green-dot"></div>
                        <p className="icon-label mb-0">Face ID</p>
                      </div>
                      <div className="icon-box">
                        <span className="icon">
                          <svg
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path>
                          </svg>
                        </span>
                        <div className="green-dot"></div>
                        <p className="icon-label mb-0">Biometric</p>
                      </div>
                    </div>
                  </div>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="membership">Membership</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="account">My Account</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/individual-account-setting">
                        Account Setting
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="business-account">
                        Business Account
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} md={7} lg={9}>
                  <Tab.Content style={{ background: "#fff", padding: 15 }}>
                    <Tab.Pane eventKey="membership">
                      <div className="row">
                        <div className="col-12 col-md-8">
                          <div className="row plan-grid-container">
                            <div className="plan-grid">
                              <Membership />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="action-box">
                            <p>Individual Business Plan & packages</p>
                          </div>
                          <div className="action-box">
                            <p>Individual Addon plan</p>
                          </div>
                          <div className="action-box">
                            <p>Business Plan & Packages</p>
                          </div>
                          <div className="action-box">
                            <p>Add on Plan & Packages</p>
                          </div>
                        </div>
                        <h2 className="d-flex align-items-center gap-4 membership-head mb-4">
                          Active Membership <img src={Shield} alt="shield" />
                        </h2>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="active-plan-container">
                              <span className="tag">Premium</span>
                              <h3>
                                <small>$</small>8<small>/mo</small>
                              </h3>
                              <ul>
                                <li>
                                  <FontAwesomeIcon icon={faCheck} /> 10 team
                                  members
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faCheck} /> 40GB Cloud
                                  storage
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faCheck} /> Integration
                                  help
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faCheck} /> Sketch
                                  Files
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faMinus} /> API Access
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faMinus} /> Complete
                                  documentation
                                </li>
                              </ul>
                              <button type="button">
                                try Premium{" "}
                                <FontAwesomeIcon icon={faArrowRight} />
                              </button>
                            </div>
                            <div className="col-12 col-lg-6"></div>
                          </div>
                          <div className="col-12 col-lg-6 active-tab-container">
                            <Tabs
                              defaultActiveKey="home"
                              transition={false}
                              id="noanim-tab-example"
                              className="mb-3 active-member-tabs"
                            >
                              <Tab eventKey="home" title="Membership Details">
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Aut nobis quia maxime
                                  voluptas minus excepturi nulla incidunt ex.
                                  Veniam, consequuntur?
                                </p>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      Accordion Item #1
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. Ut enim ad minim veniam, quis
                                      nostrud exercitation ullamco laboris nisi
                                      ut aliquip ex ea commodo consequat. Duis
                                      aute irure dolor in reprehenderit in
                                      voluptate velit esse cillum dolore eu
                                      fugiat nulla pariatur. Excepteur sint
                                      occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id
                                      est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                      Accordion Item #2
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. Ut enim ad minim veniam, quis
                                      nostrud exercitation ullamco laboris nisi
                                      ut aliquip ex ea commodo consequat. Duis
                                      aute irure dolor in reprehenderit in
                                      voluptate velit esse cillum dolore eu
                                      fugiat nulla pariatur. Excepteur sint
                                      occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id
                                      est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </Tab>
                              <Tab eventKey="profile" title="Addon Plans">
                                Tab content for Profile
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="account">
                      <Accounts />
                    </Tab.Pane>
                    <Tab.Pane eventKey="setting">Account Setting</Tab.Pane>
                    <Tab.Pane eventKey="business-account">
                      Business Account
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default IndividualSettings;
