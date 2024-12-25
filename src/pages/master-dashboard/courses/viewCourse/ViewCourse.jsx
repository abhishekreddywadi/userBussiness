import React, { useContext, useState } from "react";
import UserContext from "../../../../context/UserContext";
import Header from "../../../../components/header/Header";
import { useNavigate } from "react-router-dom";
import DataImg from "../../../../assets/shree-ganesh.png";

const classData = [
  {
    orderId: 10,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    date: "07/09/2023",
  },
  {
    orderId: 11,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    date: "07/09/2023",
  },
  {
    orderId: 12,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    date: "07/09/2023",
  },
  {
    orderId: 13,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    date: "07/09/2023",
  },
];
function ViewCourse() {
  const { navButtonClick } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} view-course`}
    >
      <Header />
      <div className="container">
        <div className="course-head d-flex align-items-center justify-content-between gap-4 mb-4">
          <h2 className="mb-0">View Courses</h2>
          <button
            type="button"
            className="btn button"
            onClick={() => {
              navigate("/manage-course");
            }}
          >
            Add Course
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>OrderId</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classData?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data.orderId}</td>
                    <td>{data.className}</td>
                    <td>{data.price}</td>
                    <td>{data.studentName}</td>
                    <td>{data.date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn button"
                        onClick={() => navigate("/view-service/billing")}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
