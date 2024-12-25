import "./signupStep.scss";
import UserImg from "../../../../assets/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function SignupStep() {
  return (
    <>
      <div className="signup-step">
        <div className="user-info">
          <div className="info-details">
            <span>
              <img src={UserImg} alt="user-img" />
            </span>
            <div className="details">
              <h5>Shree Ganesh</h5>
              <p>
                USER ID / <strong>MU_123456</strong>
              </p>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href="mailto:richarddavis@gmail.com">
                    richarddavis@gmail.com
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <a href="tel:+919555542311">+919555542311</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p>BHARAT Bangloare Karnataka 5689769</p>
                </li>
                <li>
                  <p>
                    <strong>AGE</strong>
                  </p>
                  <p>NULL</p>
                </li>
                <li>
                  <p>
                    <strong>DOB</strong>
                  </p>
                  <p>05/03/2024 / MAIL</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-password">
            <h3>Change Password</h3>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Enter New Password Again" />
            <button type="button">UPDATE PASSWORD</button>
            <div className="password-note">
              <p>
                <strong>Password Requirements</strong>
              </p>
              <ul>
                <li>
                  <strong></strong>Please follow this guide for a strong
                  password
                </li>
                <li>One special Character</li>
                <li>Min. 6 characters</li>
                <li>On number (2 are recommended)</li>
                <li>Change it often</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupStep;
