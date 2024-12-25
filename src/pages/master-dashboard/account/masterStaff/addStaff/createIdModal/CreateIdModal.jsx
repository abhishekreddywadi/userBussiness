import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './createIdModal.scss'

function CreateIdModal({showIdStaffModal, handleShowIdStaffModal, handleCheckPhoneNum, checkPhoneNum, handleCheckEmail, checkEmail }) {
  return (
    <Modal className='add-modal department-modal' show={showIdStaffModal} onHide={handleShowIdStaffModal}>
        <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="">
                <div className="row" style={{gap: '25px 0'}}>

                    <div className="col-12 col-md-6">
                        <div className="input-container">
                            <label htmlFor="">Legal Name</label>
                            <input type="text" placeholder='Add Department Name' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="input-container">
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder='Add Last Name' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="input-container">
                            <label htmlFor="">Phone Number</label>
                            <div className='input-box d-flex align-items-center'>
                                <input type="number" placeholder='Add Department Name' />
                                <button type='button' onClick={(e) => handleCheckPhoneNum(e)}>Submit</button>
                            </div>
                        </div>
                    </div>

                    {checkPhoneNum && (
                        <div className="col-12 col-md-4">
                            <div className="input-container">
                                <label htmlFor="">OTP</label>
                                <div className='input-box d-flex align-items-center'>
                                <input type="number" placeholder='Add OTP' />
                                    <button type='button' onClick={(e) => handleCheckPhoneNum(e)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-12 col-md-4">
                        <div className="input-container">
                            <label htmlFor="">Country</label>
                            <select name="" id="">
                                <option value="">Australia</option>
                                <option value="">Bharat</option>
                                <option value="">Japan</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="input-container">
                            <label htmlFor="">City</label>
                            <select name="" id="">
                                <option value="">Australia</option>
                                <option value="">Bharat</option>
                                <option value="">Japan</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-container">
                            <label htmlFor="">State</label>
                            <select name="" id="">
                                <option value="">Australia</option>
                                <option value="">Bharat</option>
                                <option value="">Japan</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <div className='input-box d-flex align-items-center'>
                                <input type="email" placeholder='Add Email' />
                                <button type='button' onClick={(e) => handleCheckEmail(e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                    {checkEmail && (
                        <div className="col-12 col-md-4">
                            <div className="input-container">
                                <label htmlFor="">OTP</label>
                                <div className='input-box d-flex align-items-center'>
                                <input type="number" placeholder='Add Email OTP' />
                                    <button type='button' onClick={(e) => handleCheckEmail(e)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleShowIdStaffModal}>
            Cancel
            </Button>
            <Button variant="primary" onClick={handleShowIdStaffModal}>
            Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateIdModal
