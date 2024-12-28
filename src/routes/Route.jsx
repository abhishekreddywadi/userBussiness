import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import IndividualSettings from "../pages/business-dashboard/individual-business/settings/IndividualSettings";
import AccountSettings from "../pages/user-dashboard/settings/AccountSettings";
import MasterProfile from "../pages/master-dashboard/profile/MasterProfile";
import MasterAccount from "../pages/master-dashboard/account/MasterAccount";
import StaffAttendance from "../pages/master-dashboard/manage-staff/staff-attendance/StaffAttendance";
import MasterPlan from "../pages/master-dashboard/plan/Plan";
import AddPlan from "../pages/master-dashboard/plan/addPlan/AddPlan";
import UserAttendance from "../pages/master-dashboard/manage-user/user-attendance/UserAttendance";
import BatchClass from "../pages/master-dashboard/batchClass/BatchClass";
import ViewEvents from "../pages/master-dashboard/events/viewEvents/ViewEvents";
import MakePayment from "../pages/master-dashboard/makePayment/MakePayment";
import AddUser from "../pages/master-dashboard/account/masterUser/addUser/AddUser";
import AddStaff from "../pages/master-dashboard/account/masterStaff/addStaff/AddStaff";
import ViewService from "../pages/master-dashboard/services/viewService/ViewService";
import ServiceBilling from "../pages/master-dashboard/services/viewService/serviceBilling/ServiceBilling";
import ManageCourse from "../pages/master-dashboard/courses/manageCourse/ManageCourse";
import ViewCourse from "../pages/master-dashboard/courses/viewCourse/ViewCourse";
import ManageUsersAttendance from "../pages/master-dashboard/manage-user/manage-users-Attendance/rfIdAttendance/ManageusersAttendance";
import Dashboard from "../pages/master-dashboard/dashboard/Dashboard";

const Routing = () => {
  return (
    <div className="routes">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MasterProfile />} />

        <Route path="/master-profile" element={<MasterProfile />} />
        <Route path="/master-account" element={<MasterAccount />} />
        <Route path="/business-setting" element={<IndividualSettings />} />
        <Route path="/individual-settings" element={<IndividualSettings />} />
        <Route path="/master-plan" element={<MasterPlan />} />
        <Route path="/add-plan" element={<AddPlan />} />
        <Route path="/batch" element={<BatchClass />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/view-staff" element={<MasterAccount />} />
        <Route path="/staff-attendance" element={<StaffAttendance />} />
        <Route path="/user-attendance" element={<UserAttendance />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/rfid-attendance" element={<ManageUsersAttendance />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/view-user" element={<MasterAccount />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/view-service" element={<ViewService />} />
        <Route path="/view-service/billing" element={<ServiceBilling />} />
        <Route path="/view-course" element={<ViewCourse />} />
        <Route path="/manage-course" element={<ManageCourse />} />
        <Route
          path="/individual-account-setting"
          element={<AccountSettings />}
        />
      </Routes>
    </div>
  );
};

export default Routing;
