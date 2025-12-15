const { JobSeeker } = require('../models');

const jobSeekerController = {
  // Get all job seekers
  async getAll(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;
      const jobSeekers = await JobSeeker.findAll(limit, offset);
      res.json({ success: true, data: jobSeekers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get job seeker by ID
  async getById(req, res) {
    try {
      const jobSeeker = await JobSeeker.findById(req.params.id);
      if (!jobSeeker) {
        return res.status(404).json({ success: false, error: 'Job seeker not found' });
      }
      res.json({ success: true, data: jobSeeker });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get full profile
  async getFullProfile(req, res) {
    try {
      const profile = await JobSeeker.getFullProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ success: false, error: 'Job seeker not found' });
      }
      res.json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new job seeker
  async create(req, res) {
    try {
      const jobSeeker = await JobSeeker.create(req.body);
      res.status(201).json({ success: true, data: jobSeeker });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update job seeker
  async update(req, res) {
    try {
      const jobSeeker = await JobSeeker.update(req.params.id, req.body);
      if (!jobSeeker) {
        return res.status(404).json({ success: false, error: 'Job seeker not found' });
      }
      res.json({ success: true, data: jobSeeker });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete job seeker
  async delete(req, res) {
    try {
      const deleted = await JobSeeker.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Job seeker not found' });
      }
      res.json({ success: true, message: 'Job seeker deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Search job seekers
  async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ success: false, error: 'Search query required' });
      }
      const jobSeekers = await JobSeeker.search(q);
      res.json({ success: true, data: jobSeekers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Skills
  async getSkills(req, res) {
    try {
      const skills = await JobSeeker.getSkills(req.params.id);
      res.json({ success: true, data: skills });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addSkill(req, res) {
    try {
      const skill = await JobSeeker.addSkill(req.params.id, req.body);
      res.status(201).json({ success: true, data: skill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeSkill(req, res) {
    try {
      await JobSeeker.removeSkill(req.params.skillId);
      res.json({ success: true, message: 'Skill removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Degrees
  async getDegrees(req, res) {
    try {
      const degrees = await JobSeeker.getDegrees(req.params.id);
      res.json({ success: true, data: degrees });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addDegree(req, res) {
    try {
      const degree = await JobSeeker.addDegree(req.params.id, req.body);
      res.status(201).json({ success: true, data: degree });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeDegree(req, res) {
    try {
      await JobSeeker.removeDegree(req.params.degreeId);
      res.json({ success: true, message: 'Degree removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Experiences
  async getExperiences(req, res) {
    try {
      const experiences = await JobSeeker.getExperiences(req.params.id);
      res.json({ success: true, data: experiences });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addExperience(req, res) {
    try {
      const experience = await JobSeeker.addExperience(req.params.id, req.body);
      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeExperience(req, res) {
    try {
      await JobSeeker.removeExperience(req.params.experienceId);
      res.json({ success: true, message: 'Experience removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Volunteer Work
  async getVolunteerWork(req, res) {
    try {
      const volunteerWork = await JobSeeker.getVolunteerWork(req.params.id);
      res.json({ success: true, data: volunteerWork });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addVolunteerWork(req, res) {
    try {
      const volunteerWork = await JobSeeker.addVolunteerWork(req.params.id, req.body);
      res.status(201).json({ success: true, data: volunteerWork });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeVolunteerWork(req, res) {
    try {
      await JobSeeker.removeVolunteerWork(req.params.volunteerId);
      res.json({ success: true, message: 'Volunteer work removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Awards
  async getAwards(req, res) {
    try {
      const awards = await JobSeeker.getAwards(req.params.id);
      res.json({ success: true, data: awards });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addAward(req, res) {
    try {
      const award = await JobSeeker.addAward(req.params.id, req.body);
      res.status(201).json({ success: true, data: award });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeAward(req, res) {
    try {
      await JobSeeker.removeAward(req.params.awardId);
      res.json({ success: true, message: 'Award removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Applications
  async getApplications(req, res) {
    try {
      const applications = await JobSeeker.getApplications(req.params.id);
      res.json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async applyForPosition(req, res) {
    try {
      const application = await JobSeeker.applyForPosition(req.params.id, req.body.position_id);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = jobSeekerController;
