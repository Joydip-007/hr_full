const { Position } = require('../models');

const positionController = {
  // Get all positions
  async getAll(req, res) {
    try {
      const positions = await Position.findAll();
      res.json({ success: true, data: positions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get position by ID
  async getById(req, res) {
    try {
      const position = await Position.findById(req.params.id);
      if (!position) {
        return res.status(404).json({ success: false, error: 'Position not found' });
      }
      res.json({ success: true, data: position });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new position
  async create(req, res) {
    try {
      const position = await Position.create(req.body);
      res.status(201).json({ success: true, data: position });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update position
  async update(req, res) {
    try {
      const position = await Position.update(req.params.id, req.body);
      if (!position) {
        return res.status(404).json({ success: false, error: 'Position not found' });
      }
      res.json({ success: true, data: position });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete position
  async delete(req, res) {
    try {
      const deleted = await Position.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Position not found' });
      }
      res.json({ success: true, message: 'Position deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get position benefits
  async getBenefits(req, res) {
    try {
      const benefits = await Position.getBenefits(req.params.id);
      res.json({ success: true, data: benefits });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Add benefit to position
  async addBenefit(req, res) {
    try {
      await Position.addBenefit(req.params.id, req.body.benefit_id);
      res.status(201).json({ success: true, message: 'Benefit added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Remove benefit from position
  async removeBenefit(req, res) {
    try {
      await Position.removeBenefit(req.params.id, req.params.benefitId);
      res.json({ success: true, message: 'Benefit removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get position requirements
  async getRequirements(req, res) {
    try {
      const requirements = await Position.getRequirements(req.params.id);
      res.json({ success: true, data: requirements });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Add requirement to position
  async addRequirement(req, res) {
    try {
      await Position.addRequirement(req.params.id, req.body.requirement_id);
      res.status(201).json({ success: true, message: 'Requirement added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Remove requirement from position
  async removeRequirement(req, res) {
    try {
      await Position.removeRequirement(req.params.id, req.params.requirementId);
      res.json({ success: true, message: 'Requirement removed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get applicants for position
  async getApplicants(req, res) {
    try {
      const applicants = await Position.getApplicants(req.params.id);
      res.json({ success: true, data: applicants });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = positionController;
