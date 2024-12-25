import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Header from "../../../components/header/Header";
import ContactImg from "../../../assets/shree-ganesh.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faGear,
  faPencil,
  faUser,
  faChevronDown,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import "./masterProfile.scss";

const contactListArray = [
  {
    name: "Abbie W",
    img: ContactImg,
  },
  {
    name: "Boris U",
    img: ContactImg,
  },
  {
    name: "Kay R",
    img: ContactImg,
  },
  {
    name: "Tom M",
    img: ContactImg,
  },
  {
    name: "Nicole N",
    img: ContactImg,
  },
  {
    name: "Marie P",
    img: ContactImg,
  },

  {
    name: "Bruce M",
    img: ContactImg,
  },
  {
    name: "Sandra A",
    img: ContactImg,
  },
  {
    name: "Katty L",
    img: ContactImg,
  },
  {
    name: "Emma O",
    img: ContactImg,
  },
];

const businessContactsArray = [
  {
    id: 1,
    img: ContactImg,
    name: "AALOKA THE SCHOOL OF DANCE AND FITNESS",
    department: "FITNESS Department.",
    master_id: "MB123456789-0",
  },
  {
    id: 2,
    img: ContactImg,
    name: "AALOKA THE SCHOOL OF DANCE AND FITNESS",
    plan: "Gold Plan 3 Year",
    department: "FITNESS Department.",
    master_id: "MB123456789-0",
  },
];

const franchiseArray = [
  {
    name: "Reebok",
    contact: "+919898989999",
    email: "reebook@gmail.com",
    address: "JP Nagar Bangalore Karnataka 560033",
    category: "Fitness Clothes",
  },
  {
    name: "Reebok",
    contact: "+919898989999",
    email: "reebook@gmail.com",
    address: "JP Nagar Bangalore Karnataka 560033",
    category: "Fitness Clothes",
  },
  {
    name: "Reebok",
    contact: "+919898989999",
    email: "reebook@gmail.com",
    address: "JP Nagar Bangalore Karnataka 560033",
    category: "Fitness Clothes",
  },
];

function MasterProfile() {
  const navigate = useNavigate();
  const { navButtonClick } = useContext(UserContext);
  const [contactListData, setContactListData] = useState(contactListArray);
  const [businessContactsData, setBusinessContactsData] = useState(
    businessContactsArray
  );
  const [showBusinessPurchase, setShowBusinessPurchase] = useState(null);
  const [franchiseData, setFranchiseData] = useState(franchiseArray);

  const handleBusinessClick = (id) => {
    if (showBusinessPurchase === id) {
      setShowBusinessPurchase(null);
    } else {
      setShowBusinessPurchase(id);
    }
  };

  console.log("showBusinessPurchase", showBusinessPurchase)

  return (
    <div className={`dashboard ${ navButtonClick && "dashboard-full" } master-profile`}>
      <Container>
        <Header />
        <div className="row py-5">
          <div className="col-12 col-md-7 col-lg-8">
            <div className="contacts-list-container d-flex flex-wrap align-items-center gap-3">
              <h5 className="w-100 mb-0">
                📚 YOUR STUDENTS MEMBER CONTACTS BOOKS
              </h5>
              <div className="contact-list d-flex align-items-center gap-4">
                <div className="contact-box">
                  <button type="button">+</button>
                </div>
                {contactListData?.map((contact, i) => {
                  return (
                    <div className="contact-box" key={i}>
                      <img src={contact.img} alt="contact-img" />
                      <span>{contact.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="business-list-container mt-5">
              <h5 className="mb-4">Your Business 5/2</h5>
              <div className="business-list">
                {businessContactsData?.map((business, i) => {
                  return (
                    <div className="business-box" key={i}>
                      <img src={ContactImg} alt="profile-img" />
                      <p onClick={() => navigate('/master-account')} style={{cursor: 'pointer'}}>{business.name}</p>
                      <span>
                        <strong>{business.master_id}</strong>
                      </span>
                      <span>{business.department}</span>
                      <span
                        onClick={() =>
                            handleBusinessClick(business.id)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{ color: "#000" }}
                        />
                      </span>

                      <div className="user-staff-list d-flex flex-column w-100 mt-2">
                        <span
                          className="plan w-100"
                          style={{ color: !business.plan && "red" }}
                        >
                          {business.plan ? business.plan : "No Plan active."}
                        </span>
                        {showBusinessPurchase === business.id && (
                          <>
                            {business.plan ? (
                              <div className="plan-purchase">
                                <h6>
                                  <p>Purchase</p>
                                  <p>24/12/24</p>
                                </h6>

                                <h6>
                                  <p>Exp On</p>
                                  <p>23/12/27</p>
                                </h6>
                              </div>
                            ) : (
                              <div className="plan-purchase no-plan">
                                <h6>
                                  <p>Purchase Now</p>
                                  <button type="button">
                                    Click here to Purchase
                                  </button>
                                </h6>
                              </div>
                            )}

                            <div className="user-staff-box-list d-flex align-items-center justify-content-between w-100">
                              <div className="user-staff-box">
                                <p>User</p>
                                <div className="images">
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                </div>
                                <p>300/20</p>
                              </div>
                              <div className="user-staff-box">
                                <p>Staff</p>
                                <div className="images">
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                  <img src={ContactImg} alt="contact-img" />
                                </div>
                                <p>300/20</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="payment-method mt-5">
              <h5 className="mb-0">Create Business 5/3</h5>
              <button type="button">
                <span>+</span> Add New Business
              </button>
            </div>
            {/* <div className="franchise-list mt-5">
              <div className="franchise-head d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <h5 className="mb-0">Business Franchise</h5>
                <div className="business-dropdown">
                  <p className="mb-1">Select your Business</p>
                  <select name="" id="">
                    <option value="">Reebok</option>
                  </select>
                </div>
              </div>
              {franchiseData?.map((data, i) => {
                return (
                  <div className="franchise-box" key={i}>
                    <div className="franchise-box-head">
                      <h6>{data.name}</h6>
                      <div className="category">
                        <p className="mb-1">Category: {data.category}</p>
                        <div className="edit-icons d-flex aling-items-center justify-content-end gap-3">
                          <button type="button">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button type="button">
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                          <button type="button">
                            <span>EDIT</span>
                          </button>
                          <button type="button">
                            <FontAwesomeIcon icon={faGear} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="mb-1">Contact Number: {data.contact}</p>
                    <p className="mb-1">Email address: {data.email}</p>
                    <p className="mb-1">Address: {data.address}</p>
                    <div className="active-users d-flex flex-wrap align-items-center gap-5 mt-3">
                      <div className="users active-user-box d-flex align-items-center gap-3">
                        <p className="mb-0">Active users 200</p>
                        <div className="images d-flex align-items-center">
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                        </div>
                      </div>
                      <div className="staff active-user-box d-flex align-items-center gap-3">
                        <p className="mb-0">Staff B</p>
                        <div className="images d-flex align-items-center">
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                          <img src={ContactImg} alt="user" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
          <div className="col-12 col-md-5 col-lg-4">
            <div className="master-business-details">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="icon">
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <span>B2B CONVERSATION</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span>2</span>
                    </div>
                    <h6 className="mb-0">MASTER BUSINESS</h6>
                    <div className="images d-flex align-items-center">
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <div className="icon">
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <span>B2B CONVERSATION</span>
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span>2</span>
                    </div>
                    <h6 className="mb-0">MASTER BUSINESS</h6>
                    <div className="images d-flex align-items-center">
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                      <img src={ContactImg} alt="user" />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MasterProfile;
