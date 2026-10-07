const { AppError } = require('./response');

// Throws 400 if any listed field is missing/empty in the object.
exports.requireFields = (body, fields) => {
  const missing = fields.filter((f) => body?.[f] === undefined || body[f] === null || body[f] === '');
  if (missing.length) throw new AppError(`Missing required fields: ${missing.join(', ')}`, 400);
};

exports.validatePassword = (pw) => {
  if (typeof pw !== 'string' || pw.length < 8) throw new AppError('Password must be at least 8 characters', 400);
};
