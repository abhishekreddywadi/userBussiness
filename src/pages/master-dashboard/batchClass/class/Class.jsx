import React, { useState } from "react";
import Select from "react-select";
import "./class.scss";

function Class() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDaysArray, setSelectedDaysArray] = useState([]);
  const [selectedDays, setSelectedDays] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("");
  const languageOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "javascript", label: "JavaScript" },
  ];

  const daysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
  ];

  const handleLanguageChange = (selected) => {
    setSelectedLanguages(selected);
  };

  const handleDaysSelectChange = (selected) => {
    setSelectedDaysArray(selected);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleMode = (e) => {
    setMode(e.target.value);
  };

  const handleDaysChange = (e) => {
    const value = e.target.id;
    setSelectedDays(value);

    if (value === "all") {
      setSelectedDaysArray(daysOptions);
    } else if (value === "select") {
      setSelectedDaysArray([]);
    }
  };

  console.log("mode", mode);

  return (
    <div className="bg-white p-3 mt-4 class">
      <div className="d-flex align-items-center gap-3 mb-5">
        <h2 className="mb-0">Add Class</h2>
        <h6 className="mb-0">Manage Class | Add Class</h6>
      </div>
      <form action="">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Name</label>
              <input
                className="py-1 px-2 batch-input"
                type="text"
                placeholder="Add Name"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Description</label>
              <textarea
                className="py-1 px-2 batch-input"
                placeholder="Add Description"
              ></textarea>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Price</label>
              <div className="d-flex align-items-start flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="price"
                    id="free"
                    value="free"
                    onChange={(e) => handlePrice(e)}
                  />
                  <label htmlFor="free">Free</label>
                </div>
                <div className="d-flex flex-column align-items-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="price"
                      id="paid"
                      value="paid"
                      onChange={(e) => handlePrice(e)}
                    />
                    <label htmlFor="paid">Paid</label>
                  </div>
                  {price == "paid" && (
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <input type="radio" name="per_class" id="class" />
                          <label htmlFor="class">Per Class</label>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <input type="radio" name="per_class" id="month" />
                          <label htmlFor="month">Per Month</label>
                        </div>
                      </div>
                      <div className="input-container mb-3 d-flex flex-column">
                        <label htmlFor="">Price</label>
                        <input
                          className="py-1 px-2 batch-input"
                          type="number"
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="price"
                    id="demo"
                    value="demo"
                    onChange={(e) => handlePrice(e)}
                  />
                  <label htmlFor="demo">Demo (Single Class)</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Category</label>
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
                placeholder="Select Class Category"
                className="select"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Category Type</label>
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
                placeholder="Select Class Category Type"
                className="select"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Mode</label>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="mode"
                    id="online"
                    value="online"
                    onChange={(e) => handleMode(e)}
                  />
                  <label htmlFor="online">Online</label>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="mode"
                    id="offline"
                    value="offline"
                    onChange={(e) => handleMode(e)}
                  />
                  <label htmlFor="offline">Offline</label>
                </div>
              </div>
            </div>
          </div>
          {mode == "online" && (
            <>
              <div className="col-12 col-md-6">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Class Link</label>
                  <input
                    className="py-1 px-2 batch-input"
                    type="url"
                    placeholder="Enter Class Link"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Class Link Password</label>
                  <input
                    className="py-1 px-2 batch-input"
                    type="password"
                    placeholder="Enter Class Link Password"
                  />
                </div>
              </div>
            </>
          )}

          {mode == "offline" && (
            <>
              <div className="col-12">
                <div className="offline-map mb-3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62211.60279162641!2d77.5631225540855!3d12.957438231241953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166bedda581f%3A0x757d1ae9f63c2835!2sJawaharlal%20Nehru%20Planetarium!5e0!3m2!1sen!2sin!4v1725469908973!5m2!1sen!2sin"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Address Line 1</label>
                  <input
                    className="py-1 px-2 batch-input"
                    type="text"
                    placeholder="Add Address Line 1"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Address Line 2</label>
                  <input
                    className="py-1 px-2 batch-input"
                    type="text"
                    placeholder="Add Address Line 2"
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Country</label>
                  <select style={{ minHeight: 35 }}>
                    <option value="select" default disabled>
                      Select
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">State</label>
                  <select style={{ minHeight: 35 }}>
                    <option value="select" default disabled>
                      Select
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">City</label>
                  <select style={{ minHeight: 35 }}>
                    <option value="select" default disabled>
                      Select
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Pin Code</label>
                  <input
                    className="py-1 px-2 batch-input"
                    type="text"
                    placeholder="Add Pin Code"
                  />
                </div>
              </div>
            </>
          )}
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Class Days</label>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="days"
                    id="all"
                    checked={selectedDays === "all"}
                    onChange={handleDaysChange}
                  />
                  <label htmlFor="all">All Days</label>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="radio"
                    name="days"
                    id="select"
                    checked={selectedDays === "select"}
                    onChange={handleDaysChange}
                  />
                  <label htmlFor="select">Select Days</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Select Days</label>
              <Select
                options={daysOptions}
                isMulti
                value={selectedDaysArray}
                onChange={handleDaysSelectChange}
                closeMenuOnSelect={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                placeholder="Select Days"
                className="select"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">How to Book Description</label>
              <textarea
                className="py-1 px-2 batch-input"
                placeholder="Book Description"
              ></textarea>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Select Batches</label>
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
                placeholder="Select Batches"
                className="select"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="classImage">Class Image</label>
              <span>
                {imagePreview && (
                  <img src={imagePreview} alt="Uploaded Preview" />
                )}
              </span>
              <input
                id="classImage"
                className="py-1 px-2 batch-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
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

export default Class;
