import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import Header from "../../../components/header/Header";

function BusinessSetting() {
  return (
    <div className="dashboard business-setting">
        <Container>
            <Header />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                    <Tab.Pane eventKey="first">First tab content</Tab.Pane>
                    <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                    </Tab.Content>
                </Col>
                </Row>
            </Tab.Container>
        </Container>
    </div>
  );
}

export default BusinessSetting;
