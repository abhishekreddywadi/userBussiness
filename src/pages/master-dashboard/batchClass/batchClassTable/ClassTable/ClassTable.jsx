import React, { useState } from "react";
import InstructorImg from "../../../../../assets/shree-ganesh.png";
import UserOneImg from "../../../../../assets/user.jpg";
import UserTwoImg from "../../../../../assets/profile.jpg";
import UserThreeImg from "../../../../../assets/bruce-mars.jpg";
import Kathak from "../../../../../assets/kathak.jpg";
import Zumba from "../../../../../assets/zumba.jpg";
import Yoga from "../../../../../assets/yoga.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Class from "../../class/Class";

function ClassTable() {
  const [showBatchTabs, setShowBatchTabs] = useState(false);
  const batchClassTableData = [
    {
      name: "Dance Demo Batch",
      userImg: UserOneImg,
      startTime: "2:00 PM",
      endTime: "4:00PM",
      maxStudents: 20,
      instructor: [
        {
          instructorName: "Shree Ganesh",
          instructorImg: InstructorImg,
        },
      ],

      className: "Yoga",
      classImg: Yoga,
    },
    {
      name: "Dance Demo Batch",
      userImg: UserTwoImg,
      startTime: "2:00 PM",
      endTime: "4:00PM",
      maxStudents: 20,
      instructor: [
        {
          instructorName: "Shree Ganesh",
          instructorImg: InstructorImg,
        },
        {
          instructorName: "Shree Ganesh",
          instructorImg: UserTwoImg,
        },
        {
          instructorName: "Shree Ganesh",
          instructorImg: UserThreeImg,
        },
      ],

      className: "Kathak",
      classImg: Kathak,
    },
    {
      name: "Dance Demo Batch",
      userImg: UserTwoImg,
      startTime: "2:00 PM",
      endTime: "4:00PM",
      maxStudents: 20,
      instructor: [
        {
          instructorName: "Shree Ganesh",
          instructorImg: InstructorImg,
        },
        {
          instructorName: "Shree Ganesh",
          instructorImg: UserThreeImg,
        },
      ],

      className: "Zumba",
      classImg: Zumba,
    },
  ];
  return (
    <div>
      {!showBatchTabs && (
        <>
          <div className="batch-head d-flex flex-wrap justify-content-center justify-content-md-between align-items-center gap-4 my-4">
            <h2>View Class</h2>
            <button
              type="button"
              className="btn"
              onClick={() => setShowBatchTabs(true)}
            >
              Add Class
            </button>
          </div>
          <table className="w-100">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Max Students</th>
                <th>Instructor</th>
                <th>Class</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batchClassTableData.map((batch, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="batch-user">
                        <img src={batch.userImg} alt="user-img" />
                        <span>{batch.name}</span>
                      </div>
                    </td>
                    <td>{batch.startTime}</td>
                    <td>{batch.endTime}</td>
                    <td>{batch.maxStudents}</td>
                    <td>
                      {batch.instructor?.length > 1 ? (
                        <div className="instruction-imgs d-flex align-items-center justify-content-center gap-2">
                          {batch.instructor.map((instructor, i) => {
                            return (
                              <img
                                src={instructor.instructorImg}
                                alt="instructor-img"
                                className="multi-inst-img"
                              />
                            );
                          })}
                        </div>
                      ) : (
                        batch.instructor.map((inst, i) => {
                          return (
                            <div
                              className="instruction-box d-flex align-items-center gap-2"
                              key={i}
                            >
                              <img
                                src={inst.instructorImg}
                                alt="instructor-img"
                                className="multi-inst-img"
                              />
                              {inst.instructorName}
                            </div>
                          );
                        })
                      )}
                    </td>
                    <td>
                      <div className="batch-class d-flex align-items-center gap-3">
                        <img src={batch.classImg} alt="class-img" />
                        {batch.className}
                      </div>
                    </td>
                    <td>
                      <button type="button" className="status active">
                        Active
                      </button>
                    </td>
                    <td>
                      <div className="icons">
                        <button type="button">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button type="button">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button type="button">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                    <table></table>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {showBatchTabs && (
        <>
          <button
            type="button"
            className="btn text-start w-fit"
            onClick={() => setShowBatchTabs(false)}
          >
            Back
          </button>
          <Class />
        </>
      )}
    </div>
  );
}

export default ClassTable;
