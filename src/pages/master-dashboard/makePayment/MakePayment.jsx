import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/header/Header";
import UserImg from "../../../assets/shree-ganesh.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./makePayment.scss";

// Dummy staff data
const staffData = {
  raghav: {
    name: "Raghav Jain",
    masterId: "MZI_00651",
    profession: "Music Teacher",
    phone: "+91123456789",
    email: "raghav@gmail.com",
    balance: 300,
    image: UserImg
  },
  anubhav: {
    name: "Anubhav",
    masterId: "MZI_00652",
    profession: "Dancer",
    phone: "+91987654321",
    email: "anubhav@gmail.com",
    balance: 500,
    image: UserImg
  }
};

const membershipData = [
  {
    id: 1,
    planName: "Hip Hop",
    planTime: "5pm to 6pm",
    planTypeDuration: "Monthly",
    planPrice: 2000,
    planType: "Dance",
    planDuration: "5th Jan to 4th Feb",
  },
  {
    id: 2,
    planName: "Hip Hop",
    planTime: "5pm to 6pm",
    planTypeDuration: "Monthly",
    planPrice: 2000,
    planType: "Dance",
    planDuration: "5th Jan to 4th Feb",
  },
  {
    id: 3,
    planName: "Hip Hop",
    planTime: "5pm to 6pm",
    planTypeDuration: "Monthly",
    planPrice: 2000,
    planType: "Dance",
    planDuration: "5th Jan to 4th Feb",
  },
  {
    id: 4,
    planName: "Hip Hop",
    planTime: "5pm to 6pm",
    planTypeDuration: "Monthly",
    planPrice: 2000,
    planType: "Dance",
    planDuration: "5th Jan to 4th Feb",
  },
];

// Dummy courses data
const availableCourses = [
  { id: 1, name: "Yoga Basic Course", price: 2999 },
  { id: 2, name: "Advanced Fitness Training", price: 4999 },
  { id: 3, name: "Zumba Dance Course", price: 3499 },
  { id: 4, name: "CrossFit Program", price: 5999 },
  { id: 5, name: "Personal Training Sessions", price: 7999 },
];

const availableEvents = [
  { id: 1, name: "Yoga Workshop", price: 1499, date: "2024-02-15" },
  { id: 2, name: "Fitness Challenge", price: 2499, date: "2024-02-20" },
  { id: 3, name: "Dance Competition", price: 1999, date: "2024-02-25" },
  { id: 4, name: "Health Seminar", price: 999, date: "2024-03-01" },
  { id: 5, name: "Meditation Retreat", price: 3999, date: "2024-03-05" },
];

const availablePlans = [
  { id: 1, name: "Basic Membership", price: 9999, duration: "3 months" },
  { id: 2, name: "Silver Membership", price: 18999, duration: "6 months" },
  { id: 3, name: "Gold Membership", price: 34999, duration: "12 months" },
  { id: 4, name: "Premium Membership", price: 49999, duration: "12 months" },
  { id: 5, name: "Student Special", price: 7999, duration: "3 months" },
];

const availableTrainings = [
  { id: 1, name: "Personal Training Basic", price: 4999, sessions: "5 sessions" },
  { id: 2, name: "Personal Training Pro", price: 8999, sessions: "10 sessions" },
  { id: 3, name: "Group Training Basic", price: 3999, sessions: "8 sessions" },
  { id: 4, name: "Sports Training", price: 6999, sessions: "8 sessions" },
  { id: 5, name: "Elite Training Package", price: 12999, sessions: "15 sessions" },
];

const MakePayment = () => {
  const { navButtonClick } = useContext(UserContext);
  const [haveMasterId, setHaveMasterId] = useState(false);
  const [masterId, setMasterId] = useState("");
  const [otherMember, setOtherMember] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [existedMember, setExistedMember] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  
  // Modal states
  const [showClassModal, setShowClassModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  
  // Selection states
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedTraining, setSelectedTraining] = useState("");

  // Selected items with full details
  const [selectedItems, setSelectedItems] = useState([]);

  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [payedAmount, setPayedAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [coupon, setCoupon] = useState('');
  const [paymentMode, setPaymentMode] = useState('GPay');
  const [chequeNumber, setChequeNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const handleRenewClick = (planName) => {
    setSelectedPlans((prevPlans) => [...prevPlans, planName]);
  };

  const handleRemoveClick = (planName) => {
    setSelectedPlans((prevPlans) =>
      prevPlans.filter((plan) => plan !== planName)
    );
  };

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleSelection = (type, value) => {
    switch(type) {
      case 'course':
        setSelectedCourse(value);
        break;
      case 'event':
        setSelectedEvent(value);
        break;
      case 'plan':
        setSelectedPlan(value);
        break;
      case 'training':
        setSelectedTraining(value);
        break;
    }
  };

  const handleCheckout = (type) => {
    let selected;
    let data;
    
    switch(type) {
      case 'course':
        selected = selectedCourse;
        data = availableCourses;
        setShowClassModal(false);
        setSelectedCourse("");
        break;
      case 'event':
        selected = selectedEvent;
        data = availableEvents;
        setShowEventModal(false);
        setSelectedEvent("");
        break;
      case 'plan':
        selected = selectedPlan;
        data = availablePlans;
        setShowPlanModal(false);
        setSelectedPlan("");
        break;
      case 'training':
        selected = selectedTraining;
        data = availableTrainings;
        setShowTrainingModal(false);
        setSelectedTraining("");
        break;
    }

    if (selected) {
      const item = data.find(i => i.id === parseInt(selected));
      if (item) {
        setSelectedItems(prev => [...prev, { ...item, type }]);
        setSelectedPlans([...selectedPlans, item.name]);
      }
    }
  };

  const removeItem = (index) => {
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems.splice(index, 1);
      return newItems;
    });
    setSelectedPlans(prev => {
      const newPlans = [...prev];
      newPlans.splice(index, 1);
      return newPlans;
    });
  };

  const handleAdditionalCharge = () => {
    const nameInput = document.querySelector('input[name="chargeName"]');
    const amountInput = document.querySelector('input[name="chargeAmount"]');
    
    if (nameInput.value && amountInput.value) {
      setAdditionalCharges([...additionalCharges, {
        name: nameInput.value,
        amount: parseFloat(amountInput.value)
      }]);
      nameInput.value = '';
      amountInput.value = '';
    }
  };

  const removeAdditionalCharge = (index) => {
    setAdditionalCharges(additionalCharges.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const itemsTotal = selectedItems.reduce((total, item) => total + item.price, 0);
    const additionalTotal = additionalCharges.reduce((total, charge) => total + charge.amount, 0);
    const discountAmount = discount ? (itemsTotal * parseFloat(discount) / 100) : 0;
    return itemsTotal + additionalTotal - discountAmount;
  };

  const calculateBalance = () => {
    return calculateTotal() - (parseFloat(payedAmount) || 0);
  };

  const BookingModal = ({ 
    show, 
    onClose, 
    title, 
    data, 
    selected, 
    onSelect, 
    type,
    extraInfo 
  }) => {
    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button 
              className="close-btn"
              onClick={() => {
                onClose();
                onSelect(type, "");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="modal-body">
            <div className="course-selection">
              <label htmlFor={type}>Choose {title}:</label>
              <select 
                id={type} 
                value={selected} 
                onChange={(e) => onSelect(type, e.target.value)}
                className="course-select"
              >
                <option value="">Select an option</option>
                {data.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}     -     ₹{item.price}     {extraInfo && `     ${item[extraInfo]}`}
                  </option>
                ))}
              </select>
            </div>
            {selected && (
              <div className="selected-course-details">
                <h4>Selected Details:</h4>
                <div className="details">
                  {(() => {
                    const item = data.find(i => i.id === parseInt(selected));
                    return (
                      <>
                        <p>Name: {item.name}</p>
                        <p>Price: ₹{item.price}</p>
                        {extraInfo && <p>{extraInfo}: {item[extraInfo]}</p>}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button 
              className="cancel-btn"
              onClick={() => {
                onClose();
                onSelect(type, "");
              }}
            >
              Cancel
            </button>
            <button 
              className="checkout-btn"
              disabled={!selected}
              onClick={() => handleCheckout(type)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} make-payment`}
    >
      <Header />
      <div className="make-payment-container">
        <h2>Payment Transaction</h2>
        <div className="bg-white p-3 p-md-4 rounded">
          <form>
            <div className="row">
              <div className="col-12 py-2 col-md-6 d-flex align-items-start gap-3">
                <div className="input-container flex-row align-items-center gap-2">
                  <input 
                    type="checkbox" 
                    name="existed" 
                    id="existed" 
                    checked={existedMember}
                    onChange={() => {
                      setExistedMember(!existedMember);
                      setSelectedStaff(""); // Reset selected staff when toggling existed member
                    }}
                  />
                  <label className="pb-0" htmlFor="existed">
                    Existed Member
                  </label>
                </div>
                <div className="input-container flex-row align-items-center gap-2">
                  <input
                    type="checkbox"
                    name="other"
                    id="other"
                    checked={otherMember}
                    onChange={() => setOtherMember(!otherMember)}
                  />
                  <label className="pb-0" htmlFor="other">
                    Other Member
                  </label>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <div className="input-container flex-row align-items-center gap-2">
                  <input
                    type="checkbox"
                    name="have_master_id"
                    id="have_master_id"
                    checked={haveMasterId}
                    onChange={() => setHaveMasterId(!haveMasterId)}
                  />
                  <label className="pb-0" htmlFor="have_master_id">
                    Do you have Master ID?
                  </label>
                </div>
                {haveMasterId && (
                  <div className="input-container d-flex flex-column gap-2">
                    <label>Enter Master ID</label>
                    <input type="text" />
                  </div>
                )}
              </div>

              {existedMember && (
                <div className="col-12 py-2 col-md-6">
                  <div className="input-container">
                    <label>Select User/Staff</label>
                    <select 
                      className="w-100" 
                      value={selectedStaff} 
                      onChange={handleStaffChange}
                    >
                      <option value="">Select User/Staff</option>
                      <option value="raghav">Raghav Jain/Music Teacher</option>
                      <option value="anubhav">Anubhav/Dancer</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedStaff && staffData[selectedStaff] && (
                <>
                  <div className="col-12 py-2 col-md-6">
                    {otherMember && (
                      <div className="input-container">
                        <div className="d-flex align-items-center justify-content-between mb-1 mt-2">
                          <label className="mb-0">User Master ID</label>
                          <button type="button" className="btn btn-primary verify py-1">
                            Verify
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Master ID"
                          className="w-100"
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-12 py-2 col-md-6   "  >
                    <div className="payment-profile d-flex flex-column flex-md-row gap-3 align-items-center">
                      <div className="profile-img d-flex flex-column align-items-center justify-content-center gap-2">
                        <img src={staffData[selectedStaff].image} alt="user-img" />
                        <p className="mb-0">{staffData[selectedStaff].name}</p>
                      </div>
                      <div className="profile-details">
                        <p className="mb-1">
                          Master ID: <strong>{staffData[selectedStaff].masterId}</strong>
                        </p>
                        <p className="mb-1">
                          Profession: <strong>{staffData[selectedStaff].profession}</strong>
                        </p>
                        <p className="mb-1">
                          Phone Number: <strong>{staffData[selectedStaff].phone}</strong>
                        </p>
                        <p className="mb-0">
                          Email ID: <strong>{staffData[selectedStaff].email}</strong>
                        </p>
                        <div className="mt-4">
                          <strong className="text-danger">Balance: Rs.{staffData[selectedStaff].balance}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 py-2 col-md-6">
                    <p>His Membership with you</p>
                    <ul className="membership-data-list d-flex flex-column gap-4 gap-md-2">
                      {membershipData.map((memberData) => (
                        <li
                          key={memberData.id}
                          className="d-flex flex-column flex-md-row align-items-center gap-3"
                        >
                          <div className="membership-data">
                            <div>
                              <p className="mb-0">{memberData.planName}</p>
                              <span>
                                {memberData.planTypeDuration}: {memberData.planPrice}
                              </span>
                            </div>
                            <div>
                              <p className="mb-0">Type</p>
                              <span>{memberData.planType}</span>
                            </div>
                            <div>
                              <p className="text-danger mb-0">5 Days Left</p>
                              <span>{memberData.planDuration}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className={`button mx-auto mx-md-0 mt-1 mt-md-0 ${
                              selectedPlans.includes(memberData.planName)
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              selectedPlans.includes(memberData.planName)
                                ? handleRemoveClick(memberData.planName)
                                : handleRenewClick(memberData.planName)
                            }
                          >
                            {selectedPlans.includes(memberData.planName) ? (
                              <>
                                <FontAwesomeIcon icon={faTrash} /> Remove
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faCheck} /> Renew
                              </>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <div className="col-12 py-2">
                <h5 className="mt-4 mb-3">Select Packages</h5>
                <ul className="d-flex align-items-center gap-3">
                  {selectedPlans.map((planName, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-center gap-2 shadow py-2 px-3"
                      style={{ width: "fit-content" }}
                    >
                      {planName}
                      <button
                        type="button"
                        className="btn btn-sm p-0"
                        style={{ lineHeight: "1" }}
                        onClick={() => handleRemoveClick(planName)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 py-2 col-md-8 d-flex align-items-center gap-3 my-4">
                <select className="w-100">
                  <option value="select">Select Package</option>
                </select>
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ minWidth: "fit-content" }}
                >
                  <input type="checkbox" name="package" id="package" />
                  <label htmlFor="package" className="pb-0">
                    This is a package
                  </label>
                </div>
              </div>

              <div className="col-12 py-2 col-md-6">
                <label className="pb-3">
                  Select package/ course/ Events/ Booking
                </label>
                <div className="plan-bookings d-flex flex-column gap-2">
                  <button 
                    type="button"
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowClassModal(true);
                    }}
                  >
                    Book Class
                  </button>
                  <button 
                    type="button" 
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEventModal(true);
                    }}
                  >
                    Book Event
                  </button>
                  <button 
                    type="button" 
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPlanModal(true);
                    }}
                  >
                    Book Plan
                  </button>
                  <button 
                    type="button" 
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTrainingModal(true);
                    }}
                  >
                    Book Training
                  </button>
                </div>
              </div>

              <div className="payment-details-card">
                <div className="additional-charges">
                  <label className="checkbox-label">
                    <input type="checkbox" /> Add additional charges
                  </label>
                  <div className="charges-inputs">
                    <div className="input-group">
                      <input type="text" placeholder="Name" name="chargeName" />
                      <input type="number" placeholder="Amount" name="chargeAmount" />
                      <button type="button" className="add-btn" onClick={handleAdditionalCharge}>
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button type="button" className="remove-btn">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  {additionalCharges.map((charge, index) => (
                    <div key={index} className="charge-item">
                      <span>{charge.name}</span>
                      <span>₹{charge.amount}</span>
                      <button onClick={() => removeAdditionalCharge(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="payment-fields">
                  <div className="field">
                    <label>Total</label>
                    <input type="text" value={calculateTotal()} disabled />
                  </div>

                  <div className="field">
                    <label>Payed Amount</label>
                    <input 
                      type="number" 
                      value={payedAmount}
                      onChange={(e) => setPayedAmount(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Balance</label>
                    <input type="text" value={calculateBalance()} disabled />
                  </div>

                  <div className="field">
                    <label>Discount(%)</label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Apply Coupon</label>
                    <input 
                      type="text" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Payment Mode</label>
                    <select 
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    >
                      <option value="GPay">GPay</option>
                      <option value="PhonePe">PhonePe</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Cheque Number</label>
                    <input 
                      type="text" 
                      value={chequeNumber}
                      onChange={(e) => setChequeNumber(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Transaction ID</label>
                    <input 
                      type="text" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Payment Success Screenshot</label>
                    <input 
                      type="file" 
                      onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="payment-actions">
                  <button className="make-payment-btn">MAKE PAYMENT</button>
                  <button className="send-request-btn">SEND PAYMENT REQUEST</button>
                </div>
              </div>

             
            </div>
          </form>
        </div>
      </div>

      {/* Selected Items Section */}
      {selectedItems.length > 0 && (
        <div className="selected-items-section">
          <h3>Selected Items</h3>
          <div className="selected-items-table">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="item-type">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                    <td>{item.name}</td>
                    <td className="item-price">₹{item.price}</td>
                    <td>
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="2">Total Amount</td>
                  <td className="total-amount">₹{calculateTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <BookingModal 
        show={showClassModal}
        onClose={() => setShowClassModal(false)}
        title="Course"
        data={availableCourses}
        selected={selectedCourse}
        onSelect={handleSelection}
        type="course"
      />

      <BookingModal 
        show={showEventModal}
        onClose={() => setShowEventModal(false)}
        title="Event"
        data={availableEvents}
        selected={selectedEvent}
        onSelect={handleSelection}
        type="event"
        extraInfo="date"
      />

      <BookingModal 
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        title="Plan"
        data={availablePlans}
        selected={selectedPlan}
        onSelect={handleSelection}
        type="plan"
        extraInfo="duration"
      />

      <BookingModal 
        show={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        title="Training"
        data={availableTrainings}
        selected={selectedTraining}
        onSelect={handleSelection}
        type="training"
        extraInfo="sessions"
      />
    </div>
  );
};

export default MakePayment;
