import React, { useState } from "react";
import UserImg from "../../../../assets/shree-ganesh.png";
import EmailIcon from "../../../../assets/email.png";
import PhoneIcon from "../../../../assets/phone-icon.png";
import MessageIcon from "../../../../assets/comment.png";
import { Link } from "react-router-dom";
import "./masterStaff.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function MasterStaff() {
  const [staffSearch, setStaffSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="master-staff mt-4">
      <div className="staff-list">
        <div className="staff-options w-100 ">
          <div className="input-container d-flex flex-column">
            <label htmlFor="">Select staff Category</label>
            <select name="" id="">
              <option value="" default>
                All Category
              </option>
              <option value="">Fitness</option>
              <option value="">House Cleaning</option>
              <option value="">Dance</option>
            </select>
          </div>
          <div className="input-container d-flex flex-column">
            <label htmlFor="">Work type</label>
            <select name="" id="">
              <option value="">Full Time</option>
              <option value="">Part Time</option>
              <option value="">Hourly Basis</option>
              <option value="">Contractual Basis</option>
            </select>
          </div>

          <Link
            to="/add-staff"
            className="d-flex button btn align-items-center justify-content-center ms-auto"
          >
            Add New Staff
          </Link>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="staff-info mt-4">
              <h6 className="mb-0">Staff Category: 5/12</h6>
              <div className="staff-search d-flex align-items-center justify-content-between gap-3 my-3">
                <p className="mb-0">My ID</p>
                <div className="search">
                  {showSearch ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setShowSearch(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={() => setShowSearch(true)}
                    />
                  )}
                  <input
                    type="search"
                    className={showSearch && "show-search"}
                    value={staffSearch}
                    onChange={(e) => {
                      setStaffSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="staff-info-list d-flex flex-column gap-2">
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="staff-info mt-4">
              <h6 className="mb-0">Staff Category: 5/12</h6>
              <div className="staff-search d-flex align-items-center justify-content-between gap-3 my-3">
                <p className="mb-0">My ID</p>
                <div className="search">
                  {showSearch ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setShowSearch(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={() => setShowSearch(true)}
                    />
                  )}
                  <input
                    type="search"
                    className={showSearch && "show-search"}
                    value={staffSearch}
                    onChange={(e) => {
                      setStaffSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="staff-info-list d-flex flex-column gap-2">
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="staff-info mt-4">
              <h6 className="mb-0">Staff Category: 5/12</h6>
              <div className="staff-search d-flex align-items-center justify-content-between gap-3 my-3">
                <p className="mb-0">My ID</p>
                <div className="search">
                  {showSearch ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setShowSearch(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={() => setShowSearch(true)}
                    />
                  )}
                  <input
                    type="search"
                    className={showSearch && "show-search"}
                    value={staffSearch}
                    onChange={(e) => {
                      setStaffSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="staff-info-list d-flex flex-column gap-2">
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="staff-info-box d-flex align-items-center justify-content-between gap-2">
                  <img src={UserImg} alt="user" />
                  <div className="staff-info-content">
                    <h6 className="mb-1">Shree Ganesh</h6>
                    <p className="mb-0">Artist</p>
                  </div>
                  <div className="staff-info-join p-2">
                    <p>
                      Joining Date <strong>12/10/2022</strong>
                    </p>
                    <div className="join-buttons d-flex align-items-center gap-3">
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={EmailIcon} alt="mail" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={MessageIcon} alt="message" />
                      </button>
                      <button type="button" className="bg-none border-0 p-0">
                        <img src={PhoneIcon} alt="call" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterStaff;
