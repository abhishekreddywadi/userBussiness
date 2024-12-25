import React, { useState } from "react";
import ProfileImg from "../../../../assets/shree-ganesh.png";
import "./profile.scss";
import HomeLocation from "../../../../assets/home-location-icon.png";
import Phone from "../../../../assets/call.png";
import Email from "../../../../assets/email.png";
import LanguageIcon from "../../../../assets/hindi.png";
import EditIcon from "../../../../assets/edit.png";
import ProfileEdit from "../../../../assets/edit-profile.png";

function Profile({ handleProfileEdit }) {
  const [uploadedImage, setUploadedImage] = useState(ProfileImg);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="setting-tab profile h-100 mt-5 mt-md-0 pt-4 bg-white">
      <div className="profile-info d-flex flex-column flex-md-row">
        <button
          className="edit"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img src={EditIcon} alt="edit" />
        </button>
        <button
          className="edit profile-edit d-flex flex-column align-items-center"
          onClick={() => {
            handleProfileEdit();
          }}
        >
          <img src={ProfileEdit} alt="edit" />
          <span>Edit User Info</span>
        </button>
        <div className="profile-info-left">
          <span className="user-img mb-3">
            <img src={uploadedImage} alt="user-img" />
          </span>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <h6 className="mb-1">Shree Ganesh</h6>
          <p className="mb-0">
            ID <strong>MU_123456</strong>
          </p>
        </div>
        <div className="profile-info-right">
          <p className="d-flex align-items-center gap-4">
            <img src={Email} alt="mail" />
            shriganesh@gmail.com
          </p>
          <p className="d-flex align-items-center gap-4">
            <img src={Phone} alt="phone" />
            +91123456789
          </p>
          <p className="d-flex align-items-center gap-4">
            <img src={HomeLocation} alt="location" />
            Banglore, Karnataka, 560034
          </p>
          <p className="d-flex align-items-center gap-4">
            <img src={LanguageIcon} alt="location" />
            <span>HINDI /</span>
            <span>English /</span>
            <span>Sanskrit /</span>
            <span>Marathi /</span>
            <span>Telugu</span>
          </p>
          <p className="d-flex align-items-center gap-4">
            <strong>DOB</strong>
            05/XX/1XXX
          </p>
        </div>
      </div>
      <div className="profile-skills d-flex gap-4 mt-4 pt-4">
        <h5 className="mb-0">SKILLS</h5>
        <ul className="m-0 p-0 d-flex align-items-center gap-4">
          <li>Yoga</li>
          <li>Dance</li>
          <li>Music</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
