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
              className={`status-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <Row>
          <Col lg={8}>
            <div className="inquiry-list">
              <div className="inquiry-header-row">
                <div className="header-col name-id">NAME /ID</div>
                <div className="header-col interested">Interested</div>
                <div className="header-col for">FOR</div>
                <div className="header-col contact">Contact</div>
                <div className="header-col expand"></div>
              </div>
              {filterInquiries().map((inquiry) => (
                <div key={inquiry.id} className="inquiry-item">
                  <div className="inquiry-row" onClick={() => toggleInquiry(inquiry.id)}>
                    <div className="inquiry-col name-id">
                      <div className="user-avatar">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="name-id-content">
                        <h6>{inquiry.name}</h6>
                        <span className="id-badge">{inquiry.userId}</span>
                      </div>
                    </div>
                    <div className="inquiry-col interested">
                      <div className="class-info">
                        <span>{inquiry.class}</span>
                        <span className="for">FOR {inquiry.for}</span>
                      </div>
                    </div>
                    <div className="inquiry-col for">
                      <div className="age-info">
                        <span>AGE</span>
                        <span>{inquiry.age}</span>
                      </div>
                    </div>
                    <div className="inquiry-col contact">
                      <div className="contact-info">
                        <div>{inquiry.contact}</div>
                        <div>{inquiry.email}</div>
                      </div>
                    </div>
                    <div className="inquiry-col expand">
                      <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`expand-icon ${expandedInquiry === inquiry.id ? 'rotated' : ''}`}
                      />
                    </div>
                  </div>
                  {expandedInquiry === inquiry.id && (
                    <div className="inquiry-details">
                      <div className="detail-row">
                        <div className="detail-label">Additional Information:</div>
                        <div className="detail-content">
                          <p>Class Schedule: Monday, Wednesday, Friday</p>
                          <p>Preferred Time: Evening</p>
                          <p>Notes: Beginner level dance class</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="schedule-section">
              <div className="calendar-container">
                <div className="date-header">
                  <h2>28</h2>
                  <span>DEC 2025</span>
                </div>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="dashboard-calendar"
                />
              </div>
              <div className="schedule-list" style={{ overflow: "auto", height: "fit-content", padding: "20px",backgroundColor: "white",boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                <div className="date-header">
                  <h2>28</h2>
                  <span>DEC 2025</span>
                </div>
                {scheduleData.map((schedule, index) => (
                  <div key={index} className="schedule-item">
                    <div className="schedule-avatar">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="schedule-content">
                      <div className="time-title">
                        <span className="time">{schedule.time}</span>
                        <span className="title">{schedule.title}</span>
                      </div>
                      {schedule.instructor && (
                        <div className="instructor-id">
                          <span className="instructor">{schedule.instructor}</span>
                          <span className="id">{schedule.instructorId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4}>
          <div style={{ padding: "20px",height: "fit-content",backgroundColor: "#F26B80",position: "relative",bottom:"77px" }}  >
            
          
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
                  <span  style={{textAlign: "center"}}  >ID/NILL</span>
                </div>
              </div>
              <div className="profile-contact">
                <div>+917778889999</div>
                <div>RAHUL@GMAIL.COM</div>
              </div>
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;