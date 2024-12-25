import { useState } from "react";
import { Link } from "react-router-dom";
import "./purchaseForm.scss";
import VisaImg from "../../../../../../assets/visa.png";
import AmexImg from "../../../../../../assets/amex.png";
import MasterCardImg from "../../../../../../assets/card.png";
import PayPalImg from "../../../../../../assets/paypal.png";
import GPayImg from "../../../../../../assets/google-pay.png";

function PurchaseForm({ handleNextStep }) {
  const [changeName, setChangeName] = useState(false);
  const [physicalId, setPhysicalId] = useState(false);
  const [sameShipping, setSameShipping] = useState(false);
  return (
    <div className="payment-form">
      <div className="payment-head">
        <p>
          <strong>*NOTE* </strong> Please take your ID with your real name. the
          masterId will be generated and linked to your real name. In case your
          ID is not linked to your real name, you may face problems with your
          purchases, services and so on. If you request or name changes again,
          there will be a charge.
        </p>
      </div>
      <div className="payment-container">
        <div className="purchase-container">
          <h5>Your Purchase</h5>
          <div className="purchase-list">
            <div className="order-list">
              <div className="order-box">
                <div className="order">
                  <span>1</span>
                  <p style={{ fontSize: 14 }}>
                    <span>Order ID</span>
                    <span>#1234</span>
                  </p>
                  <span className="img"></span>
                  <h5>BHA_12345678XXX</h5>
                  <p style={{ color: "#000" }}>$0.111</p>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="order">
                  <span>1</span>
                  <p style={{ fontSize: 14 }}>
                    <span>Order ID</span>
                    <span>#1234</span>
                  </p>
                  <span className="img"></span>
                  <h5>PHYSICAL_ID_CARD</h5>
                  <p style={{ color: "#000" }}>$0.111</p>
                  <input
                    type="checkbox"
                    id="physical-id"
                    onChange={() => {
                      setPhysicalId(!physicalId);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="order-note">
              <p>
                This ID is currently only valid in India on the Master Zone
                platform and with Master Zone's service partners. We are working
                on bringing the Master ID on international level. As new
                countries are added, you will receive notifications on your
                email.
              </p>
            </div>
          </div>

          <h5>BIlling Details</h5>
          <div className="change-info">
            <input
              type="checkbox"
              name=""
              id="change-proof"
              onChange={() => setChangeName(!changeName)}
            />
            <label htmlFor="change-proof">
              I want to change my name with Govt. proof
            </label>
          </div>
          <form action="" className="contact-form change-step-form">
            {changeName && (
              <>
                <div className="input-container">
                  <label htmlFor="">Legal Name</label>
                  <input type="text" />
                </div>
                <div className="input-container">
                  <label htmlFor="">Last Name</label>
                  <input type="text" />
                </div>
                <div className="input-container">
                  <label htmlFor="">Upload Document</label>
                  <input type="file" />
                </div>
              </>
            )}
            <div className="input-container">
              <label htmlFor="">USER ID</label>
              <input type="text" placeholder="M_XXXX56" disabled />
            </div>
            <div className="input-container">
              <label htmlFor="">AADHAR NUM.</label>
              <input type="text" placeholder="6214XXXXXXXXXX65" disabled />
            </div>
            <div className="input-container">
              <label htmlFor="">LEGAL NAME</label>
              <input type="text" placeholder="Shree Ganesh" disabled />
            </div>
            <div className="input-container">
              <label htmlFor="">PHONE</label>
              <div>
                <select name="" id="" disabled>
                  <option value="" disabled>
                    +91123456789
                  </option>
                  <option value="">+91</option>
                  <option value="">+92</option>
                </select>
                <input type="number" />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="">EMAIL</label>
              <input type="email" placeholder="info@email.com" disabled />
            </div>
            <div className="input-container">
              <label htmlFor="">CITY</label>
              <input type="text" placeholder="Solapur" disabled />
            </div>
          </form>

          {physicalId && (
            <>
              <h5>Shipping Address</h5>
              <div className="billing-details">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    fontSize: 14,
                  }}
                >
                  <p>* required fields</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                    }}
                  >
                    <input type="checkbox" id="same-shipping" onChange={() => {setSameShipping(!sameShipping)}} />
                    <label htmlFor="same-shipping">Same as Shipping address</label>
                  </div>
                </div>
                <form
                  action=""
                  className="billing-details-form billing-step-form"
                >
                  <div className="input-container">
                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder={sameShipping ? "Shree Ganesh" : ""} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="">State</label>
                    <select>
                      {sameShipping ?
                      <option>Maharashtra</option>
                      :
                      <>
                        <option>Select State</option>
                        <option>Maharashtra</option>
                      </>
                      }
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="">City</label>
                    <select>
                    {sameShipping ?
                      <option>Solapur</option>
                      :
                      <>
                        <option>Select City</option>
                        <option>Solapur</option>
                      </>
                      }
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="">Street Address</label>
                    <input
                      type="text"
                      placeholder={sameShipping ? "Solapur North, Pune, Maharashtra" : ""}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="">Buliding Name/House Num.</label>
                    <input type="text" placeholder={sameShipping ? "1059" : ""} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="">Postcode/ZIP</label>
                    <input type="text" placeholder={sameShipping ? "413007" : ""} />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        <div className="billing-form">
          <div className="billing-details">
            <h5>YOUR ORDER</h5>
            <ul>
              <li>
                <p>Product</p>
                <p>Total</p>
              </li>
              <li>
                <p>Master Id</p>
                <p>$23.88</p>
              </li>
              <li>
                <p>Shipping</p>
                <p>Free Shipping</p>
              </li>
              <li>
                <p>Total</p>
                <p>$23.88</p>
              </li>
            </ul>
            <h5>Payment Method</h5>
            <div className="payment">
              <div className="card-info">
                <p>
                  <input type="radio" name="" id="" />
                  Credit Card
                </p>
                <span>
                  <img src={VisaImg} alt="" />
                  <img src={MasterCardImg} alt="" />
                  <img src={AmexImg} alt="" />
                </span>
              </div>
              <div className="card-details"></div>
            </div>
            <div className="payment">
              <div className="card-info">
                <p>
                  <input type="radio" name="" id="" />
                  Paypal
                </p>
                <span>
                  <img src={PayPalImg} alt="" />
                </span>
              </div>
              <div className="card-details"></div>
            </div>
            <div className="payment">
              <div className="card-info">
                <p>
                  <input type="radio" name="" id="" />
                  GPay
                </p>
                <span>
                  <img src={GPayImg} alt="" />
                </span>
              </div>
              <div className="card-details"></div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="" style={{ fontSize: 12 }}>
                I have read all the <Link to="/">terms and agreement</Link>
              </label>
            </div>
            <p style={{ fontSize: 12 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut,
              maxime.
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              handleNextStep(e);
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseForm;
