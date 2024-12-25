import React from "react";
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

function ServiceTraining() {
  return (
    <div className="mt-5">
      <div className="d-flex align-items-center justify-content-end gap-2 mb-4">
        {/* <button type="button" className="btn button">
          Export Training Booking PDF
        </button> */}
        <div className="d-flex align-items-center gap-2">
          <p className="mb-0">Search: </p>
          <input type="search" />
        </div>
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
                    <button type="button" className="btn button">
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
  );
}

export default ServiceTraining;
