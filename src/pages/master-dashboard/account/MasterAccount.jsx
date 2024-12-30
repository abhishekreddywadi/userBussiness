import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/header/Header";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./masterAccount.scss";
import Accordion from "react-bootstrap/Accordion";
import AddPaymentModal from "./addPaymentModal/AddPaymentModal";
import MasterStaff from "./masterStaff/MasterStaff";
import MasterUser from "./masterUser/MasterUser";

import PlanImg from "../../../assets/shree-ganesh.png";
import bruceMars from "../../../assets/shree-ganesh.png";
import VerifiedIcon from "../../../assets/verified.png";
import GPay from "../../../assets/gpay.png";
import QR from "../../../assets/qr.svg";
import UPIImg from "../../../assets/upi.jpg";
import PolicyImg from "../../../assets/policy.png";
import License from "../../../assets/license.png";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";

const planData = [
  {
    img: PlanImg,
    planName: "Kathak",
    planAmount: 2100,
    planDuration: "Yearly",
    planDesc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
  },
  {
    img: PlanImg,
    planName: "Zumba",
    planAmount: 2000,
    discountedPrice: 1500,
    planDuration: "Monthly",
    planDesc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
  },
  {
    img: PlanImg,
    planName: "Bharatnatyam",
    planAmount: 3000,
    discountedPrice: 1500,
    planDuration: "Monthly",
    planDesc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
  },
  {
    img: PlanImg,
    planName: "Kathak",
    planAmount: 2100,
    planDuration: "Yearly",
    planDesc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, sit.",
  },
];

function MasterAccount() {
  const { navButtonClick } = useContext(UserContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showActivePayemnt, setShowActivePayemnt] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [isLoadingThree, setIsLoadingThree] = useState(false);

  const handleShowActivePayment = () => {
    setShowActivePayemnt(true);
    setShowPaymentModal(false);
  };
  const location = useLocation();

  const [activeKey, setActiveKey] = useState(
    location.pathname.includes("/view-staff")
      ? "staff"
      : location.pathname.includes("/master-account")
      ? "info"
      : "student"
  );
  useEffect(() => {
    if (location.pathname.includes("/view-staff")) {
      setActiveKey("staff");
    } else if (location.pathname.includes("/master-account")) {
      setActiveKey("info");
    } else {
      setActiveKey("student");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLoadingOne) {
      const timer = setTimeout(() => {
        setShowOrderData(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoadingOne]);

  return (
    <div
      className={`dashboard ${
        navButtonClick && "dashboard-full"
      } master-account`}
    >
      <Container>
        <Header />
        <div className="row py-4 py-md-5">
          <div className="col-12 col-md-8">
            <div className="profile-business-header mb-4">
              <div className="row align-items-center w-100">
                <div className="col-12 col-lg-6">
                  <div className="profile-section text-white mb-4 mb-lg-0">
                    <img
                      src={bruceMars}
                      alt="Profile"
                      className="profile-image me-2"
                    />
                    <div>
                      <h6 className="business-name">
                        Aaloha the school of Dance
                      </h6>
                      <p className="business-id mb-0">
                        Business ID / MB_123456
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="documents-section">
                    <div className="document-icon">
                      <button type="button" className="btn bg-white text-dark">
                        Add Service Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-card">
              <Tabs
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
                id="uncontrolled-tab-example"
                className="account-tabs"
              >
                <Tab eventKey="info" title="Plan">
                  <div className="row text-center">
                    <div className="row mt-4 gx-4" >
                      {planData.map((data , i) => {
                        return (
                          <div className="col-12 col-md-4" key={i}>
                            <div className="plan-card-box" style={{ 
                              cursor: "pointer",
                              marginBottom: "15px", 
                              border: "1px solid #e5e5e5",
                              borderRadius: "8px",
                              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                              maxWidth: "280px",
                              padding: "10px",
                              margin: "0 auto"
                            }}>
                              <div className="plan-card" key={data.key}>
                                <img src={data.img} alt="plan-img" style={{maxWidth: "60px", height: "auto", marginBottom: "5px"}} />
                                <h5 className="mt-1" style={{fontSize: "1rem", marginBottom: "5px"}}>{data.planName}</h5>
                                <h3 className={data.discountedPrice && "discounted"} style={{fontSize: "1.3rem", margin: "3px 0"}}>
                                  Rs. {data.planAmount}
                                </h3>
                                <h6 style={{color: "#666", fontSize: "0.9rem", margin: "2px 0"}}>
                                  {data.discountedPrice && `${"Rs." + data.discountedPrice}`}
                                </h6>
                                <span style={{display: "block", margin: "5px 0", color: "#888", fontSize: "0.85rem"}}>{data.planDuration}</span>
                                <p style={{fontSize: "0.85rem", margin: "5px 0", lineHeight: "1.2"}}>{data.planDesc}</p>
                                <div className="buttons">
                                  <button type="button" style={{
                                    padding: "6px 15px",
                                    borderRadius: "5px",
                                    border: "none",
                                    backgroundColor: "#f26b80",
                                    color: "white",
                                    fontSize: "0.85rem"
                                  }}>Add to Member</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="staff" title="Packages">
                  <MasterStaff />
                </Tab>
                <Tab eventKey="student" title="Services">
                  <MasterUser />
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="mb-4">
              <div className="master-account">
                <div className="container-fluid">
                  <div style={{
                    backgroundColor: "white",
                    padding: "12px 20px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px",
                      flexWrap: "wrap"
                    }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "#004d40",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          zIndex: "1"
                        }}>V</div>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "#004d40",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          marginLeft: "-14px",
                          zIndex: "1"
                        }}>V</div>
                      </div>
                      <div style={{
                        backgroundColor: "#ffcdd2",
                        color: "#333",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        width: "90px"
                      }}>
                        <span>3</span>
                        <span style={{color: "#666"}}>ON WAITING</span>
                      </div>
                    </div>
                    <button style={{
                      backgroundColor: "#ff1493",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontSize: "10px",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                     width: "120px"
                    }}>
                      MORE REQUEST
                    </button>
                  </div>
                  <div className="master-side-head d-flex align-items-center justify-content-between" style={{
                    backgroundColor: "white",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}>
                    <h6>
                      Order ID: #
                      <strong style={{ color: "green" }} className="ms-1">
                        Active
                      </strong>
                    </h6>
                    <button
                      type="button"
                      className="btn button bg-white text-black"
                      style={{ fontSize: 12 }}
                      onClick={() => {
                        setIsLoadingTwo(!isLoadingTwo);
                      }}
                    >
                      Add Service
                    </button>
                  </div>
                  <div className="master-side-content">
                    <div
                      className="d-flex align-items-center gap-3 bg-gray p-2"
                      style={{ background: "#e5e5e5" }}
                    >
                      <img
                        src={PlanImg}
                        alt="active-user"
                        style={{ width: 60, height: 60, borderRadius: "50%" }}
                      />
                      <div className="content d-flex flex-column">
                        <p className="mb-1">Shree Ganesh</p>
                        <span>
                          USER ID /{" "}
                          <strong style={{ color: "#f26b80" }}>
                            MU_123456
                          </strong>
                        </span>
                      </div>
                    </div>
                    <div className="order-card-box mt-4 d-flex flex-column gap-4">
                      <div className="order-card d-flex align-items-center justify-content-between flex-wrap gap-3">
                       <div>
                       <h5 className="mb-0">#1 Kathak</h5>
                       <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                       </div>
                        <p className="mb-0">Yearly</p>
                        <h3 className="mb-0">
                          Rs. 1200{" "}
                          <button type="button" className="btn">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </h3>
                      </div>
                      <div className="order-card d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div>
                       <h5 className="mb-0">#2 Salsa</h5>
                       <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                       </div>
                        <p className="mb-0">Yearly</p>
                        <h3 className="mb-0">
                          Rs. 1200{" "}
                          <button type="button" className="btn">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </h3>
                      </div>
                      <div className="order-card d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div>
                       <h5 className="mb-0">#3 Tap Dance</h5>
                       <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                       </div>
                        <p className="mb-0">Yearly</p>
                        <h3 className="mb-0">
                          Rs. 1200{" "}
                          <button type="button" className="btn">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </h3>
                      </div>
                    </div>

                    <div className="buttons d-flex align-items-center justify-content-center gap-3 mt-4">
                      <button
                        type="button"
                        className="btn bg-white rounded text-black border-black col-6"
                      >
                        Request to Pay
                      </button>
                      <button
                        type="button"
                        className="btn rounded col-6 text-white"
                        style={{ background: "green" }}
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {showActivePayemnt && (
                <>
                  <p className="care-of-text">
                    Payment Gateway{" "}
                    <img
                      src={VerifiedIcon}
                      alt="verified"
                      style={{ width: 20 }}
                    />
                  </p>
                  <div className="profile-care-card">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="profile-accordion-head d-flex align-items-center w-100 pe-3">
                            <div class="care-for-content d-flex align-items-center justify-content-between w-100">
                              <h6>UPI ACTIVE</h6>
                              <button
                                type="button"
                                className="button"
                                onClick={() => {
                                  setShowPaymentModal(true);
                                }}
                              >
                                Active Now
                              </button>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="pt-0">
                          <div className="payment-head d-flex align-items-center justify-content-between">
                            <p className="mb-0 d-flex align-items-center gap-3">
                              <img src={UPIImg} alt="upi" />
                              test@ybl
                            </p>
                            <img src={GPay} alt="gpay" />
                          </div>
                          <img src={QR} alt="qr" className="qr" />
                          <Link to="/">Test Now</Link>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="master-account">
                <div className="container-fluid">
               
                  <div className="master-side-head d-flex align-items-center justify-content-between" style={{
                    backgroundColor: "white",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}>
                    <h6>
                      Order ID: #
                      <strong style={{ color: "yellow" }}>
                        Checkout Pending
                      </strong>
                    </h6>
                    <button
                      type="button"
                      className="btn button bg-white text-black"
                      style={{ fontSize: 12 }}
                      onClick={() => {
                        setIsLoadingThree(!isLoadingThree);
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="master-side-content">
                    {isLoadingThree && <Loader loaderHeading="Order Number #1" />}
                  </div>
                </div>
              </div>
              {showActivePayemnt && (
                <>
                  <p className="care-of-text">
                    Payment Gateway{" "}
                    <img
                      src={VerifiedIcon}
                      alt="verified"
                      style={{ width: 20 }}
                    />
                  </p>
                  <div className="profile-care-card">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="profile-accordion-head d-flex align-items-center w-100 pe-3">
                            <div class="care-for-content d-flex align-items-center justify-content-between w-100">
                              <h6>UPI ACTIVE</h6>
                              <button
                                type="button"
                                className="button"
                                onClick={() => {
                                  setShowPaymentModal(true);
                                }}
                              >
                                Active Now
                              </button>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="pt-0">
                          <div className="payment-head d-flex align-items-center justify-content-between">
                            <p className="mb-0 d-flex align-items-center gap-3">
                              <img src={UPIImg} alt="upi" />
                              test@ybl
                            </p>
                            <img src={GPay} alt="gpay" />
                          </div>
                          <img src={QR} alt="qr" className="qr" />
                          <Link to="/">Test Now</Link>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
      {showPaymentModal && (
        <AddPaymentModal
          showPaymentModal={showPaymentModal}
          handleClosePaymentModal={() => setShowPaymentModal(false)}
          handleShowActivePayment={handleShowActivePayment}
        />
      )}
    </div>
  );
}

export default MasterAccount;
