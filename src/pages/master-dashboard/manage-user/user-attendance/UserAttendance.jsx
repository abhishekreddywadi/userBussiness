import React, { useState, useContext } from "react";
import UserContext from "../../../../context/UserContext";
import { Tabs, Tab, Container } from "react-bootstrap";
import "./userAttendance.scss";

import userImg from "../../../../assets/user.jpg";

import UserAttendanceFilter from "./userAttendanceFilter/UserAttendanceFilter";
import UserAttendanceTable from "./userAttendanceTable/UserAttendanceTable";
import GroupAttendanceModal from "./groupAttendanceModal/GroupAttendanceModal";

import UserGroup from "./user-group/UserGroup";
import Header from "../../../../components/header/Header";

const attendanceDataArray = [
  {
    profileId: "MBS_111",
    image: userImg,
    name: "Rohan Singh",
    attendance: "Present",
    leaveReason: "",
  },
  {
    profileId: "MBS_112",
    image: userImg,
    name: "Pawan Kumar",
    attendance: "Present",
    leaveReason: "",
  },
  {
    profileId: "MBS_113",
    image: userImg,
    name: "Rinku Singh",
    attendance: "Absent",
    leaveReason: "",
  },
  {
    profileId: "MBS_114",
    image: userImg,
    name: "Ram Singh",
    attendance: "Present",
    leaveReason: "",
  },
  {
    profileId: "MBS_115",
    image: userImg,
    name: "Bob Singh",
    attendance: "Absent",
    leaveReason: "",
  },
  {
    profileId: "MBS_116",
    image: userImg,
    name: "Rohan Singh",
    attendance: "Absent",
    leaveReason: "",
  },
];

function UserAttendance() {
  const [key, setKey] = useState("rfid");
  const [attendanceData, setAttendanceData] = useState(attendanceDataArray);
  const [groupAttendanceShow, setGroupAttendanceShow] = useState(false);
  const [showStaffGroup, setShowStaffGroup] = useState(false);
  const handleGroupAttendanceOpen = () => {
    setGroupAttendanceShow(true);
  };
  const { navButtonClick } = useContext(UserContext);

  const handleBack = () => {
    setShowStaffGroup(false);
  };

  return (
    <div
      className={`dashboard ${
        navButtonClick && "dashboard-full"
      } staff-attendance`}
    >
      <Container>
        <Header />
        {!showStaffGroup ? (
          <div className="staff-attendance">
            <div className="staff-attendance-head">
              <h4>Add Attendance</h4>
              <button type="button" onClick={() => setShowStaffGroup(true)}>
                Add Group Attendance
              </button>
            </div>
            <UserAttendanceFilter />

            <Tabs
              id="staff-attendance-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 staff-attendance-tab-list"
            >
              <Tab eventKey="rfid" title="Entry">
                <UserAttendanceTable attendanceData={attendanceData} />
              </Tab>
              <Tab eventKey="group-attendance" title="Group Attendance">
                <UserAttendanceTable attendanceData={attendanceData} />
              </Tab>
            </Tabs>
          </div>
        ) : (
          <UserGroup handleBack={handleBack} />
        )}
      </Container>
    </div>
  );
}

export default UserAttendance;
