import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import PlanList from "./PlanList";
import PlanImg from "../../../assets/shree-ganesh.png";
import "./plan.scss";
import Header from "../../../components/header/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function MasterPlan() {
  const { navButtonClick } = useContext(UserContext);
  const [key, setKey] = useState('plan');
  const planData = [
    {
      img: PlanImg,
      planName: "Kathak",
      planAmount: 2100,
      planDuration: "Yearly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
    {
      img: PlanImg,
      planName: "Zumba",
      planAmount: 2000,
      discountedPrice: 1500,
      planDuration: "Monthly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
    {
      img: PlanImg,
      planName: "Bharatnatyam",
      planAmount: 3000,
      discountedPrice: 1500,
      planDuration: "Monthly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
    {
      img: PlanImg,
      planName: "Kathak",
      planAmount: 2100,
      planDuration: "Yearly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
    {
      img: PlanImg,
      planName: "Zumba",
      planAmount: 2000,
      discountedPrice: 1500,
      planDuration: "Monthly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
    {
      img: PlanImg,
      planName: "Bharatnatyam",
      planAmount: 3000,
      discountedPrice: 1500,
      planDuration: "Monthly",
      planDesc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
    },
  ];
  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} master-plan`}
    >
      <Header />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="main-plan-tabs pt-3 border-0"
      >
        <Tab eventKey="plan" title="View Plan">
        <PlanList planData={planData} tabHead="View Plans" tabButtonText="Add Plan" />
        </Tab>
        <Tab eventKey="packages" title="View Package">
        <PlanList planData={planData} tabHead="View Packages" tabButtonText="Add Package" />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MasterPlan;
