const { pool } = require('../config/database');

class Job {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT * FROM jobs ORDER BY job_title`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM jobs WHERE job_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(jobData) {
    const { job_id, job_title, min_salary, max_salary } = jobData;
    await pool.query(
      `INSERT INTO jobs (job_id, job_title, min_salary, max_salary) VALUES (?, ?, ?, ?)`,
      [job_id, job_title, min_salary, max_salary]
    );
    return jobData;
  }

  static async update(id, jobData) {
    const { job_title, min_salary, max_salary } = jobData;
    await pool.query(
      `UPDATE jobs SET job_title = ?, min_salary = ?, max_salary = ? WHERE job_id = ?`,
      [job_title, min_salary, max_salary, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM jobs WHERE job_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getEmployeeCount(id) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM employees WHERE job_id = ?',
      [id]
    );
    return rows[0].count;
  }
}

module.exports = Job;
