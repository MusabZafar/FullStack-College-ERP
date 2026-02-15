"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "professor" | "hod"
  imageUrl?: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const userRole = localStorage.getItem("userRole") as "student" | "professor" | "hod" | null

      if (!userRole) {
        setLoading(false)
        return
      }

      const userData = localStorage.getItem(`${userRole}Data`)

      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser({
          id: parsedUser.id || parsedUser.studentId || parsedUser.professorId,
          name: parsedUser.name || parsedUser.studName,
          email: parsedUser.email,
          role: userRole,
          imageUrl: parsedUser.imageUrl,
        })
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: any, role: "student" | "professor" | "hod") => {
    localStorage.setItem("userRole", role)
    localStorage.setItem(`${role}Data`, JSON.stringify(userData))

    setUser({
      id: userData.id || userData.studentId || userData.professorId,
      name: userData.name || userData.studName,
      email: userData.email,
      role,
      imageUrl: userData.imageUrl,
    })
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    navigate("/")
  }

  const isAuthenticated = !!user
  const hasRole = (requiredRole: string) => user?.role === requiredRole

  return {
    user,
    loading,
    isAuthenticated,
    hasRole,
    login,
    logout,
    checkAuthStatus,
  }
}
