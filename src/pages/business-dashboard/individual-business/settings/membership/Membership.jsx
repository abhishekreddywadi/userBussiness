import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PlanCard from "./planCard/PlanCard";
import "./membership.scss";

function Membership() {
  return (
    <div className="membership">
      <div className="row">
        <div className="col-12 col-md-6">
          <PlanCard
            title="PREMIUM"
            price="89"
            status="In queue. Activate on"
            date="25/12/2025"
            daysLeft="Not Started."
            members="10 TEAM MEMBERS"
            storage="40 GB Cloud storage."
            help="Internal app help."
          />
        </div>
        <div className="col-12 col-md-6">
          <PlanCard
            title="PREMIUM"
            price="89"
            status="Purchase on"
            date="25/12/2024"
            daysLeft="300 DAYS LEFT"
            members="10 TEAM MEMBERS"
            storage="40 GB Cloud storage."
            help="Internal app help."
          />
        </div>
      </div>
    </div>
  );
}

export default Membership;
