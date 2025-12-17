-- HR/Job Recruitment Database Seed Data
-- Essential sample data for the HR Database
-- Run this after schema.sql to populate the database

USE hr_database;

-- ============================================
-- CLEAR EXISTING DATA (in correct order due to foreign keys)
-- ============================================
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE users;
TRUNCATE TABLE job_applications;
TRUNCATE TABLE employee_awards;
TRUNCATE TABLE job_seeker_awards;
TRUNCATE TABLE employee_volunteer_work;
TRUNCATE TABLE job_seeker_volunteer_work;
TRUNCATE TABLE employee_experiences;
TRUNCATE TABLE job_seeker_experiences;
TRUNCATE TABLE employee_degrees;
TRUNCATE TABLE job_seeker_degrees;
TRUNCATE TABLE employee_skills;
TRUNCATE TABLE job_seeker_skills;
TRUNCATE TABLE employees;
TRUNCATE TABLE job_seekers;
TRUNCATE TABLE position_requirements;
TRUNCATE TABLE requirements;
TRUNCATE TABLE position_benefits;
TRUNCATE TABLE benefits;
TRUNCATE TABLE positions;
TRUNCATE TABLE companies;
TRUNCATE TABLE locations;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- LOCATIONS
-- ============================================
INSERT INTO locations (location_id, city, state, country, address) VALUES 
(1, 'New York', 'NY', 'USA', '350 Fifth Avenue'),
(2, 'San Francisco', 'CA', 'USA', '1 Market Street'),
(3, 'Seattle', 'WA', 'USA', '400 Broad Street'),
(4, 'Austin', 'TX', 'USA', '100 Congress Avenue'),
(5, 'Chicago', 'IL', 'USA', '233 S Wacker Drive'),
(6, 'Boston', 'MA', 'USA', '1 Federal Street'),
(7, 'Los Angeles', 'CA', 'USA', '633 W 5th Street'),
(8, 'Denver', 'CO', 'USA', '1144 15th Street'),
(9, 'Toronto', 'ON', 'Canada', '100 King Street West'),
(10, 'London', 'England', 'UK', '1 Canada Square');

-- ============================================
-- COMPANIES
-- ============================================
INSERT INTO companies (company_id, name, number_of_employees, rating, location_id) VALUES 
(1, 'TechCorp Inc.', 5000, 4.5, 1),
(2, 'DataSystems LLC', 1200, 4.2, 2),
(3, 'CloudNine Solutions', 800, 4.7, 3),
(4, 'InnovateTech', 3500, 4.3, 4),
(5, 'GlobalSoft', 10000, 4.1, 5),
(6, 'StartupHub', 150, 4.8, 6),
(7, 'Enterprise Solutions', 7500, 3.9, 7),
(8, 'Digital Dynamics', 2000, 4.4, 8),
(9, 'NorthStar Tech', 900, 4.6, 9),
(10, 'EuroTech Ltd.', 4000, 4.0, 10);

-- ============================================
-- POSITIONS
-- ============================================
INSERT INTO positions (position_id, role, ft_pte, salary, company_id, location_id) VALUES 
(1, 'Software Engineer', 'Full-Time', 120000.00, 1, 1),
(2, 'Data Analyst', 'Full-Time', 85000.00, 2, 2),
(3, 'DevOps Engineer', 'Full-Time', 130000.00, 3, 3),
(4, 'Product Manager', 'Full-Time', 140000.00, 4, 4),
(5, 'UX Designer', 'Full-Time', 95000.00, 5, 5),
(6, 'Marketing Specialist', 'Part-Time', 45000.00, 6, 6),
(7, 'HR Manager', 'Full-Time', 90000.00, 7, 7),
(8, 'Sales Representative', 'Full-Time', 75000.00, 8, 8),
(9, 'Technical Writer', 'Part-Time', 55000.00, 9, 9),
(10, 'Cloud Architect', 'Full-Time', 160000.00, 10, 10);

-- ============================================
-- BENEFITS
-- ============================================
INSERT INTO benefits (benefit_id, name, description) VALUES 
(1, 'Health Insurance', 'Comprehensive medical, dental, and vision coverage'),
(2, '401(k) Match', 'Company matches up to 6% of salary'),
(3, 'Remote Work', 'Flexible work from home options'),
(4, 'Paid Time Off', '20 days PTO plus holidays'),
(5, 'Professional Development', 'Annual budget for conferences and courses'),
(6, 'Stock Options', 'Equity compensation package'),
(7, 'Gym Membership', 'Free gym membership or fitness stipend'),
(8, 'Parental Leave', '12 weeks paid parental leave'),
(9, 'Commuter Benefits', 'Pre-tax transit and parking benefits'),
(10, 'Mental Health Support', 'Free counseling and mental health resources');

-- ============================================
-- POSITION_BENEFITS (Junction Table)
-- ============================================
INSERT INTO position_benefits (position_id, benefit_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 1), (2, 2), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6),
(4, 1), (4, 2), (4, 4), (4, 5), (4, 6),
(5, 1), (5, 3), (5, 4), (5, 7),
(6, 1), (6, 4),
(7, 1), (7, 2), (7, 4), (7, 8),
(8, 1), (8, 4), (8, 9),
(9, 3), (9, 4),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6);

-- ============================================
-- REQUIREMENTS
-- ============================================
INSERT INTO requirements (requirement_id, name, description) VALUES 
(1, 'Bachelor Degree', 'Bachelor degree in Computer Science or related field'),
(2, '3+ Years Experience', 'Minimum 3 years of relevant work experience'),
(3, 'Python Proficiency', 'Strong programming skills in Python'),
(4, 'SQL Knowledge', 'Experience with SQL databases'),
(5, 'Cloud Experience', 'Experience with AWS, Azure, or GCP'),
(6, 'Communication Skills', 'Excellent written and verbal communication'),
(7, 'Leadership', 'Demonstrated leadership experience'),
(8, 'Agile Methodology', 'Experience with Agile/Scrum methodologies'),
(9, 'JavaScript', 'Proficiency in JavaScript/TypeScript'),
(10, 'Data Analysis', 'Experience with data analysis tools and techniques');

-- ============================================
-- POSITION_REQUIREMENTS (Junction Table)
-- ============================================
INSERT INTO position_requirements (position_id, requirement_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 4), (2, 10),
(3, 1), (3, 2), (3, 5), (3, 8),
(4, 1), (4, 2), (4, 6), (4, 7), (4, 8),
(5, 1), (5, 6), (5, 9),
(6, 6),
(7, 1), (7, 2), (7, 6), (7, 7),
(8, 6),
(9, 1), (9, 6),
(10, 1), (10, 2), (10, 5), (10, 8);

-- ============================================
-- JOB SEEKERS
-- ============================================
INSERT INTO job_seekers (job_seeker_id, first_name, last_name, city, state, dob, willing_to_move) VALUES 
(1, 'John', 'Smith', 'New York', 'NY', '1990-05-15', TRUE),
(2, 'Emily', 'Johnson', 'San Francisco', 'CA', '1992-08-22', TRUE),
(3, 'Michael', 'Williams', 'Austin', 'TX', '1988-03-10', FALSE),
(4, 'Sarah', 'Brown', 'Seattle', 'WA', '1995-11-30', TRUE),
(5, 'David', 'Jones', 'Chicago', 'IL', '1991-07-18', FALSE),
(6, 'Jessica', 'Davis', 'Boston', 'MA', '1993-01-25', TRUE),
(7, 'Christopher', 'Miller', 'Denver', 'CO', '1989-09-05', TRUE),
(8, 'Amanda', 'Wilson', 'Los Angeles', 'CA', '1994-04-12', FALSE),
(9, 'Matthew', 'Moore', 'Toronto', 'ON', '1990-12-08', TRUE),
(10, 'Ashley', 'Taylor', 'London', 'England', '1992-06-20', TRUE);

-- ============================================
-- EMPLOYEES
-- ============================================
INSERT INTO employees (employee_id, first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id) VALUES 
(1, 'Robert', 'Anderson', 'Current', 4.5, 2, 1, 1),
(2, 'Jennifer', 'Thomas', 'Current', 4.2, 1, 2, 2),
(3, 'William', 'Jackson', 'Former', 3.8, 0, 3, 3),
(4, 'Elizabeth', 'White', 'Current', 4.7, 3, 4, 4),
(5, 'James', 'Harris', 'Current', 4.0, 1, 5, 5),
(6, 'Linda', 'Martin', 'Former', 3.5, 0, 6, 6),
(7, 'Richard', 'Thompson', 'Current', 4.3, 2, 7, 7),
(8, 'Patricia', 'Garcia', 'Current', 4.1, 1, 8, 8),
(9, 'Charles', 'Martinez', 'Current', 4.6, 2, 9, 9),
(10, 'Barbara', 'Robinson', 'Current', 4.8, 4, 10, 10);

-- ============================================
-- JOB SEEKER SKILLS
-- ============================================
INSERT INTO job_seeker_skills (skill_id, job_seeker_id, name, description) VALUES 
(1, 1, 'Python', 'Advanced Python programming'),
(2, 1, 'JavaScript', 'Full-stack JavaScript development'),
(3, 2, 'Data Analysis', 'Statistical analysis and visualization'),
(4, 2, 'SQL', 'Database querying and optimization'),
(5, 3, 'Project Management', 'Agile and waterfall methodologies'),
(6, 4, 'Cloud Computing', 'AWS and Azure expertise'),
(7, 5, 'Machine Learning', 'TensorFlow and PyTorch'),
(8, 6, 'UX Design', 'User research and prototyping'),
(9, 7, 'DevOps', 'CI/CD pipelines and containerization'),
(10, 8, 'Marketing', 'Digital marketing and SEO');

-- ============================================
-- EMPLOYEE SKILLS
-- ============================================
INSERT INTO employee_skills (skill_id, employee_id, name, description) VALUES 
(1, 1, 'Java', 'Enterprise Java development'),
(2, 1, 'Spring Boot', 'Microservices architecture'),
(3, 2, 'Python', 'Data science and analytics'),
(4, 3, 'Kubernetes', 'Container orchestration'),
(5, 4, 'Product Strategy', 'Roadmap planning and execution'),
(6, 5, 'Figma', 'UI/UX design tools'),
(7, 6, 'Content Marketing', 'Blog and social media management'),
(8, 7, 'HR Analytics', 'People analytics and reporting'),
(9, 8, 'Salesforce', 'CRM administration'),
(10, 10, 'Cloud Architecture', 'Multi-cloud solutions');

-- ============================================
-- JOB SEEKER DEGREES
-- ============================================
INSERT INTO job_seeker_degrees (degree_id, job_seeker_id, school_name, level, concentration, year) VALUES 
(1, 1, 'MIT', 'Bachelor', 'Computer Science', 2012),
(2, 2, 'Stanford University', 'Master', 'Data Science', 2016),
(3, 3, 'University of Texas', 'Bachelor', 'Business Administration', 2010),
(4, 4, 'University of Washington', 'Bachelor', 'Computer Engineering', 2017),
(5, 5, 'Northwestern University', 'Master', 'Machine Learning', 2015),
(6, 6, 'Harvard University', 'Bachelor', 'Psychology', 2015),
(7, 7, 'Colorado State University', 'Bachelor', 'Information Systems', 2011),
(8, 8, 'UCLA', 'Bachelor', 'Marketing', 2016),
(9, 9, 'University of Toronto', 'Master', 'Computer Science', 2014),
(10, 10, 'Oxford University', 'Bachelor', 'Mathematics', 2014);

-- ============================================
-- EMPLOYEE DEGREES
-- ============================================
INSERT INTO employee_degrees (degree_id, employee_id, school_name, level, concentration, year) VALUES 
(1, 1, 'Carnegie Mellon', 'Master', 'Software Engineering', 2010),
(2, 2, 'UC Berkeley', 'Bachelor', 'Statistics', 2012),
(3, 3, 'Georgia Tech', 'Bachelor', 'Computer Science', 2008),
(4, 4, 'Wharton School', 'MBA', 'Product Management', 2011),
(5, 5, 'RISD', 'Bachelor', 'Graphic Design', 2013),
(6, 6, 'Boston University', 'Bachelor', 'Communications', 2009),
(7, 7, 'Cornell University', 'Master', 'Human Resources', 2007),
(8, 8, 'Arizona State', 'Bachelor', 'Business', 2011),
(9, 9, 'McGill University', 'Bachelor', 'English', 2008),
(10, 10, 'Cambridge University', 'PhD', 'Distributed Systems', 2006);

-- ============================================
-- JOB SEEKER EXPERIENCES
-- ============================================
INSERT INTO job_seeker_experiences (experience_id, job_seeker_id, company, title, salary, description, start_date, end_date) VALUES 
(1, 1, 'Google', 'Software Engineer Intern', 80000.00, 'Developed internal tools', '2011-06-01', '2011-08-31'),
(2, 2, 'Facebook', 'Data Analyst', 95000.00, 'Analyzed user engagement metrics', '2016-09-01', '2019-05-15'),
(3, 3, 'Dell', 'Project Coordinator', 65000.00, 'Managed IT projects', '2010-07-01', '2015-03-31'),
(4, 4, 'Amazon', 'Cloud Engineer', 110000.00, 'AWS infrastructure management', '2017-08-01', '2022-01-15'),
(5, 5, 'IBM', 'ML Engineer', 105000.00, 'Built predictive models', '2015-06-01', '2020-12-31');

-- ============================================
-- EMPLOYEE EXPERIENCES
-- ============================================
INSERT INTO employee_experiences (experience_id, employee_id, company, title, salary, description, start_date, end_date) VALUES 
(1, 1, 'Microsoft', 'Junior Developer', 75000.00, 'Backend development', '2010-07-01', '2014-08-31'),
(2, 2, 'Tableau', 'BI Analyst', 70000.00, 'Dashboard development', '2012-09-01', '2016-05-15'),
(3, 4, 'Apple', 'Associate PM', 95000.00, 'Feature development', '2011-06-01', '2015-03-31'),
(4, 7, 'ADP', 'HR Specialist', 60000.00, 'Employee relations', '2007-08-01', '2012-01-15'),
(5, 10, 'AWS', 'Solutions Architect', 130000.00, 'Cloud migrations', '2006-06-01', '2015-12-31');

-- ============================================
-- JOB SEEKER VOLUNTEER WORK
-- ============================================
INSERT INTO job_seeker_volunteer_work (volunteer_id, job_seeker_id, role, organization, start_date, end_date) VALUES 
(1, 1, 'Coding Instructor', 'Code.org', '2013-01-01', '2015-12-31'),
(2, 2, 'Data Volunteer', 'DataKind', '2017-03-01', '2019-06-30'),
(3, 4, 'Tech Mentor', 'FIRST Robotics', '2018-09-01', '2021-05-31'),
(4, 6, 'UX Consultant', 'Nonprofit Tech', '2016-06-01', '2018-08-31');

-- ============================================
-- EMPLOYEE VOLUNTEER WORK
-- ============================================
INSERT INTO employee_volunteer_work (volunteer_id, employee_id, role, organization, start_date, end_date) VALUES 
(1, 1, 'Board Member', 'Tech Nonprofits', '2015-01-01', '2020-12-31'),
(2, 4, 'Advisor', 'Startup Incubator', '2016-03-01', '2021-06-30'),
(3, 7, 'HR Consultant', 'Small Business Alliance', '2013-09-01', '2018-05-31');

-- ============================================
-- JOB SEEKER AWARDS
-- ============================================
INSERT INTO job_seeker_awards (award_id, job_seeker_id, name, organization, date) VALUES 
(1, 1, 'Hackathon Winner', 'TechCrunch', '2012-09-15'),
(2, 2, 'Best Data Project', 'Kaggle', '2018-03-20'),
(3, 4, 'Cloud Excellence Award', 'AWS', '2020-11-10'),
(4, 5, 'Innovation Award', 'IBM', '2019-06-05');

-- ============================================
-- EMPLOYEE AWARDS
-- ============================================
INSERT INTO employee_awards (award_id, employee_id, name, organization, date) VALUES 
(1, 1, 'Employee of the Year', 'TechCorp Inc.', '2019-12-15'),
(2, 4, 'Product Innovation Award', 'InnovateTech', '2020-06-20'),
(3, 7, 'HR Excellence Award', 'SHRM', '2018-09-10'),
(4, 10, 'Cloud Pioneer Award', 'EuroTech Ltd.', '2021-03-05');

-- ============================================
-- JOB APPLICATIONS
-- ============================================
INSERT INTO job_applications (application_id, job_seeker_id, position_id, status) VALUES 
(1, 1, 1, 'Interview'),
(2, 1, 3, 'Applied'),
(3, 2, 2, 'Offered'),
(4, 3, 4, 'Under Review'),
(5, 4, 3, 'Accepted'),
(6, 5, 1, 'Interview'),
(7, 6, 5, 'Applied'),
(8, 7, 3, 'Rejected'),
(9, 8, 6, 'Interview'),
(10, 9, 9, 'Offered'),
(11, 10, 10, 'Applied');

-- ============================================
-- USERS (password is 'password123' hashed with bcrypt)
-- ============================================
-- Admin user
INSERT INTO users (user_id, email, password, first_name, last_name, role, job_seeker_id) VALUES 
(1, 'admin@hrdb.com', '$2b$10$rIC/zKzqT.1E3YkqJvKjUuV5dC5dJxF5fVxXv5vOvqJKhXKGC1Dxe', 'Admin', 'User', 'admin', NULL);

-- Sample applicant users (linked to job seekers)
INSERT INTO users (user_id, email, password, first_name, last_name, role, job_seeker_id) VALUES 
(2, 'john.smith@email.com', '$2b$10$rIC/zKzqT.1E3YkqJvKjUuV5dC5dJxF5fVxXv5vOvqJKhXKGC1Dxe', 'John', 'Smith', 'applicant', 1),
(3, 'emily.johnson@email.com', '$2b$10$rIC/zKzqT.1E3YkqJvKjUuV5dC5dJxF5fVxXv5vOvqJKhXKGC1Dxe', 'Emily', 'Johnson', 'applicant', 2),
(4, 'michael.williams@email.com', '$2b$10$rIC/zKzqT.1E3YkqJvKjUuV5dC5dJxF5fVxXv5vOvqJKhXKGC1Dxe', 'Michael', 'Williams', 'applicant', 3);

-- ============================================
-- SEED DATA COMPLETE
-- ============================================
SELECT 'Seed data loaded successfully!' AS status;
SELECT CONCAT('Locations: ', COUNT(*)) AS count FROM locations;
SELECT CONCAT('Companies: ', COUNT(*)) AS count FROM companies;
SELECT CONCAT('Positions: ', COUNT(*)) AS count FROM positions;
SELECT CONCAT('Benefits: ', COUNT(*)) AS count FROM benefits;
SELECT CONCAT('Requirements: ', COUNT(*)) AS count FROM requirements;
SELECT CONCAT('Job Seekers: ', COUNT(*)) AS count FROM job_seekers;
SELECT CONCAT('Employees: ', COUNT(*)) AS count FROM employees;
SELECT CONCAT('Job Applications: ', COUNT(*)) AS count FROM job_applications;
SELECT CONCAT('Users: ', COUNT(*)) AS count FROM users;
