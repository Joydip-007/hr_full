const { Company } = require('../models');

const companyController = {
  // Get all companies
  async getAll(req, res) {
    try {
      const companies = await Company.findAll();
      res.json({ success: true, data: companies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get company by ID
  async getById(req, res) {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ success: false, error: 'Company not found' });
      }
      res.json({ success: true, data: company });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new company
  async create(req, res) {
    try {
      const company = await Company.create(req.body);
      res.status(201).json({ success: true, data: company });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update company
  async update(req, res) {
    try {
      const company = await Company.update(req.params.id, req.body);
      if (!company) {
        return res.status(404).json({ success: false, error: 'Company not found' });
      }
      res.json({ success: true, data: company });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete company
  async delete(req, res) {
    try {
      const deleted = await Company.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Company not found' });
      }
      res.json({ success: true, message: 'Company deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get company positions
  async getPositions(req, res) {
    try {
      const positions = await Company.getPositions(req.params.id);
      res.json({ success: true, data: positions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get company employees
  async getEmployees(req, res) {
    try {
      const employees = await Company.getEmployees(req.params.id);
      res.json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = companyController;
