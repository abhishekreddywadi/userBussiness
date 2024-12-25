import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faMobile, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './userSessions.scss'

function UserSessions() {
  const [showMore, setShowMore] = useState(null);

  const handleShowMore = (id) => {
    if (showMore === id) {
      setShowMore(null);
    } else {
      setShowMore(id);
    }
  };
  return (
    <div className="setting-tab sessions mt-5 mt-md-0">
      <div className="sessions-heading d-flex flex-column gap-2">
        <h5 className="mb-2">Sessions</h5>
        <p className="m-0">This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
      </div>

      <div className="sessions-list d-flex flex-column gap-3 mt-5">
        <div className="sessions-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
          <FontAwesomeIcon icon={faDesktop} />
          <div className="session-detail mt-2 mt-md-0 me-md-auto ps-md-4">
            <p className='text-center text-md-start mb-2 mb-md-1'>Bucharest 68.133.163.201</p>
            <span className='d-flex justify-content-center justify-content-md-start'>Your current session</span>
          </div>
          <p className="active">Active</p>
          <p className='mx-2'>EU</p>
          <button onClick={() => handleShowMore('current')}>{showMore === 'current' ? 'See Less' : 'See More'} <FontAwesomeIcon icon={faChevronRight} /></button>
          {showMore === 'current' && (
            <div className='action'>
              <p>Logged in to this device on 24/12/2024 4:50PM, Location: Bangalore, India, IP 1234567</p>
              <div className="action-button">
                <span>Not Me</span>
                <div className="buttons d-flex align-items-center gap-3">
                  <button type="button">Take Action</button>
                  <button type="button">Yes, it's me</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="sessions-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
          <FontAwesomeIcon icon={faDesktop} />
          <div className="session-detail mt-2 mt-md-0 me-md-auto ps-md-4">
            <p className='text-center text-md-start'>Chrome on macOS</p>
          </div>
          <p className='mx-2'>US</p>
          <button onClick={() => handleShowMore('chrome')}>{showMore === 'chrome' ? 'See Less' : 'See More'} <FontAwesomeIcon icon={faChevronRight} /></button>
          {showMore === 'chrome' && (
            <div className='action'>
              <p>Logged in to this device on 24/12/2024 4:50PM, Location: Bangalore, India, IP 1234567</p>
              <div className="action-button">
                <span>Not Me</span>
                <div className="buttons d-flex align-items-center gap-3">
                  <button type="button">Take Action</button>
                  <button type="button">Yes, it's me</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="sessions-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
          <FontAwesomeIcon icon={faMobile} />
          <div className="session-detail mt-2 mt-md-0 me-md-auto ps-md-4">
            <p className='text-center text-md-start'>Safari on iPhone</p>
          </div>
          <p className='mx-2'>US</p>
          <button onClick={() => handleShowMore('safari')}>{showMore === 'safari' ? 'See Less' : 'See More'} <FontAwesomeIcon icon={faChevronRight} /></button>
          {showMore === 'safari'&& (
            <div className='action'>
              <p>Logged in to this device on 24/12/2024 4:50PM, Location: Bangalore, India, IP 1234567</p>
              <div className="action-button">
                <span>Not Me</span>
                <div className="buttons d-flex align-items-center gap-3">
                  <button type="button">Take Action</button>
                  <button type="button">Yes, it's me</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSessions
