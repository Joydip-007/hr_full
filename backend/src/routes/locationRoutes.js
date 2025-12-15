const express = require('express');
const router = express.Router();
const { locationController } = require('../controllers');

router.get('/', locationController.getAll);
router.get('/:id', locationController.getById);
router.post('/', locationController.create);
router.put('/:id', locationController.update);
router.delete('/:id', locationController.delete);

module.exports = router;
