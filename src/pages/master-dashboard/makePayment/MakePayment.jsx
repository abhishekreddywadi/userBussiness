import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/header/Header";
import UserImg from "../../../assets/shree-ganesh.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./makePayment.scss";

function MakePayment() {
  const { navButtonClick } = useContext(UserContext);
  const [haveMasterId, setHaveMasterId] = useState(false);
  const [otherMember, setOtherMember] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const membershipData = [
    {
      id: 1,
      planName: "Hip Hop",
      planTime: "5pm to 6pm",
      planTypeDuration: "Monthly",
      planPrice: 2000,
      planType: "Dance",
      planDuration: "5th Jan to 4th Feb",
    },
    {
      id: 2,
      planName: "Hip Hop",
      planTime: "5pm to 6pm",
      planTypeDuration: "Monthly",
      planPrice: 2000,
      planType: "Dance",
      planDuration: "5th Jan to 4th Feb",
    },
    {
      id: 3,
      planName: "Hip Hop",
      planTime: "5pm to 6pm",
      planTypeDuration: "Monthly",
      planPrice: 2000,
      planType: "Dance",
      planDuration: "5th Jan to 4th Feb",
    },
    {
      id: 4,
      planName: "Hip Hop",
      planTime: "5pm to 6pm",
      planTypeDuration: "Monthly",
      planPrice: 2000,
      planType: "Dance",
      planDuration: "5th Jan to 4th Feb",
    },
  ];

  const handleRenewClick = (planName) => {
    setSelectedPlans((prevPlans) => [...prevPlans, planName]);
  };

  const handleRemoveClick = (planName) => {
    setSelectedPlans((prevPlans) =>
      prevPlans.filter((plan) => plan !== planName)
    );
  };

  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} make-payment`}
    >
      <Header />
      <div className="make-payment-container">
        <h2>Payment Transaction</h2>
        <div className="bg-white p-3 p-md-4 rounded">
          <form>
            <div className="row">
              <div className="col-12 py-2 col-md-6 d-flex align-items-start gap-3">
                <div className="input-container flex-row align-items-center gap-2">
                  <input type="checkbox" name="existed" id="existed" />
                  <label className="pb-0" htmlFor="existed">
                    Existed Member
                  </label>
                </div>
                <div className="input-container flex-row align-items-center gap-2">
                  <input
                    type="checkbox"
                    name="other"
                    id="other"
                    value={otherMember}
                    onChange={() => setOtherMember(!otherMember)}
                  />
                  <label className="pb-0" htmlFor="other">
                    Other Member
                  </label>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container flex-row align-items-center gap-2">
                  <input
                    type="checkbox"
                    name="have_master_id"
                    id="have_master_id"
                    checked={haveMasterId}
                    onChange={(e) => setHaveMasterId(!haveMasterId)}
                  />
                  <label className="pb-0" htmlFor="have_master_id">
                    Do you have Master ID?
                  </label>
                </div>
                {haveMasterId && (
                  <div className="input-container d-flex flex-column gap-2">
                    <label>Enter Master ID</label>
                    <input type="text" />
                  </div>
                )}
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Select User/Staff</label>
                  <select className="w-100">
                    <option value="select" default disabled>
                      Select User/Staff
                    </option>
                    <option value="">Raghav Jain/Music Teacher</option>
                    <option value="">Anubhav/Dancer</option>
                  </select>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                {otherMember && (
                  <div className="input-container">
                    <div className="d-flex align-items-center justify-content-between mb-1 mt-2">
                      <label className="mb-0">User Master ID</label>
                      <button className="btn btn-primary verify py-1">
                        Verify
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Master ID"
                      className="w-100"
                    />
                  </div>
                )}
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="payment-profile d-flex flex-column flex-md-row gap-3 align-items-center">
                  <div className="profile-img d-flex flex-column align-items-center justify-content-center gap-2">
                    <img src={UserImg} alt="user-img" />
                    <p className="mb-0">Raghav Jain</p>
                  </div>
                  <div className="profile-details">
                    <p className="mb-1">
                      Master ID: <strong>MZI_00651</strong>
                    </p>
                    <p className="mb-1">
                      Profession: <strong>Music Teacher</strong>
                    </p>
                    <p className="mb-1">
                      Phone Number: <strong>+91123456789</strong>
                    </p>
                    <p className="mb-0">
                      Email ID: <strong>raghav@gmail.com</strong>
                    </p>
                    <div className="mt-4">
                      <strong className="text-danger">Balance: Rs.300</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <p>His Membership with you</p>
                <ul className="membership-data-list d-flex flex-column gap-4 gap-md-2">
                  {membershipData?.map((memberData, i) => {
                    return (
                      <li
                        key={i}
                        className="d-flex flex-column flex-md-row align-items-center gap-3"
                      >
                        <div className="membership-data">
                          <div>
                            <p className="mb-0">{memberData.planName}</p>
                            <span>
                              {memberData.planTypeDuration}:{" "}
                              {memberData.planPrice}
                            </span>
                          </div>
                          <div>
                            <p className="mb-0">Type</p>
                            <span>{memberData.planType}</span>
                          </div>
                          <div>
                            <p className="text-danger mb-0">5 Days Left</p>
                            <span>{memberData.planDuration}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="button mx-auto mx-md-0 mt-1 mt-md-0"
                          onClick={() => handleRenewClick(memberData.planName)}
                        >
                          Renew
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="col-12 py-2">
                <h5 className="mt-4 mb-3">Select Batches</h5>
                <ul className="d-flex align-items-center gap-3">
                  {selectedPlans.map((planName, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-center gap-2 shadow py-2 px-3"
                      style={{ width: "fit-content" }}
                    >
                      {planName}
                      <button
                        type="button"
                        className="btn btn-sm p-0"
                        style={{ lineHeight: "1" }}
                        onClick={() => handleRemoveClick(planName)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 py-2 col-md-8 d-flex align-items-center gap-3 my-4">
                <select className="w-100">
                  <option value="select">Select Package</option>
                </select>
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ minWidth: "fit-content" }}
                >
                  <input type="checkbox" name="package" id="package" />
                  <label htmlFor="package" className="pb-0">
                    This is a package
                  </label>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <label className="pb-3">
                  Select package/ course/ Events/ Booking
                </label>
                <div className="plan-bookings d-flex flex-column gap-2">
                  <button className="button">Book Class</button>
                  <button className="button">Book Event</button>
                  <button className="button">Book Plan</button>
                  <button className="button">Book Training</button>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    name="additional_charges"
                    id="additional_charges"
                  />
                  <label htmlFor="additional_charges" className="pb-0">
                    Add additional charges
                  </label>
                </div>
                <div className="d-flex align-items-end gap-2 mb-2">
                  <div className="input-container">
                    <label>Name</label>
                    <input type="" />
                  </div>
                  <div className="input-container">
                    <label>Name</label>
                    <input type="" />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faCheck} /></button>
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>
                <div className="input-container">
                  <label>Total</label>
                  <input type="number" />
                </div>
              </div>

              <div className="col-12 py-2">
                <div className="input-container">
                  <label>Payed Amount</label>
                  <input type="number" />
                </div>
              </div>

              <div className="col-12 py-2">
                <div className="input-container">
                  <label>Balance</label>
                  <input type="number" />
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Discount(%)</label>
                  <input type="number" />
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Apply Coupon</label>
                  <input type="text" />
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Payment Mode</label>
                  <select name="" id="">
                    <option value="select" default disabled>
                      Select Mode
                    </option>
                    <option value="">GPay</option>
                  </select>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Transaction ID</label>
                  <input type="text" />
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Checque Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container">
                  <label>Payment Success Screenshot</label>
                  <input type="file" />
                </div>
              </div>

              <div className="col-12 py-2 buttons d-flex align-items-center justify-content-end gap-3">
                <button type="button" className="button">Make Payment</button>
                <button type="button" className="button">Send Payment Request</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakePayment;
