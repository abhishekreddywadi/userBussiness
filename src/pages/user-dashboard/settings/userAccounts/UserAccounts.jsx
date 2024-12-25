import React from 'react'
import './userAccount.scss'

import AdminLetGoIcon from '../../../../assets/adminLetGo.png'
import NrityamRuchiIcon from '../../../../assets/nrityam-ruchi.png'
import StrongNationIcon from '../../../../assets/strong-nation.png'

function UserAccounts() {
  return (
    <div className='setting-tab accounts mt-5 mt-md-0'>
      <div className="accounts-heading d-flex flex-column gap-2">
        <h5 className='mb-2'>Accounts</h5>
        <p className='m-0'>Here you can setup and manage your integration settings.</p>
      </div>
      <div className="accounts-list d-flex flex-column mt-4">
        <div className="account-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-3">
          <img src={AdminLetGoIcon} alt="account-img" />
          <div className="account-details ps-md-3">
            <h3 className='mb-1'>AdminLetGo</h3>
            <p className='text-center text-md-start mb-0'>Company</p>
          </div>
          <span className='d-flex ms-md-auto'>Enabled</span>
        </div>
        <div className="account-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-3">
          <img src={NrityamRuchiIcon} alt="account-img" />
          <div className="account-details ps-md-3">
            <h3 className='mb-1'>NrityamRuchi</h3>
            <p className='text-center text-md-start mb-0'>Company</p>
          </div>
          <span className='d-flex ms-md-auto'>Enabled</span>
        </div>
        <div className="account-box d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-3">
          <img src={StrongNationIcon} alt="account-img" />
          <div className="account-details ps-md-3">
            <h3 className='mb-1'>Strong Nation</h3>
            <p className='text-center text-md-start mb-0'>Company</p>
          </div>
          <span className='d-flex ms-md-auto'>Enabled</span>
        </div>
      </div>
    </div>
  )
}

export default UserAccounts
