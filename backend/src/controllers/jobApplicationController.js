const { JobApplication } = require('../models');

const jobApplicationController = {
  // Get all applications
  async getAll(req, res) {
    try {
      const applications = await JobApplication.findAll();
      res.json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get application by ID
  async getById(req, res) {
    try {
      const application = await JobApplication.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }
      res.json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new application
  async create(req, res) {
    try {
      const application = await JobApplication.create(req.body);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update application status
  async updateStatus(req, res) {
    try {
      const application = await JobApplication.updateStatus(req.params.id, req.body.status);
      if (!application) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }
      res.json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete application
  async delete(req, res) {
    try {
      const deleted = await JobApplication.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }
      res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get applications by status
  async getByStatus(req, res) {
    try {
      const applications = await JobApplication.findByStatus(req.params.status);
      res.json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = jobApplicationController;
