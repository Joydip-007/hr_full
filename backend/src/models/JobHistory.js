const { pool } = require('../config/database');

class JobHistory {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT jh.*, 
              CONCAT(e.first_name, ' ', e.last_name) as employee_name,
              j.job_title, d.department_name
       FROM job_history jh
       LEFT JOIN employees e ON jh.employee_id = e.employee_id
       LEFT JOIN jobs j ON jh.job_id = j.job_id
       LEFT JOIN departments d ON jh.department_id = d.department_id
       ORDER BY jh.start_date DESC`
    );
    return rows;
  }

  static async findByEmployee(employeeId) {
    const [rows] = await pool.query(
      `SELECT jh.*, j.job_title, d.department_name
       FROM job_history jh
       LEFT JOIN jobs j ON jh.job_id = j.job_id
       LEFT JOIN departments d ON jh.department_id = d.department_id
       WHERE jh.employee_id = ?
       ORDER BY jh.start_date DESC`,
      [employeeId]
    );
    return rows;
  }

  static async create(historyData) {
    const { employee_id, start_date, end_date, job_id, department_id } = historyData;
    await pool.query(
      `INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id)
       VALUES (?, ?, ?, ?, ?)`,
      [employee_id, start_date, end_date, job_id, department_id]
    );
    return historyData;
  }

  static async delete(employeeId, startDate) {
    const [result] = await pool.query(
      'DELETE FROM job_history WHERE employee_id = ? AND start_date = ?',
      [employeeId, startDate]
    );
    return result.affectedRows > 0;
  }
}

module.exports = JobHistory;
