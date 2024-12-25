import React from "react";
import "./userAuth.scss";
import Fingerprint from '../../../../assets/fingerprint.png'
import FaceLock from '../../../../assets/face-recognition.png'
import Pincode from '../../../../assets/pin.png'

function UserAuth() {
  return (
    <div className="setting-tab-container">
      <div className="setting-tab auth mt-5 mt-md-0 bg-white">
        <div className="auth-heading d-flex align-items-center gap-2 justify-content-between">
          <h6 className="mb-0">Two-factor authentication</h6>
          <p className="m-0 auth-tag enabled">Enabled</p>
        </div>
        <ul className="p-0 m-0 mt-5 w-100">
          <li className="d-flex align-items-center flex-wrap justify-content-between gap-3 py-3">
            <p className="mb-0">Security Keys</p>
            <div className="setup d-flex align-items-center gap-2">
              <span>No Security Keys</span>
              <button type="button">Add</button>
            </div>
          </li>
          <li className="d-flex align-items-center flex-wrap justify-content-between gap-3 py-3">
            <p className="mb-0">Email</p>
            <div className="setup d-flex align-items-center gap-2">
              <span>info@email.com</span>
              <button type="button">Edit</button>
            </div>
          </li>
          <li className="d-flex align-items-center flex-wrap justify-content-between gap-3 py-3">
            <p className="mb-0">Authenticator app</p>
            <div className="setup d-flex align-items-center gap-2">
              <span>Not Configured</span>
              <button type="button">Set up</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="auth-box-container d-flex flex-wrap align-items-start justify-content-center justify-content-md-between gap-4 gap-md-3">
        <h4 className="mb-0">Authenticator Login</h4>
        <div className="auth-list d-flex align-items-center gap-3">
          <div className="auth-box d-flex flex-column align-items-center gap-1">
            <img src={Pincode} alt="pin" />
            <p className="mb-0 font-weight-bold">Pincode</p>
            <button type="button" className="btn">Set</button>
          </div>
          <div className="auth-box d-flex flex-column align-items-center gap-1">
            <img src={FaceLock} alt="pin" />
            <p className="mb-0 font-weight-bold">Face ID</p>
            <button type="button" className="btn">Set</button>
          </div>
          <div className="auth-box d-flex flex-column align-items-center gap-1">
            <img src={Fingerprint} alt="pin" />
            <p className="mb-0 font-weight-bold">Fingerprint</p>
            <button type="button" className="btn">Set</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
