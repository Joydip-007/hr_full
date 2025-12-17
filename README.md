# HR Database Extended

A comprehensive HR/Job Recruitment Database Management System with full-stack implementation.

## Project Structure

```
hr_full/
├── database/
│   ├── schema.sql          # MySQL database schema with sample data
│   └── seed.sql            # Essential seed data for populating the database
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry point
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## Database Schema (Based on ER Diagram)

The database includes the following entities:

### Core Entities
- **Location** - City, State, Country, Address
- **Company** - Name, Number of Employees, Rating
- **Position** - Role, FT/PTE, Salary
- **JobSeeker** - First Name, Last Name, City, State, DOB, Willing to Move
- **Employee** - Former/Current status, Performance Rating, Promotions Count

### Supporting Entities
- **Benefits** - Position benefits (Health Insurance, 401k, etc.)
- **Requirements** - Position requirements (skills, experience)
- **Skills** - For both Job Seekers and Employees
- **Degrees** - Educational background
- **Past Experience** - Work history
- **Volunteer Work** - Community involvement
- **Awards** - Recognition and achievements
- **Job Applications** - Tracks job seeker applications

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- npm or yarn

### Database Setup

1. Start MySQL server
2. Run the schema file to create the database structure:
```bash
mysql -u root -p < database/schema.sql
```

3. (Optional) Run the seed file to populate with sample data:
```bash
mysql -u root -p < database/seed.sql
```

**Note:** The `schema.sql` file includes sample data by default. Use `seed.sql` separately if you want to reset the data without recreating the schema.

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hr_database
DB_PORT=3306
PORT=5000
```

5. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations/:id` - Get location by ID
- `POST /api/locations` - Create location
- `PUT /api/locations/:id` - Update location
- `DELETE /api/locations/:id` - Delete location

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `GET /api/companies/:id/positions` - Get company positions
- `GET /api/companies/:id/employees` - Get company employees
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Positions
- `GET /api/positions` - Get all positions
- `GET /api/positions/:id` - Get position by ID
- `GET /api/positions/:id/benefits` - Get position benefits
- `GET /api/positions/:id/requirements` - Get position requirements
- `GET /api/positions/:id/applicants` - Get position applicants
- `POST /api/positions` - Create position
- `PUT /api/positions/:id` - Update position
- `DELETE /api/positions/:id` - Delete position

### Job Seekers
- `GET /api/job-seekers` - Get all job seekers
- `GET /api/job-seekers/search?q=term` - Search job seekers
- `GET /api/job-seekers/:id` - Get job seeker by ID
- `GET /api/job-seekers/:id/profile` - Get full profile with skills, degrees, etc.
- `GET /api/job-seekers/:id/skills` - Get skills
- `GET /api/job-seekers/:id/degrees` - Get degrees
- `GET /api/job-seekers/:id/experiences` - Get experiences
- `GET /api/job-seekers/:id/applications` - Get applications
- `POST /api/job-seekers` - Create job seeker
- `PUT /api/job-seekers/:id` - Update job seeker
- `DELETE /api/job-seekers/:id` - Delete job seeker

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/search?q=term` - Search employees
- `GET /api/employees/:id` - Get employee by ID
- `GET /api/employees/:id/profile` - Get full profile
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/status/:status` - Get by status
- `GET /api/applications/:id` - Get application by ID
- `POST /api/applications` - Create application
- `PATCH /api/applications/:id/status` - Update status
- `DELETE /api/applications/:id` - Delete application

## Technology Stack

- **Backend**: Node.js, Express.js, MySQL2
- **Frontend**: React, React Router, Axios
- **Database**: MySQL

## Sample Data

The database comes pre-populated with:
- 10 Locations
- 10 Companies
- 10 Positions
- 10 Benefits
- 10 Requirements
- 10 Job Seekers
- 10 Employees
- Sample skills, degrees, experiences, volunteer work, and awards
- 11 Job Applications with various statuses

## License

ISC
