import React, { useState, useRef } from "react";
import UPI from "../../../../assets/upi.jpg";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import './addPaymentModal.scss'

function AddPaymentModal({ showPaymentModal, handleClosePaymentModal, handleShowActivePayment }) {
  const qrRef = useRef();
  const [qrImage, setQrIMage] = useState(null)
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrIMage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    qrRef.current.click();
    console.log("Done");
  };

  return (
    <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered className="payment-modal">
      <Modal.Header closeButton>Add Payment Method</Modal.Header>
      <Modal.Body>
        <form>
          <div className="input-container">
            <label htmlFor="">Select UPI Platform</label>
            <div className="d-flex align-items-center">
              <img src={UPI} alt="upi" className="me-3" style={{width: 40,}} />
              <select>
                <option value="" default disabled>
                  Select a Platform
                </option>
                <option value="">Google Pay</option>
                <option value="">PhonePe</option>
                <option value="">Paytm</option>
                <option value="">Amazon Pay</option>
                <option value="">CRED UPI</option>
              </select>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="">Enter UPI</label>
            <input type="text" />
          </div>
          <div className="input-container">
            <label htmlFor="">Enter Name</label>
            <input type="text" />
          </div>
          <div className="input-container">
            <div className="d-flex align-items-center gap-5 mb-2">
            <label htmlFor="">QR</label>
              <button
                type="button"
                onClick={() => handleUploadClick()}
                className="upload-btn"
              >
                Upload
              </button>
            </div>
            <div className="image-upload">
              <input
                type="file"
                ref={qrRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
              <span>
                {qrImage && (
                  <img src={qrImage} alt="PAN Card front" />
                )}
              </span>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleShowActivePayment}>Submit</Button>
        <Button variant="secondary" onClick={handleClosePaymentModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPaymentModal;
