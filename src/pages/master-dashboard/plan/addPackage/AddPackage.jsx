import React, { useState, useContext } from "react";
import UserContext from "../../../../context/UserContext";
import Header from "../../../../components/header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addPackage.scss";

// Dummy plans data
const dummyPlans = [
  { id: 1, name: "Basic Plan", price: 999, features: ["Access to gym", "Basic equipment", "Locker facility"] },
  { id: 2, name: "Standard Plan", price: 1499, features: ["Access to gym", "All equipment", "Locker facility", "1 Personal training session"] },
  { id: 3, name: "Premium Plan", price: 1999, features: ["Access to gym", "All equipment", "Locker facility", "3 Personal training sessions", "Nutrition guidance"] },
  { id: 4, name: "Elite Plan", price: 2499, features: ["Access to gym", "All equipment", "Premium locker", "5 Personal training sessions", "Nutrition guidance", "Spa access"] }
];

const AddPackage = () => {
  const { navButtonClick } = useContext(UserContext);
  const [editorContent, setEditorContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [durationType, setDurationType] = useState("");
  const [customType, setCustomType] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);

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
  };

  return (
    <div className={`dashboard ${navButtonClick && "dashboard-full"}`}>
      <Header />
      <div className="add-package-container">
        <h2>Create Package</h2>
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
            <button type="button" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
