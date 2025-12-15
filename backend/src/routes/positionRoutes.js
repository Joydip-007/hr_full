const express = require('express');
const router = express.Router();
const { positionController } = require('../controllers');

router.get('/', positionController.getAll);
router.get('/:id', positionController.getById);
router.post('/', positionController.create);
router.put('/:id', positionController.update);
router.delete('/:id', positionController.delete);

// Benefits
router.get('/:id/benefits', positionController.getBenefits);
router.post('/:id/benefits', positionController.addBenefit);
router.delete('/:id/benefits/:benefitId', positionController.removeBenefit);

// Requirements
router.get('/:id/requirements', positionController.getRequirements);
router.post('/:id/requirements', positionController.addRequirement);
router.delete('/:id/requirements/:requirementId', positionController.removeRequirement);

// Applicants
router.get('/:id/applicants', positionController.getApplicants);

module.exports = router;
