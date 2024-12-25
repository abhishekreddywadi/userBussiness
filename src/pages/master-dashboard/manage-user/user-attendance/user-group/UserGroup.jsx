import React, { useState } from "react";
import "./userGroup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import GroupAttendanceModal from "../groupAttendanceModal/GroupAttendanceModal";

import UserImg from "../../../../../assets/user.jpg";

const staffGroupDataArray = [
  {
    profileId: "MBS_111",
    image: UserImg,
    name: "Rohan Singh",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
  {
    profileId: "MBS_112",
    image: UserImg,
    name: "Pawan Kumar",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
  {
    profileId: "MBS_113",
    image: UserImg,
    name: "Rinku Singh",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
  {
    profileId: "MBS_114",
    image: UserImg,
    name: "Ram Singh",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
  {
    profileId: "MBS_115",
    image: UserImg,
    name: "Bob Singh",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
  {
    profileId: "MBS_116",
    image: UserImg,
    name: "Rohan Singh",
    createbBy: "Vikram",
    createdOn: "20-10-2023",
    class: "Class One",
    attendance: 20,
    totalAttendance: 50,
    leaveReason: "",
    batchName: "Batch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, cupiditate.",
  },
];
function UserGroup({ handleBack }) {
  const [staffGroupData, setStaffGroupData] = useState(staffGroupDataArray);
  const [groupAttendanceShow, setGroupAttendanceShow] = useState(false);

  const handleGroupAttendanceOpen = () => {
    setGroupAttendanceShow(true);
  };

  const handleGroupAttendanceClose = () => {
    setGroupAttendanceShow(false);
  };

  const handleShowStaffGroup = () => {
    handleGroupAttendanceClose();
  };

  return (
    <div className="staff-group">
      <button
        type="button"
        className="btn d-flex align-items-center gap-2"
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>
      <div className="staff-attendance-head">
        <h4>Add Attendance</h4>
        {/* <button type="button" onClick={handleGroupAttendanceOpen}>
          Add Group
        </button> */}
      </div>
      <div className="entries-box">
        <p className="mb-0">Select</p>
        <select name="" id="">
          <option value="">5</option>
        </select>
        <p className="mb-0">entries</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Batch Info</th>
            <th>Batch Name</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Total Attendance</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffGroupData?.map((data, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={data.image} alt="staff-img" />
                    {data.name}
                  </div>
                </td>
                <td>{data.batchName}</td>
                <td>
                  <p className="description">{data.description}</p>
                </td>
                <td>
                  <p className="mb-0">{data.createbBy}</p>
                  <p className="mb-0">{data.createdOn}</p>
                </td>
                <td>
                  {data.attendance}/{data.totalAttendance}
                </td>
                <td>{data.class}</td>
                <td>
                  <div className="d-flex flex-column justify-content-center gap-3 attendance-btns">
                    <button
                      type="button"
                      className="btn button mx-auto"
                      onClick={handleGroupAttendanceOpen}
                    >
                      Mark Attendance
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary button mx-auto"
                    >
                      View All Attendance
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {groupAttendanceShow && (
        <GroupAttendanceModal
          groupAttendanceShow={groupAttendanceShow}
          handleGroupAttendanceClose={handleGroupAttendanceClose}
          handleShowStaffGroup={handleShowStaffGroup}
        />
      )}
    </div>
  );
}

export default UserGroup;
