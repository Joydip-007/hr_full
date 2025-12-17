# Database Setup

## Files

- `schema.sql` - Complete database structure with tables and relationships
- `seed.sql` - Sample data for testing (10 records per entity)
- `Dockerfile` - MySQL Docker configuration for Render

## Local Setup

```bash
# Start MySQL
mysql -u root -p

# Create and populate database
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
```

## Render/Production Setup

See [DEPLOYMENT.md](../DEPLOYMENT.md) for cloud deployment instructions.

## Schema Overview

Based on the HR/Job Recruitment ER diagram, includes:
- Core entities: Location, Company, Position, JobSeeker, Employee
- Supporting: Benefits, Requirements, Skills, Degrees, Experience, Volunteer, Awards
- Applications and Users for the job application system

## Database Structure

### Core Tables

**Location**
- location_id (Primary Key)
- city, state, country, address

**Company**
- company_id (Primary Key)
- name, num_employees, rating
- location_id (Foreign Key)

**Position**
- position_id (Primary Key)
- role, employment_type, salary
- company_id (Foreign Key)

**JobSeeker**
- job_seeker_id (Primary Key)
- first_name, last_name, city, state, dob, willing_to_move

**Employee**
- employee_id (Primary Key)
- job_seeker_id (Foreign Key)
- company_id (Foreign Key)
- position_id (Foreign Key)
- status, performance_rating, promotions_count

### Supporting Tables

- **Benefits** - Position benefits
- **Requirements** - Position requirements
- **Skills** - JobSeeker and Employee skills
- **Degrees** - Educational background
- **PastExperience** - Work history
- **VolunteerWork** - Community involvement
- **Awards** - Achievements

### Application System

- **Users** - Authentication (email, password, role)
- **Applications** - Job applications (status, applied_date)

## Sample Data

The seed file includes:
- 10 Locations
- 10 Companies
- 10 Positions
- 10 Benefits
- 10 Requirements
- 10 Job Seekers
- 10 Employees
- Sample skills, degrees, experiences
- 11 Applications with various statuses
- 4 Users (1 admin, 3 applicants)

## Default Credentials

### Admin User
- Email: admin@hrdb.com
- Password: password123

### Sample Applicant Users
- john.smith@email.com / password123
- emily.johnson@email.com / password123
- michael.williams@email.com / password123

## Notes

- The schema uses MySQL syntax with AUTO_INCREMENT
- For PostgreSQL deployment, schema needs conversion
- Foreign key constraints maintain referential integrity
- Indexes on key lookup fields for performance
