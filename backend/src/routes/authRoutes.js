const router = require('express').Router();
const { authenticate, revokeToken } = require('../middleware/auth');
const auth = require('../services/authService');
const { success } = require('../utils/response');

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/login', wrap(async (req, res) => success(res, await auth.login(req.body), 'Login successful')));

router.post('/logout', authenticate, (req, res) => {
  revokeToken(req.user.jti);
  success(res, null, 'Logged out');
});

router.get('/me', authenticate, wrap(async (req, res) => success(res, await auth.getProfile(req.user.id))));

router.post('/change-password', authenticate, wrap(async (req, res) => {
  await auth.changePassword(req.user.id, req.body);
  success(res, null, 'Password changed');
}));

module.exports = router;
