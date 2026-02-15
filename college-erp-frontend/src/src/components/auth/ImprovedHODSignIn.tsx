"use client"

import type React from "react"
import { useState } from "react"
import { Card, Input, Button, Typography, Spinner, Alert, Checkbox } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export function ImprovedHODSignIn() {
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
      const loginResponse = await axios.post(
        "http://localhost:8080/api/hods/login",
        {
          username: formData.username.trim(),
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      )

      if (loginResponse.status === 200) {
        const loginData = loginResponse.data
        const hodId = loginData.id

        localStorage.setItem("userRole", "hod")
        localStorage.setItem("hodId", hodId)

        const hodResponse = await axios.get(`http://localhost:8080/api/hods/${hodId}`, {
          timeout: 10000,
        })

        if (hodResponse.status === 200) {
          const hodData = hodResponse.data

          localStorage.setItem("hodData", JSON.stringify(hodData))

          if (rememberMe) {
            localStorage.setItem("rememberHOD", "true")
          }

          console.log("Login successful:", hodData)
          navigate("/dashboard/hod/home")
        } else {
          throw new Error("Failed to fetch HOD data")
        }
      }
    } catch (err: any) {
      console.error("Login error:", err)

      if (err.response?.status === 401) {
        setError("Invalid username or password")
      } else if (err.response?.status === 404) {
        setError("HOD not found")
      } else if (err.response?.status === 403) {
        setError("Account is disabled. Please contact administrator.")
      } else if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.")
      } else if (err.response?.data) {
        setError(err.response.data)
      } else {
        setError("Login failed. Please try again.")
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
            HOD Sign In
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
            <Link to="/auth/hod/sign-up" className="text-gray-900 ml-1 hover:text-blue-500">
              Create account
            </Link>
          </Typography>
        </Card>
      </div>
    </section>
  )
}

export default ImprovedHODSignIn
