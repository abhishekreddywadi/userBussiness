import React, { useState, useRef, useContext } from "react";
import UserContext from "../../../../context/UserContext";
import Header from "../../../../components/header/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ServiceClass from "./ServiceClass";
import ServiceEvents from "./ServiceEvents";
import ServiceTraining from "./ServiceTraining";
import ServicePlan from "./ServicePlan";
import ServiceCourse from "./ServiceCourse";

function ViewService() {
  const { navButtonClick } = useContext(UserContext);
  const [key, setKey] = useState("class");
  return (
    <div
      className={`dashboard ${
        navButtonClick && "dashboard-full"
      } create-new-staff`}
    >
      <Header />
      <div className="container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="main-plan-tabs pt-3 border-0"
        >
          <Tab eventKey="class" title="Class">
            <ServiceClass />
          </Tab>
          <Tab eventKey="event" title="Events">
            <ServiceEvents />
          </Tab>
          <Tab eventKey="training" title="Training">
            <ServiceTraining />
          </Tab>
          <Tab eventKey="plan" title="Plan & Packages">
            <ServicePlan />
          </Tab>
          <Tab eventKey="courses" title="Courses">
            <ServiceCourse />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ViewService;
