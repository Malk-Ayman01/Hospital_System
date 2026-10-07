const jwt = require('jsonwebtoken');
const config = require('../config');
const { AppError } = require('../utils/response');

// Logged-out token ids (in memory; cleared on restart -)
const revoked = new Set();

// Verifies the Bearer token. Role comes from the server-signed token, never from the request body.
exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new AppError('Unauthorized', 401));
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    if (revoked.has(payload.jti)) return next(new AppError('Token has been logged out', 401));
    req.user = { id: payload.sub, role: payload.role, jti: payload.jti, exp: payload.exp };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

// Usage: authorize('ADMIN', 'DOCTOR') - allows only those roles.
exports.authorize = (...allowed) => (req, res, next) =>
  allowed.includes(req.user?.role) ? next() : next(new AppError('Forbidden: insufficient permissions', 403));

exports.revokeToken = (jti) => revoked.add(jti);
