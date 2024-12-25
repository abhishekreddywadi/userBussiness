import React from "react";
import { Link } from "react-router-dom";

function PlanCard({ title, price, status, date, daysLeft, members, storage, help }) {
  return (
    <div className="plan-card">
      <div className="plan-card-main">
        <div className="plan-purchase-text">
          <h6 className="active-plan">Active plan ✅</h6>
          <div style={{ textAlign: "right" }}>
            <p className="status">{status}</p>
            <p className="date">{date}</p>
          </div>
        </div>
        <div className="plan-box">
          <h5 className="title">{title}</h5>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <h3 className="price">${price}</h3>
            <p className="period">/YEAR</p>
          </div>
          <p className="days-left">{daysLeft}</p>
        </div>
        <div className="features">
          <p>{members}</p>
          <p>{storage}</p>
          <p>{help}</p>
          <Link to="/" className="see-more">
            See more...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
