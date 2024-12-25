import React, { useState } from "react";
import Select from "react-select";

function Batch() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const languageOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "javascript", label: "JavaScript" },
  ];

  const handleLanguageChange = (selected) => {
    setSelectedLanguages(selected);
  };
  return (
    <div className="bg-white p-3 mt-4">
      <div className="d-flex align-items-center gap-3 mb-5">
        <h2 className="mb-0">Add Batch</h2>
        <h6 className="mb-0">Manage Batch | Add Batch</h6>
      </div>
      <form action="">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Batch Name</label>
              <input
                className="py-1 px-2 batch-input"
                type="text"
                placeholder="Add Name"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Limit of Student</label>
              <input
                className="py-1 px-2 batch-input"
                type="quantity"
                placeholder="Add Limit"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Start Time</label>
              <input
                className="py-1 px-2 batch-input"
                type="text"
                placeholder="Add Name"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">End Time</label>
              <input
                className="py-1 px-2 batch-input"
                type="quantity"
                placeholder="Add Limit"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Staff/Instructor/Teacher/Coach</label>
              <Select
                options={languageOptions}
                isMulti
                value={selectedLanguages}
                onChange={handleLanguageChange}
                closeMenuOnSelect={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                placeholder="Select..."
                className="select"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Select Class</label>
              <select className="py-1 px-2 batch-input">
                <option value="">Select Class</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className="buttons d-flex align-items-center gap-3 mt-2">
        <button type="button" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Batch;
