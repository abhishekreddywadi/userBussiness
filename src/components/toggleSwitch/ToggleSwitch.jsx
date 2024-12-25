import React, { useState } from 'react';
import './toggleSwitch.scss'

const ToggleSwitch = ({toggleSwitchId}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id={toggleSwitchId}
        checked={checked}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={toggleSwitchId}></label>
    </div>
  );
};

export default ToggleSwitch;