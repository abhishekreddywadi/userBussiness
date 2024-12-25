import React, { useContext, useState } from "react";
import UserContext from "../../../../context/UserContext";
import Header from "../../../../components/header/Header";
import InstructorImg from "../../../../assets/shree-ganesh.png";
import UserOneImg from "../../../../assets/user.jpg";
import UserTwoImg from "../../../../assets/profile.jpg";
import UserThreeImg from "../../../../assets/bruce-mars.jpg";
import Kathak from "../../../../assets/kathak.jpg";
import Zumba from "../../../../assets/zumba.jpg";
import Yoga from "../../../../assets/yoga.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
// import BatchClass from "../BatchClass";
import ManageEvents from "../manageEvents/ManageEvent";

import "./viewEvents.scss";

function ViewEvents() {
  const { navButtonClick } = useContext(UserContext);
  const [showBatchTabs, setShowBatchTabs] = useState(false);
  const batchClassTableData = [
    {
      name: "Dance Demo Batch",
      userImg: UserOneImg,
      startTime: "2:00 PM",
      endTime: "4:00PM",
      maxStudents: 20,
      price: 100,
      tickets: 20,
      totalTickets: 100,
      archive: true,
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
      price: 100,
      tickets: 20,
      totalTickets: 100,
      archive: true,
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
      tickets: 20,
      price: 100,
      totalTickets: 100,
      archive: true,
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
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} batch-table`}
    >
      <Header />

      {!showBatchTabs && (
        <>
          <div className="batch-head d-flex flex-wrap justify-content-center justify-content-md-between align-items-center gap-4 my-4">
            <h2>View Event</h2>
            <button
              type="button"
              className="btn"
              onClick={() => setShowBatchTabs(true)}
            >
              Add Event
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Tickets Left</th>
                <th>Maximum Tickets allowed</th>
                <th>Price</th>
                <th>Archive</th>
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
                    <td>{batch.tickets}/{batch.totalTickets}</td>
                    <td>{batch.maxStudents}</td>
                    <td>{batch.price}</td>
                    <td>
                        {batch.archive ? (
                            <button type="button" className="btn btn-danger">
                            Archive
                          </button>
                        ) : ""}
                      
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
        <button type="button" className="btn text-start w-fit" onClick={() => setShowBatchTabs(false)}>Back</button>
        <ManageEvents />
        </>
      )}
    </div>
  );
}

export default ViewEvents;
