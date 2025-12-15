const { pool } = require('../config/database');

class Department {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT d.*, l.city, l.country_id,
              CONCAT(m.first_name, ' ', m.last_name) as manager_name
       FROM departments d
       LEFT JOIN locations l ON d.location_id = l.location_id
       LEFT JOIN employees m ON d.manager_id = m.employee_id
       ORDER BY d.department_name`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT d.*, l.city, l.street_address, l.postal_code, l.state_province, l.country_id,
              CONCAT(m.first_name, ' ', m.last_name) as manager_name
       FROM departments d
       LEFT JOIN locations l ON d.location_id = l.location_id
       LEFT JOIN employees m ON d.manager_id = m.employee_id
       WHERE d.department_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(departmentData) {
    const { department_name, manager_id, location_id } = departmentData;
    const [result] = await pool.query(
      `INSERT INTO departments (department_name, manager_id, location_id) VALUES (?, ?, ?)`,
      [department_name, manager_id, location_id]
    );
    return { department_id: result.insertId, ...departmentData };
  }

  static async update(id, departmentData) {
    const { department_name, manager_id, location_id } = departmentData;
    await pool.query(
      `UPDATE departments SET department_name = ?, manager_id = ?, location_id = ? WHERE department_id = ?`,
      [department_name, manager_id, location_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM departments WHERE department_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getEmployeeCount(id) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM employees WHERE department_id = ?',
      [id]
    );
    return rows[0].count;
  }
}

module.exports = Department;
