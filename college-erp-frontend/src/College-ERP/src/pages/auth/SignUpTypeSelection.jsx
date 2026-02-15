import { Button, Typography, Card, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpTypeSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUpType = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/auth/${type}/sign-up`);
      setIsLoading(false);
    }, 500); // Simulate a brief loading state
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-400 p-8">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold text-gray-800">
            Select Your Sign-Up Type
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Choose your role to create an account.
          </Typography>
        </div>
        <div className="space-y-4">
          <Button
            color="purple"
            size="lg"
            fullWidth
            onClick={() => handleSignUpType("hod")}
            className="transition-transform transform hover:scale-105"
            aria-label="Sign up as HOD"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-5 w-5" /> : "HOD"}
          </Button>
          <Button
            color="blue"
            size="lg"
            fullWidth
            onClick={() => handleSignUpType("professor")}
            className="transition-transform transform hover:scale-105"
            aria-label="Sign up as Professor"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-5 w-5" /> : "Professor"}
          </Button>
          <Button
            color="teal"
            size="lg"
            fullWidth
            onClick={() => handleSignUpType("student")}
            className="transition-transform transform hover:scale-105"
            aria-label="Sign up as Student"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-5 w-5" /> : "Student"}
          </Button>
        </div>
        <Typography
          variant="small"
          color="blue-gray"
          className="text-center mt-6 font-medium"
        >
          Already have an account?
          <Link to="/" className="text-indigo-600 ml-1 hover:underline">
            Sign in here
          </Link>
        </Typography>
      </Card>
    </section>
  );
}
