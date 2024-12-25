import React, { useState } from "react";
import UserImg from "../../../../assets/shree-ganesh.png";
import EmailIcon from "../../../../assets/email.png";
import PhoneIcon from "../../../../assets/phone-icon.png";
import MessageIcon from "../../../../assets/comment.png";
import "./masterUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBell } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import AddUser from "./addUser/AddUser";
import { Link } from "react-router-dom";

function MasterUser() {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const userData = [
    {
      id: 1,
      profession: "Student",
      image: UserImg,
      underSixteen: true,
      name: "Shree Ganesh",
      userId: "MU_123456",
      designation: "Artist",
      active: true,
      description: "This is a simple description",
      email: "user@gmail.com",
      phone: "+93123456789",
      address: "Banglore Karnataka, 144040",
    },
    {
      id: 2,
      profession: "Student",
      image: UserImg,
      underSixteen: true,
      name: "Shree Ganesh",
      userId: "MU_234567",
      designation: "Artist",
      active: true,
      description: "This is a simple description",
      email: "user@gmail.com",
      phone: "+93123456789",
      address: "Banglore Karnataka, 144040",
    },
    {
      id: 3,
      profession: "Student",
      image: UserImg,
      underSixteen: true,
      name: "Shree Ganesh",
      userId: "MU_345678",
      designation: "Artist",
      active: true,
      description: "This is a simple description",
      email: "user@gmail.com",
      phone: "+93123456789",
      address: "Banglore Karnataka, 144040",
    },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user);
  };

  return (
    <div className="master-user mt-4">
      <div className="user-list">
        <div className="user-options w-100 ">
          <div className="user-inputs d-flex align-items-center gap-3">
            <div className="input-container d-flex flex-column">
              <label htmlFor="">Select user Category</label>
              <select name="" id="">
                <option value="" default>
                  All Category
                </option>
                <option value="">Fitness</option>
                <option value="">House Cleaning</option>
                <option value="">Dance</option>
              </select>
            </div>
            <div className="input-container d-flex flex-column">
              <label htmlFor="">Work type</label>
              <select name="" id="">
                <option value="">Full Time</option>
                <option value="">Part Time</option>
                <option value="">Hourly Basis</option>
                <option value="">Contractual Basis</option>
              </select>
            </div>
          </div>

          <Link
            to="/add-user"
            className="btn button d-flex align-items-center justify-content-center ms-auto"
          >
            Add New user
          </Link>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="user-info d-block mt-2">
              <div className="user-info-list d-flex flex-column gap-2">
                {userData.map((user, i) => {
                  return (
                    <div
                      className="user-info-box d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between gap-2"
                      key={i}
                    >
                      <div className="user-image ps-2 pt-2">
                        <p>{user.designation}</p>
                        <img src={user.image} alt="user" />
                        <p>{user.underSixteen ? "Under 16" : "Above 16"}</p>
                      </div>
                      <div
                        className="user-info-content"
                        onClick={() => handleUserClick(user)}
                      >
                        <h6 className="mb-0">{user.name}</h6>
                        <span style={{ color: "#f26b80", fontSize: 12 }}>
                          <strong>{user.userId}</strong>
                        </span>
                        <p className="mb-0">{user.profession}</p>
                      </div>
                      <div className="user-info-join p-2">
                        <p className="d-flex flex-column align-items-center gap-0">
                          <FontAwesomeIcon icon={faBell} />
                          {user.active ? "Active" : "Inactive"}
                          <span>2</span>
                        </p>
                        <div className="join-buttons d-flex align-items-center gap-3">
                          <button
                            type="button"
                            className="bg-transparent border-0 p-0"
                          >
                            <img src={EmailIcon} alt="mail" />
                          </button>
                          <button
                            type="button"
                            className="bg-transparent border-0 p-0"
                          >
                            <img src={MessageIcon} alt="message" />
                          </button>
                          <button
                            type="button"
                            className="bg-transparent border-0 p-0"
                          >
                            <img src={PhoneIcon} alt="call" />
                          </button>
                          <button
                            type="button"
                            className="bg-transparent border-0 p-0"
                            onClick={() => setShowDescription(!showDescription)}
                          >
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              style={{
                                transform: showDescription
                                  ? "rotate(180deg)"
                                  : "rotate(0)",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                      {showDescription && (
                        <div className="user-info-desc px-3">
                          <p className="mb-0 pb-2">{user.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {selectedUser && (
              <div className="selected-list">
                <div className="user-info-box d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between gap-2 mb-4">
                  <div className="user-image ps-2 pt-2">
                    <p>{selectedUser.designation}</p>
                    <img src={selectedUser.image} alt="user" />
                    <p>{selectedUser.underSixteen ? "Under 16" : "Above 16"}</p>
                  </div>
                  <div className="user-info-content">
                    <h6 className="mb-0">{selectedUser.name}</h6>
                    <span style={{ color: "#f26b80", fontSize: 12 }}>
                      <strong>{selectedUser.userId}</strong>
                    </span>
                    <p className="mb-0">{selectedUser.profession}</p>
                  </div>
                  <div className="user-info-join p-2">
                    <div className="join-buttons d-flex flex-column align-items-center gap-3">
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 d-flex align-items-center gap-2"
                      >
                        <img src={EmailIcon} alt="mail" />
                        <span style={{ fontSize: 11 }}>
                          {selectedUser.email}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 d-flex align-items-center gap-2"
                      >
                        <img src={MessageIcon} alt="message" />
                        <span style={{ fontSize: 11 }}>
                          {selectedUser.email}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 d-flex align-items-center gap-2"
                      >
                        <img src={PhoneIcon} alt="call" />
                        <span style={{ fontSize: 11 }}>
                          {selectedUser.phone}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Activity with us</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Batch</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempo
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterUser;
