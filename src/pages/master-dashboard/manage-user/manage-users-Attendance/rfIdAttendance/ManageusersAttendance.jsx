import React, { useState, useEffect, useContext } from 'react';
import './ManageusersAttendance.css';
import dummyProfilePic from "../../../../../assets/user1.png";
import FaceRecognition from "../../../../../assets/faceRecognition.png";
import UserOne from "../../../../../assets/user1.png";
import UserTwo from "../../../../../assets/user2.png";
import UserThree from "../../../../../assets/user3.png";
import UserContext from '../../../../../context/UserContext';
import Header from '../../../../../components/header/Header';
import { Container } from 'react-bootstrap';

const ManageUsersAttendance = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 49, seconds: 30 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [timePeriod, setTimePeriod] = useState('daily');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBatch, setSelectedBatch] = useState('1');

  const batchOptions = [
    {
      id: '1',
      name: 'Kathak',
      schedule: 'M W F',
      capacity: '50/20',
      startTime: '5:00 pm',
      endTime: '6:00 pm',
      icon: UserOne
    },
    {
      id: '2',
      name: 'Bharatanatyam',
      schedule: 'T Th S',
      capacity: '30/15',
      startTime: '6:00 pm',
      endTime: '7:00 pm',
      icon: UserTwo
    },
    {
      id: '3',
      name: 'Contemporary',
      schedule: 'M T W',
      capacity: '40/25',
      startTime: '7:00 pm',
      endTime: '8:00 pm',
      icon: UserThree
    },
    {
      id: '4',
      name: 'Hip Hop',
      schedule: 'W F S',
      capacity: '35/18',
      startTime: '8:00 pm',
      endTime: '9:00 pm',
      icon: UserOne
    }
  ];

  const selectedBatchInfo = batchOptions.find(batch => batch.id === selectedBatch);

  const timeOptions = [
    '5:00 pm',
    '6:00 pm',
    '7:00 pm',
    '8:00 pm',
    '9:00 pm',
    '10:00 pm'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFilteredHistory = (user) => {
    if (!user) return [];
    
    const today = new Date();
    const history = [...user.history];

    switch (timePeriod) {
      case 'daily':
        return history.filter(entry => {
          const entryDate = new Date(entry.date.split('/').reverse().join('-'));
          return entryDate.toDateString() === today.toDateString();
        });
      case 'weekly':
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        return history.filter(entry => {
          const entryDate = new Date(entry.date.split('/').reverse().join('-'));
          return entryDate >= weekAgo;
        });
      case 'monthly':
        return history.filter(entry => {
          const entryDate = new Date(entry.date.split('/').reverse().join('-'));
          return entryDate.getMonth() === today.getMonth() &&
                 entryDate.getFullYear() === today.getFullYear();
        });
      case 'yearly':
        return history.filter(entry => {
          const entryDate = new Date(entry.date.split('/').reverse().join('-'));
          return entryDate.getFullYear() === today.getFullYear();
        });
      case 'custom':
        if (!customDateRange.start || !customDateRange.end) return history;
        const startDate = new Date(customDateRange.start);
        const endDate = new Date(customDateRange.end);
        return history.filter(entry => {
          const entryDate = new Date(entry.date.split('/').reverse().join('-'));
          return entryDate >= startDate && entryDate <= endDate;
        });
      default:
        return history;
    }
  };

  // Dummy data for attendance cards with different statuses
  const attendanceCards = [
    {
      id: 1,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'PRIYA NAYAR',
      studentId: 'MU 12345',
      timeIn: '5:00 PM',
      timeOut: '6:10 PM',
      attendanceStatus: 'present',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 2,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'RAHUL KUMAR',
      studentId: 'MU 12346',
      timeIn: null,
      timeOut: null,
      attendanceStatus: 'absent',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 3,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'SNEHA PATEL',
      studentId: 'MU 12347',
      timeIn: null,
      timeOut: null,
      attendanceStatus: 'onleave',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 4,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'AMIT SHAH',
      studentId: 'MU 12348',
      timeIn: '5:15 PM',
      timeOut: '6:10 PM',
      attendanceStatus: 'present',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 5,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'NEHA SINGH',
      studentId: 'MU 12349',
      timeIn: null,
      timeOut: null,
      attendanceStatus: 'absent',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 6,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'KIRAN RAO',
      studentId: 'MU 12350',
      timeIn: null,
      timeOut: null,
      attendanceStatus: 'onleave',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 7,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'ROHIT SHARMA',
      studentId: 'MU 12351',
      timeIn: '5:05 PM',
      timeOut: '6:10 PM',
      attendanceStatus: 'present',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    },
    {
      id: 8,
      batchName: 'KATHAK BATCH',
      status: 'ACTIVE',
      studentName: 'PRIYA VERMA',
      studentId: 'MU 12352',
      timeIn: null,
      timeOut: null,
      attendanceStatus: 'absent',
      history: [
        {
          date: '26/12/2024',
          inTime: '5:00 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '26/12/2024',
          inTime: '5:15 PM',
          outTime: 'NULL',
          method: 'RFID Card'
        },
        {
          date: '26/12/2024',
          inTime: '5:35 PM',
          outTime: '5:40 PM',
          method: 'Fingerprint'
        },
        {
          date: '25/12/2024',
          inTime: '5:35 PM',
          outTime: 'NULL',
          method: 'Face Recognition'
        },
        {
          date: '24/12/2024',
          inTime: '5:35 PM',
          outTime: '6:00 PM',
          method: 'RFID Card'
        }
      ]
    }
  ];

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setSelectedUser(null); // Clear selected user when changing filters
  };

  const getFilteredCards = () => {
    if (statusFilter === 'all') return attendanceCards;
    return attendanceCards.filter(card => card.attendanceStatus === statusFilter);
  };

  // Get counts for each status
  const getStatusCounts = () => {
    return attendanceCards.reduce((acc, card) => {
      acc[card.attendanceStatus] = (acc[card.attendanceStatus] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();
  const { navButtonClick } = useContext(UserContext);

  return (
    <div
    className={`dashboard ${navButtonClick && "dashboard-full"} batch-table`}
  >
    <Container>
    <Header />

    
    <div className="rfid-attendance">
      {/* Header */}
      <div className="header  " style={{color:"black",zIndex:"5"}}  >
        <div className="status-buttons">
          <button 
            className={`present-btn ${statusFilter === 'present' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('present')}
          >
            Presents ({statusCounts.present || 0})
          </button>
          <button 
            className={`absence-btn ${statusFilter === 'absent' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('absent')}
          >
            Absence ({statusCounts.absent || 0})
          </button>
          <button 
            className={`onleave-btn ${statusFilter === 'onleave' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('onleave')}
          >
            On leave ({statusCounts.onleave || 0})
          </button>
        </div>
        <div className="stats" style={{color:"black"}}  >
          <span>Number of presents: {statusCounts.present || 0}/8</span>
          <span>ON LEAVE: {statusCounts.onleave || 0}</span>
        </div>
        <div className="device-status" style={{color:"black"}}  >
          <img src={FaceRecognition} alt="Device" className="device-icon" />
          <div className="device-info">
            <span>A73PRO</span>
            <span className="connected" style={{color:"green"}} >Connected</span>
          </div>
          <div>
          <div style={{color:"black",display:"flex",gap:"5px",height:"100%",margin:"auto",alignItems:"center"}}  >
            <span style={{color:"#ffffff"}}  >current time :</span>
            <div className="clock" style={{color:"#ffffff"}}  >
              <div className="time" style={{color:"black"}} >{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
          <div style={{color:"black",display:"flex",gap:"5px",height:"100%",margin:"auto",alignItems:"center"}}>
          <span style={{color:"#ffffff",font:"bold"}}  > Batch ends-in :</span>
          <div className="timer" style={{color:"#ffffff"}}  >{timeLeft.minutes} MIN {timeLeft.seconds} SEC LEFT</div>
          </div>
          </div>
          <button className="close-btn">Click to close entry</button>
        </div>
      </div>

      {/* Batch Info */}
      <div className="batch-info" style={{color:"black",display:"flex", justifyContent:"space-between",height:"40px",marginBottom:"40px",boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)",borderBottom:"1px solid black" }} >
       
        <div className="batch-details"  >
          <div className="batch-selector-container" style={{color:"black",display:"flex",gap:"20px",marginBottom:"30px"}}>
            <div className="selected-batch-info">
              <img 
                src={selectedBatchInfo.icon} 
                alt={selectedBatchInfo.name} 
                className="batch-icon"
              />
              <div className="batch-text">
                <h3>{selectedBatchInfo.name}</h3>
                <p>{selectedBatchInfo.schedule} • {selectedBatchInfo.startTime} to {selectedBatchInfo.endTime}</p>
                <p className="capacity">Capacity: {selectedBatchInfo.capacity}</p>
              </div>
            </div>
            <select 
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="batch-select"
            >
              {batchOptions.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} - {batch.schedule} ({batch.startTime} to {batch.endTime}) - Capacity: {batch.capacity}
                </option>
              ))}
            </select>
            <div className="" style={{  color:"black",display:"flex",gap:"20px",height:"100%",margin:"auto",position:"relative",bottom:"15px"}}>
              <label htmlFor="date" style={{color:"black" ,textAlign:"center",paddingTop:"5px"  }} >Date</label>
              <input 
                type="date" 
                id="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
              
            </div>
          
          </div>
        </div>
      </div>

      {/* Attendance Cards Grid */}
      <div className="attendance-grid">
        {getFilteredCards().map((card) => (
          <div 
            key={card.id} 
            className={`attendance-card ${selectedUser?.id === card.id ? 'selected' : ''} ${card.attendanceStatus}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-header">
              <span>{card.batchName}</span>
              <span className="status">{card.status}</span>
            </div>
            <div className="student-info">
              <img src={dummyProfilePic} alt={card.studentName} className="student-photo" />
              <div className="student-details">
                <h3>{card.studentName}</h3>
                <p>{card.studentId}</p>
              </div>
            </div>
            <div className="time-info">
              <div>
                <span>Time in</span>
                <span>{card.timeIn || 'N/A'}</span>
              </div>
              <div>
                <span>Time out</span>
                <span>{card.timeOut || 'N/A'}</span>
              </div>
            </div>
            <button 
              className={`status-btn ${card.attendanceStatus}`}
              onClick={(e) => e.stopPropagation()}
            >
              {card.attendanceStatus.charAt(0).toUpperCase() + card.attendanceStatus.slice(1)}
            </button>
          </div>
        ))}
      </div>

      {/* Attendance Log */}
      {selectedUser && (
        <div className="attendance-log">
          <div className="log-header">
            <div className="user-info">
              <img src={dummyProfilePic} alt={selectedUser.studentName} className="user-photo" />
              <div>
                <h3>{selectedUser.studentName}</h3>
                <p>{selectedUser.studentId}</p>
              </div>
            </div>
            <div className="time-filter">
              <button 
                className={`filter-btn ${timePeriod === 'daily' ? 'active' : ''}`}
                onClick={() => setTimePeriod('daily')}
              >
                Daily
              </button>
              <button 
                className={`filter-btn ${timePeriod === 'weekly' ? 'active' : ''}`}
                onClick={() => setTimePeriod('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`filter-btn ${timePeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setTimePeriod('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`filter-btn ${timePeriod === 'yearly' ? 'active' : ''}`}
                onClick={() => setTimePeriod('yearly')}
              >
                Yearly
              </button>
              <div className={`custom-range ${timePeriod === 'custom' ? 'active' : ''}`}>
                <button 
                  className={`filter-btn ${timePeriod === 'custom' ? 'active' : ''}`}
                  onClick={() => setTimePeriod('custom')}
                >
                  Custom
                </button>
                {timePeriod === 'custom' && (
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                )}
              </div>
            </div>
            <button className="download-btn">DOWNLOAD</button>
          </div>
          <div className="log-content">
            <table className="log-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>IN TIME</th>
                  <th>OUT TIME</th>
                  <th>METHOD</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredHistory(selectedUser).map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.inTime}</td>
                    <td>{entry.outTime}</td>
                    <td>{entry.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </Container>
    </div>
  );
};

export default ManageUsersAttendance;