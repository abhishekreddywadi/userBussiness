import React, { useState, useContext } from "react";
import UserContext from "../../../../context/UserContext";
import Header from "../../../../components/header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addPlan.scss";

function AddPlan() {
  const { navButtonClick } = useContext(UserContext);
  const [editorContent, setEditorContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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
  return (
    <div className={`dashboard ${navButtonClick && "dashboard-full"} add-plan`}>
      <Header />
      <div className="add-plan-container mt-4 mt-md-5">
        <h2>Add Plan</h2>
        <form action="">
          <div className="input-container d-flex flex-column gap-3">
            <label htmlFor="">Plan Image</label>
            <span>
              <img src={imagePreview} alt="plan-img" />
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Name</label>
            <input type="text" />
          </div>
          <div className="input-container">
            <label htmlFor="">Duration Type</label>
            <select name="" id=""></select>
          </div>
          <div className="input-container">
            <label htmlFor="">Plan Type</label>
            <select name="" id="">
              <option value="">Beginner</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="">Compare at Price</label>
            <input type="number" />
          </div>
          <div className="input-container">
            <label htmlFor="">Price</label>
            <input type="number" />
          </div>
          <div className="input-container">
            <label htmlFor="">Discount</label>
            <input type="number" />
          </div>
          <div className="input-container">
            <ReactQuill
              value={editorContent}
              onChange={handleEditorChange}
              placeholder="Write something amazing..."
              theme="snow" // or 'bubble'
            />
          </div>
        </form>
        <div className="buttons d-flex align-items-center gap-3 mt-4">
            <button type="button">Save</button>
            <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddPlan;
