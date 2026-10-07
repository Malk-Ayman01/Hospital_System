const success = (res, data = null, message = 'Operation successful', status = 200) =>
  res.status(status).json({ success: true, data, message });

class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

module.exports = { success, AppError };
