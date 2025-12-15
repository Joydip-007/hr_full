const express = require('express');
const router = express.Router();
const { benefitController } = require('../controllers');

router.get('/', benefitController.getAll);
router.get('/:id', benefitController.getById);
router.post('/', benefitController.create);
router.put('/:id', benefitController.update);
router.delete('/:id', benefitController.delete);

module.exports = router;
