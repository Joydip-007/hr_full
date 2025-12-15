const { pool } = require('../config/database');

class Country {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT c.*, r.region_name
       FROM countries c
       LEFT JOIN regions r ON c.region_id = r.region_id
       ORDER BY c.country_name`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT c.*, r.region_name
       FROM countries c
       LEFT JOIN regions r ON c.region_id = r.region_id
       WHERE c.country_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(countryData) {
    const { country_id, country_name, region_id } = countryData;
    await pool.query(
      `INSERT INTO countries (country_id, country_name, region_id) VALUES (?, ?, ?)`,
      [country_id, country_name, region_id]
    );
    return countryData;
  }

  static async update(id, countryData) {
    const { country_name, region_id } = countryData;
    await pool.query(
      `UPDATE countries SET country_name = ?, region_id = ? WHERE country_id = ?`,
      [country_name, region_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM countries WHERE country_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Country;
