const router = require('express').Router();
const db = require('../config/db');
router.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' }, message: 'Server is running' }));

router.get('/health/db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ success: true, data: { database: 'connected' }, message: 'Database OK' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

router.use('/auth', require('./authRoutes'));
router.use('/staff', require('./staffRoutes'));
router.use('/patients', require('./patientRoutes'));
router.use('/doctors', require('./doctorRoutes'));
router.use('/departments', require('./departmentRoutes'));
router.use('/appointments', require('./appointmentRoutes'));
router.use('/medical-records', require('./medicalRecordRoutes'));
router.use('/prescriptions', require('./prescriptionRoutes'));
router.use('/medicines', require('./medicineRoutes'));
router.use('/billing', require('./billingRoutes'));
router.use('/admin', require('./adminRoutes'));

module.exports = router;
