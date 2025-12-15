const { pool } = require('../config/database');

class Company {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT c.*, l.city, l.state, l.country, l.address
       FROM companies c
       LEFT JOIN locations l ON c.location_id = l.location_id
       ORDER BY c.name`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT c.*, l.city, l.state, l.country, l.address
       FROM companies c
       LEFT JOIN locations l ON c.location_id = l.location_id
       WHERE c.company_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(companyData) {
    const { name, number_of_employees, rating, location_id } = companyData;
    const [result] = await pool.query(
      `INSERT INTO companies (name, number_of_employees, rating, location_id) VALUES (?, ?, ?, ?)`,
      [name, number_of_employees, rating, location_id]
    );
    return { company_id: result.insertId, ...companyData };
  }

  static async update(id, companyData) {
    const { name, number_of_employees, rating, location_id } = companyData;
    await pool.query(
      `UPDATE companies SET name = ?, number_of_employees = ?, rating = ?, location_id = ? WHERE company_id = ?`,
      [name, number_of_employees, rating, location_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM companies WHERE company_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getPositions(companyId) {
    const [rows] = await pool.query(
      `SELECT * FROM positions WHERE company_id = ?`,
      [companyId]
    );
    return rows;
  }

  static async getEmployees(companyId) {
    const [rows] = await pool.query(
      `SELECT * FROM employees WHERE company_id = ?`,
      [companyId]
    );
    return rows;
  }
}

module.exports = Company;
