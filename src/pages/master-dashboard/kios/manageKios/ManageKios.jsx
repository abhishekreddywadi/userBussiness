import React, { useContext, useState, useRef } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../../../../components/header/Header';
import UserContext from '../../../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faChevronRight,
    faCloudUpload,
    faSave,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import './ManageKios.scss';

const ManageKios = () => {
    const { navButtonClick } = useContext(UserContext);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        image: null,
        imagePreview: null,
        advertisementLink: '',
        imageType: '',
        area: '',
        isActive: true
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleCancel = () => {
        setFormData({
            image: null,
            imagePreview: null,
            advertisementLink: '',
            imageType: '',
            area: '',
            isActive: true
        });
    };

    return (
        <div className={`dashboard ${navButtonClick && "dashboard-full"}`}>
            <Header />
            <Container fluid className="manage-kios-container">
                <div className="breadcrumb-n-title">
                    <div className="breadcrumb-container">
                        <FontAwesomeIcon icon={faHome} />
                        <FontAwesomeIcon icon={faChevronRight} />
                        <span>Kios</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                        <span>Manage Kios</span>
                    </div>
                    <h4>Manage Kios</h4>
                </div>

                <div className="content-wrapper">
                    <h5 className="section-title">Add Advertisements</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="form-group">
                                    <Form.Label>Image</Form.Label>
                                    <div 
                                        className="image-upload-container"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                        {formData.imagePreview ? (
                                            <img 
                                                src={formData.imagePreview} 
                                                alt="Preview" 
                                                className="preview"
                                            />
                                        ) : (
                                            <>
                                                <FontAwesomeIcon 
                                                    icon={faCloudUpload} 
                                                    className="upload-icon"
                                                />
                                                <div className="upload-text">
                                                    Click or drag image to upload
                                                </div>
                                            </>
                                        )}
                                        <div className="file-name">
                                            {formData.image ? formData.image.name : 'No file chosen'}
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group className="form-group">
                                    <Form.Label>Advertisement Link</Form.Label>
                                    <Form.Control
                                        type="url"
                                        name="advertisementLink"
                                        value={formData.advertisementLink}
                                        onChange={handleInputChange}
                                        placeholder="Enter advertisement URL"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group className="form-group">
                                    <Form.Label>Area</Form.Label>
                                    <Form.Select
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Area</option>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="central">Central</option>
                                        <option value="all">All Areas</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group className="form-group">
                                    <Form.Label>Image Type</Form.Label>
                                    <Form.Select
                                        name="imageType"
                                        value={formData.imageType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Image Type</option>
                                        <option value="banner">Banner</option>
                                        <option value="popup">Popup</option>
                                        <option value="sidebar">Sidebar</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Check
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    label="Is Active"
                                />
                            </Col>

                            <Col md={12}>
                                <div className="action-buttons">
                                    <button type="submit" className="save-btn">
                                        <FontAwesomeIcon icon={faSave} className="me-2" />
                                        Save
                                    </button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={handleCancel}
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="me-2" />
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default ManageKios;