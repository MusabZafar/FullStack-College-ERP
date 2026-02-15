"use client"

import type React from "react"
import { useState } from "react"
import { Card, Input, Button, Typography, Spinner, Alert } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export function ImprovedHODSignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const requiredFields = ["name", "department", "username", "password", "email", "phone"]

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

      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })

      if (imageFile) {
        submitData.append("file", imageFile)
      } else {
        const emptyBlob = new Blob([], { type: "application/octet-stream" })
        submitData.append("file", emptyBlob, "empty.png")
      }

      const response = await axios.post("http://localhost:8080/api/hods/add-hod", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      })

      setSuccess("HOD registered successfully! Redirecting to login...")

      // Reset form
      setFormData({
        name: "",
        department: "",
        username: "",
        password: "",
        email: "",
        phone: "",
      })
      setImageFile(null)
      setPreviewUrl("")

      setTimeout(() => {
        navigate("/auth/hod/sign-in")
      }, 2000)
    } catch (err: any) {
      console.error("Registration error:", err)

      if (err.response?.status === 409) {
        setError("HOD with same username or email already exists")
      } else if (err.response?.status === 400) {
        setError(err.response.data || "Invalid data provided")
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="m-8 flex justify-center">
      <Card className="w-full max-w-lg p-6">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold mb-4">
            HOD Registration
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
          {/* Profile Photo */}
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

          {/* Form Fields */}
          <div className="space-y-4">
            <Input label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} required />
            <Input
              label="Department *"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
            <Input label="Username *" name="username" value={formData.username} onChange={handleInputChange} required />
            <Input
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input label="Phone *" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <Input
              label="Password *"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
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
              "Register HOD"
            )}
          </Button>
        </form>

        <Typography variant="small" color="gray" className="mt-6 flex justify-center">
          Already have an account?
          <Link to="/auth/hod/sign-in" className="ml-1 font-bold text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </Typography>
      </Card>
    </section>
  )
}

export default ImprovedHODSignUp
