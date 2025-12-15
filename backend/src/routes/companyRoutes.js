const express = require('express');
const router = express.Router();
const { companyController } = require('../controllers');

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.post('/', companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);
router.get('/:id/positions', companyController.getPositions);
router.get('/:id/employees', companyController.getEmployees);

module.exports = router;
