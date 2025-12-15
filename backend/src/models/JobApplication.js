const { pool } = require('../config/database');

class JobApplication {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT ja.*, 
              CONCAT(js.first_name, ' ', js.last_name) as applicant_name,
              p.role as position_role, c.name as company_name
       FROM job_applications ja
       INNER JOIN job_seekers js ON ja.job_seeker_id = js.job_seeker_id
       INNER JOIN positions p ON ja.position_id = p.position_id
       LEFT JOIN companies c ON p.company_id = c.company_id
       ORDER BY ja.application_date DESC`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT ja.*, 
              CONCAT(js.first_name, ' ', js.last_name) as applicant_name,
              js.city, js.state, js.willing_to_move,
              p.role as position_role, p.salary, p.ft_pte,
              c.name as company_name
       FROM job_applications ja
       INNER JOIN job_seekers js ON ja.job_seeker_id = js.job_seeker_id
       INNER JOIN positions p ON ja.position_id = p.position_id
       LEFT JOIN companies c ON p.company_id = c.company_id
       WHERE ja.application_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(applicationData) {
    const { job_seeker_id, position_id, status } = applicationData;
    const [result] = await pool.query(
      `INSERT INTO job_applications (job_seeker_id, position_id, status) VALUES (?, ?, ?)`,
      [job_seeker_id, position_id, status || 'Applied']
    );
    return { application_id: result.insertId, ...applicationData };
  }

  static async updateStatus(id, status) {
    await pool.query(
      `UPDATE job_applications SET status = ? WHERE application_id = ?`,
      [status, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM job_applications WHERE application_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async findByStatus(status) {
    const [rows] = await pool.query(
      `SELECT ja.*, 
              CONCAT(js.first_name, ' ', js.last_name) as applicant_name,
              p.role as position_role, c.name as company_name
       FROM job_applications ja
       INNER JOIN job_seekers js ON ja.job_seeker_id = js.job_seeker_id
       INNER JOIN positions p ON ja.position_id = p.position_id
       LEFT JOIN companies c ON p.company_id = c.company_id
       WHERE ja.status = ?
       ORDER BY ja.application_date DESC`,
      [status]
    );
    return rows;
  }
}

module.exports = JobApplication;
