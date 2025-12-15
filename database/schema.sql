-- HR/Job Recruitment Database Schema
-- Based on ER Diagram provided
-- Create and use the database
CREATE DATABASE IF NOT EXISTS hr_database;
USE hr_database;

-- ============================================
-- LOCATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- COMPANY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS companies (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    number_of_employees INT,
    rating DECIMAL(3, 2),
    location_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
);

-- ============================================
-- POSITION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS positions (
    position_id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(100) NOT NULL,
    ft_pte ENUM('Full-Time', 'Part-Time') DEFAULT 'Full-Time',
    salary DECIMAL(12, 2),
    company_id INT,
    location_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
);

-- ============================================
-- BENEFITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS benefits (
    benefit_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- POSITION_BENEFITS (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS position_benefits (
    position_id INT,
    benefit_id INT,
    PRIMARY KEY (position_id, benefit_id),
    FOREIGN KEY (position_id) REFERENCES positions(position_id) ON DELETE CASCADE,
    FOREIGN KEY (benefit_id) REFERENCES benefits(benefit_id) ON DELETE CASCADE
);

-- ============================================
-- REQUIREMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS requirements (
    requirement_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- POSITION_REQUIREMENTS (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS position_requirements (
    position_id INT,
    requirement_id INT,
    PRIMARY KEY (position_id, requirement_id),
    FOREIGN KEY (position_id) REFERENCES positions(position_id) ON DELETE CASCADE,
    FOREIGN KEY (requirement_id) REFERENCES requirements(requirement_id) ON DELETE CASCADE
);

-- ============================================
-- JOB SEEKER TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_seekers (
    job_seeker_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    dob DATE,
    willing_to_move BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- EMPLOYEE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    former_current ENUM('Former', 'Current') DEFAULT 'Current',
    performance_rating DECIMAL(3, 2),
    promotions_count INT DEFAULT 0,
    company_id INT,
    position_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
    FOREIGN KEY (position_id) REFERENCES positions(position_id) ON DELETE SET NULL
);

-- ============================================
-- SKILLS TABLE (for Job Seekers)
-- ============================================
CREATE TABLE IF NOT EXISTS job_seeker_skills (
    skill_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE
);

-- ============================================
-- SKILLS TABLE (for Employees)
-- ============================================
CREATE TABLE IF NOT EXISTS employee_skills (
    skill_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- ============================================
-- DEGREE TABLE (for Job Seekers)
-- ============================================
CREATE TABLE IF NOT EXISTS job_seeker_degrees (
    degree_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    school_name VARCHAR(200) NOT NULL,
    level VARCHAR(50),
    concentration VARCHAR(100),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE
);

-- ============================================
-- DEGREE TABLE (for Employees)
-- ============================================
CREATE TABLE IF NOT EXISTS employee_degrees (
    degree_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    school_name VARCHAR(200) NOT NULL,
    level VARCHAR(50),
    concentration VARCHAR(100),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- ============================================
-- PAST EXPERIENCE TABLE (for Job Seekers)
-- ============================================
CREATE TABLE IF NOT EXISTS job_seeker_experiences (
    experience_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    company VARCHAR(200),
    title VARCHAR(100),
    salary DECIMAL(12, 2),
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE
);

-- ============================================
-- PAST EXPERIENCE TABLE (for Employees)
-- ============================================
CREATE TABLE IF NOT EXISTS employee_experiences (
    experience_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company VARCHAR(200),
    title VARCHAR(100),
    salary DECIMAL(12, 2),
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- ============================================
-- VOLUNTEER WORK TABLE (for Job Seekers)
-- ============================================
CREATE TABLE IF NOT EXISTS job_seeker_volunteer_work (
    volunteer_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    role VARCHAR(100),
    organization VARCHAR(200),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE
);

-- ============================================
-- VOLUNTEER WORK TABLE (for Employees)
-- ============================================
CREATE TABLE IF NOT EXISTS employee_volunteer_work (
    volunteer_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    role VARCHAR(100),
    organization VARCHAR(200),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- ============================================
-- AWARDS TABLE (for Job Seekers)
-- ============================================
CREATE TABLE IF NOT EXISTS job_seeker_awards (
    award_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    organization VARCHAR(200),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE
);

-- ============================================
-- AWARDS TABLE (for Employees)
-- ============================================
CREATE TABLE IF NOT EXISTS employee_awards (
    award_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    organization VARCHAR(200),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- ============================================
-- JOB SEEKER POSITION APPLICATIONS (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS job_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    job_seeker_id INT NOT NULL,
    position_id INT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Applied', 'Under Review', 'Interview', 'Offered', 'Rejected', 'Accepted') DEFAULT 'Applied',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(job_seeker_id) ON DELETE CASCADE,
    FOREIGN KEY (position_id) REFERENCES positions(position_id) ON DELETE CASCADE
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert Locations
INSERT INTO locations (city, state, country, address) VALUES 
('New York', 'NY', 'USA', '350 Fifth Avenue'),
('San Francisco', 'CA', 'USA', '1 Market Street'),
('Seattle', 'WA', 'USA', '400 Broad Street'),
('Austin', 'TX', 'USA', '100 Congress Avenue'),
('Chicago', 'IL', 'USA', '233 S Wacker Drive'),
('Boston', 'MA', 'USA', '1 Federal Street'),
('Los Angeles', 'CA', 'USA', '633 W 5th Street'),
('Denver', 'CO', 'USA', '1144 15th Street'),
('Toronto', 'ON', 'Canada', '100 King Street West'),
('London', 'England', 'UK', '1 Canada Square');

-- Insert Companies
INSERT INTO companies (name, number_of_employees, rating, location_id) VALUES 
('TechCorp Inc.', 5000, 4.5, 1),
('DataSystems LLC', 1200, 4.2, 2),
('CloudNine Solutions', 800, 4.7, 3),
('InnovateTech', 3500, 4.3, 4),
('GlobalSoft', 10000, 4.1, 5),
('StartupHub', 150, 4.8, 6),
('Enterprise Solutions', 7500, 3.9, 7),
('Digital Dynamics', 2000, 4.4, 8),
('NorthStar Tech', 900, 4.6, 9),
('EuroTech Ltd.', 4000, 4.0, 10);

-- Insert Positions
INSERT INTO positions (role, ft_pte, salary, company_id, location_id) VALUES 
('Software Engineer', 'Full-Time', 120000.00, 1, 1),
('Data Analyst', 'Full-Time', 85000.00, 2, 2),
('DevOps Engineer', 'Full-Time', 130000.00, 3, 3),
('Product Manager', 'Full-Time', 140000.00, 4, 4),
('UX Designer', 'Full-Time', 95000.00, 5, 5),
('Marketing Specialist', 'Part-Time', 45000.00, 6, 6),
('HR Manager', 'Full-Time', 90000.00, 7, 7),
('Sales Representative', 'Full-Time', 75000.00, 8, 8),
('Technical Writer', 'Part-Time', 55000.00, 9, 9),
('Cloud Architect', 'Full-Time', 160000.00, 10, 10);

-- Insert Benefits
INSERT INTO benefits (name, description) VALUES 
('Health Insurance', 'Comprehensive medical, dental, and vision coverage'),
('401(k) Match', 'Company matches up to 6% of salary'),
('Remote Work', 'Flexible work from home options'),
('Paid Time Off', '20 days PTO plus holidays'),
('Professional Development', 'Annual budget for conferences and courses'),
('Stock Options', 'Equity compensation package'),
('Gym Membership', 'Free gym membership or fitness stipend'),
('Parental Leave', '12 weeks paid parental leave'),
('Commuter Benefits', 'Pre-tax transit and parking benefits'),
('Mental Health Support', 'Free counseling and mental health resources');

-- Insert Position Benefits
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

-- Insert Requirements
INSERT INTO requirements (name, description) VALUES 
('Bachelor Degree', 'Bachelor degree in Computer Science or related field'),
('3+ Years Experience', 'Minimum 3 years of relevant work experience'),
('Python Proficiency', 'Strong programming skills in Python'),
('SQL Knowledge', 'Experience with SQL databases'),
('Cloud Experience', 'Experience with AWS, Azure, or GCP'),
('Communication Skills', 'Excellent written and verbal communication'),
('Leadership', 'Demonstrated leadership experience'),
('Agile Methodology', 'Experience with Agile/Scrum methodologies'),
('JavaScript', 'Proficiency in JavaScript/TypeScript'),
('Data Analysis', 'Experience with data analysis tools and techniques');

-- Insert Position Requirements
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

-- Insert Job Seekers
INSERT INTO job_seekers (first_name, last_name, city, state, dob, willing_to_move) VALUES 
('John', 'Smith', 'New York', 'NY', '1990-05-15', TRUE),
('Emily', 'Johnson', 'San Francisco', 'CA', '1992-08-22', TRUE),
('Michael', 'Williams', 'Austin', 'TX', '1988-03-10', FALSE),
('Sarah', 'Brown', 'Seattle', 'WA', '1995-11-30', TRUE),
('David', 'Jones', 'Chicago', 'IL', '1991-07-18', FALSE),
('Jessica', 'Davis', 'Boston', 'MA', '1993-01-25', TRUE),
('Christopher', 'Miller', 'Denver', 'CO', '1989-09-05', TRUE),
('Amanda', 'Wilson', 'Los Angeles', 'CA', '1994-04-12', FALSE),
('Matthew', 'Moore', 'Toronto', 'ON', '1990-12-08', TRUE),
('Ashley', 'Taylor', 'London', 'England', '1992-06-20', TRUE);

-- Insert Employees
INSERT INTO employees (first_name, last_name, former_current, performance_rating, promotions_count, company_id, position_id) VALUES 
('Robert', 'Anderson', 'Current', 4.5, 2, 1, 1),
('Jennifer', 'Thomas', 'Current', 4.2, 1, 2, 2),
('William', 'Jackson', 'Former', 3.8, 0, 3, 3),
('Elizabeth', 'White', 'Current', 4.7, 3, 4, 4),
('James', 'Harris', 'Current', 4.0, 1, 5, 5),
('Linda', 'Martin', 'Former', 3.5, 0, 6, 6),
('Richard', 'Thompson', 'Current', 4.3, 2, 7, 7),
('Patricia', 'Garcia', 'Current', 4.1, 1, 8, 8),
('Charles', 'Martinez', 'Current', 4.6, 2, 9, 9),
('Barbara', 'Robinson', 'Current', 4.8, 4, 10, 10);

-- Insert Job Seeker Skills
INSERT INTO job_seeker_skills (job_seeker_id, name, description) VALUES 
(1, 'Python', 'Advanced Python programming'),
(1, 'JavaScript', 'Full-stack JavaScript development'),
(2, 'Data Analysis', 'Statistical analysis and visualization'),
(2, 'SQL', 'Database querying and optimization'),
(3, 'Project Management', 'Agile and waterfall methodologies'),
(4, 'Cloud Computing', 'AWS and Azure expertise'),
(5, 'Machine Learning', 'TensorFlow and PyTorch'),
(6, 'UX Design', 'User research and prototyping'),
(7, 'DevOps', 'CI/CD pipelines and containerization'),
(8, 'Marketing', 'Digital marketing and SEO');

-- Insert Employee Skills
INSERT INTO employee_skills (employee_id, name, description) VALUES 
(1, 'Java', 'Enterprise Java development'),
(1, 'Spring Boot', 'Microservices architecture'),
(2, 'Python', 'Data science and analytics'),
(3, 'Kubernetes', 'Container orchestration'),
(4, 'Product Strategy', 'Roadmap planning and execution'),
(5, 'Figma', 'UI/UX design tools'),
(6, 'Content Marketing', 'Blog and social media management'),
(7, 'HR Analytics', 'People analytics and reporting'),
(8, 'Salesforce', 'CRM administration'),
(10, 'Cloud Architecture', 'Multi-cloud solutions');

-- Insert Job Seeker Degrees
INSERT INTO job_seeker_degrees (job_seeker_id, school_name, level, concentration, year) VALUES 
(1, 'MIT', 'Bachelor', 'Computer Science', 2012),
(2, 'Stanford University', 'Master', 'Data Science', 2016),
(3, 'University of Texas', 'Bachelor', 'Business Administration', 2010),
(4, 'University of Washington', 'Bachelor', 'Computer Engineering', 2017),
(5, 'Northwestern University', 'Master', 'Machine Learning', 2015),
(6, 'Harvard University', 'Bachelor', 'Psychology', 2015),
(7, 'Colorado State University', 'Bachelor', 'Information Systems', 2011),
(8, 'UCLA', 'Bachelor', 'Marketing', 2016),
(9, 'University of Toronto', 'Master', 'Computer Science', 2014),
(10, 'Oxford University', 'Bachelor', 'Mathematics', 2014);

-- Insert Employee Degrees
INSERT INTO employee_degrees (employee_id, school_name, level, concentration, year) VALUES 
(1, 'Carnegie Mellon', 'Master', 'Software Engineering', 2010),
(2, 'UC Berkeley', 'Bachelor', 'Statistics', 2012),
(3, 'Georgia Tech', 'Bachelor', 'Computer Science', 2008),
(4, 'Wharton School', 'MBA', 'Product Management', 2011),
(5, 'RISD', 'Bachelor', 'Graphic Design', 2013),
(6, 'Boston University', 'Bachelor', 'Communications', 2009),
(7, 'Cornell University', 'Master', 'Human Resources', 2007),
(8, 'Arizona State', 'Bachelor', 'Business', 2011),
(9, 'McGill University', 'Bachelor', 'English', 2008),
(10, 'Cambridge University', 'PhD', 'Distributed Systems', 2006);

-- Insert Job Seeker Experiences
INSERT INTO job_seeker_experiences (job_seeker_id, company, title, salary, description, start_date, end_date) VALUES 
(1, 'Google', 'Software Engineer Intern', 80000.00, 'Developed internal tools', '2011-06-01', '2011-08-31'),
(2, 'Facebook', 'Data Analyst', 95000.00, 'Analyzed user engagement metrics', '2016-09-01', '2019-05-15'),
(3, 'Dell', 'Project Coordinator', 65000.00, 'Managed IT projects', '2010-07-01', '2015-03-31'),
(4, 'Amazon', 'Cloud Engineer', 110000.00, 'AWS infrastructure management', '2017-08-01', '2022-01-15'),
(5, 'IBM', 'ML Engineer', 105000.00, 'Built predictive models', '2015-06-01', '2020-12-31');

-- Insert Employee Experiences
INSERT INTO employee_experiences (employee_id, company, title, salary, description, start_date, end_date) VALUES 
(1, 'Microsoft', 'Junior Developer', 75000.00, 'Backend development', '2010-07-01', '2014-08-31'),
(2, 'Tableau', 'BI Analyst', 70000.00, 'Dashboard development', '2012-09-01', '2016-05-15'),
(4, 'Apple', 'Associate PM', 95000.00, 'Feature development', '2011-06-01', '2015-03-31'),
(7, 'ADP', 'HR Specialist', 60000.00, 'Employee relations', '2007-08-01', '2012-01-15'),
(10, 'AWS', 'Solutions Architect', 130000.00, 'Cloud migrations', '2006-06-01', '2015-12-31');

-- Insert Job Seeker Volunteer Work
INSERT INTO job_seeker_volunteer_work (job_seeker_id, role, organization, start_date, end_date) VALUES 
(1, 'Coding Instructor', 'Code.org', '2013-01-01', '2015-12-31'),
(2, 'Data Volunteer', 'DataKind', '2017-03-01', '2019-06-30'),
(4, 'Tech Mentor', 'FIRST Robotics', '2018-09-01', '2021-05-31'),
(6, 'UX Consultant', 'Nonprofit Tech', '2016-06-01', '2018-08-31');

-- Insert Employee Volunteer Work
INSERT INTO employee_volunteer_work (employee_id, role, organization, start_date, end_date) VALUES 
(1, 'Board Member', 'Tech Nonprofits', '2015-01-01', '2020-12-31'),
(4, 'Advisor', 'Startup Incubator', '2016-03-01', '2021-06-30'),
(7, 'HR Consultant', 'Small Business Alliance', '2013-09-01', '2018-05-31');

-- Insert Job Seeker Awards
INSERT INTO job_seeker_awards (job_seeker_id, name, organization, date) VALUES 
(1, 'Hackathon Winner', 'TechCrunch', '2012-09-15'),
(2, 'Best Data Project', 'Kaggle', '2018-03-20'),
(4, 'Cloud Excellence Award', 'AWS', '2020-11-10'),
(5, 'Innovation Award', 'IBM', '2019-06-05');

-- Insert Employee Awards
INSERT INTO employee_awards (employee_id, name, organization, date) VALUES 
(1, 'Employee of the Year', 'TechCorp Inc.', '2019-12-15'),
(4, 'Product Innovation Award', 'InnovateTech', '2020-06-20'),
(7, 'HR Excellence Award', 'SHRM', '2018-09-10'),
(10, 'Cloud Pioneer Award', 'EuroTech Ltd.', '2021-03-05');

-- Insert Job Applications
INSERT INTO job_applications (job_seeker_id, position_id, status) VALUES 
(1, 1, 'Interview'),
(1, 3, 'Applied'),
(2, 2, 'Offered'),
(3, 4, 'Under Review'),
(4, 3, 'Accepted'),
(5, 1, 'Interview'),
(6, 5, 'Applied'),
(7, 3, 'Rejected'),
(8, 6, 'Interview'),
(9, 9, 'Offered'),
(10, 10, 'Applied');
