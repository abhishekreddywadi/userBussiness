import React from 'react'

function SubmittedRequest() {
  return (
    <div className="requested-container">
                <div className='requested-form'>
                    <div className='req-edit-form'>
                        <p>Your request has been successfully submitted</p>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <ul className='req-details'>
                        <li>
                            <span>Name</span>
                            <span>Royl veer</span>
                        </li>
                        <li>
                            <span>Apply Date</span>
                            <span>25/12/2024</span>
                        </li>
                        <li>
                            <span>Application</span>
                            {showDeclinedReq ? (
                                <>
                                <span className='application-status' style={{ paddingRight: 15}}>Reject</span>
                                <span className='application-status'>Your application got rejected</span>
                                </>
                            ) : showReAppliedReq ? (
                                <>
                                <span style={{ paddingRight: 15}}>In Review</span>
                                <span className='application-status'>Re-applied 1/3</span>
                                </>
                            )
                            : showAcceptedReq ? (
                                <span className='accepted'>Accepted</span>
                            ) :
                            <span>In Review</span>
                        }
                        </li>
                        <li>
                            <span>Country</span>
                            <span>BHARAT (India)</span>
                        </li>
                        <li>
                            <span>Your Email</span>
                            <span>roylveer@gmail.com</span>
                        </li>
                        <li>
                            <span>Request ID</span>
                            <span>1234567890</span>
                        </li>
                    </ul>
                    {showDeclinedReq && (
                        <div className='application-decline'>
                            <p>Reason behind the rejection</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dignissimos ipsum adipisci asperiores! Nihil at iusto, repellat earum reiciendis maiores.</p>
                            <button type='button'>Re-apply 1/3</button>
                        </div>
                    )}

                    {showAcceptedReq && (
                        <div className='application-accept'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dignissimos ipsum adipisci asperiores! Nihil at iusto, repellat earum reiciendis maiores.</p>
                            <button type='button' onClick={(e) => handleEnrollNow(e)}>Enroll Now</button>
                        </div>
                    )}
                </div>
                <div className='requested-note'>
                    <h3>Note</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, nulla odio et voluptatum animi ducimus quam temporibus accusantium architecto esse!</p>
                    <input type='text' placeholder='Individual ID' disabled />
                    <input type='text' placeholder='Busuness ID' disabled />
                </div>
            </div>
  )
}

export default SubmittedRequest
