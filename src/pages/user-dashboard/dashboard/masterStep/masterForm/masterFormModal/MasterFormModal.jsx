import React from "react";
import "./masterFormModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MasterFormModal({ modalShow, handleModalClose, handleSubmittedReq }) {
  return (
    <Modal
      show={modalShow}
      onHide={handleModalClose}
      className="master-form-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Check your Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="d-flex flex-wrap gap-3 p-0 m-0">
          <li>
            <p className="mb-0">
              Legal Name: <strong>Shree Ganesh</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              Laste Name: <strong>DEF</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              Laste Name: <strong>DEF</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              Aadhar No. <strong>1621 XXXX XXXX</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              Phone <strong>+914545454545</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              Email <strong>info@email.com</strong>
            </p>
          </li>
          <li>
            <p className="mb-0">
              DOB <strong>01/02/1999</strong>
            </p>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmittedReq();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MasterFormModal;
