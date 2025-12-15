const { pool } = require('../config/database');

class Position {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT p.*, c.name as company_name, l.city, l.state
       FROM positions p
       LEFT JOIN companies c ON p.company_id = c.company_id
       LEFT JOIN locations l ON p.location_id = l.location_id
       ORDER BY p.role`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT p.*, c.name as company_name, l.city, l.state, l.country, l.address
       FROM positions p
       LEFT JOIN companies c ON p.company_id = c.company_id
       LEFT JOIN locations l ON p.location_id = l.location_id
       WHERE p.position_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(positionData) {
    const { role, ft_pte, salary, company_id, location_id } = positionData;
    const [result] = await pool.query(
      `INSERT INTO positions (role, ft_pte, salary, company_id, location_id) VALUES (?, ?, ?, ?, ?)`,
      [role, ft_pte, salary, company_id, location_id]
    );
    return { position_id: result.insertId, ...positionData };
  }

  static async update(id, positionData) {
    const { role, ft_pte, salary, company_id, location_id } = positionData;
    await pool.query(
      `UPDATE positions SET role = ?, ft_pte = ?, salary = ?, company_id = ?, location_id = ? WHERE position_id = ?`,
      [role, ft_pte, salary, company_id, location_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM positions WHERE position_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getBenefits(positionId) {
    const [rows] = await pool.query(
      `SELECT b.* FROM benefits b
       INNER JOIN position_benefits pb ON b.benefit_id = pb.benefit_id
       WHERE pb.position_id = ?`,
      [positionId]
    );
    return rows;
  }

  static async getRequirements(positionId) {
    const [rows] = await pool.query(
      `SELECT r.* FROM requirements r
       INNER JOIN position_requirements pr ON r.requirement_id = pr.requirement_id
       WHERE pr.position_id = ?`,
      [positionId]
    );
    return rows;
  }

  static async addBenefit(positionId, benefitId) {
    await pool.query(
      `INSERT INTO position_benefits (position_id, benefit_id) VALUES (?, ?)`,
      [positionId, benefitId]
    );
    return true;
  }

  static async removeBenefit(positionId, benefitId) {
    const [result] = await pool.query(
      `DELETE FROM position_benefits WHERE position_id = ? AND benefit_id = ?`,
      [positionId, benefitId]
    );
    return result.affectedRows > 0;
  }

  static async addRequirement(positionId, requirementId) {
    await pool.query(
      `INSERT INTO position_requirements (position_id, requirement_id) VALUES (?, ?)`,
      [positionId, requirementId]
    );
    return true;
  }

  static async removeRequirement(positionId, requirementId) {
    const [result] = await pool.query(
      `DELETE FROM position_requirements WHERE position_id = ? AND requirement_id = ?`,
      [positionId, requirementId]
    );
    return result.affectedRows > 0;
  }

  static async getApplicants(positionId) {
    const [rows] = await pool.query(
      `SELECT js.*, ja.status, ja.application_date
       FROM job_seekers js
       INNER JOIN job_applications ja ON js.job_seeker_id = ja.job_seeker_id
       WHERE ja.position_id = ?
       ORDER BY ja.application_date DESC`,
      [positionId]
    );
    return rows;
  }
}

module.exports = Position;
