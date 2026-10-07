// Placeholder CRUD router. Auth + role checks are REAL; handlers return 501 until the schema exists.
// When ready: هنبدل `todo` with a real handler that calls that module's service.
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { AppError } = require('../utils/response');

module.exports = (name, roles) => {
  const router = express.Router();
  const todo = (req, res, next) => next(new AppError(`${name}: not implemented yet (waiting for DB schema)`, 501));

  router.use(authenticate);
  router.post('/', authorize(...roles.write), todo);
  router.get('/', authorize(...roles.read), todo);
  router.get('/:id', authorize(...roles.read), todo);
  router.put('/:id', authorize(...(roles.update || roles.write)), todo);
  router.delete('/:id', authorize(...(roles.remove || ['ADMIN'])), todo);
  return router;
};
