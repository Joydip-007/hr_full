const express = require('express');
const router = express.Router();
const { jobSeekerController } = require('../controllers');

router.get('/', jobSeekerController.getAll);
router.get('/search', jobSeekerController.search);
router.get('/:id', jobSeekerController.getById);
router.get('/:id/profile', jobSeekerController.getFullProfile);
router.post('/', jobSeekerController.create);
router.put('/:id', jobSeekerController.update);
router.delete('/:id', jobSeekerController.delete);

// Skills
router.get('/:id/skills', jobSeekerController.getSkills);
router.post('/:id/skills', jobSeekerController.addSkill);
router.delete('/:id/skills/:skillId', jobSeekerController.removeSkill);

// Degrees
router.get('/:id/degrees', jobSeekerController.getDegrees);
router.post('/:id/degrees', jobSeekerController.addDegree);
router.delete('/:id/degrees/:degreeId', jobSeekerController.removeDegree);

// Experiences
router.get('/:id/experiences', jobSeekerController.getExperiences);
router.post('/:id/experiences', jobSeekerController.addExperience);
router.delete('/:id/experiences/:experienceId', jobSeekerController.removeExperience);

// Volunteer Work
router.get('/:id/volunteer-work', jobSeekerController.getVolunteerWork);
router.post('/:id/volunteer-work', jobSeekerController.addVolunteerWork);
router.delete('/:id/volunteer-work/:volunteerId', jobSeekerController.removeVolunteerWork);

// Awards
router.get('/:id/awards', jobSeekerController.getAwards);
router.post('/:id/awards', jobSeekerController.addAward);
router.delete('/:id/awards/:awardId', jobSeekerController.removeAward);

// Applications
router.get('/:id/applications', jobSeekerController.getApplications);
router.post('/:id/applications', jobSeekerController.applyForPosition);

module.exports = router;
