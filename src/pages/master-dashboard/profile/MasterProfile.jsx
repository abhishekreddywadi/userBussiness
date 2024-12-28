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
  faChevronUp,
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
  }
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

  const [openConversations, setOpenConversations] = useState([]);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "B2B ",
      businessTitle: "MASTER BUSINESS",
      notifications: 2,
      messages: [
        {
          id: 1,
          username: "ROHAN",
          userId: "MU12345",
          text: "Hi HOO, ARE YOU THIS DAY'S WHAT IS .....",
          timestamp: "2 hours ago",
        },
        {
          id: 2,
          username: "JOHN",
          userId: "MU12346",
          text: "Hello team, any updates on the project?",
          timestamp: "3 hours ago",
        },
        {
          id: 3,
          username: "SARAH",
          userId: "MU12347",
          text: "Meeting scheduled for tomorrow at 10 AM",
          timestamp: "5 hours ago",
        },
      ],
    },
    {
      id: 2,
      title: "TEAM ",
      businessTitle: "PROJECT ALPHA",
      notifications: 5,
      messages: [
        {
          id: 1,
          username: "MIKE",
          userId: "MU12348",
          text: "New requirements added to the document",
          timestamp: "1 hour ago",
        },
        {
          id: 2,
          username: "LISA",
          userId: "MU12349",
          text: "I'll review and update the timeline",
          timestamp: "4 hours ago",
        },
      ],
    },
  ]);

  const handleBusinessClick = (id) => {
    if (showBusinessPurchase === id) {
      setShowBusinessPurchase(null);
    } else {
      setShowBusinessPurchase(id);
    }
  };

  const toggleConversation = (conversationId) => {
    setOpenConversations((prev) =>
      prev.includes(conversationId)
        ? prev.filter((id) => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const handleReply = (conversationId, messageId) => {
    // Add your reply logic here
    console.log(`Replying to message ${messageId} in conversation ${conversationId}`);
  };

  console.log("showBusinessPurchase", showBusinessPurchase);

  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} master-profile`}
    >
      <Container>
        <Header />
        <div className="row py-3 py-md-5">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <div className="contacts-list-container d-flex flex-wrap align-items-center gap-3 mb-4">
              <h5 className="w-100 mb-3">
                📚 YOUR STUDENTS MEMBER CONTACTS BOOKS
              </h5>
              <div className="contact-list d-flex align-items-center flex-wrap gap-3">
                <div className="contact-box">
                  <button type="button">+</button>
                </div>
                {contactListData?.map((contact, i) => (
                  <div className="contact-box" key={i}>
                    <img src={contact.img} alt="contact-img" />
                    <span>{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="business-list-container">
              <h5 className="mb-4">Your Business 5/2</h5>
              <div className="business-list">
                {businessContactsData?.map((business, i) => (
                  <div className="business-box" key={i}>
                    <div className="business-header d-flex align-items-center gap-3">
                      <img src={ContactImg} alt="profile-img" className="business-img" />
                      <div className="business-info flex-grow-1">
                        <p 
                          onClick={() => navigate("/master-account")} 
                          className="business-name mb-1"
                        >
                          {business.name}
                        </p>
                        <div className="business-details">
                          <span className="id">
                            <strong>{business.master_id}</strong>
                          </span>
                          <span className="department">{business.department}</span>
                        </div>
                      </div>
                      <span
                        className="toggle-btn"
                        onClick={() => handleBusinessClick(business.id)}
                      >
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{ color: "#000" }}
                        />
                      </span>
                    </div>

                    <div className="user-staff-list mt-3">
                      <span
                        className="plan w-100"
                        style={{ color: !business.plan && "red" }}
                      >
                        {business.plan ? business.plan : "No Plan active."}
                      </span>
                      {showBusinessPurchase === business.id && (
                        <div className="purchase-details">
                          {business.plan ? (
                            <div className="plan-purchase">
                              <div className="purchase-info">
                                <h6>Purchase</h6>
                                <p>24/12/24</p>
                              </div>
                              <div className="expiry-info">
                                <h6>Exp On</h6>
                                <p>23/12/27</p>
                              </div>
                            </div>
                          ) : (
                            <div className="plan-purchase no-plan">
                              <h6>Purchase Now</h6>
                              <button type="button" className="purchase-btn">
                                Click here to Purchase
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-method mt-4">
              <div  style={{ display: "flex", justifyContent: "space-between",alignItems: "center" }} >
              <h5 className="mb-3">Create Business 5/3</h5>
              <button type="button" style={{ background: "#2F3458", color: "#fff" }} className="add-business-btn">
                <span>+</span> Add New Business
              </button>
              </div>
             
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="master-business-details">
              <div className="conversation-list">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="conversation-item">
                    <div
                      className="conversation-header"
                      style={{
                        // width: "100%",
                        borderBottom: "1px solid #ccc",
                        borderRadius: "20px",
                        padding: "20px",
                      }}
                      onClick={() => toggleConversation(conversation.id)}
                    >
                      <div className="header-content  d-flex align-items-center justify-content-between w-100">
                        <div className="user-info">
                          <span className="profile-icon">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <span className="conversation-title">
                            {conversation.title}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="business-title mb-0">
                            {conversation.businessTitle}
                          </h6>
                          <div className="notification-badge">
                            <FontAwesomeIcon icon={faBell} />
                            <span className="badge">{conversation.notifications}</span>
                          </div>
                          <div className="toggle-icon">
                            <FontAwesomeIcon
                              icon={
                                openConversations.includes(conversation.id)
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`conversation-messages ${
                        openConversations.includes(conversation.id) ? "open" : ""
                      }`}
                    >
                      {conversation.messages.map((message) => (
                        <div key={message.id} className="message-item">
                          <div className="user-avatar">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div className="message-content">
                            <div className="user-details">
                              <div className="user-info">
                                <span className="username">{message.username}</span>
                                <span className="user-id">ID {message.userId}</span>
                              </div>
                              <span className="timestamp">{message.timestamp}</span>
                            </div>
                            <p className="message-text">{message.text}</p>
                            <button
                              className="reply-btn"
                              onClick={() => handleReply(conversation.id, message.id)}
                            >
                              REPLY
                            </button>
                          </div>
                        </div>
                      ))}
                      <button className="view-all-btn">VIEW ALL</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MasterProfile;
