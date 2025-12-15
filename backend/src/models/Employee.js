const { pool } = require('../config/database');

class Employee {
  static async findAll(limit = 100, offset = 0) {
    const [rows] = await pool.query(
      `SELECT e.*, d.department_name, j.job_title,
              CONCAT(m.first_name, ' ', m.last_name) as manager_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id
       LEFT JOIN jobs j ON e.job_id = j.job_id
       LEFT JOIN employees m ON e.manager_id = m.employee_id
       ORDER BY e.employee_id
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT e.*, d.department_name, j.job_title,
              CONCAT(m.first_name, ' ', m.last_name) as manager_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id
       LEFT JOIN jobs j ON e.job_id = j.job_id
       LEFT JOIN employees m ON e.manager_id = m.employee_id
       WHERE e.employee_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(employeeData) {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = employeeData;
    const [result] = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id]
    );
    return { employee_id: result.insertId, ...employeeData };
  }

  static async update(id, employeeData) {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = employeeData;
    await pool.query(
      `UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job_id = ?, salary = ?, commission_pct = ?, manager_id = ?, department_id = ?
       WHERE employee_id = ?`,
      [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM employees WHERE employee_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM employees');
    return rows[0].total;
  }

  static async findByDepartment(departmentId) {
    const [rows] = await pool.query(
      `SELECT e.*, j.job_title
       FROM employees e
       LEFT JOIN jobs j ON e.job_id = j.job_id
       WHERE e.department_id = ?
       ORDER BY e.last_name, e.first_name`,
      [departmentId]
    );
    return rows;
  }

  static async search(searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await pool.query(
      `SELECT e.*, d.department_name, j.job_title
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id
       LEFT JOIN jobs j ON e.job_id = j.job_id
       WHERE e.first_name LIKE ? OR e.last_name LIKE ? OR e.email LIKE ?
       ORDER BY e.last_name, e.first_name`,
      [searchPattern, searchPattern, searchPattern]
    );
    return rows;
  }
}

module.exports = Employee;
