import React, {useState, useRef} from 'react';
import MasterFormModal from './masterFormModal/MasterFormModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import './masterForm.scss'

function MasterForm({showMasterForm, images, showSubmittedReq, idAbove18, showDeclinedReq, showReAppliedReq, showAcceptedReq, handleIdAbove18, handleSubmittedReq, handleFileChange, handleUploadClick, handleEnrollNow, handleShowAccepted, handleDeclineReq, handleNextStep, handleMasterFormBack, handleSubmitReqback}) {
    const fileInputRefs = {
        panFront: useRef(null),
        panBack: useRef(null),
        aadharFront: useRef(null),
        aadharBack: useRef(null),
    };

    const [showMasterModal, setShowMasterModal] = useState(false);

    const handleMasterModalShow = () => {
        setShowMasterModal(true);
    }

    console.log("showMasterModal", showMasterModal)
        
  return (
    <div className='master-step'>
        {showMasterForm && (
            <>
            <form action="">
                <div className="input-container">
                    <label htmlFor="">Legal Name <strong>*</strong></label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Surname/Last Name <strong>*</strong></label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Nickname</label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Select ID Proof <strong>*</strong></label>
                    <select onChange={(e) => handleIdAbove18(e)}>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="PAN Card">PAN Card</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter Card">Voter Card</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="">{idAbove18} <strong>*</strong></label>
                    <input type="text" minLength='12' />
                </div>
                <div className="input-container">
                    <label htmlFor="">PAN Card</label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Phone <strong>*</strong></label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Email <strong>*</strong></label>
                    <input type="email" />
                </div>
                <div className="input-container">
                    <label htmlFor="">DOB <strong>*</strong></label>
                    <input type="date" />
                </div>
                <div className="input-container">
                    <label htmlFor="">City <strong>*</strong></label>
                    <select name="" id="">
                        <option value="">Bharat</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="">State <strong>*</strong></label>
                    <select name="" id="">
                        <option value="">Bharat</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="">Postcode <strong>*</strong></label>
                    <input type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Select your Region <strong>*</strong></label>
                    <select name="" id="">
                        <option value="">Bharat</option>
                    </select>
                </div>
                <div className="input-container upload">
                    <label htmlFor="">Upload Government Documents <strong>*</strong></label>
                    <div>
                        <label>PAN Card front</label>
                        <input
                        type="file"
                        ref={fileInputRefs.panFront}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'panFront')}
                        />
                        <span>
                        {images.panFront && <img src={images.panFront} alt="PAN Card front" />}
                        </span>
                        <button type="button" onClick={() => handleUploadClick('panFront')}>Upload</button>
                    </div>
                    <div>
                        <label>PAN Card back</label>
                        <input
                        type="file"
                        ref={fileInputRefs.panBack}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'panBack')}
                        />
                        <span>
                        {images.panBack && <img src={images.panBack} alt="PAN Card back" />}
                        </span>
                        <button type="button" onClick={() => handleUploadClick('panBack')}>Upload</button>
                        
                    </div>
                    <div>
                        <label>Aadhar Card front</label>
                        <input
                        type="file"
                        ref={fileInputRefs.aadharFront}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'aadharFront')}
                        />
                        <span>
                        {images.aadharFront && <img src={images.aadharFront} alt="Aadhar Card front" />}
                        </span>
                        <button type="button" onClick={() => handleUploadClick('aadharFront')}>Upload</button>
                        
                    </div>
                    <div>
                        <label>Aadhar Card back</label>
                        <input
                        type="file"
                        ref={fileInputRefs.aadharBack}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'aadharBack')}
                        />
                        <span>
                        {images.aadharBack && <img src={images.aadharBack} alt="Aadhar Card back" />}
                        </span>
                        <button type="button" onClick={() => handleUploadClick('aadharBack')}>Upload</button>
                        
                    </div>
                </div>
            </form>

            <div className='signup-note'>
                <h3>Note</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, nulla odio et voluptatum animi ducimus quam temporibus accusantium architecto esse!</p>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">I agree to the <Link to='/'>terms and condition</Link></label>
                </div>
                {/* <button type='button' onClick={(e) => {handleSubmittedReq(e)}}>Submit</button> */}
                <button type='button' onClick={() => {handleMasterModalShow()}}>Submit</button>
            </div>
            <button onClick={handleMasterFormBack} className="next d-flex ms-auto" style={{position: 'absolute', bottom: 0, right: 0}}>Back</button>
            </>
        )}

        {showSubmittedReq == true && (
            <>
            <div className="requested-container">
                <div className='requested-form'>
                    <div className='req-edit-form'>
                        <p>Your request has been successfully submitted</p>
                        <FontAwesomeIcon icon={faEdit} onClick={handleShowAccepted} />
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
                                <span style={{ paddingRight: 15}}><button type='button' onClick={handleDeclineReq}>In Review</button></span>
                                {/* <span className='application-status'>Re-applied 1/3</span> */}
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
                            <button type='button' onClick={handleNextStep}>Re-apply 1/3</button>
                        </div>
                    )}

                    {showAcceptedReq && (
                        <div className='application-accept'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dignissimos ipsum adipisci asperiores! Nihil at iusto, repellat earum reiciendis maiores.</p>
                            <button type='button' onClick={handleNextStep}>Enroll Now</button>
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
            <button onClick={handleSubmitReqback} className="next d-flex ms-auto" style={{position: 'absolute', bottom: 0, right: 0}}>Back</button>
            </>
        )}

        <MasterFormModal modalShow={showMasterModal} handleModalClose={handleMasterModalShow} handleSubmittedReq={() => {handleSubmittedReq(); setShowMasterModal(false)}} />
    </div>
  )
}

export default MasterForm