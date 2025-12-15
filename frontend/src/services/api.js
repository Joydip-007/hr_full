import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Locations
export const locationService = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
};

// Companies
export const companyService = {
  getAll: () => api.get('/companies'),
  getById: (id) => api.get(`/companies/${id}`),
  create: (data) => api.post('/companies', data),
  update: (id, data) => api.put(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`),
  getPositions: (id) => api.get(`/companies/${id}/positions`),
  getEmployees: (id) => api.get(`/companies/${id}/employees`),
};

// Positions
export const positionService = {
  getAll: () => api.get('/positions'),
  getById: (id) => api.get(`/positions/${id}`),
  create: (data) => api.post('/positions', data),
  update: (id, data) => api.put(`/positions/${id}`, data),
  delete: (id) => api.delete(`/positions/${id}`),
  getBenefits: (id) => api.get(`/positions/${id}/benefits`),
  getRequirements: (id) => api.get(`/positions/${id}/requirements`),
  getApplicants: (id) => api.get(`/positions/${id}/applicants`),
};

// Benefits
export const benefitService = {
  getAll: () => api.get('/benefits'),
  getById: (id) => api.get(`/benefits/${id}`),
  create: (data) => api.post('/benefits', data),
  update: (id, data) => api.put(`/benefits/${id}`, data),
  delete: (id) => api.delete(`/benefits/${id}`),
};

// Requirements
export const requirementService = {
  getAll: () => api.get('/requirements'),
  getById: (id) => api.get(`/requirements/${id}`),
  create: (data) => api.post('/requirements', data),
  update: (id, data) => api.put(`/requirements/${id}`, data),
  delete: (id) => api.delete(`/requirements/${id}`),
};

// Job Seekers
export const jobSeekerService = {
  getAll: () => api.get('/job-seekers'),
  getById: (id) => api.get(`/job-seekers/${id}`),
  getProfile: (id) => api.get(`/job-seekers/${id}/profile`),
  create: (data) => api.post('/job-seekers', data),
  update: (id, data) => api.put(`/job-seekers/${id}`, data),
  delete: (id) => api.delete(`/job-seekers/${id}`),
  search: (query) => api.get(`/job-seekers/search?q=${query}`),
  getSkills: (id) => api.get(`/job-seekers/${id}/skills`),
  getDegrees: (id) => api.get(`/job-seekers/${id}/degrees`),
  getExperiences: (id) => api.get(`/job-seekers/${id}/experiences`),
  getApplications: (id) => api.get(`/job-seekers/${id}/applications`),
};

// Employees
export const employeeService = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  getProfile: (id) => api.get(`/employees/${id}/profile`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
  search: (query) => api.get(`/employees/search?q=${query}`),
  getSkills: (id) => api.get(`/employees/${id}/skills`),
  getDegrees: (id) => api.get(`/employees/${id}/degrees`),
  getExperiences: (id) => api.get(`/employees/${id}/experiences`),
};

// Job Applications
export const applicationService = {
  getAll: () => api.get('/applications'),
  getById: (id) => api.get(`/applications/${id}`),
  create: (data) => api.post('/applications', data),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  delete: (id) => api.delete(`/applications/${id}`),
  getByStatus: (status) => api.get(`/applications/status/${status}`),
};

export default api;
