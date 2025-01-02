import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Apartment.scss';
import UserContext from '../../../context/UserContext';
import Header from '../../../components/header/Header';
import { useState } from 'react'

// Mock data
const blocksData = {
    'A': {
      name: 'A BLOCK',
      number: '101',
      phase: 'PHASE 1',
      units: Array(7).fill().map((_, i) => ({
        number: 'A 101',
        type: i === 1 ? 'OWNER' : 'TENANT',
        name: 'RAMESH GUPTA'
      })),
      tenants: [
        { name: 'RAMESH GUPTA', type: 'TENANT' },
        { name: 'RAMESH GUPTA', type: 'TENANT' },
        { name: 'RAMESH GUPTA', type: 'TENANT' },
        { 
          name: 'SONAL SHING DOUGHTER', 
          type: 'TENANT', 
          highlight: true,
          isTrainer: true 
        }
      ]
    },
    'B': {
      name: 'B BLOCK',
      number: '101',
      phase: 'PHASE 1',
      units: Array(2).fill().map(() => ({
        number: 'B 101',
        type: 'TENANT',
        name: 'RAJESH RAO'
      })),
      tenants: [
        { name: 'RAJESH RAO', type: 'TENANT' },
        { name: 'RAJESH RAO', type: 'OWNER' }
      ]
    },
    'C': {
      name: 'C BLOCK',
      number: '101',
      phase: 'PHASE 1',
      units: [],
      tenants: []
    }
  };
  
  function BlockInfo({ block, tenants, onTenantClick }) {
    return (
      <div className="block-info">
        <h2>{block.name} {block.number}</h2>
        <div className="tenant-section">
          <h3>TENANT</h3>
          <div className="tenant-list">
            {tenants.map((tenant, index) => (
              <div 
                key={index} 
                className="tenant-item" 
                onClick={() => onTenantClick(tenant)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`circle ${tenant.highlight ? 'pink' : ''}`}></div>
                <span>{tenant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  function Activities() {
    return (
      <div className="activities-section">
        <h3>SANCTITY CLUB HOUSE PLY GROUND ACTIVITY</h3>
        <div className="activities-list">
          <div className="activity pink">ZUMBA</div>
          <div className="activity gray">GYM PT</div>
          <div className="activity">Table Tennis</div>
        </div>
      </div>
    );
  }
  
  function TrainerInfo({ selectedTenant }) {
    if (!selectedTenant?.isTrainer) return null;
  
    return (
      <div className="trainer-section">
        <div className="trainer-header">
          <h2>{selectedTenant.name}</h2>
        </div>
        <div className="zumba-schedule">
          <div className="schedule-header">
            <div className="activity-name">
              ZUMBA
              <span className="time">M W F</span>
              <span className="time">6:30 TO 7:30 PM</span>
            </div>
          </div>
          <div className="schedule-details">
            <div className="days">MON WED FRI</div>
            <div className="price">2000 RS</div>
          </div>
          <div className="trainer-info">
            <h3>TRAINER</h3>
            <div className="trainer-profile">
              <img src="https://placekitten.com/50/50" alt="RIMA N" className="trainer-image" />
              <div className="trainer-name">
                <span>RIMA N</span>
                <small>FITNESS TRAINER</small>
              </div>
              <div className="trainer-status">
                <div className="status-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function BlockCard({ block, onBlockClick }) {
    return (
      <div className="block" onClick={() => onBlockClick(block)}>
        <div className="block-header">
          <div className="block-icon"></div>
          <span>{block.name}</span>
          <span>{block.phase}</span>
        </div>
        <div className="block-items">
          {block.units.map((unit, index) => (
            <div key={index} className="block-item">
              <div className="house-icon"></div>
              <div className="house-details">
                <div className="house-number">{unit.number}</div>
                <div className="house-type">{unit.type}</div>
                <div className="house-name">{unit.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
const Apartment = () => {
  const { navButtonClick, user } = useContext(UserContext);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showApartmentModal, setShowApartmentModal] = useState(false);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    setSelectedTenant(null);
  };

  const handleTenantClick = (tenant) => {
    setSelectedTenant(tenant);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleAddApartment = () => {
    setShowApartmentModal(true);
  };

  return (
    <div 
      className={`dashboard ${navButtonClick && "dashboard-full"}`}
      style={{ boxShadow: "4px 6px 10px rgba(0, 0, 0, 0.1)", marginTop: "15px" }}
    >
      <Header user={user} />
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search blocks or tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="add-apartment-btn" onClick={handleAddApartment}>
            <FontAwesomeIcon icon={faPlus} /> Add Apartment
          </button>
        </div>
      </div>
      {showApartmentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Apartment</h2>
            <form className="apartment-form">
              <div className="form-group">
                <label>Block Name</label>
                <input type="text" placeholder="Enter block name" />
              </div>
              <div className="form-group">
                <label>Phase</label>
                <input type="text" placeholder="Enter phase" />
              </div>
              <div className="form-group">
                <label>Apartment Number</label>
                <input type="text" placeholder="Enter apartment number" />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={() => setShowApartmentModal(false)}>Cancel</button>
                <button type="submit">Add Apartment</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="club-layout">
      <div className="main-card">
        {selectedBlock && (
          <BlockInfo 
            block={selectedBlock} 
            tenants={selectedBlock.tenants}
            onTenantClick={handleTenantClick}
          />
        )}
        <Activities />
        <TrainerInfo selectedTenant={selectedTenant} />
      </div>

      <div className="blocks-section">
        {Object.values(blocksData).map((block, index) => (
          <BlockCard 
            key={index}
            block={block}
            onBlockClick={handleBlockClick}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Apartment;
