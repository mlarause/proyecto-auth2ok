import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '400px', padding: '20px' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Inicio de Sesión</Card.Title>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;