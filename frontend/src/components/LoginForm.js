import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Archivo CSS adicional para estilos personalizados

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        email: response.data.email,
        role: response.data.role
      }));

      navigate(response.data.role === 'admin' ? '/admin' : '/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img 
            src="/logo.png" 
            alt="Logo de la empresa" 
            className="logo"
          />
          <h2>Bienvenido de vuelta</h2>
          <p>Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        {error && (
          <Alert variant="danger" className="alert-custom">
            <i className="bi bi-exclamation-circle-fill"></i> {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-4 form-group-custom">
            <Form.Label>Correo Electrónico</Form.Label>
            <div className="input-group-custom">
              <i className="bi bi-envelope input-icon"></i>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="input-custom"
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4 form-group-custom">
            <Form.Label>Contraseña</Form.Label>
            <div className="input-group-custom">
              <i className="bi bi-lock input-icon"></i>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-custom"
                required
              />
            </div>
            
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar Sesión
              </>
            )}
          </Button>
        </Form>

        
      </div>
    </div>
  );
};

export default LoginForm;