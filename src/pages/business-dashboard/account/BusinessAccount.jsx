import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import AddHouseModal from "./addHouseModal/AddHouseModal";

// Images
import burceMars from "../../../assets/shree-ganesh.png";
import AadharImg from "../../../assets/aadhar.png";
import Fingerprint from "../../../assets/fingerprint-white.png";
import Shield from "../../../assets/shield.png";
import Signature from "../../../assets/signature.png";
import HouseIcon from "../../../assets/home-icon.png";
import EmailIcon from "../../../assets/email-icon.png";
import HomeLocationIcon from "../../../assets/home-location-icon.png";
import PhoneIcon from "../../../assets/phone-icon.png";
import Briefcase from "../../../assets/briefcase-pink.png";
import ShieldWhite from "../../../assets/shield-white.png";
import CompanyLogo from "../../../assets/company-logo.jpg";

import "./businessAccount.scss";
import FamilyMemberModal from "./familyMemberModal/FamilyMemberModal";

function BusinessAccount() {
  const navigate = useNavigate();
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const { showMiForm, setShowMiForm, showMBForm, setShowMBForm } =
    useContext(UserContext);

  const handleShowMIForm = () => {
    setShowMiForm(true);
    navigate("/mi-form");
  };

  const handleShowMBForm = () => {
    setShowMBForm(true);
    navigate("/mb-form");
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setShowInputs(value === "not_found");
  };
  const handleFamilyModal = () => {
    setShowFamilyModal(true);
  };

  const handleCloseFamilyModal = () => {
    setShowFamilyModal(false);
  };

  const handleHouseModal = (e) => {
    e.preventDefault();
    setShowHouseModal(true);
  };

  const handleCloseHouse = () => {
    setShowHouseModal(false);
  };

  console.log("showMiForm", showMiForm);

  return (
    <div className="dash-profile dashboard flex-md-row">
      <div className="mb-5 mb-md-0 dash-left">
        <div className="card profile-container p-3">
          <div className="row align-items-center justify-content-between">
            <div style={{ width: "fit-content" }}>
              <img
                src={burceMars}
                alt="profile-image"
                className="rounded-circle shadow-sm"
                style={{ width: "74px", height: "74px" }}
              />
            </div>
            <div style={{ width: "fit-content" }}>
              <div className="mt-1">
                <h5 className="fw-bold mb-1">Shree Ganesh</h5>
                <p className="mb-0 text-white">USER ID / MU_123456</p>
              </div>
            </div>
            <div
              className="profile-head col-12 col-md-6 col-lg-5 ms-auto "
              style={{ alignItems: "flex-start" }}
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src={Fingerprint}
                  alt="profile-image"
                  className="rounded"
                  style={{ width: "36px", height: "36px" }}
                />
                <p className="text-white d-flex align-items-center gap-2">
                  <img
                    src={ShieldWhite}
                    alt="profile-image"
                    style={{ width: "24px", height: "24px" }}
                  />
                  Not Active
                </p>
              </div>
              <img
                src={AadharImg}
                alt="profile-image"
                className="rounded"
                style={{ width: "40px", height: "30px" }}
              />
              <div className="d-flex align-items-center gap-2">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <p className="text-white mb-0">AADHAR</p>
                    <img
                      src={Shield}
                      alt="profile-image"
                      className="rounded-circle"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <p className="text-white mb-0">9XXXXXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-data">
          <div className="filter-table">
            <div className="filters d-flex align-items-center gap-3">
              <select name="" id="" className="form-select">
                <option value="">All</option>
                <option value="">In-Review</option>
                <option value="">Complete Order</option>
                <option value="">Pending</option>
                <option value="">On-hold</option>
              </select>
              <input type="text" value="Event" className="form-control" />
              <input type="text" value="Activity" className="form-control" />
            </div>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th></th>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Help</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>#12345</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={Signature}
                        alt="profile-image"
                        className="rounded"
                        style={{ width: "36px", height: "36px" }}
                      />
                      MId
                    </div>
                  </td>
                  <td>23/12/2024</td>
                  <td>
                    <span>RS 00</span>
                  </td>
                  <td>Complete</td>
                  <td>Report</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        navigate("/invoice");
                      }}
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
                {showMiForm && (
                  <tr>
                    <td>1</td>
                    <td>#12345</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={Signature}
                          alt="profile-image"
                          className="rounded"
                          style={{ width: "36px", height: "36px" }}
                        />
                        IM Id
                      </div>
                    </td>
                    <td>23/12/2024</td>
                    <td>
                      <span>RS 00</span>
                    </td>
                    <td>In Review</td>
                    <td>Report</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/invoice");
                        }}
                      >
                        View Ticket
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="household mt-4">
            <div className="d-flex justify-content-between align-items-center house-head">
              <div className="d-flex align-items-center gap-2 house-content">
                <img
                  src={HouseIcon}
                  alt="house-icon"
                  style={{ width: "20px", height: "20px" }}
                />
                <p className="mb-0">Household</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={(e) => {
                  handleHouseModal(e);
                }}
              >
                Add House
              </button>
            </div>
            {/* Additional household data can be added here */}
          </div>
        </div>
      </div>

      <div className="dash-right">
        <div className="dash-right-head d-flex align-items-center gap-2">
          <p className="mb-0">Master ID</p>
          <span>BHA-XXXXXXXXXX</span>
          <img
            src={Shield}
            alt="profile-image"
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div className="dash-right-details">
          <div className="details">
            <p className="mb-0">Name</p>
            <p className="mb-0">Rohan lal</p>
          </div>
          <div className="details">
            <p className="mb-0">
              <img
                src={EmailIcon}
                alt="profile-image"
                style={{ width: "20px", height: "20px" }}
              />
            </p>
            <p className="mb-0">rohan@gmail.com</p>
            <img
              src={Shield}
              alt="profile-image"
              className="verified"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <div className="details">
            <p className="mb-0">
              <img
                src={PhoneIcon}
                alt="profile-image"
                style={{ width: "20px", height: "20px" }}
              />
            </p>
            <p className="mb-0">+911234567890</p>
            <img
              src={Shield}
              alt="profile-image"
              className="verified"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <div className="details">
            <p className="mb-0">
              <strong>DOB</strong>
            </p>
            <p className="mb-0">0X/XX/XXXX</p>
          </div>
          <div className="details">
            <p className="mb-0">
              <img
                src={HomeLocationIcon}
                alt="profile-image"
                style={{ width: "20px", height: "20px" }}
              />
            </p>
            <p className="mb-0">AMRITSAR, PUNJAB</p>
          </div>
        </div>

        <div className="dash-id-details">
          <div className="id-details-box">
            <p className="id-head">
              MU ID{" "}
              <img
                src={Shield}
                alt="profile-image"
                style={{ width: "20px", height: "20px" }}
              />
            </p>
            <div className="id-details d-flex align-items-center">
              <img
                src={burceMars}
                alt="profile-image"
                className="rounded-circle shadow-sm"
                style={{ width: "55px", height: "55px" }}
              />
              <h5 className="mb-0" style={{ fontSize: 16 }}>
                Shree Ganesh
                <p className="mb-0 mt-1">
                  USER ID / <strong>MU_123456</strong>
                </p>
              </h5>
              <div className="details-icons">
                {/* <KeyboardArrowDownIcon />
                <MoreVertIcon /> */}
              </div>
            </div>
          </div>

          <div className="id-details-box id-box">
            <p className="id-head">MI ID</p>
            <div className="id-details d-flex align-items-center">
              <img
                src={Signature}
                alt="profile-image"
                className="rounded"
                style={{ width: "48px", height: "48px" }}
              />
              <div className="id-content">
                {showMiForm && <p>23/12/2024</p>}
                <span>Rs 0.00</span>
              </div>
              <button
                type="button"
                className="review"
                onClick={handleShowMIForm}
              >
                {showMiForm ? "In Review" : "Create Now"}
              </button>
              <div className="details-icons">
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-eimhud-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="KeyboardArrowDownIcon"
                >
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-eimhud-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="MoreVertIcon"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
              {showMiForm && <span className="id-num">#1234</span>}
            </div>
          </div>

          <div className="id-details-box id-box">
            <p className="id-head">MB ID</p>
            <div className="id-details d-flex align-items-center">
              <img
                src={Briefcase}
                alt="profile-image"
                style={{ width: "48px", height: "48px" }}
              />
              <div className="id-content">
                <p>25/12/2024</p>
                <span>Rs 10.00</span>
              </div>
              <button
                type="button"
                onClick={handleShowMBForm}
                disabled={showMiForm ? false : true}
              >
                Create Business
              </button>
              <div className="details-icons">
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-eimhud-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="KeyboardArrowDownIcon"
                >
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-eimhud-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="MoreVertIcon"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
              {showMiForm && <span className="id-num">#1234</span>}
            </div>
          </div>
        </div>
      </div>

      <AddHouseModal
        modalShow={showHouseModal}
        handleModalClose={handleCloseHouse}
        handleFamilyModal={handleFamilyModal}
        burceMars={burceMars}
        showInputs={showInputs}
        CompanyLogo={CompanyLogo}
        handleSelectChange={handleSelectChange}
      />

      <FamilyMemberModal
        showFamilyModal={showFamilyModal}
        handleCloseFamilyModal={handleCloseFamilyModal}
      />
    </div>
  );
}
export default BusinessAccount;
