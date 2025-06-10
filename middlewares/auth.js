const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
  // Obtener token de los headers
  let token = req.headers['x-access-token'] || req.headers.authorization;
  
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  // Limpiar token si viene con 'Bearer'
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    // Verificar y decodificar token
    const decoded = jwt.verify(token, config.secret);
    
    // Verificar que el token tenga la estructura correcta
    if (!decoded.id) {
      throw new Error("Token no contiene ID de usuario");
    }

    // Asignar datos al request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    console.log(`[AuthJWT] Usuario autenticado - ID: ${decoded.id}, Rol: ${decoded.role}`);
    next();
  } catch (error) {
    console.error('[AuthJWT] Error:', error.message);
    return res.status(401).json({ 
      message: "Token inválido",
      error: error.message
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    console.log('[AuthJWT] Acceso admin autorizado');
    return next();
  }
  res.status(403).json({ message: "Se requiere rol de administrador" });
};