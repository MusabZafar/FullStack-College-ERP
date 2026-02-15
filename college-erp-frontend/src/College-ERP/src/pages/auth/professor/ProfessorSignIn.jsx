import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { projectsData } from "./../../../data/projects-data";

export function ProfessorSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/professors/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const professorId = data.professorId;
        localStorage.setItem("userRole", "professor");
        localStorage.setItem("professorId", professorId);

        const professorResponse = await fetch(
          `http://localhost:8080/api/professors/${professorId}`
        );

        if (professorResponse.ok) {
          const professorData = await professorResponse.json();
          localStorage.setItem("professorData", JSON.stringify(professorData));

          navigate("/dashboard/professor/home");
          console.log("Login successful:", professorData);
        } else {
          // Handle the case where fetching student data fails
          throw new Error(
            `Failed to fetch professor data: ${professorResponse.statusText}`
          );
        }
      } else {
        const errorData = await response.text();
        setError(errorData || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <section className="m-8 flex justify-center gap-4">
      <div className="w-full lg:w-3/5 mt-18">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Professor Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your username and password to Sign In.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSignIn}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your username
            </Typography>
            <Input
              size="lg"
              placeholder="ProfessorUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {/* <Checkbox
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
          /> */}
          <Button className="mt-6" fullWidth type="submit">
            Sign In
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
              <Link to="/auth/forgot-password">Forgot Password</Link>
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/auth/professor/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default ProfessorSignIn;
