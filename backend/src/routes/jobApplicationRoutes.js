const express = require('express');
const router = express.Router();
const { jobApplicationController } = require('../controllers');

router.get('/', jobApplicationController.getAll);
router.get('/status/:status', jobApplicationController.getByStatus);
router.get('/:id', jobApplicationController.getById);
router.post('/', jobApplicationController.create);
router.patch('/:id/status', jobApplicationController.updateStatus);
router.delete('/:id', jobApplicationController.delete);

module.exports = router;
