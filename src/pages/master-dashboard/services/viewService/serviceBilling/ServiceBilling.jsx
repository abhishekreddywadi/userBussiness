import React, { useState, useRef, useContext } from "react";
import UserContext from "../../../../../context/UserContext";
import Header from "../../../../../components/header/Header";
import { useNavigate } from "react-router-dom";
import "./serviceBilling.scss";

function ServiceBilling() {
  const { navButtonClick } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div
      className={`dashboard ${
        navButtonClick && "dashboard-full"
      } service-billing`}
    >
      <Header />
      <div className="container">
        <div className="billing-header d-flex flex-wrap gap-4 align-items-center justify-content-between mt-4 mb-4 mb-md-5">
          <h2 className="mb-0">Training Purchase Details</h2>
          <button
            className="btn button"
            onClick={() => {
              navigate("/view-service");
            }}
          >
            Back
          </button>
        </div>
        <div className="details d-flex flex-column flex-md-row justify-content-between">
          <div className="details-box m-0">
            <h4 className="mb-3">Order Details</h4>
            <ul>
              <li>
                <strong>Training Name: </strong> Gym
              </li>
              <li>
                <strong>Price: </strong> 799/-
              </li>
              <li>
                <strong>Start Date: </strong> 30 Dec 2023
              </li>
              <li>
                <strong>End Date: </strong> 31 Jan 2024
              </li>
              <li>
                <strong>Student Name: </strong> JeetKaur
              </li>
            </ul>
          </div>

          <div className="details-box m-0">
            <h4 className="mb-3">Payment Details</h4>
            <ul>
              <li>
                <strong>Order #: </strong> 32
              </li>
              <li>
                <strong>Date: </strong> 15 Dec 2023
              </li>
              <li>
                <strong>Discount: </strong> 0
              </li>
              <li>
                <strong>GST: </strong> 0
              </li>
              <li>
                <strong>Total Amount: </strong> <strong>799/-</strong>
              </li>
            </ul>
            <ul className="details-box-footer">
              <li>
                <strong>Payment Method: </strong> Cash
              </li>
              <li>
                <strong>Payment Approved: </strong>{" "}
                <span className="pay-status no">No</span>
              </li>
              <li>
                <strong>Transaction ID: </strong> 52136523
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-4 mt-4">
          <button
            type="button"
            className="btn border-black rounded-pill text-dark"
          >
            Download PDF
          </button>
          <button type="button" className="btn button">
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceBilling;
