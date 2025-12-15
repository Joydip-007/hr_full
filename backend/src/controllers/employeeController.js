const { Employee } = require('../models');

const employeeController = {
  // Get all employees
  async getAll(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;
      const employees = await Employee.findAll(limit, offset);
      res.json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get employee by ID
  async getById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      res.json({ success: true, data: employee });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get full profile
  async getFullProfile(req, res) {
    try {
      const profile = await Employee.getFullProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      res.json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new employee
  async create(req, res) {
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update employee
  async update(req, res) {
    try {
      const employee = await Employee.update(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      res.json({ success: true, data: employee });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete employee
  async delete(req, res) {
    try {
      const deleted = await Employee.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Search employees
  async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ success: false, error: 'Search query required' });
      }
      const employees = await Employee.search(q);
      res.json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Skills
  async getSkills(req, res) {
    try {
      const skills = await Employee.getSkills(req.params.id);
      res.json({ success: true, data: skills });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addSkill(req, res) {
    try {
      const skill = await Employee.addSkill(req.params.id, req.body);
      res.status(201).json({ success: true, data: skill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeSkill(req, res) {
    try {
      await Employee.removeSkill(req.params.skillId);
      res.json({ success: true, message: 'Skill removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Degrees
  async getDegrees(req, res) {
    try {
      const degrees = await Employee.getDegrees(req.params.id);
      res.json({ success: true, data: degrees });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addDegree(req, res) {
    try {
      const degree = await Employee.addDegree(req.params.id, req.body);
      res.status(201).json({ success: true, data: degree });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeDegree(req, res) {
    try {
      await Employee.removeDegree(req.params.degreeId);
      res.json({ success: true, message: 'Degree removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Experiences
  async getExperiences(req, res) {
    try {
      const experiences = await Employee.getExperiences(req.params.id);
      res.json({ success: true, data: experiences });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addExperience(req, res) {
    try {
      const experience = await Employee.addExperience(req.params.id, req.body);
      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeExperience(req, res) {
    try {
      await Employee.removeExperience(req.params.experienceId);
      res.json({ success: true, message: 'Experience removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Volunteer Work
  async getVolunteerWork(req, res) {
    try {
      const volunteerWork = await Employee.getVolunteerWork(req.params.id);
      res.json({ success: true, data: volunteerWork });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addVolunteerWork(req, res) {
    try {
      const volunteerWork = await Employee.addVolunteerWork(req.params.id, req.body);
      res.status(201).json({ success: true, data: volunteerWork });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeVolunteerWork(req, res) {
    try {
      await Employee.removeVolunteerWork(req.params.volunteerId);
      res.json({ success: true, message: 'Volunteer work removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Awards
  async getAwards(req, res) {
    try {
      const awards = await Employee.getAwards(req.params.id);
      res.json({ success: true, data: awards });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async addAward(req, res) {
    try {
      const award = await Employee.addAward(req.params.id, req.body);
      res.status(201).json({ success: true, data: award });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async removeAward(req, res) {
    try {
      await Employee.removeAward(req.params.awardId);
      res.json({ success: true, message: 'Award removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = employeeController;
