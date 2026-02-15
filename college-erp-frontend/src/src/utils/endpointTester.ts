import { apiHelpers } from "./apiClient"

// Utility to test which endpoints are working
export const testEndpoints = async () => {
  const results = {
    student: {
      endpoints: [] as string[],
      working: [] as string[],
      failed: [] as string[],
    },
    professor: {
      endpoints: [] as string[],
      working: [] as string[],
      failed: [] as string[],
    },
    hod: {
      endpoints: [] as string[],
      working: [] as string[],
      failed: [] as string[],
    },
    department: {
      endpoints: [] as string[],
      working: [] as string[],
      failed: [] as string[],
    },
  }

  // Test student endpoints
  const studentEndpoints = [
    "/api/students/add-student",
    "/api/student/register",
    "/api/students/register",
    "/api/student/add",
    "/api/auth/student/register",
    "/api/students/login",
    "/api/student/login",
    "/api/students/authenticate",
    "/api/auth/student/login",
    "/api/student/signin",
  ]

  // Test professor endpoints
  const professorEndpoints = [
    "/api/professors/add-prof",
    "/api/professor/register",
    "/api/professors/register",
    "/api/professor/add",
    "/api/auth/professor/register",
    "/api/professors/login",
    "/api/professor/login",
    "/api/professors/authenticate",
    "/api/auth/professor/login",
    "/api/professor/signin",
  ]

  // Test HOD endpoints
  const hodEndpoints = [
    "/api/hods/add-hod",
    "/api/hod/register",
    "/api/hods/register",
    "/api/hod/add",
    "/api/auth/hod/register",
    "/api/hods/login",
    "/api/hod/login",
    "/api/hods/authenticate",
    "/api/auth/hod/login",
    "/api/hod/signin",
  ]

  // Test department endpoints
  const departmentEndpoints = [
    "/api/departments/get-dept",
    "/api/department/all",
    "/api/departments/all",
    "/api/department/list",
    "/api/departments",
  ]

  const testEndpointGroup = async (endpoints: string[], type: keyof typeof results) => {
    results[type].endpoints = endpoints

    for (const endpoint of endpoints) {
      try {
        // Test with a simple GET request (for non-login endpoints)
        if (endpoint.includes("login") || endpoint.includes("register") || endpoint.includes("add")) {
          // For login/register endpoints, just check if they respond (even with error)
          try {
            await apiHelpers.post(endpoint, {})
          } catch (err: any) {
            // If we get a 400 or 422, the endpoint exists but needs proper data
            if (err.response?.status === 400 || err.response?.status === 422) {
              results[type].working.push(endpoint)
            } else {
              results[type].failed.push(endpoint)
            }
          }
        } else {
          // For GET endpoints
          await apiHelpers.get(endpoint)
          results[type].working.push(endpoint)
        }
      } catch (err: any) {
        // If we get a 400 or 422, the endpoint exists but needs proper data
        if (err.response?.status === 400 || err.response?.status === 422) {
          results[type].working.push(endpoint)
        } else {
          results[type].failed.push(endpoint)
        }
      }
    }
  }

  await testEndpointGroup(studentEndpoints, "student")
  await testEndpointGroup(professorEndpoints, "professor")
  await testEndpointGroup(hodEndpoints, "hod")
  await testEndpointGroup(departmentEndpoints, "department")

  console.log("Endpoint Test Results:", results)
  return results
}

// Function to test a specific endpoint
export const testSingleEndpoint = async (endpoint: string, method: "GET" | "POST" = "GET", data?: any) => {
  try {
    let response
    if (method === "GET") {
      response = await apiHelpers.get(endpoint)
    } else {
      response = await apiHelpers.post(endpoint, data || {})
    }

    console.log(`✅ ${method} ${endpoint} - Status: ${response.status}`)
    return { success: true, status: response.status, data: response.data }
  } catch (err: any) {
    console.log(`❌ ${method} ${endpoint} - Status: ${err.response?.status || "Network Error"}`)
    return {
      success: false,
      status: err.response?.status,
      error: err.response?.data || err.message,
    }
  }
}
