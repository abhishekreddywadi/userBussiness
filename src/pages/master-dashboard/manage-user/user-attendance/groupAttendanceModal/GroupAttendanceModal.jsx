import React from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./groupAttendanceModal.scss";

function GroupAttendanceModal({ groupAttendanceShow, handleGroupAttendanceClose, handleShowStaffGroup }) {
  return (
    <Modal show={groupAttendanceShow} onHide={handleGroupAttendanceClose} centered className="group-attendance-modal">
      <Modal.Header>
        <Modal.Title>Mark Attendance</Modal.Title>
        <Button variant="link" className="close-icon" onClick={handleGroupAttendanceClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="info-container">
          <div className="info d-flex align-items-center mb-3">
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="me-3 icon" />
            <div>
              <h6>Zumba 5 to 6pm</h6>
              <p className="mb-1">MUF</p>
              <small>Lorem Ipsum Dolor Sit Amet...</small>
            </div>
          </div>
          <div className="staff-detail mb-4">
            <p>Student / 10</p>
            <p>Staff / 3</p>
            <Form.Control type="search" placeholder="Search" />
          </div>
        </div>

        <div className="date-picker d-flex justify-content-between mb-4">
          <Form.Control type="date" placeholder="Start Date" />
          <Form.Control type="date" placeholder="End Date" />
          <Button variant="primary">Submit</Button>
        </div>

        <div className="staff-section mb-4">
          <h6>STAFF</h6>
          <Row>
            {[...Array(8)].map((_, i) => (
              <Col xs={12} sm={4} md={3} key={i}>
                <div className="staff-member d-flex align-items-center">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" className="me-3" />
                  <div className="staff-section-text">
                    <p className="mb-0">ROHAN SINGH</p>
                    <small>MBL_5454</small>
                    <small>MUSIC TEACHER</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="students-section">
          <Table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td>
                    <div className="student d-flex align-items-center">
                      <FontAwesomeIcon icon={faUserCircle} size="2x" className="me-3" />
                      <div className="student-info">
                        <p className="mb-0">JEET KAUR</p>
                        <small>MU_1007 STUDENT</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Button variant="success" className="present">Present</Button>
                  </td>
                  <td>
                    <Button variant="danger" className="absent">Absent</Button>
                  </td>
                  <td>
                    <Button variant="warning" className="leave">On Leave</Button>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>Absent</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleShowStaffGroup}>Submit</Button>
        <Button variant="secondary" onClick={handleGroupAttendanceClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroupAttendanceModal;
