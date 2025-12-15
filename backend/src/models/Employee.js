const { pool } = require('../config/database');

class Employee {
  static async findAll(limit = 100, offset = 0) {
    const [rows] = await pool.query(
      `SELECT e.*, c.name as company_name, p.role as position_role
       FROM employees e
       LEFT JOIN companies c ON e.company_id = c.company_id
       LEFT JOIN positions p ON e.position_id = p.position_id
       ORDER BY e.last_name, e.first_name LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT e.*, c.name as company_name, p.role as position_role, p.salary as position_salary
       FROM employees e
       LEFT JOIN companies c ON e.company_id = c.company_id
       LEFT JOIN positions p ON e.position_id = p.position_id
       WHERE e.employee_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(employeeData) {
    const { first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id } = employeeData;
    const [result] = await pool.query(
      `INSERT INTO employees (first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id]
    );
    return { employee_id: result.insertId, ...employeeData };
  }

  static async update(id, employeeData) {
    const { first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id } = employeeData;
    await pool.query(
      `UPDATE employees SET first_name = ?, last_name = ?, former_current = ?, performance_rating = ?, promotions_count = ?, company_id = ?, position_id = ? WHERE employee_id = ?`,
      [first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM employees WHERE employee_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async search(searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await pool.query(
      `SELECT e.*, c.name as company_name, p.role as position_role
       FROM employees e
       LEFT JOIN companies c ON e.company_id = c.company_id
       LEFT JOIN positions p ON e.position_id = p.position_id
       WHERE e.first_name LIKE ? OR e.last_name LIKE ?
       ORDER BY e.last_name, e.first_name`,
      [searchPattern, searchPattern]
    );
    return rows;
  }

  // Skills
  static async getSkills(employeeId) {
    const [rows] = await pool.query(
      `SELECT * FROM employee_skills WHERE employee_id = ?`,
      [employeeId]
    );
    return rows;
  }

  static async addSkill(employeeId, skillData) {
    const { name, description } = skillData;
    const [result] = await pool.query(
      `INSERT INTO employee_skills (employee_id, name, description) VALUES (?, ?, ?)`,
      [employeeId, name, description]
    );
    return { skill_id: result.insertId, employee_id: employeeId, ...skillData };
  }

  static async removeSkill(skillId) {
    const [result] = await pool.query(
      `DELETE FROM employee_skills WHERE skill_id = ?`,
      [skillId]
    );
    return result.affectedRows > 0;
  }

  // Degrees
  static async getDegrees(employeeId) {
    const [rows] = await pool.query(
      `SELECT * FROM employee_degrees WHERE employee_id = ?`,
      [employeeId]
    );
    return rows;
  }

  static async addDegree(employeeId, degreeData) {
    const { school_name, level, concentration, year } = degreeData;
    const [result] = await pool.query(
      `INSERT INTO employee_degrees (employee_id, school_name, level, concentration, year) VALUES (?, ?, ?, ?, ?)`,
      [employeeId, school_name, level, concentration, year]
    );
    return { degree_id: result.insertId, employee_id: employeeId, ...degreeData };
  }

  static async removeDegree(degreeId) {
    const [result] = await pool.query(
      `DELETE FROM employee_degrees WHERE degree_id = ?`,
      [degreeId]
    );
    return result.affectedRows > 0;
  }

  // Experiences
  static async getExperiences(employeeId) {
    const [rows] = await pool.query(
      `SELECT * FROM employee_experiences WHERE employee_id = ? ORDER BY start_date DESC`,
      [employeeId]
    );
    return rows;
  }

  static async addExperience(employeeId, experienceData) {
    const { company, title, salary, description, start_date, end_date } = experienceData;
    const [result] = await pool.query(
      `INSERT INTO employee_experiences (employee_id, company, title, salary, description, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [employeeId, company, title, salary, description, start_date, end_date]
    );
    return { experience_id: result.insertId, employee_id: employeeId, ...experienceData };
  }

  static async removeExperience(experienceId) {
    const [result] = await pool.query(
      `DELETE FROM employee_experiences WHERE experience_id = ?`,
      [experienceId]
    );
    return result.affectedRows > 0;
  }

  // Volunteer Work
  static async getVolunteerWork(employeeId) {
    const [rows] = await pool.query(
      `SELECT * FROM employee_volunteer_work WHERE employee_id = ?`,
      [employeeId]
    );
    return rows;
  }

  static async addVolunteerWork(employeeId, volunteerData) {
    const { role, organization, start_date, end_date } = volunteerData;
    const [result] = await pool.query(
      `INSERT INTO employee_volunteer_work (employee_id, role, organization, start_date, end_date) VALUES (?, ?, ?, ?, ?)`,
      [employeeId, role, organization, start_date, end_date]
    );
    return { volunteer_id: result.insertId, employee_id: employeeId, ...volunteerData };
  }

  static async removeVolunteerWork(volunteerId) {
    const [result] = await pool.query(
      `DELETE FROM employee_volunteer_work WHERE volunteer_id = ?`,
      [volunteerId]
    );
    return result.affectedRows > 0;
  }

  // Awards
  static async getAwards(employeeId) {
    const [rows] = await pool.query(
      `SELECT * FROM employee_awards WHERE employee_id = ?`,
      [employeeId]
    );
    return rows;
  }

  static async addAward(employeeId, awardData) {
    const { name, organization, date } = awardData;
    const [result] = await pool.query(
      `INSERT INTO employee_awards (employee_id, name, organization, date) VALUES (?, ?, ?, ?)`,
      [employeeId, name, organization, date]
    );
    return { award_id: result.insertId, employee_id: employeeId, ...awardData };
  }

  static async removeAward(awardId) {
    const [result] = await pool.query(
      `DELETE FROM employee_awards WHERE award_id = ?`,
      [awardId]
    );
    return result.affectedRows > 0;
  }

  // Get full profile with all related data
  static async getFullProfile(employeeId) {
    const employee = await this.findById(employeeId);
    if (!employee) return null;

    const [skills, degrees, experiences, volunteerWork, awards] = await Promise.all([
      this.getSkills(employeeId),
      this.getDegrees(employeeId),
      this.getExperiences(employeeId),
      this.getVolunteerWork(employeeId),
      this.getAwards(employeeId)
    ]);

    return {
      ...employee,
      skills,
      degrees,
      experiences,
      volunteer_work: volunteerWork,
      awards
    };
  }
}

module.exports = Employee;
