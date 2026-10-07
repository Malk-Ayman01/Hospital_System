// ALL database access for users/staff lives here.
// Replace each function body once the schema is final (use src/config/db.js).
// Expected user shape returned: { id, username, password_hash, role, is_active }
// If the real column names differ, map them here so nothing else has to change.
const { AppError } = require('../utils/response');

const todo = () => { throw new AppError('Database not connected yet (waiting for schema)', 501); };

exports.findByUsername = async (username) => todo();
exports.findById = async (id) => todo();
exports.updatePassword = async (id, passwordHash) => todo();
// Staff management (used later by staff routes):
// exports.create / findAll / update / remove
