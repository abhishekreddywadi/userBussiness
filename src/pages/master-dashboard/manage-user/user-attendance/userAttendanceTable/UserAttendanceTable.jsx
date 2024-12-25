import React from 'react'
import './userAttendanceTable.scss'

function UserAttendanceTable({attendanceData}) {
  return (
    <div className='staff-sttendance-table'>
      <table>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User Profile ID</th>
                <th>User Image</th>
                <th>User Name</th>
                <th>User Attendance</th>
                <th>Leave Reason</th>
            </tr>
        </thead>
        <tbody>
            {attendanceData?.map((data, i) => {
                return(
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data.profileId}</td>
                        <td><img src={data.image} alt='staff-img' /></td>
                        <td>{data.name}</td>
                        <td><span style={{color: data?.attendance == 'Present' ? 'green' : 'red'}}>{data.attendance}</span></td>
                        <td>{data.leaveReason}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default UserAttendanceTable
