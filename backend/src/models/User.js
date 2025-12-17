const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT user_id, email, first_name, last_name, role, job_seeker_id, created_at, updated_at 
       FROM users 
       ORDER BY created_at DESC`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT user_id, email, first_name, last_name, role, job_seeker_id, created_at, updated_at 
       FROM users 
       WHERE user_id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  static async create(userData) {
    const { email, password, first_name, last_name, role, job_seeker_id } = userData;
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const [result] = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, role, job_seeker_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name, last_name, role || 'applicant', job_seeker_id || null]
    );
    
    return { 
      user_id: result.insertId, 
      email, 
      first_name, 
      last_name, 
      role: role || 'applicant',
      job_seeker_id: job_seeker_id || null
    };
  }

  static async createWithJobSeeker(userData) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // First create the job seeker
      const { email, password, first_name, last_name, city, state, dob, willing_to_move } = userData;
      
      const [jobSeekerResult] = await connection.query(
        `INSERT INTO job_seekers (first_name, last_name, city, state, dob, willing_to_move) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, city || null, state || null, dob || null, willing_to_move || false]
      );
      
      const job_seeker_id = jobSeekerResult.insertId;
      
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Create the user with linked job_seeker_id
      const [userResult] = await connection.query(
        `INSERT INTO users (email, password, first_name, last_name, role, job_seeker_id) 
         VALUES (?, ?, ?, ?, 'applicant', ?)`,
        [email, hashedPassword, first_name, last_name, job_seeker_id]
      );
      
      await connection.commit();
      
      return { 
        user_id: userResult.insertId, 
        email, 
        first_name, 
        last_name, 
        role: 'applicant',
        job_seeker_id
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }

  static async update(id, userData) {
    const { first_name, last_name } = userData;
    await pool.query(
      `UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?`,
      [first_name, last_name, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async findAdmins() {
    const [rows] = await pool.query(
      `SELECT user_id, email, first_name, last_name, role, created_at 
       FROM users 
       WHERE role = 'admin'
       ORDER BY created_at DESC`
    );
    return rows;
  }
}

module.exports = User;
