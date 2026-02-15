"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Input, Button, Typography, Select, Option, Spinner, Alert } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import { apiHelpers } from "../../utils/apiClient"
import { STUDENT_ENDPOINTS, DEPARTMENT_ENDPOINTS } from "../../utils/apiEndpoints"

interface Department {
  id: number
  name: string
}

export function CorrectedStudentSignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    studentId: "",
    username: "",
    password: "",
    email: "",
    studName: "",
    studFatherName: "",
    studLastName: "",
    studentAge: "",
    studentDob: "",
    studCaste: "",
    studCategory: "",
    studRollNo: "",
    year: "",
    studPhoneNumber: "",
    major: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      console.log("Fetching departments from:", DEPARTMENT_ENDPOINTS.GET_ALL)
      const response = await apiHelpers.get(DEPARTMENT_ENDPOINTS.GET_ALL)
      setDepartments(response.data)
    } catch (err: any) {
      console.error("Error fetching departments:", err)

      // Try alternative endpoint if main one fails
      try {
        console.log("Trying alternative department endpoint...")
        const altResponse = await apiHelpers.get("/api/department/all")
        setDepartments(altResponse.data)
      } catch (altErr) {
        console.error("Alternative endpoint also failed:", altErr)
        setError("Failed to load departments. Please try again.")
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      major: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      setImageFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const requiredFields = ["studentId", "username", "password", "email", "studName", "major", "year", "studRollNo"]

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        setError(`${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`)
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const submitData = new FormData()

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })

      // Append image file
      if (imageFile) {
        submitData.append("file", imageFile)
      } else {
        // Some backends require a file field even if empty
        const emptyBlob = new Blob([], { type: "application/octet-stream" })
        submitData.append("file", emptyBlob, "")
      }

      console.log("Submitting to:", STUDENT_ENDPOINTS.REGISTER)
      console.log("Form data keys:", Array.from(submitData.keys()))

      // Try main endpoint
      let response
      try {
        response = await apiHelpers.postFormData(STUDENT_ENDPOINTS.REGISTER, submitData)
      } catch (mainError: any) {
        console.log("Main endpoint failed, trying alternatives...")

        // Try alternative endpoints
        const alternatives = [
          "/api/student/register",
          "/api/students/register",
          "/api/student/add",
          "/api/auth/student/register",
        ]

        let success = false
        for (const altEndpoint of alternatives) {
          try {
            console.log("Trying:", altEndpoint)
            response = await apiHelpers.postFormData(altEndpoint, submitData)
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

      setSuccess("Student registered successfully! Redirecting to login...")

      // Reset form
      setFormData({
        studentId: "",
        username: "",
        password: "",
        email: "",
        studName: "",
        studFatherName: "",
        studLastName: "",
        studentAge: "",
        studentDob: "",
        studCaste: "",
        studCategory: "",
        studRollNo: "",
        year: "",
        studPhoneNumber: "",
        major: "",
      })
      setImageFile(null)
      setPreviewUrl("")

      setTimeout(() => {
        navigate("/auth/student/sign-in")
      }, 2000)
    } catch (err: any) {
      console.error("Registration error:", err)
      console.error("Error response:", err.response?.data)
      console.error("Error status:", err.response?.status)

      if (err.response?.status === 409) {
        setError(err.response.data || "Student with this username or email already exists")
      } else if (err.response?.status === 400) {
        setError(err.response.data || "Invalid data provided. Please check all fields.")
      } else if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.")
      } else if (err.response?.data) {
        setError(typeof err.response.data === "string" ? err.response.data : "Registration failed")
      } else {
        setError("Registration failed. Please check your connection and try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="m-8 flex justify-center">
      <Card className="w-full max-w-2xl p-6">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold mb-4">
            Student Registration
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to create an account.
          </Typography>
        </div>

        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" className="mb-4">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={previewUrl || "/placeholder.svg?height=96&width=96"}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload profile photo"
              />
            </div>
            <Typography variant="small" color="blue-gray">
              Click to upload profile photo (optional)
            </Typography>
          </div>

          {/* Personal Information */}
          <div>
            <Typography variant="h6" className="mb-4 font-medium">
              Personal Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                name="studName"
                value={formData.studName}
                onChange={handleInputChange}
                required
              />
              <Input label="Last Name" name="studLastName" value={formData.studLastName} onChange={handleInputChange} />
              <Input
                label="Father's Name"
                name="studFatherName"
                value={formData.studFatherName}
                onChange={handleInputChange}
              />
              <Input
                label="Date of Birth"
                name="studentDob"
                type="date"
                value={formData.studentDob}
                onChange={handleInputChange}
              />
              <Input
                label="Age"
                name="studentAge"
                type="number"
                value={formData.studentAge}
                onChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="studPhoneNumber"
                value={formData.studPhoneNumber}
                onChange={handleInputChange}
              />
              <Input label="Caste" name="studCaste" value={formData.studCaste} onChange={handleInputChange} />
              <Input label="Category" name="studCategory" value={formData.studCategory} onChange={handleInputChange} />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <Typography variant="h6" className="mb-4 font-medium">
              Academic Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Student ID *"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              />
              <Select label="Major *" value={formData.major} onChange={handleSelectChange}>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
              <Input
                label="Year *"
                name="year"
                type="number"
                min="1"
                max="4"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Roll Number *"
                name="studRollNo"
                value={formData.studRollNo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Account Information */}
          <div>
            <Typography variant="h6" className="mb-4 font-medium">
              Account Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Username *"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
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
                Registering...
              </>
            ) : (
              "Register Student"
            )}
          </Button>
        </form>

        <Typography variant="small" color="gray" className="mt-6 flex justify-center">
          Already have an account?
          <Link to="/auth/student/sign-in" className="ml-1 font-bold text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </Typography>
      </Card>
    </section>
  )
}

export default CorrectedStudentSignUp
