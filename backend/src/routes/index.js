const express = require('express');
const router = express.Router();

const locationRoutes = require('./locationRoutes');
const companyRoutes = require('./companyRoutes');
const positionRoutes = require('./positionRoutes');
const benefitRoutes = require('./benefitRoutes');
const requirementRoutes = require('./requirementRoutes');
const jobSeekerRoutes = require('./jobSeekerRoutes');
const employeeRoutes = require('./employeeRoutes');
const jobApplicationRoutes = require('./jobApplicationRoutes');

router.use('/locations', locationRoutes);
router.use('/companies', companyRoutes);
router.use('/positions', positionRoutes);
router.use('/benefits', benefitRoutes);
router.use('/requirements', requirementRoutes);
router.use('/job-seekers', jobSeekerRoutes);
router.use('/employees', employeeRoutes);
router.use('/applications', jobApplicationRoutes);

module.exports = router;
