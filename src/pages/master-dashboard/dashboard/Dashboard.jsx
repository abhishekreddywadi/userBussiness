import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faUser, 
  faChevronDown,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './dashboard.scss';
import Header from '../../../components/header/Header';
import UserContext from '../../../context/UserContext';

// Dummy data for inquiries
const inquiryData = [
  {
    id: 1,
    name: "RAKESH KOTHIA",
    userId: "ID/NILL",
    class: "DANCE CLASS",
    for: "MY SON",
    age: "7 YEAR",
    contact: "+917778889999",
    email: "RAHUL@GMAIL.COM",
  },
  {
    id: 2,
    name: "RAKESH KOTHIA",
    userId: "ID/NILL",
    class: "DANCE CLASS",
    for: "MY SON",
    age: "7 YEAR",
    contact: "+917778889999",
    email: "RAHUL@GMAIL.COM",
  },
  {
    id: 3,
    name: "RAKESH KOTHIA",
    userId: "ID/NILL",
    class: "DANCE CLASS",
    for: "MY SON",
    age: "7 YEAR",
    contact: "+917778889999",
    email: "RAHUL@GMAIL.COM",
  },
  {
    id: 4,
    name: "RAKESH KOTHIA",
    userId: "ID/NILL",
    class: "DANCE CLASS",
    for: "MY SON",
    age: "7 YEAR",
    contact: "+917778889999",
    email: "RAHUL@GMAIL.COM",
  },
  {
    id: 5,
    name: "RAKESH KOTHIA",
    userId: "ID/NILL",
    class: "DANCE CLASS",
    for: "MY SON",
    age: "7 YEAR",
    contact: "+917778889999",
    email: "RAHUL@GMAIL.COM",
  }
];

// Dummy data for schedule
const scheduleData = [
  {
    time: "8:00 AM",
    title: "KATHAK BATCH",
    instructor: "ROHAN SHING",
    instructorId: "MI-12345"
  },
  {
    time: "9:00 AM",
    title: "YOGA BATCH",
    instructor: "MASTER",
    instructorId: "MI-123456"
  },
  {
    time: "10:30 AM",
    title: "Practice session",
    instructor: "",
    instructorId: ""
  },
  {
    time: "11 AM",
    title: "LUNCH",
    instructor: "",
    instructorId: ""
  },
  {
    time: "4 PM",
    title: "BOLLYWOOD",
    instructor: "ROHAN DHING",
    instructorId: "MI-123456"
  }
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Inquiry");

  const toggleInquiry = (id) => {
    setExpandedInquiry(expandedInquiry === id ? null : id);
  };

  const filterInquiries = () => {
    return inquiryData.filter(inquiry =>
      Object.values(inquiry).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const { navButtonClick } = useContext(UserContext);

  return (
    <div
      className={`dashboard-container ${navButtonClick ? "dashboard-full" : ""}`}
    >
      <Header />
      <Container fluid className="p-0">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="status-tabs">
          {["Inquiry", "Request", "Free pending", "New user"].map((tab) => (
            <button
              key={tab}
              className={`status-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <Row>
          <Col lg={8}>
            <div className="inquiry-list">
              {filterInquiries().map((inquiry) => (
                <div key={inquiry.id} className="inquiry-item">
                  <div className="inquiry-header" onClick={() => toggleInquiry(inquiry.id)}>
                    <div className="user-avatar">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="inquiry-basic-info">
                      <div className="name-id">
                        <h6>{inquiry.name}</h6>
                        <span>{inquiry.userId}</span>
                      </div>
                      <div className="class-info">
                        <span>{inquiry.class}</span>
                        <span className="for">FOR {inquiry.for}</span>
                      </div>
                      <div className="age-info">
                        <span>AGE</span>
                        <span>{inquiry.age}</span>
                      </div>
                    </div>
                    <div className="contact-info">
                      <div>{inquiry.contact}</div>
                      <div>{inquiry.email}</div>
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`expand-icon ${expandedInquiry === inquiry.id ? 'rotated' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="schedule-section">
              <div className="calendar-container">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="dashboard-calendar"
                />
              </div>
              <div className="schedule-list">
                {scheduleData.map((schedule, index) => (
                  <div key={index} className="schedule-item">
                    <div className="time-slot">
                      <FontAwesomeIcon icon={faUser} className="instructor-avatar" />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="schedule-details">
                      <div className="title">{schedule.title}</div>
                      {schedule.instructor && (
                        <div className="instructor">
                          {schedule.instructor}
                          <span className="instructor-id">{schedule.instructorId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="action-buttons">
              <Button className="action-btn">ADD USER</Button>
              <Button className="action-btn">User verification</Button>
              <Button className="action-btn">Add staff</Button>
              <Button className="action-btn">Class and batches</Button>
              <Button className="action-btn">Inquiry form</Button>
              <Button className="action-btn">Registration form</Button>
            </div>

            <div className="user-profile-card">
              <div className="profile-header">
                <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                <div className="profile-info">
                  <h6>RAKESH KOTHIA</h6>
                  <span>ID/NILL</span>
                </div>
              </div>
              <div className="profile-contact">
                <div>+917778889999</div>
                <div>RAHUL@GMAIL.COM</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;