const { Benefit } = require('../models');

const benefitController = {
  // Get all benefits
  async getAll(req, res) {
    try {
      const benefits = await Benefit.findAll();
      res.json({ success: true, data: benefits });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get benefit by ID
  async getById(req, res) {
    try {
      const benefit = await Benefit.findById(req.params.id);
      if (!benefit) {
        return res.status(404).json({ success: false, error: 'Benefit not found' });
      }
      res.json({ success: true, data: benefit });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new benefit
  async create(req, res) {
    try {
      const benefit = await Benefit.create(req.body);
      res.status(201).json({ success: true, data: benefit });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update benefit
  async update(req, res) {
    try {
      const benefit = await Benefit.update(req.params.id, req.body);
      if (!benefit) {
        return res.status(404).json({ success: false, error: 'Benefit not found' });
      }
      res.json({ success: true, data: benefit });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete benefit
  async delete(req, res) {
    try {
      const deleted = await Benefit.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Benefit not found' });
      }
      res.json({ success: true, message: 'Benefit deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = benefitController;
