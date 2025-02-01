import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import PlanImg from "../../../assets/shree-ganesh.png";
import "./plan.scss";
import Header from "../../../components/header/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Dummy plans data
const dummyPlans = [
  { id: 1, name: "Basic Plan", price: 999, features: ["Access to gym", "Basic equipment", "Locker facility"] },
  { id: 2, name: "Standard Plan", price: 1499, features: ["Access to gym", "All equipment", "Locker facility", "1 Personal training session"] },
  { id: 3, name: "Premium Plan", price: 1999, features: ["Access to gym", "All equipment", "Locker facility", "3 Personal training sessions", "Nutrition guidance"] },
  { id: 4, name: "Elite Plan", price: 2499, features: ["Access to gym", "All equipment", "Premium locker", "5 Personal training sessions", "Nutrition guidance", "Spa access"] }
];

function MasterPlan() {
  const { navButtonClick } = useContext(UserContext);
  const [key, setKey] = useState('plan');
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [durationType, setDurationType] = useState("");
  const [customType, setCustomType] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);

  // Dummy plans data
  const plans = [
    {
      id: 1,
      name: "Gym Access",
      price: 1499,
      duration: "Monthly",
      features: [
        "Full gym access",
        "Basic equipment usage",
        "Locker access",
        "Shower facility"
      ],
      description: "Basic gym membership with access to all equipment",
      discount: 10
    },
    {
      id: 2,
      name: "Yoga Classes",
      price: 999,
      duration: "Monthly",
      features: [
        "Professional instructor",
        "Morning & evening batches",
        "Yoga mat provided",
        "Meditation sessions"
      ],
      description: "Join our peaceful yoga sessions for mind and body wellness",
      discount: 15
    },
    {
      id: 3,
      name: "Zumba Fitness",
      price: 1299,
      duration: "Monthly",
      features: [
        "Expert Zumba trainer",
        "High-energy workouts",
        "Dance fitness routines",
        "Weekend special sessions"
      ],
      description: "Fun and energetic dance workouts for fitness enthusiasts",
      discount: 20
    }
  ];

  // Dummy packages data
  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: 2999,
      duration: "3 months",
      features: [
        "Access to gym",
        "Basic equipment",
        "Locker facility",
        "Water dispenser"
      ],
      discount: 10,
      selectedPlans: [
        { name: "Gym Access", price: 1499 },
        { name: "Yoga Classes", price: 999 },
        { name: "Zumba", price: 799 }
      ]
    },
    {
      id: 2,
      name: "Premium Package",
      price: 5999,
      duration: "6 months",
      features: [
        "Full gym access",
        "Personal trainer",
        "Nutrition guidance",
        "Spa access",
        "Swimming pool"
      ],
      discount: 15,
      selectedPlans: [
        { name: "Full Gym Access", price: 2499 },
        { name: "Personal Training", price: 1999 },
        { name: "Spa Services", price: 1499 }
      ]
    },
    {
      id: 3,
      name: "Elite Package",
      price: 9999,
      duration: "12 months",
      features: [
        "24/7 gym access",
        "Elite trainer",
        "Personalized diet plan",
        "Massage therapy",
        "Group classes"
      ],
      discount: 20,
      selectedPlans: [
        { name: "24/7 Gym Access", price: 3499 },
        { name: "Elite Training", price: 2999 },
        { name: "Wellness Package", price: 2499 }
      ]
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleDurationTypeChange = (e) => {
    const value = e.target.value;
    setDurationType(value);
    if (value !== "custom") {
      setCustomType("");
      setCustomValue("");
    }
  };

  const handlePlanSelection = (e) => {
    const planId = parseInt(e.target.value);
    if (planId) {
      const plan = dummyPlans.find(p => p.id === planId);
      if (plan && !selectedPlans.find(p => p.id === planId)) {
        setSelectedPlans([...selectedPlans, plan]);
      }
    }
  };

  const removePlan = (planId) => {
    setSelectedPlans(selectedPlans.filter(plan => plan.id !== planId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowPackageModal(false);
  };

  return (
    <div
      className={`dashboard ${navButtonClick && "dashboard-full"} master-plan`}
    >
      <Header />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="main-plan-tabs pt-3 border-0"
      >
        <Tab eventKey="plan" title="View Plan">
          <div className="plan-container">
            <div className="d-flex justify-content-end mb-4">
              <Link to="/master/plan/add-plan" className="add-plan-btn">
                Create Plan
              </Link>
            </div>
            
            <div className="plans-grid">
              {plans.map((plan) => (
                <div key={plan.id} className="plan-card">
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="price-tag">₹{plan.price}</div>
                  </div>
                  
                  <div className="plan-duration">
                    Duration: {plan.duration}
                  </div>
                  
                  <p className="plan-description">{plan.description}</p>

                  <div className="features-list">
                    <h4>Features:</h4>
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="discount-badge">
                    {plan.discount}% OFF
                  </div>

                  <div className="plan-actions">
                    <button className="edit-btn">Edit Plan</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tab>
        <Tab eventKey="packages" title="View Package">
          <div className="plan-container">
            <div className="d-flex justify-content-end mb-4">
              <Link to="/master/plan/add-package" className="add-plan-btn">
                Create Package
              </Link>
            </div>
            
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <div className="price-tag">₹{pkg.price}</div>
                  </div>
                  
                  <div className="package-duration">
                    Duration: {pkg.duration}
                  </div>
                  
                  <div className="selected-plans">
                    <h4>Included Plans:</h4>
                    {pkg.selectedPlans.map((plan, index) => (
                      <div key={index} className="selected-plan-item">
                        <span>{plan.name}</span>
                        <span className="plan-price">₹{plan.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="features-list">
                    <h4>Features:</h4>
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="discount-badge">
                    {pkg.discount}% OFF
                  </div>

                  <div className="package-actions">
                    <button className="edit-btn">Edit Package</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* Package Creation Modal */}
      {showPackageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Package</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowPackageModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-container d-flex flex-column gap-3">
                <label>Package Image</label>
                <span>
                  <img src={imagePreview} alt="package-img" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="input-container">
                <label>Name</label>
                <input type="text" required />
              </div>
              <div className="input-container">
                <label>Duration Type</label>
                <select 
                  value={durationType}
                  onChange={handleDurationTypeChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="lifetime">Lifetime</option>
                  <option value="custom">Custom Dates</option>
                </select>
              </div>

              {durationType === "custom" && (
                <div className="input-container custom-duration">
                  <label>Custom Duration Type</label>
                  <div className="custom-type-options">
                    <div className="custom-radio">
                      <input
                        type="radio"
                        id="days"
                        name="customType"
                        value="days"
                        checked={customType === "days"}
                        onChange={(e) => {
                          setCustomType(e.target.value);
                          setCustomValue("");
                        }}
                      />
                      <label htmlFor="days">Day wise</label>
                    </div>
                    <div className="custom-radio">
                      <input
                        type="radio"
                        id="months"
                        name="customType"
                        value="months"
                        checked={customType === "months"}
                        onChange={(e) => {
                          setCustomType(e.target.value);
                          setCustomValue("");
                        }}
                      />
                      <label htmlFor="months">Month wise</label>
                    </div>
                  </div>

                  {customType === "days" && (
                    <div className="duration-options mt-3">
                      <label>Select Days</label>
                      <input
                        type="number"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {customType === "months" && (
                    <div className="duration-options mt-3">
                      <label>Select Months</label>
                      <input
                        type="number"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="input-container">
                <label>Select Plans</label>
                <select 
                  onChange={handlePlanSelection}
                  value=""
                  className="form-control"
                >
                  <option value="">Choose a plan</option>
                  {dummyPlans.map(plan => (
                    <option 
                      key={plan.id} 
                      value={plan.id}
                      disabled={selectedPlans.some(p => p.id === plan.id)}
                    >
                      {plan.name} - ₹{plan.price}
                    </option>
                  ))}
                </select>

                {selectedPlans.length > 0 && (
                  <div className="selected-plans">
                    {selectedPlans.map(plan => (
                      <div key={plan.id} className="selected-plan">
                        <div className="plan-header">
                          <span className="plan-name">{plan.name}</span>
                          <span className="plan-price">₹{plan.price}</span>
                          <button 
                            type="button" 
                            className="remove-plan"
                            onClick={() => removePlan(plan.id)}
                          >
                            ×
                          </button>
                        </div>
                        <div className="plan-features">
                          {plan.features.map((feature, index) => (
                            <span key={index} className="feature-tag">{feature}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="input-container">
                <label>Plan Type</label>
                <select required>
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="input-container">
                <label>Compare at Price</label>
                <input type="number" required />
              </div>
              <div className="input-container">
                <label>Price</label>
                <input type="number" required />
              </div>
              <div className="input-container">
                <label>Discount</label>
                <input type="number" />
              </div>
             
              <div className="buttons d-flex align-items-center gap-3 mt-4">
                <button type="submit" className="submit-btn">Create Package</button>
                <button type="button" onClick={() => setShowPackageModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterPlan;
