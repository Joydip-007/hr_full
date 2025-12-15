const { pool } = require('../config/database');

class Region {
  static async findAll() {
    const [rows] = await pool.query(`SELECT * FROM regions ORDER BY region_name`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM regions WHERE region_id = ?`, [id]);
    return rows[0];
  }

  static async create(regionData) {
    const { region_name } = regionData;
    const [result] = await pool.query(
      `INSERT INTO regions (region_name) VALUES (?)`,
      [region_name]
    );
    return { region_id: result.insertId, ...regionData };
  }

  static async update(id, regionData) {
    const { region_name } = regionData;
    await pool.query(
      `UPDATE regions SET region_name = ? WHERE region_id = ?`,
      [region_name, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM regions WHERE region_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Region;
