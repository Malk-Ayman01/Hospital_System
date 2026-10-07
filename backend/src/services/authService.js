const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const userRepo = require('../repositories/userRepository');
const { AppError } = require('../utils/response');
const { requireFields, validatePassword } = require('../utils/validators');

exports.hashPassword = (plain) => bcrypt.hash(plain, 10);

exports.login = async ({ username, password }) => {
  requireFields({ username, password }, ['username', 'password']);
  const user = await userRepo.findByUsername(username);
  // Same message for unknown user / wrong password so attackers can't tell which was wrong.
  if (!user || user.is_active === false || !(await bcrypt.compare(password, user.password_hash))) {
    throw new AppError('Invalid username or password', 401);
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    jwtid: crypto.randomUUID(),
  });
  return { token, user: { id: user.id, username: user.username, role: user.role } };
};

exports.getProfile = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new AppError('User not found', 404);
  const { password_hash, ...safe } = user; // never return the hash
  return safe;
};

exports.changePassword = async (id, { currentPassword, newPassword }) => {
  requireFields({ currentPassword, newPassword }, ['currentPassword', 'newPassword']);
  validatePassword(newPassword);
  const user = await userRepo.findById(id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    throw new AppError('Current password is incorrect', 401);
  }
  await userRepo.updatePassword(id, await exports.hashPassword(newPassword));
};
