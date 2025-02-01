import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/header/Header";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import AddPaymentModal from "./addPaymentModal/AddPaymentModal";
import MasterStaff from "./masterStaff/MasterStaff";
import MasterUser from "./masterUser/MasterUser";
import Loader from "../../../components/loader/Loader";

import PlanImg from "../../../assets/shree-ganesh.png";
import bruceMars from "../../../assets/shree-ganesh.png";
import VerifiedIcon from "../../../assets/verified.png";
import GPay from "../../../assets/gpay.png";
import QR from "../../../assets/qr.svg";
import UPIImg from "../../../assets/upi.jpg";
import PolicyImg from "../../../assets/policy.png";
import License from "../../../assets/license.png";

import "./masterAccount.scss";

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

const MasterAccount = () => {
  const { navButtonClick } = useContext(UserContext);
  const location = useLocation();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showActivePayemnt, setShowActivePayemnt] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [isLoadingThree, setIsLoadingThree] = useState(false);
  const [activeKey, setActiveKey] = useState(
    location.pathname.includes("/view-staff")
      ? "staff"
      : location.pathname.includes("/master-account")
      ? "info"
      : "student"
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    remarks: '',
    numberOfClasses: 1,
    selectedBatch: ''
  });

  const handleShowActivePayment = () => {
    setShowActivePayemnt(true);
    setShowPaymentModal(false);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
    setFormData({
      startDate: '',
      endDate: '',
      remarks: '',
      numberOfClasses: 1,
      selectedBatch: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderData(prev => ({
      ...prev,
      [selectedOrder.id]: formData
    }));
    closeOrderModal();
  };

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
      className={`dashboard ${navButtonClick && "dashboard-full"} master-account`}
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
                    <div className="row mt-4 gx-4">
                      {planData.map((data, i) => (
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
                      ))}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="staff" title="Packages">
                  <MasterStaff />
                </Tab>
                <Tab eventKey="student" title="Services">
                  <MasterUser />
                </Tab>
                <Tab eventKey="event" title="Events">
                  <MasterStaff />
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
                      <strong style={{ color: "green" }}>
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
                      <div 
                        className="order-card d-flex flex-column gap-2"
                        style={{backgroundColor: "#e5e5e5"}}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 p-3" 
                          style={{cursor: 'pointer'}}
                          onClick={() => handleOrderClick({
                            id: 1,
                            name: "Kathak",
                            schedule: "MWF",
                            time: "5:00 PM - 6:00 PM",
                            instructor: "John Doe",
                            image: "/path-to-kathak-image.jpg"
                          })}
                        >
                          <div>
                            <h5 className="mb-0">#1 Kathak</h5>
                            <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                          </div>
                          <p className="mb-0">Yearly</p>
                          <div style={{ textAlign: 'right' }}>
                            <h3 className="mb-0" style={{ fontSize: '1.25rem' }}>
                              Rs. 1200
                              <button className="btn p-0 ms-2">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </h3>
                          </div>
                        </div>
                        {orderData[1] && (
                          <div className="order-details p-3" style={{
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: '#f8fafc'
                          }}>
                            <div className="details-flex" style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: '2rem',
                              fontSize: '0.875rem',
                              alignItems: 'center'
                            }}>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Start Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[1].startDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>End Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[1].endDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Batch</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[1].selectedBatch}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Classes</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[1].numberOfClasses}</p>
                              </div>
                              {orderData[1].remarks && (
                                <div style={{ flex: '1 0 100%' }}>
                                  <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Remarks</p>
                                  <p style={{ margin: 0 }}>{orderData[1].remarks}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className="order-card d-flex flex-column gap-2"
                        style={{backgroundColor: "#e5e5e5"}}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 p-3" 
                          style={{cursor: 'pointer'}}
                          onClick={() => handleOrderClick({
                            id: 2,
                            name: "Salsa",
                            schedule: "MWF",
                            time: "6:00 PM - 7:00 PM",
                            instructor: "Jane Smith",
                            image: "/path-to-salsa-image.jpg"
                          })}
                        >
                          <div>
                            <h5 className="mb-0">#2 Salsa</h5>
                            <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                          </div>
                          <p className="mb-0">Yearly</p>
                          <div style={{ textAlign: 'right' }}>
                            <h3 className="mb-0" style={{ fontSize: '1.25rem' }}>
                              Rs. 1200
                              <button className="btn p-0 ms-2">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </h3>
                          </div>
                        </div>
                        {orderData[2] && (
                          <div className="order-details p-3" style={{
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: '#f8fafc'
                          }}>
                            <div className="details-flex" style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: '2rem',
                              fontSize: '0.875rem',
                              alignItems: 'center'
                            }}>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Start Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[2].startDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>End Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[2].endDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Batch</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[2].selectedBatch}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Classes</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[2].numberOfClasses}</p>
                              </div>
                              {orderData[2].remarks && (
                                <div style={{ flex: '1 0 100%' }}>
                                  <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Remarks</p>
                                  <p style={{ margin: 0 }}>{orderData[2].remarks}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className="order-card d-flex flex-column gap-2"
                        style={{backgroundColor: "#e5e5e5"}}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 p-3" 
                          style={{cursor: 'pointer'}}
                          onClick={() => handleOrderClick({
                            id: 3,
                            name: "Tap Dance",
                            schedule: "MWF",
                            time: "7:00 PM - 8:00 PM",
                            instructor: "Mike Johnson",
                            image: "/path-to-tap-dance-image.jpg"
                          })}
                        >
                          <div>
                            <h5 className="mb-0">#3 Tap Dance</h5>
                            <h3 style={{fontSize: "12px",fontWeight: "500"}} >MWF</h3>
                          </div>
                          <p className="mb-0">Yearly</p>
                          <div style={{ textAlign: 'right' }}>
                            <h3 className="mb-0" style={{ fontSize: '1.25rem' }}>
                              Rs. 1200
                              <button className="btn p-0 ms-2">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </h3>
                          </div>
                        </div>
                        {orderData[3] && (
                          <div className="order-details p-3" style={{
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: '#f8fafc'
                          }}>
                            <div className="details-flex" style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: '2rem',
                              fontSize: '0.875rem',
                              alignItems: 'center'
                            }}>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Start Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[3].startDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>End Date</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[3].endDate}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Batch</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[3].selectedBatch}</p>
                              </div>
                              <div style={{ minWidth: '120px' }}>
                                <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Classes</p>
                                <p style={{ fontWeight: '500', margin: 0 }}>{orderData[3].numberOfClasses}</p>
                              </div>
                              {orderData[3].remarks && (
                                <div style={{ flex: '1 0 100%' }}>
                                  <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>Remarks</p>
                                  <p style={{ margin: 0 }}>{orderData[3].remarks}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Summary Card */}
                    <div className="price-summary-card mt-4 mb-3" style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <h4 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '1rem'
                          }}>Price Summary</h4>
                          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            <p style={{ margin: '0.5rem 0' }}>Base Amount: Rs. 3600</p>
                            <p style={{ margin: '0.5rem 0' }}>GST (18%): Rs. 648</p>
                          </div>
                        </div>
                        <div style={{
                          textAlign: 'right',
                          backgroundColor: '#f1f5f9',
                          padding: '1rem 1.5rem',
                          borderRadius: '8px'
                        }}>
                          <p style={{ 
                            fontSize: '0.875rem', 
                            color: '#64748b',
                            margin: '0 0 0.25rem' 
                          }}>Total Amount</p>
                          <h3 style={{ 
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#0f172a',
                            margin: 0
                          }}>Rs. 4248</h3>
                        </div>
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
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          handleShowActivePayment={handleShowActivePayment}
        />
      )}

      {/* Order Details Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={closeOrderModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header" style={{
              borderBottom: '1px solid #e2e8f0',
              padding: '1rem 1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e293b',
                margin: 0
              }}>{selectedOrder?.name} Registration</h2>
              <button className="close-button" onClick={closeOrderModal} style={{
                border: 'none',
                background: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="startDate" className="form-label" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="endDate" className="form-label" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="remarks" className="form-label" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}>Remarks</label>
                  <textarea
                    className="form-control"
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '100px',
                      backgroundColor: '#fff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="numberOfClasses" className="form-label" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}>Number of Make-up Classes</label>
                  <div className="input-group" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <button 
                      type="button" 
                      className="btn"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        numberOfClasses: Math.max(1, prev.numberOfClasses - 1)
                      }))}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      id="numberOfClasses"
                      name="numberOfClasses"
                      value={formData.numberOfClasses}
                      onChange={handleInputChange}
                      min="1"
                      required
                      style={{
                        width: '80px',
                        padding: '0.75rem 1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        outline: 'none',
                        backgroundColor: '#fff'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button 
                      type="button" 
                      className="btn"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        numberOfClasses: prev.numberOfClasses + 1
                      }))}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="selectedBatch" className="form-label" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}>Select Your Batch</label>
                  <select
                    className="form-select"
                    id="selectedBatch"
                    name="selectedBatch"
                    value={formData.selectedBatch}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      outline: 'none',
                      backgroundColor: '#fff',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Choose a batch</option>
                    <option value="morning">Morning (6 AM - 7 AM)</option>
                    <option value="afternoon">Afternoon (2 PM - 3 PM)</option>
                    <option value="evening">Evening (6 PM - 7 PM)</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button 
                    type="button" 
                    onClick={closeOrderModal}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      background: '#fff',
                      color: '#475569',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterAccount;
