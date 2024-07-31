import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FeatureItem = ({ iconClass, title, description }) => (
    <Col md={6} lg={3}>
        <div className="featurs-item text-center rounded bg-light p-4">
            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                <i className={iconClass}></i>
            </div>
            <div className="featurs-content text-center">
                <h5>{title}</h5>
                <p className="mb-0">{description}</p>
            </div>
        </div>
    </Col>
);

const Features = () => (
    <div className="container-fluid featurs py-5">
        <Container>
            <Row className="g-4">
                <FeatureItem
                    iconClass="fas fa-car-side fa-3x text-white"
                    title="Free Shipping"
                    description="Free on order over $300"
                />
                <FeatureItem
                    iconClass="fas fa-user-shield fa-3x text-white"
                    title="Security Payment"
                    description="100% security payment"
                />
                <FeatureItem
                    iconClass="fas fa-exchange-alt fa-3x text-white"
                    title="30 Day Return"
                    description="30 day money guarantee"
                />
                <FeatureItem
                    iconClass="fa fa-phone-alt fa-3x text-white"
                    title="24/7 Support"
                    description="Support every time fast"
                />
            </Row>
        </Container>
    </div>
);

export default Features;
