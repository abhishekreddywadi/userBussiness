import React from 'react';
import { Table, Button } from 'react-bootstrap';

function HistoryTable({ tableTitle, orders, totalNumber=false, totalNumberTitle }) {
  return (
    <div className="custom-staff-table bg-light p-3 rounded-lg mt-5">
      <div className="table-head d-flex align-items-center justify-content-between mb-4">
        <h5 className='d-flex align-items-center mb-0'>{tableTitle} <p className='mb-0 ml-4'>{totalNumber && totalNumberTitle}</p></h5>
        <Button variant="outline-dark" className="export-button">
            <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708"/>
            </svg> Export</Button>
      </div>
      <input type="search" placeholder='Search' />
      <Table bordered hover responsive style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Staff Profile ID</th>
            <th>Staff Image</th>
            <th>Staff Name</th>
            <th>Attendance Status</th>
            <th>Leave Reason</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.staffId}</td>
              <td><div className="id-request"><img src={order.staffImage} alt="staff" className="user-image" /></div></td>
              <td>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{gap: 8}}>
                    <p className='mb-0'>{order.staffName}</p>
                    <span style={{color: '#a4a4a4'}}>{order.designation}</span>
                </div>
              </td>
              <td>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{gap: 8}}>
                <span style={{color: order.attendanceStatus == 'present' ? 'green' : 'red'}}>{order.attendanceStatus == 'present' ? "Present" : order.attendanceStatus == 'absent' ? "Absent" : "On Leave"}</span>
                {order.attendanceStatus == 'present' ? 
                <>
                <span>In : {order.inStatus}</span>
                <span>In : {order.outStatus}</span>
                </>
                :
                 order.attendanceStatus == 'absent' ? <span>{order.absentStatus}</span>
                 : <span>{order.leaveStatus}</span>
                }
                </div>
              </td>
              <td>
                <p>{order.leaveAccepted}</p>
                <span>{order.reason}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryTable;
