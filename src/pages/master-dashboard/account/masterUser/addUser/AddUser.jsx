import React, { useState, useRef, useContext } from "react";
import UserContext from "../../../../../context/UserContext";
import "./addUser.scss";
import Header from "../../../../../components/header/Header";
import Webcam from "react-webcam";

import FingerLock from "../../../../../assets/finger-lock.png";
import PinCode from "../../../../../assets/pin.png";
import FaceLock from "../../../../../assets/lock.png";
import MachineImg from "../../../../../assets/machine.png";

function AddUser() {
  const { navButtonClick } = useContext(UserContext);
  const [checkPhoneNum, setCheckPhoneNum] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const [imageSrc, setImageSrc] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [showFaceSignature, setShowFaceSignature] = useState(false);
  const [showPinSignature, setShowPinSignature] = useState(false);
  const [showFingerSignature, setShowFingerSignature] = useState(false);
  const [machineName, setMachineName] = useState("");
  const webcamRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  let timer;
  const [formData, setFormData] = useState({
    email: "",
    status: "",
    report: "",
    signature: "",
    file: null,
  });

  const handleOpenWebcam = () => {
    setIsWebcamOpen(true);
  };

  const handleCloseWebcam = () => {
    setIsWebcamOpen(false);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    handleCloseWebcam();
  };

  const handleCheckPhoneNum = () => {
    setCheckPhoneNum(true);
  };

  const handleCheckEmail = () => {
    setCheckEmail(true);
  };

  const handleFaceShow = () => {
    setShowFaceSignature(!showFaceSignature);
    setShowPinSignature(false);
    setShowFingerSignature(false);
  };
  const handleFingerShow = () => {
    setShowFaceSignature(false);
    setShowPinSignature(false);
    setShowFingerSignature(!showFaceSignature);
  };
  const handlePinShow = () => {
    setShowFaceSignature(false);
    setShowPinSignature(!showPinSignature);
    setShowFingerSignature(false);
  };

  const handleMouseEnter = () => {
    setIsActive(true);
    timer = setTimeout(() => {
      setIsCompleted(true);
    }, 1700);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsActive(false);
    setIsCompleted(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} create-user`}
    >
      <Header />
      <div className="container">
        <form action="">
          <div className="row" style={{ gap: "25px 0" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-3 d-flex flex-column align-items-center">
                  <div className="user-img mr-3">
                    {imageSrc && <img src={imageSrc} alt="Captured" />}
                  </div>
                  {!isWebcamOpen ? (
                    <button
                      type="button"
                      className="btn btn-primary mb-0 mt-3"
                      onClick={handleOpenWebcam}
                    >
                      Face KYC
                    </button>
                  ) : (
                    <div>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                      />
                      <button onClick={capture}>Capture</button>
                      <button onClick={handleCloseWebcam}>Close Webcam</button>
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                  <div className="signature-list d-flex align-items-center">
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handleFingerShow()}
                    >
                      <img
                        src={FingerLock}
                        alt="signature-icon"
                        style={{ height: 25, width: 25 }}
                      />{" "}
                      Fingerprint
                    </div>

                    <div
                      className="mx-3 d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handlePinShow()}
                    >
                      <img
                        src={PinCode}
                        alt="signature-icon"
                        style={{ height: 25, width: 25 }}
                      />{" "}
                      Passcode
                    </div>

                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handleFaceShow()}
                    >
                      <img
                        src={FaceLock}
                        alt="signature-icon"
                        style={{ height: 25, width: 25 }}
                      />{" "}
                      Face ID
                    </div>
                  </div>
                  {showFingerSignature && <a id="button"></a>}
                  {showPinSignature && (
                    <input
                      type="text"
                      name="signature"
                      value={formData.signature}
                      onChange={handleChange}
                    />
                  )}
                  {showFaceSignature && (
                    <div class="canvas">
                      <div
                        className={`face-id-wrapper ${
                          isActive ? "active" : ""
                        } ${isCompleted ? "completed" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <svg
                          class="face-id-default"
                          version="1.1"
                          viewBox="0 0 30 30"
                        >
                          <path
                            d="M12.062 20c.688.5 1.688 1 2.938 1s2.25-.5 2.938-1M20 12v2M10 12v2M15 12v4a1 1 0 0 1-1 1"
                            fill="none"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                          />
                          <g
                            fill="none"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                          >
                            <path d="M26 9V6a2 2 0 0 0-2-2h-3M9 4H6a2 2 0 0 0-2 2v3M21 26h3a2 2 0 0 0 2-2v-3M4 21v3a2 2 0 0 0 2 2h3" />
                          </g>
                        </svg>
                        <div class="circle green"></div>
                        <div class="circle blue"></div>
                        <div class="circle purple"></div>
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 80 80"
                        >
                          <path
                            class="path-tick"
                            stroke="#FFF"
                            stroke-width="5"
                            fill="none"
                            stroke-linecap="butt"
                            stroke-linejoin="butt"
                            d="M 25,45 35,55 60,30"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <select
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Machine for KYC
                    </option>
                    <option value="Machine 1">Machine 1</option>
                    <option value="Machine 2">Machine 2</option>
                  </select>
                  {machineName != "" && (
                    <div className="d-flex gap-2 justify-content-center align-items-center mt-3">
                      <span>
                        <img
                          src={MachineImg}
                          alt="machine"
                          style={{
                            width: 70,
                            height: 70,
                            objectFit: "contain",
                          }}
                        />
                      </span>
                      <p className="mb-0 d-flex flex-column align-items-center">
                        {machineName}
                        <span style={{ fontSize: 12 }}>A17 pro</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="input-container">
                <label htmlFor="">Select Option</label>
                <select name="" id="">
                  <option value="">Create Manually</option>
                  <option value="">RFID Machine</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-container">
                <label htmlFor="">Legal Name</label>
                <input type="text" placeholder="Add Department Name" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="input-container">
                <label htmlFor="">Last Name</label>
                <input type="text" placeholder="Add Last Name" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="input-container">
                <label htmlFor="">Phone Number</label>
                <div className="input-box d-flex align-items-center">
                  <input type="number" placeholder="Add Department Name" />
                  <button type="button" onClick={(e) => handleCheckPhoneNum(e)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {checkPhoneNum && (
              <div className="col-12 col-md-4">
                <div className="input-container">
                  <label htmlFor="">OTP</label>
                  <div className="input-box d-flex align-items-center">
                    <input type="number" placeholder="Add OTP" />
                    <button type="button">Submit</button>
                  </div>
                </div>
              </div>
            )}

            <div className="col-12 col-md-4">
              <div className="input-container">
                <label htmlFor="">Country</label>
                <select name="" id="">
                  <option value="">Australia</option>
                  <option value="">Bharat</option>
                  <option value="">Japan</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="input-container">
                <label htmlFor="">City</label>
                <select name="" id="">
                  <option value="">Australia</option>
                  <option value="">Bharat</option>
                  <option value="">Japan</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="input-container">
                <label htmlFor="">State</label>
                <select name="" id="">
                  <option value="">Australia</option>
                  <option value="">Bharat</option>
                  <option value="">Japan</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="input-container">
                <label htmlFor="">Email</label>
                <div className="input-box d-flex align-items-center">
                  <input type="email" placeholder="Add Email" />
                  <button type="button" onClick={(e) => handleCheckEmail(e)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {checkEmail && (
              <div className="col-12 col-md-4">
                <div className="input-container">
                  <label htmlFor="">OTP</label>
                  <div className="input-box d-flex align-items-center">
                    <input type="number" placeholder="Add Email OTP" />
                    <button type="button">Submit</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="button" className="btn button d-flex ml-auto mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
