import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";
import Header from "../../../components/header/Header";
import AccountSettingTabs from "./accountSettingTabs/AccountSettingTabs";
import "./accountSettings.scss";

function AccountSettings() {
  const { navButtonClick } = useContext(UserContext);
  const location = useLocation();

  const [activeKey, setActiveKey] = useState(
    location.pathname.includes("/account-settings")
      ? "home"
      : location.pathname.includes("/individual-account-setting")
      ? "profile"
      : "Quartarly"
  );
  useEffect(() => {
    if (location.pathname.includes("/account-settings")) {
      setActiveKey("home");
    }
    if (location.pathname.includes("/individual-account-setting")) {
      setActiveKey("profile");
    }
  }, [location.pathname]);

  return (
    <div
      className={`dashboard ${
        navButtonClick && "dashboard-full"
      } business-setting`}
    >
      <Container>
        <Header />
        <Tabs
          activeKey={activeKey}
          transition={false}
          id="noanim-tab-example"
          className="mb-4 mb-md-5 account-head-tabs"
        >
          <Tab eventKey="home" title="User Account">
            <AccountSettingTabs profileData={true} />
          </Tab>
          <Tab eventKey="profile" title="Individual Account">
            <AccountSettingTabs />
          </Tab>
          <Tab eventKey="Quartarly" title="Business Account">
            <AccountSettingTabs />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default AccountSettings;
