import React, { useState } from "react";
import "./accounts.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../../../../../assets/shree-ganesh.png";

const currentlyWorkingArray = [
  {
    name: "Talwkar Gym",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Gold Gym",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Restaurant Aroghya",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
];

const pastWorkingArray = [
  {
    name: "Talwkar Gym",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Gold Gym",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Restaurant Aroghya",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
  {
    name: "Talwkar Singh",
    designation: "AS Trainer",
    user_id: "12345678",
    join_date: "20/10/2024",
  },
];

function Accounts() {
  const [currentlyWorkingData, setCurrentlyWorkingData] = useState(
    currentlyWorkingArray
  );
  const [pastWorkingData, setPastWorkingData] = useState(pastWorkingArray);
  return (
    <div className="account-card container pb-0">
      <div className="row">
        <div className="col-md-6 col-xl-7">
          <div className="account-header d-flex gap-2">
            <div className="account-img">
              <span className="account-img-box">
                <img src={ProfileImg} alt="profile-img" />
              </span>
              <p>Created on 20/12/2024</p>
            </div>
            <div className="account-details">
              <h2>Shri Ganesh</h2>
              <p>MID 1234567890</p>
              <p>FITNESS DANCE Instructor</p>
            </div>
          </div>
          <div className="account-about">
            <h5 className="d-flex align-items-center justify-content-between gap-3 mb-3">
              ABOUT ME <FontAwesomeIcon icon={faEdit} />
            </h5>
            <p>
              Hello! I'm Riya K, and I live in Mumbai, Maharashtra. I've been a
              ZIN™ Member since Jan 2023 and I absolutely love teaching Zumba
              classes. The reason is simple: Every class feels like a party! I
              am currently licensed to teach Zumba. Come join me, I guarantee
              you will have a blast! Got questions, don't hesitate to drop me a
              message!
            </p>
          </div>
          <div className="account-skills mt-5">
            <h5 className="d-flex align-items-center justify-content-between gap-3 mb-3">
              MY SKILL 16/13 <FontAwesomeIcon icon={faEdit} />
            </h5>
            <div className="skills-list">
              <span className="badge bg-secondary">DANCE</span>
              <span className="badge bg-secondary">MUSIC</span>
              <span className="badge bg-secondary">Guitar artist</span>
              <span className="badge bg-secondary">FITNESS PRO</span>
              <span className="badge bg-secondary">Cooking chefs</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-5">
          <div className="work-history">
            <Tabs
              defaultActiveKey="current"
              id="uncontrolled-tab-example"
              className="account-tabs"
            >
              <Tab eventKey="current" title="Currently Working">
                <div className="accounts-tab-content">
                  <h5 className="px-3 pt-3">Currently Working</h5>
                  <div className="currently-working-list working-list p-3 pt-0">
                    {currentlyWorkingData?.map((current, i) => {
                      return (
                        <div className="working-box" key={i}>
                          <span className="worker-img">
                            <img src={ProfileImg} alt="profile-img" />
                          </span>
                          <h6 className="text-center">{current.name}</h6>
                          <p>{current.designation}</p>
                          <p>ID{current.user_id}</p>
                          <p>FROM{current.join_date}</p>
                        </div>
                      );
                    })}
                  </div>

                  <h5 className="past-work-head px-3">Past Working</h5>
                  <div className="past-working-list working-list p-3 pt-0">
                    {pastWorkingData?.map((current, i) => {
                      return (
                        <div className="working-box" key={i}>
                          <span className="worker-img"></span>
                          <h6>{current.name}</h6>
                          <p>{current.designation}</p>
                          <p>ID{current.user_id}</p>
                          <p>FROM{current.join_date}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="admin" title="Company Admin">
                Tab content for Profile
              </Tab>
              <Tab eventKey="license" title="My Certificates">
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
