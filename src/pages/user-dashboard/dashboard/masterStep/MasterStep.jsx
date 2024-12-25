import React, {useState} from 'react';
import MasterForm from './masterForm/MasterForm'

function MasterStep({handleNextStep, handleMasterFormBack}) {
    const [idAbove18, setIdAbove18] = useState("Aadhar Card");
    const [showMasterForm, setShowMasterForm] = useState(true);
    const [showSubmittedReq, setShowSubmittedReq] = useState(false);
    const [submittedReqActive, setSubmittedReqActive] = useState(false);
    const [showDeclinedReq, setShowDeclinedReq] = useState(false);
    const [showReAppliedReq, setShowReAppliedReq] = useState(true);
    const [showAcceptedReq, setShowAcceptedReq] = useState(false);
    const [showAppliedSteps, setShowAppliedSteps] = useState(true);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [images, setImages] = useState({
        panFront: null,
        panBack: null,
        aadharFront: null,
        aadharBack: null,
    });
    
    const handleIdAbove18 = (event) => {
        setIdAbove18(event.target.value);
    };

    const handleSubmittedReq = () => {
        setSubmittedReqActive(!submittedReqActive);
        setShowSubmittedReq(true);
        setShowMasterForm(false);
        // handleBackButton()
    }

    const handleDeclineReq = () => {
        setShowReAppliedReq(false)
        setShowAcceptedReq(false)
        setShowDeclinedReq(true)
    }

    const handleShowAccepted = () => {
        setShowReAppliedReq(false)
        setShowDeclinedReq(false)
        setShowAcceptedReq(true)
    }

    const handleUploadClick = (type) => {
        // fileInputRefs[type].current.click();
        console.log("Done")
    };

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setImages((prevImages) => ({
                ...prevImages,
                [type]: reader.result,
            }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEnrollNow = (e) => {
        e.preventDefault();
        setShowPaymentForm(true);
        setShowAppliedSteps(false);
    }

    const handleSubmitReqback = () => {
        setShowSubmittedReq(false);
        setShowMasterForm(true);
    }

  return (
    <>
    <MasterForm showMasterForm={showMasterForm} showSubmittedReq={showSubmittedReq} idAbove18={idAbove18} showDeclinedReq={showDeclinedReq} showReAppliedReq={showReAppliedReq} showAcceptedReq={showAcceptedReq} handleIdAbove18={handleIdAbove18} handleSubmittedReq={handleSubmittedReq} handleFileChange={handleFileChange} handleUploadClick={handleUploadClick} images={images} handleEnrollNow={handleEnrollNow} handleDeclineReq={handleDeclineReq} handleShowAccepted={handleShowAccepted} handleNextStep={handleNextStep} handleMasterFormBack={handleMasterFormBack} handleSubmitReqback={handleSubmitReqback} />
    </>
  )
}

export default MasterStep
