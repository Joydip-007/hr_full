const { pool } = require('../config/database');

class Location {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT l.*, c.country_name, r.region_name
       FROM locations l
       LEFT JOIN countries c ON l.country_id = c.country_id
       LEFT JOIN regions r ON c.region_id = r.region_id
       ORDER BY l.city`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT l.*, c.country_name, r.region_name
       FROM locations l
       LEFT JOIN countries c ON l.country_id = c.country_id
       LEFT JOIN regions r ON c.region_id = r.region_id
       WHERE l.location_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(locationData) {
    const { street_address, postal_code, city, state_province, country_id } = locationData;
    const [result] = await pool.query(
      `INSERT INTO locations (street_address, postal_code, city, state_province, country_id)
       VALUES (?, ?, ?, ?, ?)`,
      [street_address, postal_code, city, state_province, country_id]
    );
    return { location_id: result.insertId, ...locationData };
  }

  static async update(id, locationData) {
    const { street_address, postal_code, city, state_province, country_id } = locationData;
    await pool.query(
      `UPDATE locations SET street_address = ?, postal_code = ?, city = ?, state_province = ?, country_id = ?
       WHERE location_id = ?`,
      [street_address, postal_code, city, state_province, country_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM locations WHERE location_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Location;
