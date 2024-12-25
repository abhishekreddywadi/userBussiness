import React, { useState } from "react";
import "./info.scss";
import Select from "react-select";

function Info() {
  const years = [];
  for (let year = 2000; year <= 2024; year++) {
    years.push(year);
  }
  
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "javascript", label: "JavaScript" },
  ];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "spanish", label: "Spanish" },
    { value: "dutch", label: "Dutch" },
    { value: "russian", label: "Russian" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedLanguages,setSelectedLanguages] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleLanguageChange = (selected) => {
    setSelectedLanguages(selected);
  };

  return (
    <div className="setting-tab info bg-white rounded">
      <h2>Basic Info</h2>
      <form action="">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor="">First Name</label>
              <input type="text" placeholder="Shree" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor="">Last Name</label>
              <input type="text" placeholder="Ganesh" />
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-12 col-md-3">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor="">I'm</label>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor="">Birth Date</label>
              <input type="month" />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor=""></label>
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                <option value="">6</option>
                <option value="">7</option>
                <option value="">8</option>
                <option value="">9</option>
                <option value="">10</option>
                <option value="">11</option>
                <option value="">12</option>
                <option value="">13</option>
                <option value="">14</option>
                <option value="">15</option>
                <option value="">16</option>
                <option value="">17</option>
                <option value="">18</option>
                <option value="">19</option>
                <option value="">20</option>
                <option value="">21</option>
                <option value="">22</option>
                <option value="">23</option>
                <option value="">24</option>
                <option value="">25</option>
                <option value="">26</option>
                <option value="">27</option>
                <option value="">28</option>
                <option value="">29</option>
                <option value="">30</option>
                <option value="">31</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="input-container mb-3 mb-md-0">
              <label htmlFor=""></label>
              <select>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container mb-3">
              <label htmlFor="">Email</label>
              <input type="email" placeholder="example@example.com" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3">
              <label htmlFor="">Confirmation Email</label>
              <input type="email" placeholder="example@example.com" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3">
              <label htmlFor="">Your Location</label>
              <input type="text" placeholder="Mumbai" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3">
              <label htmlFor="">Phone Number</label>
              <input type="number" placeholder="+91 123456789" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container mb-3">
              <label htmlFor="">Language</label>
              <Select
                options={languageOptions}
                isMulti
                value={selectedLanguages}
                onChange={handleLanguageChange}
                closeMenuOnSelect={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                placeholder="I can speak..."
                className="select"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="input-container">
            <label htmlFor="">Skills</label>
              <Select
                options={options}
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                closeMenuOnSelect={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                placeholder="Select technologies..."
                className="select"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Info;
