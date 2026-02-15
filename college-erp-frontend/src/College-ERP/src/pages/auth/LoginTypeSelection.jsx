import { Button, Typography, Card } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginTypeSelection() {
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();

  const handleLoginType = (type) => {
    setLoginType(type);
    navigate(`/auth/${type}/sign-in`);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 p-8">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold text-gray-800">
            Select Your Login Type
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Choose your role to continue.
          </Typography>
        </div>
        <div className="space-y-4">
          <Button
            color="blue"
            size="lg"
            fullWidth
            onClick={() => handleLoginType("hod")}
            className="transition-transform transform hover:scale-105"
          >
            HOD
          </Button>
          <Button
            color="green"
            size="lg"
            fullWidth
            onClick={() => handleLoginType("professor")}
            className="transition-transform transform hover:scale-105"
          >
            Professor
          </Button>
          <Button
            color="purple"
            size="lg"
            fullWidth
            onClick={() => handleLoginType("student")}
            className="transition-transform transform hover:scale-105"
          >
            Student
          </Button>
        </div>
        <Typography
          variant="small"
          color="blue-gray"
          className="text-center mt-6 font-medium"
        >
          Not registered yet?
          <Link
            to="/auth/sign-up"
            className="text-blue-600 ml-1 hover:underline"
          >
            Create an account
          </Link>
        </Typography>
      </Card>
    </section>
  );
}
