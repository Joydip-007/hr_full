const { Requirement } = require('../models');

const requirementController = {
  // Get all requirements
  async getAll(req, res) {
    try {
      const requirements = await Requirement.findAll();
      res.json({ success: true, data: requirements });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get requirement by ID
  async getById(req, res) {
    try {
      const requirement = await Requirement.findById(req.params.id);
      if (!requirement) {
        return res.status(404).json({ success: false, error: 'Requirement not found' });
      }
      res.json({ success: true, data: requirement });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new requirement
  async create(req, res) {
    try {
      const requirement = await Requirement.create(req.body);
      res.status(201).json({ success: true, data: requirement });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update requirement
  async update(req, res) {
    try {
      const requirement = await Requirement.update(req.params.id, req.body);
      if (!requirement) {
        return res.status(404).json({ success: false, error: 'Requirement not found' });
      }
      res.json({ success: true, data: requirement });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete requirement
  async delete(req, res) {
    try {
      const deleted = await Requirement.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Requirement not found' });
      }
      res.json({ success: true, message: 'Requirement deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = requirementController;
