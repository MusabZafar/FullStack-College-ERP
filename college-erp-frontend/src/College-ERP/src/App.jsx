import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import ForgotPasswordFlow from "./pages/forgotPassword/ForgotPasswordFlow";
import { Auth } from "./layouts/auth";
import LoginTypeSelection from "./pages/auth/LoginTypeSelection";
import SignUpTypeSelection from "./pages/auth/SignUpTypeSelection";
import AttendanceFlow from "./pages/dashboard/professor/Attendance/AttendanceFlow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginTypeSelection />} />
      <Route path="/auth/sign-up" element={<SignUpTypeSelection />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/Attendence" element={<AttendanceFlow />} />
    </Routes>
  );
}

export default App;

{
  /* <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes> */
}
