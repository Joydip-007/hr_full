const { pool } = require('../config/database');

class JobSeeker {
  static async findAll(limit = 100, offset = 0) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seekers ORDER BY last_name, first_name LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seekers WHERE job_seeker_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(seekerData) {
    const { first_name, last_name, city, state, dob, willing_to_move } = seekerData;
    const [result] = await pool.query(
      `INSERT INTO job_seekers (first_name, last_name, city, state, dob, willing_to_move) VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, city, state, dob, willing_to_move]
    );
    return { job_seeker_id: result.insertId, ...seekerData };
  }

  static async update(id, seekerData) {
    const { first_name, last_name, city, state, dob, willing_to_move } = seekerData;
    await pool.query(
      `UPDATE job_seekers SET first_name = ?, last_name = ?, city = ?, state = ?, dob = ?, willing_to_move = ? WHERE job_seeker_id = ?`,
      [first_name, last_name, city, state, dob, willing_to_move, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM job_seekers WHERE job_seeker_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async search(searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await pool.query(
      `SELECT * FROM job_seekers 
       WHERE first_name LIKE ? OR last_name LIKE ? OR city LIKE ?
       ORDER BY last_name, first_name`,
      [searchPattern, searchPattern, searchPattern]
    );
    return rows;
  }

  // Skills
  static async getSkills(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seeker_skills WHERE job_seeker_id = ?`,
      [jobSeekerId]
    );
    return rows;
  }

  static async addSkill(jobSeekerId, skillData) {
    const { name, description } = skillData;
    const [result] = await pool.query(
      `INSERT INTO job_seeker_skills (job_seeker_id, name, description) VALUES (?, ?, ?)`,
      [jobSeekerId, name, description]
    );
    return { skill_id: result.insertId, job_seeker_id: jobSeekerId, ...skillData };
  }

  static async removeSkill(skillId) {
    const [result] = await pool.query(
      `DELETE FROM job_seeker_skills WHERE skill_id = ?`,
      [skillId]
    );
    return result.affectedRows > 0;
  }

  // Degrees
  static async getDegrees(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seeker_degrees WHERE job_seeker_id = ?`,
      [jobSeekerId]
    );
    return rows;
  }

  static async addDegree(jobSeekerId, degreeData) {
    const { school_name, level, concentration, year } = degreeData;
    const [result] = await pool.query(
      `INSERT INTO job_seeker_degrees (job_seeker_id, school_name, level, concentration, year) VALUES (?, ?, ?, ?, ?)`,
      [jobSeekerId, school_name, level, concentration, year]
    );
    return { degree_id: result.insertId, job_seeker_id: jobSeekerId, ...degreeData };
  }

  static async removeDegree(degreeId) {
    const [result] = await pool.query(
      `DELETE FROM job_seeker_degrees WHERE degree_id = ?`,
      [degreeId]
    );
    return result.affectedRows > 0;
  }

  // Experiences
  static async getExperiences(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seeker_experiences WHERE job_seeker_id = ? ORDER BY start_date DESC`,
      [jobSeekerId]
    );
    return rows;
  }

  static async addExperience(jobSeekerId, experienceData) {
    const { company, title, salary, description, start_date, end_date } = experienceData;
    const [result] = await pool.query(
      `INSERT INTO job_seeker_experiences (job_seeker_id, company, title, salary, description, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [jobSeekerId, company, title, salary, description, start_date, end_date]
    );
    return { experience_id: result.insertId, job_seeker_id: jobSeekerId, ...experienceData };
  }

  static async removeExperience(experienceId) {
    const [result] = await pool.query(
      `DELETE FROM job_seeker_experiences WHERE experience_id = ?`,
      [experienceId]
    );
    return result.affectedRows > 0;
  }

  // Volunteer Work
  static async getVolunteerWork(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seeker_volunteer_work WHERE job_seeker_id = ?`,
      [jobSeekerId]
    );
    return rows;
  }

  static async addVolunteerWork(jobSeekerId, volunteerData) {
    const { role, organization, start_date, end_date } = volunteerData;
    const [result] = await pool.query(
      `INSERT INTO job_seeker_volunteer_work (job_seeker_id, role, organization, start_date, end_date) VALUES (?, ?, ?, ?, ?)`,
      [jobSeekerId, role, organization, start_date, end_date]
    );
    return { volunteer_id: result.insertId, job_seeker_id: jobSeekerId, ...volunteerData };
  }

  static async removeVolunteerWork(volunteerId) {
    const [result] = await pool.query(
      `DELETE FROM job_seeker_volunteer_work WHERE volunteer_id = ?`,
      [volunteerId]
    );
    return result.affectedRows > 0;
  }

  // Awards
  static async getAwards(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT * FROM job_seeker_awards WHERE job_seeker_id = ?`,
      [jobSeekerId]
    );
    return rows;
  }

  static async addAward(jobSeekerId, awardData) {
    const { name, organization, date } = awardData;
    const [result] = await pool.query(
      `INSERT INTO job_seeker_awards (job_seeker_id, name, organization, date) VALUES (?, ?, ?, ?)`,
      [jobSeekerId, name, organization, date]
    );
    return { award_id: result.insertId, job_seeker_id: jobSeekerId, ...awardData };
  }

  static async removeAward(awardId) {
    const [result] = await pool.query(
      `DELETE FROM job_seeker_awards WHERE award_id = ?`,
      [awardId]
    );
    return result.affectedRows > 0;
  }

  // Applications
  static async getApplications(jobSeekerId) {
    const [rows] = await pool.query(
      `SELECT ja.*, p.role, p.salary, p.ft_pte, c.name as company_name
       FROM job_applications ja
       INNER JOIN positions p ON ja.position_id = p.position_id
       LEFT JOIN companies c ON p.company_id = c.company_id
       WHERE ja.job_seeker_id = ?
       ORDER BY ja.application_date DESC`,
      [jobSeekerId]
    );
    return rows;
  }

  static async applyForPosition(jobSeekerId, positionId) {
    const [result] = await pool.query(
      `INSERT INTO job_applications (job_seeker_id, position_id) VALUES (?, ?)`,
      [jobSeekerId, positionId]
    );
    return { application_id: result.insertId, job_seeker_id: jobSeekerId, position_id: positionId, status: 'Applied' };
  }

  // Get full profile with all related data
  static async getFullProfile(jobSeekerId) {
    const seeker = await this.findById(jobSeekerId);
    if (!seeker) return null;

    const [skills, degrees, experiences, volunteerWork, awards, applications] = await Promise.all([
      this.getSkills(jobSeekerId),
      this.getDegrees(jobSeekerId),
      this.getExperiences(jobSeekerId),
      this.getVolunteerWork(jobSeekerId),
      this.getAwards(jobSeekerId),
      this.getApplications(jobSeekerId)
    ]);

    return {
      ...seeker,
      skills,
      degrees,
      experiences,
      volunteer_work: volunteerWork,
      awards,
      applications
    };
  }
}

module.exports = JobSeeker;
