// API Configuration - Centralized endpoint management
export const API_BASE_URL = "http://localhost:8080"

// Student endpoints
export const STUDENT_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/students/add-student`,
  LOGIN: `${API_BASE_URL}/api/students/login`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/api/students/${id}`,
  GET_ALL: `${API_BASE_URL}/api/students/get-students`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/students/update-student/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/students/delete-student/${id}`,
}

// Professor endpoints
export const PROFESSOR_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/professors/add-prof`,
  LOGIN: `${API_BASE_URL}/api/professors/login`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/api/professors/${id}`,
  GET_ALL: `${API_BASE_URL}/api/professors/get-professors`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/professors/update-professor/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/professors/delete-professor/${id}`,
}

// HOD endpoints
export const HOD_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/hods/add-hod`,
  LOGIN: `${API_BASE_URL}/api/hods/login`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/api/hods/${id}`,
  GET_ALL: `${API_BASE_URL}/api/hods/get-hods`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/hods/update-hod/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/hods/delete-hod/${id}`,
}

// Department endpoints
export const DEPARTMENT_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/api/departments/get-dept`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/api/departments/${id}`,
  ADD: `${API_BASE_URL}/api/departments/add-dept`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/departments/update-dept/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/departments/delete-dept/${id}`,
}

// Attendance endpoints
export const ATTENDANCE_ENDPOINTS = {
  MARK: `${API_BASE_URL}/api/attendance/mark`,
  GET_BY_STUDENT: (studentId: string) => `${API_BASE_URL}/api/attendance/student/${studentId}`,
  GET_BY_PROFESSOR: (professorId: string) => `${API_BASE_URL}/api/attendance/professor/${professorId}`,
  GET_BY_DATE: (date: string) => `${API_BASE_URL}/api/attendance/date/${date}`,
}

// Common endpoints that might be used
export const COMMON_ENDPOINTS = {
  UPLOAD_FILE: `${API_BASE_URL}/api/files/upload`,
  DOWNLOAD_FILE: (filename: string) => `${API_BASE_URL}/api/files/download/${filename}`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
}

// Alternative endpoint patterns (in case your backend uses different naming)
export const ALTERNATIVE_ENDPOINTS = {
  STUDENT: {
    REGISTER: `${API_BASE_URL}/api/student/register`,
    LOGIN: `${API_BASE_URL}/api/student/login`,
    PROFILE: `${API_BASE_URL}/api/student/profile`,
  },
  PROFESSOR: {
    REGISTER: `${API_BASE_URL}/api/professor/register`,
    LOGIN: `${API_BASE_URL}/api/professor/login`,
    PROFILE: `${API_BASE_URL}/api/professor/profile`,
  },
  HOD: {
    REGISTER: `${API_BASE_URL}/api/hod/register`,
    LOGIN: `${API_BASE_URL}/api/hod/login`,
    PROFILE: `${API_BASE_URL}/api/hod/profile`,
  },
}
