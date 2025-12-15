const express = require('express');
const router = express.Router();
const { employeeController } = require('../controllers');

router.get('/', employeeController.getAll);
router.get('/search', employeeController.search);
router.get('/:id', employeeController.getById);
router.get('/:id/profile', employeeController.getFullProfile);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

// Skills
router.get('/:id/skills', employeeController.getSkills);
router.post('/:id/skills', employeeController.addSkill);
router.delete('/:id/skills/:skillId', employeeController.removeSkill);

// Degrees
router.get('/:id/degrees', employeeController.getDegrees);
router.post('/:id/degrees', employeeController.addDegree);
router.delete('/:id/degrees/:degreeId', employeeController.removeDegree);

// Experiences
router.get('/:id/experiences', employeeController.getExperiences);
router.post('/:id/experiences', employeeController.addExperience);
router.delete('/:id/experiences/:experienceId', employeeController.removeExperience);

// Volunteer Work
router.get('/:id/volunteer-work', employeeController.getVolunteerWork);
router.post('/:id/volunteer-work', employeeController.addVolunteerWork);
router.delete('/:id/volunteer-work/:volunteerId', employeeController.removeVolunteerWork);

// Awards
router.get('/:id/awards', employeeController.getAwards);
router.post('/:id/awards', employeeController.addAward);
router.delete('/:id/awards/:awardId', employeeController.removeAward);

module.exports = router;
