import React from "react";
import "./userAttendanceFilter.scss";

function UserAttendanceFilter() {
  return (
    <div className="attendance-filter">
      <div className="row w-100 justify-content-between">
        <div className="col-md-3">
          <div className="entries-box">
            <p className="mb-0">Select</p>
            <select name="" id="">
              <option value="">5</option>
            </select>
            <p className="mb-0">entries</p>
          </div>
        </div>
        <div className="col-md-5 col-lg-5">
          <div className="attendance-filter-left d-flex align-items-center gap-2 flex-md-nowrap">
            <p className="mb-0">Current Date: 09-07-2024</p>
            <div className="filter-search">
              <label htmlFor="">Search</label>
              <input type="search" />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4">
          <div className="attendance-filter-right">
            <input type="date" name="" id="" />
            <button type="button">Search by Date</button>
            <button type="button">Current Date</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAttendanceFilter;
