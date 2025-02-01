import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./addPlan.css";

const AddPlan = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("12 Months");
  const [discount, setDiscount] = useState("");
  const [features, setFeatures] = useState([""]);
  const [selectedPlans, setSelectedPlans] = useState([{ name: "", price: "" }]);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleSelectedPlanChange = (index, field, value) => {
    const newPlans = [...selectedPlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setSelectedPlans(newPlans);
  };

  const addPlan = () => {
    setSelectedPlans([...selectedPlans, { name: "", price: "" }]);
  };

  const removePlan = (index) => {
    const newPlans = selectedPlans.filter((_, i) => i !== index);
    setSelectedPlans(newPlans);
  };

  return (
    <div className="dashboard">
      <div className="add-plan-container">
        <h2>Create New Plan</h2>
        <button type="button" className="back-btn" onClick={() => window.history.back()}>
          Back
        </button>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="input-group">
              <label>Plan Image</label>
              <input type="file" accept="image/*" />
            </div>
            <div className="input-group">
              <label>Plan Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Elite Package"
              />
            </div>
            <div className="input-group">
              <label>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing</h3>
            <div className="input-group">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 9999"
              />
            </div>
            <div className="input-group">
              <label>Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g., 20"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Features</h3>
            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g., 24/7 gym access"
                  />
                  <button type="button" className="remove-btn" onClick={() => removeFeature(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={addFeature}>
              + Add Feature
            </button>
          </div>

          <div className="form-section">
            <h3>Included Plans</h3>
            <div className="selected-plans-list">
              {selectedPlans.map((plan, index) => (
                <div key={index} className="selected-plan-item">
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => handleSelectedPlanChange(index, "name", e.target.value)}
                    placeholder="Plan name"
                  />
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => handleSelectedPlanChange(index, "price", e.target.value)}
                    placeholder="Price"
                  />
                  <button type="button" className="remove-btn" onClick={() => removePlan(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={addPlan}>
              + Add Plan
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create Plan
            </button>
            <button type="button" className="cancel-btn" onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlan;
