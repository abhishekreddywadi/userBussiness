import React from "react";
import "./userDeleteAccount.scss";

function UserDeleteAccount() {
  return (
    <div className="setting-tab delete mt-5 mt-md-0">
      <div className="row justify-content-between align-items-center">
        <div className="col-12 col-md-6 col-xl-7">
          <div className="delete-heading d-flex flex-column gap-2">
            <h5 className="mb-2">Delete Account</h5>
            <p className="m-0">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-5">
          <div className="delete-buttons d-flex align-items-center gap-3">
            <button type="button">Deactivate</button>
            <button type="button">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDeleteAccount;
