import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faUser,
  faLock,
  faShieldHalved,
  faAddressCard,
  faGears,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import UserDeleteAccount from "../deleteAccount/UserDeleteAccount";
import UserAccounts from "../userAccounts/UserAccounts";
import UserAuth from "../userAuth/UserAuth";
import UserSessions from "../sessions/UserSessions";
import Profile from "../profile/Profile";
import UserSettingPassword from "../password/UserSettingPassword";
import UserNotifications from "../notifications/UserNotifications";
import Info from "../info/Info";

function AccountSettingTabs({ profileData = false }) {
  const [key, setKey] = useState("profile");

  const handleProfileEdit = () => {
    setKey("info");
  };
  return (
    <Tab.Container
      id="left-tabs-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      style={{ height: "100%" }}
    >
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column account-tabs-side">
            {profileData && (
              <>
                <Nav.Item>
                  <Nav.Link eventKey="profile">
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="info">
                    <FontAwesomeIcon icon={faFileLines} /> Basic Info
                  </Nav.Link>
                </Nav.Item>
              </>
            )}

            <Nav.Item>
              <Nav.Link eventKey="password">
                <FontAwesomeIcon icon={faLock} />{" "}
                {profileData ? "Change Password" : "Change Passcode"}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2fa">
                <FontAwesomeIcon icon={faShieldHalved} /> 2FA
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="accounts">
                <FontAwesomeIcon icon={faAddressCard} /> Accounts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="notifications">
                <FontAwesomeIcon icon={faBell} /> Notifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sessions">
                <FontAwesomeIcon icon={faGears} /> Sessions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="delete">
                <FontAwesomeIcon icon={faTrash} /> Delete Account
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className="h-100">
            <Tab.Pane eventKey="profile" className="h-100">
              <Profile handleProfileEdit={handleProfileEdit} />
            </Tab.Pane>

            <Tab.Pane eventKey="info">
              <Info />
            </Tab.Pane>

            <Tab.Pane eventKey="password">
              <UserSettingPassword />
            </Tab.Pane>

            <Tab.Pane eventKey="2fa">
              <UserAuth />
            </Tab.Pane>

            <Tab.Pane eventKey="accounts">
              <UserAccounts />
            </Tab.Pane>

            <Tab.Pane eventKey="notifications">
              <UserNotifications />
            </Tab.Pane>

            <Tab.Pane eventKey="sessions">
              <UserSessions />
            </Tab.Pane>

            <Tab.Pane eventKey="delete">
              <UserDeleteAccount />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default AccountSettingTabs;
