import React from "react";
import DataImg from "../../../../assets/shree-ganesh.png";

const classData = [
  {
    orderId: 10,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    userId: "MU_123456",
    date: "07/09/2023",
    time: "12:00PM",
    tickets: 20,
  },
  {
    orderId: 11,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    userId: "MU_123456",
    date: "07/09/2023",
    time: "12:00PM",
    tickets: 20,
  },
  {
    orderId: 12,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    studentName: "Ranjan",
    userId: "MU_123456",
    date: "07/09/2023",
    time: "12:00PM",
    tickets: 20,
  },
  {
    orderId: 13,
    className: "Music CLass",
    classImg: DataImg,
    price: 100,
    userId: "MU_123456",
    studentName: "Ranjan",
    date: "07/09/2023",
    time: "12:00PM",
    tickets: 20,
  },
];
function ServiceEvents() {
  return (
    <div className="mt-5">
      <div className="d-flex align-items-center justify-content-end gap-2 mb-4">
        {/* <button type="button" className="btn button">
          Export Event Booking PDF
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
              <th>Name</th>
              <th>Price</th>
              <th>User Name</th>
              <th>No. of Tickets</th>
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
                  <td>
                    <div>
                      <p className="mb-0">{data.studentName}</p>
                      <span style={{ fontSize: 10 }}>{data.userId}</span>
                    </div>
                  </td>
                  <td>{data.tickets}</td>
                  <td>
                    <div>
                      <p className="mb-0">{data.date}</p>
                      <span style={{ fontSize: 10 }}>{data.time}</span>
                    </div>
                  </td>
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

export default ServiceEvents;
