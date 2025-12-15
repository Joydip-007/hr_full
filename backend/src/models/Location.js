const { pool } = require('../config/database');

class Location {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT * FROM locations ORDER BY city`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM locations WHERE location_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(locationData) {
    const { city, state, country, address } = locationData;
    const [result] = await pool.query(
      `INSERT INTO locations (city, state, country, address) VALUES (?, ?, ?, ?)`,
      [city, state, country, address]
    );
    return { location_id: result.insertId, ...locationData };
  }

  static async update(id, locationData) {
    const { city, state, country, address } = locationData;
    await pool.query(
      `UPDATE locations SET city = ?, state = ?, country = ?, address = ? WHERE location_id = ?`,
      [city, state, country, address, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM locations WHERE location_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Location;
