const express = require('express');
const router = express.Router();
const { requirementController } = require('../controllers');

router.get('/', requirementController.getAll);
router.get('/:id', requirementController.getById);
router.post('/', requirementController.create);
router.put('/:id', requirementController.update);
router.delete('/:id', requirementController.delete);

module.exports = router;
