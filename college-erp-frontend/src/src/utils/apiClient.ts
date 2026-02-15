import axios, { type AxiosResponse, type AxiosError } from "axios"

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`Response from ${response.config.url}:`, response.status)
    return response
  },
  (error: AxiosError) => {
    console.error("Response error:", error.response?.status, error.response?.data)

    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear local storage and redirect to login
      localStorage.clear()
      window.location.href = "/auth/login-type-selection"
    }

    return Promise.reject(error)
  },
)

// Helper functions for different request types
export const apiHelpers = {
  // For JSON requests
  post: (url: string, data: any) => apiClient.post(url, data),
  get: (url: string) => apiClient.get(url),
  put: (url: string, data: any) => apiClient.put(url, data),
  delete: (url: string) => apiClient.delete(url),

  // For file uploads (multipart/form-data)
  postFormData: (url: string, formData: FormData) =>
    apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // For file downloads
  downloadFile: (url: string) =>
    apiClient.get(url, {
      responseType: "blob",
    }),
}
