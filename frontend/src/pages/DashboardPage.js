import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container className="mt-5">
      <Alert variant="success">
        Bienvenido, {user?.email} (Rol: {user?.role})
      </Alert>
      <h2>Página de Dashboard</h2>
      <p>Esta es una página común para todos los roles por ahora.</p>
    </Container>
  );
};

export default DashboardPage;