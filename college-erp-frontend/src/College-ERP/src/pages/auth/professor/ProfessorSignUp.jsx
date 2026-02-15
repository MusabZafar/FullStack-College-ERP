import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function ProfessorSignUp() {
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [professorId, setProfessorId] = useState("");
  const [name, setName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [subject, setSubject] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subjects, setSubjects] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("professorId", professorId);
    formData.append("name", name);
    formData.append("departmentName", departmentName);
    formData.append("subject", subject);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("subjects", subjects.split(","));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/professors/add-prof",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data);
      } else {
        setError("Error uploading Professor data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex justify-center">
      <Card className="w-full max-w-lg p-6">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Professor Sign Up
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your details to register.
          </Typography>
        </div>
        <form className="mt-8" onSubmit={handleSignUp}>
          <div className="mb-4 flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={previewUrl || "/placeholder-image.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Student profile photo"
              />
            </div>
            <Typography variant="small" color="blue-gray">
              Upload your Profile Photo
            </Typography>
            <Input
              size="lg"
              placeholder="Professor ID"
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Subjects (comma-separated)"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className={`mt-6 ${loading ? "bg-green-500" : "bg-blue-500"}`}
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          {error && (
            <Typography
              variant="small"
              color="red"
              className="mt-4 text-center"
            >
              {error}
            </Typography>
          )}
          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/login" className="text-gray-900 ml-1">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}

export default ProfessorSignUp;
