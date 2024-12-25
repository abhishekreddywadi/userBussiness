import React, { useState, useRef } from "react";
import "./manageEvent.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ManageEvents() {
  const featureRef = useRef();
  const [featureImage, setFeatureImage] = useState(null);
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");

  const handleEditor1Change = (value) => {
    setEditor1Content(value);
  };

  const handleEditor2Change = (value) => {
    setEditor2Content(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-3 mt-4 manage-event">
      <div className="d-flex align-items-center gap-3 mb-5">
        <h2 className="mb-0">Add Event</h2>
        <h6 className="mb-0">Manage Event | Add Event</h6>
      </div>
      <form action="">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Title</label>
              <input
                className="py-1 px-2 batch-input"
                type="text"
                placeholder="Add Name"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Event Location URL</label>
              <input
                className="py-1 px-2 batch-input"
                type="url"
                placeholder="Add Limit"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Event Category</label>
              <select name="" id="">
                <option value="select">Select</option>
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="input-container mb-3 d-flex flex-column">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62211.60279162641!2d77.5631225540855!3d12.957438231241953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166bedda581f%3A0x757d1ae9f63c2835!2sJawaharlal%20Nehru%20Planetarium!5e0!3m2!1sen!2sin!4v1725469908973!5m2!1sen!2sin"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>

              <button
                type="button"
                className="button btn d-flex align-items-center justify-content-center mx-auto mt-3"
              >
                Confirm Address
              </button>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="input-container mb-3 d-flex flex-column">
                  <label htmlFor="">Address</label>
                  <textarea name="" id="" style={{ minHeight: 118 }}></textarea>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-container">
                  <div className="input-container mb-3 d-flex flex-column">
                    <label htmlFor="">Country</label>
                    <select>
                      <option value="select">Select Country</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="">State</label>
                    <select>
                      <option value="select">Select State</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">City</label>
              <select className="py-1 px-2 batch-input">
                <option value="">Select Group</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Pin Code</label>
              <input type="number" name="" id="" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Location Benchmark</label>
              <input type="number" name="" id="" />
            </div>
          </div>
          <div className="col-12 col-md-6"></div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Start Time</label>
              <input type="time" name="" id="" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">End Time</label>
              <input type="time" name="" id="" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Is Paid</label>
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="paid" id="yes" />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="paid" id="no" />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Walkings</label>
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="walking" id="walking_yes" />
                <label htmlFor="walking_yes">Yes</label>
              </div>
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="walking" id="walking_no" />
                <label htmlFor="walking_no">No</label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="input-container mb-3 d-flex flex-column">
              <label htmlFor="">Feature Image</label>
              <span>
                {featureImage && (
                  <img src={featureImage} alt="PAN Card front" />
                )}
              </span>
              <input
                type="file"
                ref={featureRef}
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="">About Event</label>
            <ReactQuill value={editor1Content} onChange={handleEditor1Change} />
          </div>
          <div className="col-12 my-3">
            <label htmlFor="">Additional Information</label>
            <ReactQuill value={editor2Content} onChange={handleEditor2Change} />
          </div>
          <div className="col-12">
            <div className="input-container">
              <label htmlFor="">Ticket Info</label>
              <input type="text" name="" id="" />
            </div>
          </div>
        </div>
      </form>
      <div className="buttons d-flex align-items-center gap-3 mt-3">
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

export default ManageEvents;
