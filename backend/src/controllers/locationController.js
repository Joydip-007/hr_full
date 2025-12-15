const { Location } = require('../models');

const locationController = {
  // Get all locations
  async getAll(req, res) {
    try {
      const locations = await Location.findAll();
      res.json({ success: true, data: locations });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get location by ID
  async getById(req, res) {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, data: location });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new location
  async create(req, res) {
    try {
      const location = await Location.create(req.body);
      res.status(201).json({ success: true, data: location });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update location
  async update(req, res) {
    try {
      const location = await Location.update(req.params.id, req.body);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, data: location });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete location
  async delete(req, res) {
    try {
      const deleted = await Location.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, message: 'Location deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = locationController;
