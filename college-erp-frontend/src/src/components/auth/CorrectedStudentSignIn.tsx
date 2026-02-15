"use client"

import type React from "react"
import { useState } from "react"
import { Card, Input, Button, Typography, Spinner, Alert, Checkbox } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import { apiHelpers } from "../../utils/apiClient"
import { STUDENT_ENDPOINTS } from "../../utils/apiEndpoints"

export function CorrectedStudentSignIn() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      console.log("Attempting login to:", STUDENT_ENDPOINTS.LOGIN)

      // Try main login endpoint
      let loginResponse
      try {
        loginResponse = await apiHelpers.post(STUDENT_ENDPOINTS.LOGIN, {
          username: formData.username.trim(),
          password: formData.password,
        })
      } catch (mainError: any) {
        console.log("Main login endpoint failed, trying alternatives...")

        // Try alternative login endpoints
        const alternatives = [
          "/api/student/login",
          "/api/students/authenticate",
          "/api/auth/student/login",
          "/api/student/signin",
        ]

        let success = false
        for (const altEndpoint of alternatives) {
          try {
            console.log("Trying login:", altEndpoint)
            loginResponse = await apiHelpers.post(altEndpoint, {
              username: formData.username.trim(),
              password: formData.password,
            })
            success = true
            break
          } catch (altError) {
            console.log(`Failed: ${altEndpoint}`)
            continue
          }
        }

        if (!success) {
          throw mainError
        }
      }

      if (loginResponse.status === 200) {
        const loginData = loginResponse.data
        console.log("Login response:", loginData)

        // Handle different response formats
        let studentId
        if (loginData.studentId) {
          studentId = loginData.studentId
        } else if (loginData.id) {
          studentId = loginData.id
        } else if (loginData.student?.studentId) {
          studentId = loginData.student.studentId
        } else if (typeof loginData === "string") {
          studentId = loginData
        } else {
          throw new Error("Invalid login response format")
        }

        // Store basic login info
        localStorage.setItem("userRole", "student")
        localStorage.setItem("studentId", studentId.toString())

        // Try to fetch complete student data
        try {
          console.log("Fetching student data for ID:", studentId)
          const studentResponse = await apiHelpers.get(STUDENT_ENDPOINTS.GET_BY_ID(studentId.toString()))

          if (studentResponse.status === 200) {
            const studentData = studentResponse.data
            localStorage.setItem("studentData", JSON.stringify(studentData))
            console.log("Student data fetched successfully:", studentData)
          }
        } catch (fetchError) {
          console.log("Failed to fetch student data, but login was successful")
          // Continue with login even if profile fetch fails
        }

        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem("rememberStudent", "true")
        }

        console.log("Login successful, navigating to dashboard")
        navigate("/dashboard/student/home")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      console.error("Error response:", err.response?.data)
      console.error("Error status:", err.response?.status)

      if (err.response?.status === 401) {
        setError("Invalid username or password")
      } else if (err.response?.status === 404) {
        setError("Student not found")
      } else if (err.response?.status === 403) {
        setError("Account is disabled. Please contact administrator.")
      } else if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.")
      } else if (err.response?.data) {
        const errorMsg = typeof err.response.data === "string" ? err.response.data : "Login failed"
        setError(errorMsg)
      } else {
        setError("Login failed. Please check your connection and try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="m-8 flex justify-center gap-4">
      <div className="w-full lg:w-3/5 mt-18">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Student Sign In
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your credentials to access your account.
          </Typography>
        </div>

        <Card className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2 p-6">
          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label={
                  <Typography variant="small" color="gray" className="flex items-center font-normal">
                    Remember me
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />

              <Link to="/forgot-password">
                <Typography variant="small" className="font-medium text-gray-900 hover:text-blue-500">
                  Forgot Password?
                </Typography>
              </Link>
            </div>

            <Button
              type="submit"
              color="blue"
              size="lg"
              fullWidth
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner className="h-5 w-5" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
            Not registered?
            <Link to="/auth/student/sign-up" className="text-gray-900 ml-1 hover:text-blue-500">
              Create account
            </Link>
          </Typography>
        </Card>
      </div>
    </section>
  )
}

export default CorrectedStudentSignIn
