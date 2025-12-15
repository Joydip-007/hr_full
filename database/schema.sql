-- HR Database Schema
-- Create and use the database
CREATE DATABASE IF NOT EXISTS hr_database;
USE hr_database;

-- ============================================
-- REGIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS regions (
    region_id INT PRIMARY KEY AUTO_INCREMENT,
    region_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- COUNTRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS countries (
    country_id CHAR(2) PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    region_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE SET NULL
);

-- ============================================
-- LOCATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    street_address VARCHAR(200),
    postal_code VARCHAR(20),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100),
    country_id CHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE SET NULL
);

-- ============================================
-- DEPARTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    manager_id INT,
    location_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
);

-- ============================================
-- JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
    job_id VARCHAR(20) PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    min_salary DECIMAL(10, 2),
    max_salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- EMPLOYEES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    job_id VARCHAR(20),
    salary DECIMAL(10, 2),
    commission_pct DECIMAL(4, 2),
    manager_id INT,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Add foreign key for departments manager_id after employees table is created
ALTER TABLE departments ADD FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL;

-- ============================================
-- JOB HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_history (
    employee_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    job_id VARCHAR(20),
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, start_date),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert Regions
INSERT INTO regions (region_name) VALUES 
('Europe'),
('Americas'),
('Asia'),
('Middle East and Africa');

-- Insert Countries
INSERT INTO countries (country_id, country_name, region_id) VALUES 
('US', 'United States of America', 2),
('CA', 'Canada', 2),
('UK', 'United Kingdom', 1),
('DE', 'Germany', 1),
('IN', 'India', 3),
('JP', 'Japan', 3),
('AU', 'Australia', 3),
('BR', 'Brazil', 2),
('AE', 'United Arab Emirates', 4),
('ZA', 'South Africa', 4);

-- Insert Locations
INSERT INTO locations (street_address, postal_code, city, state_province, country_id) VALUES 
('1297 Via Cola di Rie', '00989', 'Roma', 'Lazio', 'UK'),
('93091 Calle della Testa', '10934', 'Venice', 'Veneto', 'UK'),
('2017 Shinjuku-ku', '1689', 'Tokyo', 'Tokyo Prefecture', 'JP'),
('9450 Kamber', '99236', 'Singapore', NULL, 'IN'),
('Rua Sao Paulo', '01234', 'Sao Paulo', 'Sao Paulo', 'BR'),
('8204 Arthur St', '98756', 'London', 'London', 'UK'),
('Schwanthalerstr. 7031', '80925', 'Munich', 'Bavaria', 'DE'),
('9702 Chester Road', '09629850293', 'Stretford', 'Manchester', 'UK'),
('2004 Charade Rd', '98199', 'Seattle', 'Washington', 'US'),
('460 Bloor St. W.', 'M5S 1X8', 'Toronto', 'Ontario', 'CA'),
('1501 Broadway', '10036', 'New York', 'New York', 'US');

-- Insert Jobs
INSERT INTO jobs (job_id, job_title, min_salary, max_salary) VALUES 
('AD_PRES', 'President', 20000.00, 40000.00),
('AD_VP', 'Administration Vice President', 15000.00, 30000.00),
('AD_ASST', 'Administration Assistant', 3000.00, 6000.00),
('FI_MGR', 'Finance Manager', 8200.00, 16000.00),
('FI_ACCOUNT', 'Accountant', 4200.00, 9000.00),
('AC_MGR', 'Accounting Manager', 8200.00, 16000.00),
('AC_ACCOUNT', 'Public Accountant', 4200.00, 9000.00),
('SA_MAN', 'Sales Manager', 10000.00, 20000.00),
('SA_REP', 'Sales Representative', 6000.00, 12000.00),
('PU_MAN', 'Purchasing Manager', 8000.00, 15000.00),
('PU_CLERK', 'Purchasing Clerk', 2500.00, 5500.00),
('ST_MAN', 'Stock Manager', 5500.00, 8500.00),
('ST_CLERK', 'Stock Clerk', 2000.00, 5000.00),
('SH_CLERK', 'Shipping Clerk', 2500.00, 5500.00),
('IT_PROG', 'Programmer', 4000.00, 10000.00),
('MK_MAN', 'Marketing Manager', 9000.00, 15000.00),
('MK_REP', 'Marketing Representative', 4000.00, 9000.00),
('HR_REP', 'Human Resources Representative', 4000.00, 9000.00),
('PR_REP', 'Public Relations Representative', 4500.00, 10500.00);

-- Insert Departments (without managers initially)
INSERT INTO departments (department_name, location_id) VALUES 
('Administration', 11),
('Marketing', 11),
('Purchasing', 9),
('Human Resources', 6),
('Shipping', 9),
('IT', 9),
('Public Relations', 6),
('Sales', 11),
('Executive', 11),
('Finance', 11),
('Accounting', 11);

-- Insert Employees
INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES 
('Steven', 'King', 'sking@company.com', '515.123.4567', '2003-06-17', 'AD_PRES', 24000.00, NULL, NULL, 9),
('Neena', 'Kochhar', 'nkochhar@company.com', '515.123.4568', '2005-09-21', 'AD_VP', 17000.00, NULL, 1, 9),
('Lex', 'De Haan', 'ldehaan@company.com', '515.123.4569', '2001-01-13', 'AD_VP', 17000.00, NULL, 1, 9),
('Alexander', 'Hunold', 'ahunold@company.com', '590.423.4567', '2006-01-03', 'IT_PROG', 9000.00, NULL, 2, 6),
('Bruce', 'Ernst', 'bernst@company.com', '590.423.4568', '2007-05-21', 'IT_PROG', 6000.00, NULL, 4, 6),
('David', 'Austin', 'daustin@company.com', '590.423.4569', '2005-06-25', 'IT_PROG', 4800.00, NULL, 4, 6),
('Valli', 'Pataballa', 'vpatabal@company.com', '590.423.4560', '2006-02-05', 'IT_PROG', 4800.00, NULL, 4, 6),
('Diana', 'Lorentz', 'dlorentz@company.com', '590.423.5567', '2007-02-07', 'IT_PROG', 4200.00, NULL, 4, 6),
('Nancy', 'Greenberg', 'ngreenbe@company.com', '515.124.4569', '2002-08-17', 'FI_MGR', 12000.00, NULL, 2, 10),
('Daniel', 'Faviet', 'dfaviet@company.com', '515.124.4169', '2002-08-16', 'FI_ACCOUNT', 9000.00, NULL, 9, 10),
('John', 'Chen', 'jchen@company.com', '515.124.4269', '2005-09-28', 'FI_ACCOUNT', 8200.00, NULL, 9, 10),
('Ismael', 'Sciarra', 'isciarra@company.com', '515.124.4369', '2005-09-30', 'FI_ACCOUNT', 7700.00, NULL, 9, 10),
('Jose Manuel', 'Urman', 'jmurman@company.com', '515.124.4469', '2006-03-07', 'FI_ACCOUNT', 7800.00, NULL, 9, 10),
('Luis', 'Popp', 'lpopp@company.com', '515.124.4567', '2007-12-07', 'FI_ACCOUNT', 6900.00, NULL, 9, 10),
('Den', 'Raphaely', 'drapheal@company.com', '515.127.4561', '2002-12-07', 'PU_MAN', 11000.00, NULL, 1, 3),
('Alexander', 'Khoo', 'akhoo@company.com', '515.127.4562', '2003-05-18', 'PU_CLERK', 3100.00, NULL, 15, 3),
('Shelli', 'Baida', 'sbaida@company.com', '515.127.4563', '2005-12-24', 'PU_CLERK', 2900.00, NULL, 15, 3),
('Sigal', 'Tobias', 'stobias@company.com', '515.127.4564', '2005-07-24', 'PU_CLERK', 2800.00, NULL, 15, 3),
('Guy', 'Himuro', 'ghimuro@company.com', '515.127.4565', '2006-11-15', 'PU_CLERK', 2600.00, NULL, 15, 3),
('Karen', 'Colmenares', 'kcolmena@company.com', '515.127.4566', '2007-08-10', 'PU_CLERK', 2500.00, NULL, 15, 3);

-- Update department managers
UPDATE departments SET manager_id = 1 WHERE department_id = 9;
UPDATE departments SET manager_id = 9 WHERE department_id = 10;
UPDATE departments SET manager_id = 4 WHERE department_id = 6;
UPDATE departments SET manager_id = 15 WHERE department_id = 3;

-- Insert Job History
INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id) VALUES 
(2, '2001-10-28', '2005-03-15', 'AC_ACCOUNT', 11),
(2, '2005-03-16', '2005-09-20', 'AC_MGR', 11),
(3, '1999-01-13', '2000-07-24', 'IT_PROG', 6),
(4, '1998-02-17', '2006-01-02', 'SA_REP', 8);
