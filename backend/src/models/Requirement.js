const { pool } = require('../config/database');

class Requirement {
  static async findAll() {
    const [rows] = await pool.query(`SELECT * FROM requirements ORDER BY name`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM requirements WHERE requirement_id = ?`, [id]);
    return rows[0];
  }

  static async create(requirementData) {
    const { name, description } = requirementData;
    const [result] = await pool.query(
      `INSERT INTO requirements (name, description) VALUES (?, ?)`,
      [name, description]
    );
    return { requirement_id: result.insertId, ...requirementData };
  }

  static async update(id, requirementData) {
    const { name, description } = requirementData;
    await pool.query(
      `UPDATE requirements SET name = ?, description = ? WHERE requirement_id = ?`,
      [name, description, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM requirements WHERE requirement_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Requirement;
