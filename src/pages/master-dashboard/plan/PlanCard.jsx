import React from 'react'

function PlanCard({key, img, planName, discountedPrice, planAmount, planDuration, planDesc}) {
  return (
    <div className='plan-card' key={key}>
      <img src={img} alt='plan-img' />
      <h5 className='mt-2'>{planName}</h5>
      <h3 className={discountedPrice && 'discounted'}>Rs. {planAmount}</h3>
      <h6>{discountedPrice && `${'Rs.' + discountedPrice}`}</h6>
      <span>{planDuration}</span>
      <p>{planDesc}</p>
      <div className="buttons">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
  )
}

export default PlanCard
