import React from "react";
import PlanCard from "./PlanCard";
import { useNavigate } from "react-router-dom";

function PlanList({ planData, tabHead, tabButtonText }) {
  const navigate = useNavigate()
  return (
    <div className="plan-list mt-4 mt-md-5">
        <div className="plan-head w-fit d-flex flex-wrap gap-4 justify-content-center justify-content-md-between mb-4 align-items-center">
            <div className="d-flex align-items-center flex-wrap gap-3 ms-auto w-fit">
              <button type="button" onClick={() => navigate('/add-plan')}>{tabButtonText}</button>
            </div>
        </div>
      <div className="row justify-content-between">
        {planData.map((data, i) => {
          return (
            <div className="plan-card-box">
              <PlanCard
                key={i}
                img={data.img}
                planAmount={data.planAmount}
                planDesc={data.planDesc}
                planDuration={data.planDuration}
                discountedPrice={data.discountedPrice}
                planName={data.planName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanList;
