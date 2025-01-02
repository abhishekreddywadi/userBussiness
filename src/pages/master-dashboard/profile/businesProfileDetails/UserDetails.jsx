import React, { useContext, useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import Header from '../../../../components/header/Header';
import UserContext from '../../../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faChevronRight, 
    faLock, 
    faGlobe, 
    faUsers,
    faCrown,
    faCalendarAlt,
    faImage,
    faFileUpload
} from '@fortawesome/free-solid-svg-icons';
import './UserDetails.scss';
import { countries } from '../../../../data/locationData';

const UserDetails = () => {
    const { navButtonClick } = useContext(UserContext);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const fileInputRefs = {
        profile: useRef(null),
        cover: useRef(null),
        logo: useRef(null),
        document: useRef(null)
    };

    // Update states when country changes
    useEffect(() => {
        if (selectedCountry) {
            const country = countries.find(c => c.name === selectedCountry);
            setStates(country ? country.states : []);
            setSelectedState('');
            setSelectedCity('');
        }
    }, [selectedCountry]);

    // Update cities when state changes
    useEffect(() => {
        if (selectedState) {
            const state = states.find(s => s.name === selectedState);
            setCities(state ? state.cities : []);
            setSelectedCity('');
        }
    }, [selectedState, states]);

    const handleFileClick = (inputRef) => {
        inputRef.current.click();
    };

    return (
        <div className={`dashboard ${navButtonClick && "dashboard-full"}`}>
            <Container fluid>
                <Header />
                <div className="profile-setting-container">
                    <div className="profile-header">
                        <h4>Profile Setting</h4>
                        <div className="breadcrumb">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                            <FontAwesomeIcon icon={faChevronRight} size="sm" />
                            <span className="active">Profile Setting</span>
                        </div>
                    </div>

                    <Row>
                        <Col md={8}>
                            <Card className="profile-form-card">
                                <Card.Body>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Category</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="text"
                                                        value="B2B"
                                                        disabled
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Sub Category</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="text"
                                                        value="Dance Institute"
                                                        disabled
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Owner First Name</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue="Letz"
                                                        placeholder="Enter first name"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Owner Last Name</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue="Dance"
                                                        placeholder="Enter last name"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="email"
                                                        defaultValue="business@protolabdt.co"
                                                        placeholder="Enter email address"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Phone Number</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="tel"
                                                        defaultValue="9876543211"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Experience</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="number"
                                                        defaultValue="2"
                                                        placeholder="Years of experience"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>MasterId visibility</Form.Label>
                                                <div className="visibility-options" style={{display: 'flex',flexDirection: 'column'}}  >
                                                    <Form.Check
                                                    style={{display: 'flex',gap: '10px',alignItems: 'center'}} 
                                                        type="radio"
                                                        name="visibility"
                                                        id="private"
                                                        label={
                                                            <span>
                                                                <FontAwesomeIcon icon={faLock} className="me-2" />
                                                                Private (visible to only Me)
                                                            </span>
                                                        }
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        name="visibility"
                                                        style={{display: 'flex',gap: '10px',alignItems: 'center'}} 
                                                        id="public"
                                                        label={
                                                            <span>
                                                                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                                                                Public (visible to all)
                                                            </span>
                                                        }
                                                        defaultChecked
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        name="visibility"
                                                        style={{display: 'flex',gap: '10px',alignItems: 'center'}} 
                                                        id="protected"
                                                        label={
                                                            <span>
                                                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                                                Protected (visible to linked users)
                                                            </span>
                                                        }
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>About</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        placeholder="Write about your business..."
                                                    />
                                                </div>
                                            </Form.Group>

                                            <h5 className="section-title">Business Location</h5>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder="Enter your business address"
                                                        defaultValue="Handa city center,Dede"
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Row className="mb-3">
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label>Country</Form.Label>
                                                        <Form.Select
                                                            value={selectedCountry}
                                                            onChange={(e) => setSelectedCountry(e.target.value)}
                                                        >
                                                            <option value="">Select Country</option>
                                                            {countries.map((country) => (
                                                                <option key={country.id} value={country.name}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Select
                                                            value={selectedState}
                                                            onChange={(e) => setSelectedState(e.target.value)}
                                                            disabled={!selectedCountry}
                                                        >
                                                            <option value="">Select State</option>
                                                            {states.map((state) => (
                                                                <option key={state.id} value={state.name}>
                                                                    {state.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Select
                                                            value={selectedCity}
                                                            onChange={(e) => setSelectedCity(e.target.value)}
                                                            disabled={!selectedState}
                                                        >
                                                            <option value="">Select City</option>
                                                            {cities.map((city) => (
                                                                <option key={city} value={city}>
                                                                    {city}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Please Enter Location Landmark</Form.Label>
                                                <div className="form-field">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter landmark"
                                                        defaultValue="Handa city center,Dede"
                                                    />
                                                </div>
                                            </Form.Group>

                                            <div className="map-container mb-3">
                                                {/* Add your map component here */}
                                                <div className="map-placeholder">
                                                    Map will be displayed here
                                                </div>
                                                <button className="btn btn-primary mt-2">Confirm Address</button>
                                            </div>

                                            <h5 className="section-title">Social Media Links</h5>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Official WebSite Url</Form.Label>
                                                        <div className="form-field">
                                                            <Form.Control
                                                                type="url"
                                                                placeholder="Enter website URL"
                                                                defaultValue="https://www.google.com"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>FaceBook Profile Link</Form.Label>
                                                        <div className="form-field">
                                                            <Form.Control
                                                                type="url"
                                                                placeholder="Enter Facebook profile URL"
                                                                defaultValue="https://www.google.com"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Instagram Profile Link</Form.Label>
                                                        <div className="form-field">
                                                            <Form.Control
                                                                type="url"
                                                                placeholder="Enter Instagram profile URL"
                                                                defaultValue="https://www.google.com"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>LinkedIn Profile Link</Form.Label>
                                                        <div className="form-field">
                                                            <Form.Control
                                                                type="url"
                                                                placeholder="Enter LinkedIn profile URL"
                                                                defaultValue="https://www.google.com"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Twitter Profile Link</Form.Label>
                                                        <div className="form-field">
                                                            <Form.Control
                                                                type="url"
                                                                placeholder="Enter Twitter profile URL"
                                                                defaultValue="https://www.google.com"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mt-4">
                                                <Col>
                                                    <div className="d-flex justify-content-end">
                                                        <button type="submit" className="submit-button">
                                                            <FontAwesomeIcon icon={faLock} className="me-2" />
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="info-card">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faCrown} className="me-2" />
                                        Master ID
                                    </h5>
                                    <div className="info-item">
                                        <span className="label">Master ID:</span>
                                        <span className="value">MB_1001</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Master User ID:</span>
                                        <span className="value">424647658</span>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="info-card mt-4">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                        Current Plan/Package
                                    </h5>
                                    <div className="info-item">
                                        <span className="label">Title:</span>
                                        <span className="value">Gold</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Start Date:</span>
                                        <span className="value">2024-03-05</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">End Date:</span>
                                        <span className="value">2025-03-05</span>
                                    </div>
                                    <button className="upgrade-btn">
                                        Upgrade Plan
                                    </button>
                                </Card.Body>
                            </Card>

                            <Card className="info-card mt-4">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faImage} className="me-2" />
                                        Profile Image
                                    </h5>
                                    <div className="image-upload-container">
                                        <div className="preview-image">
                                            <img src="/path-to-preview" alt="" className="img-preview" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRefs.profile}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                        <div className="upload-controls">
                                            <button 
                                                className="choose-file-btn"
                                                onClick={() => handleFileClick(fileInputRefs.profile)}
                                            >
                                                Choose File
                                            </button>
                                            <span className="file-name">No file chosen</span>
                                        </div>
                                        <button className="save-btn">Save</button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="info-card mt-4">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faImage} className="me-2" />
                                        Cover Image
                                    </h5>
                                    <div className="image-upload-container">
                                        <div className="preview-image cover-preview">
                                            <img src="/path-to-preview" alt="" className="img-preview" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRefs.cover}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                        <div className="upload-controls">
                                            <button 
                                                className="choose-file-btn"
                                                onClick={() => handleFileClick(fileInputRefs.cover)}
                                            >
                                                Choose File
                                            </button>
                                            <span className="file-name">No file chosen</span>
                                        </div>
                                        <button className="save-btn">Save</button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="info-card mt-4">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faImage} className="me-2" />
                                        Business Logo
                                    </h5>
                                    <div className="image-upload-container">
                                        <div className="preview-image">
                                            <img src="/path-to-preview" alt="" className="img-preview" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRefs.logo}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                        <div className="upload-controls">
                                            <button 
                                                className="choose-file-btn"
                                                onClick={() => handleFileClick(fileInputRefs.logo)}
                                            >
                                                Choose File
                                            </button>
                                            <span className="file-name">No file chosen</span>
                                        </div>
                                        <button className="save-btn">Save</button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="info-card mt-4">
                                <Card.Body>
                                    <h5>
                                        <FontAwesomeIcon icon={faFileUpload} className="me-2" />
                                        Document Upload
                                    </h5>
                                    <div className="document-upload-container">
                                        <Form.Group>
                                            <Form.Label>Document Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter document title"
                                            />
                                        </Form.Group>
                                        <div className="upload-controls mt-3">
                                            <input
                                                type="file"
                                                ref={fileInputRefs.document}
                                                style={{ display: 'none' }}
                                            />
                                            <button 
                                                className="choose-file-btn"
                                                onClick={() => handleFileClick(fileInputRefs.document)}
                                            >
                                                Choose File
                                            </button>
                                            <span className="file-name">No file chosen</span>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="view-btn">View</button>
                                            <button className="save-btn">Save</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default UserDetails;