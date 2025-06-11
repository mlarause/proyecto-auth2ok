import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      // 1. Verificar conexión con el backend
      await axios.get('http://localhost:3000/api/test/all');
      
      // 2. Realizar petición de login
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password
      });

      console.log('Respuesta del servidor:', response.data);

      // 3. Guardar token y datos de usuario
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        email: response.data.email,
        role: response.data.role
      }));

      // 4. Redirección según rol
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (err) {
      console.error('Error completo:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      // Manejo de errores específicos
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else if (err.response?.status === 404) {
        setError('Usuario no encontrado');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2>Iniciar Sesión</h2>
          <p className="text-muted">Ingresa tus credenciales para continuar</p>
        </div>

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="p-4 border rounded-3 bg-light">
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            className="w-100 py-2 mt-3"
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
                Verificando...
              </>
            ) : 'Iniciar Sesión'}
          </Button>

          <div className="text-center mt-3">
            <a href="/forgot-password" className="text-decoration-none">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </Form>

        <div className="text-center mt-3">
          <p className="text-muted">
            ¿No tienes cuenta? <a href="/register" className="text-decoration-none">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;