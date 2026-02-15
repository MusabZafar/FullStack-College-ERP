import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import profileImg from "/img/user.png";

export function StudentSignUp() {
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [studName, setstudName] = useState("");
  const [studFatherName, setstudFatherName] = useState("");
  const [studLastName, setstudLastName] = useState("");
  const [studentAge, setstudentAge] = useState("");
  const [studentDob, setstudentDob] = useState("");
  const [studCaste, setstudCaste] = useState("");
  const [studCategory, setstudCategory] = useState("");
  const [studRollNo, setstudRollNo] = useState("");
  const [year, setYear] = useState("");
  const [studPhoneNumber, setstudPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");

  useEffect(() => {
    // Fetch majors when component mounts
    const fetchMajors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/departments/get-dept"
        );
        // Extract only the names from the response and set state
        const departmentNames = response.data.map((dept) => dept.name);
        setMajors(departmentNames);
      } catch (err) {
        console.error("Error fetching majors:", err);
        setError("Failed to load departments. Please try again.");
      }
    };

    fetchMajors();
  }, []);

  const resetForm = () => {
    setImageUrl(null);
    setPreviewUrl(null);
    setStudentId("");
    setUsername("");
    setPassword("");
    setEmail("");
    setstudName("");
    setstudFatherName("");
    setstudLastName("");
    setstudentAge("");
    setstudentDob("");
    setstudCaste("");
    setstudCategory("");
    setstudRollNo("");
    setYear("");
    setstudPhoneNumber("");
    setSelectedMajor("");
  };

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

    // Basic form validation
    if (
      !username ||
      !password ||
      !email ||
      !studName ||
      !studentId ||
      !selectedMajor ||
      !year ||
      !studRollNo
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("studentId", studentId);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", studName);
    formData.append("fatherName", studFatherName);
    formData.append("lastName", studLastName);
    formData.append("age", studentAge);
    formData.append("dob", studentDob);
    formData.append("caste", studCaste);
    formData.append("category", studCategory);
    formData.append("major", selectedMajor); // Update this line
    formData.append("roll-no", studRollNo);
    formData.append("year", year);
    formData.append("phone-number", studPhoneNumber);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/students/add-student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setError("");
      resetForm("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data);
      } else {
        setError("Error uploading student data. Please try again.");
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
            Sign Up
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
          {/* Personal Information Section */}
          <Typography variant="h5" className="mb-2 font-medium">
            Personal Information
          </Typography>
          <div className="mb-4 flex flex-col items-center gap-4">
            <Input
              size="lg"
              placeholder="First Name"
              value={studName}
              onChange={(e) => setstudName(e.target.value)}
              required
            />
            <Input
              size="lg"
              placeholder="Father's Name"
              value={studFatherName}
              onChange={(e) => setstudFatherName(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Last Name"
              value={studLastName}
              onChange={(e) => setstudLastName(e.target.value)}
            />
            <Input
              size="lg"
              type="date"
              placeholder="Date of Birth"
              value={studentDob}
              onChange={(e) => setstudentDob(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Age"
              value={studentAge}
              onChange={(e) => setstudentAge(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Phone Number"
              value={studPhoneNumber}
              onChange={(e) => setstudPhoneNumber(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Caste"
              value={studCaste}
              onChange={(e) => setstudCaste(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Category"
              value={studCategory}
              onChange={(e) => setstudCategory(e.target.value)}
            />
          </div>

          {/* Academic Information Section */}
          <Typography variant="h5" className="mb-2 font-medium">
            Academic Information
          </Typography>
          <div className="mb-4 flex flex-col items-center gap-4">
            <Input
              size="lg"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <Select
              label="Major"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e)}
              required
            >
              {majors.map((dept) => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>

            <Input
              size="lg"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <Input
              size="lg"
              placeholder="Roll Number"
              value={studRollNo}
              onChange={(e) => setstudRollNo(e.target.value)}
              required
            />
          </div>

          {/* User Information Section */}
          <Typography variant="h5" className="mb-2 font-medium">
            User Information
          </Typography>
          <div className="mb-4 flex flex-col items-center gap-4">
            <Input
              size="lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              size="lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Profile Photo Section */}
          <div className="mb-4 flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={previewUrl || profileImg}
                alt="Profile"
                className="w-24 h-24 text-center rounded-full object-cover border"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Student profile photo"
              />
            </div>
            <Typography variant="small" color="blue-gray">
              Upload Student Profile Photo
            </Typography>
          </div>

          {/* Terms and Conditions */}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            required
          />

          {/* Submit Button */}
          <Button
            className={`mt-6 ${loading ? "bg-green-500" : "bg-blue-500"}`}
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Register"
            )}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <Typography
          variant="small"
          color="gray"
          className="mt-4 flex justify-center"
        >
          Already have an account?
          <Link
            to="/auth/student/sign-in"
            className="ml-1 font-bold text-blue-500 hover:text-blue-700"
          >
            Sign In
          </Link>
        </Typography>
      </Card>
    </section>
  );
}

export default StudentSignUp;
