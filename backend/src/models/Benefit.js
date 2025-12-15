const { pool } = require('../config/database');

class Benefit {
  static async findAll() {
    const [rows] = await pool.query(`SELECT * FROM benefits ORDER BY name`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM benefits WHERE benefit_id = ?`, [id]);
    return rows[0];
  }

  static async create(benefitData) {
    const { name, description } = benefitData;
    const [result] = await pool.query(
      `INSERT INTO benefits (name, description) VALUES (?, ?)`,
      [name, description]
    );
    return { benefit_id: result.insertId, ...benefitData };
  }

  static async update(id, benefitData) {
    const { name, description } = benefitData;
    await pool.query(
      `UPDATE benefits SET name = ?, description = ? WHERE benefit_id = ?`,
      [name, description, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM benefits WHERE benefit_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Benefit;
