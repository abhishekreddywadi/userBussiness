import React from 'react'
import { Link } from 'react-router-dom'
import './breadcrumbs.scss'

function Breadcrumbs({dashboardName, dashboardPageName, pageName}) {
  return (
    <div className='d-flex flex-column gap-1'>
        <div className="breadcrumbs d-flex align-items-center">
            <Link to="/" className="breadcrumb-item">
                <i className="bi bi-house"></i>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/dashboards" className="breadcrumb-item">
                {dashboardName}
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">{dashboardPageName}</span>
        </div>
        <p className="page-name mb-0">{pageName}</p>
    </div>
  )
}

export default Breadcrumbs
