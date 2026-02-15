import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Profile from "@/pages/dashboard/professor/Attendance/Profile";
import AttendanceForm from "@/pages/dashboard/professor/Attendance/AttendanceForm";
import AttendanceView from "@/pages/dashboard/professor/Attendance/AttendanceView";

export function AttendanceFlow() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (value) => {
    setActiveTab(value);
    console.log("Active Tab Changed to:", value);
  };

  useEffect(() => {
    setActiveTab("profile");
  }, []);

  return (
    <Card className="mx-4 mt-6 border w-[95%] h-[610px] border-blue-gray-100">
      <CardBody className="p-4">
        <Tabs value={activeTab}>
          <TabsHeader>
            <Tab
              value="profile"
              onClick={() => handleTabChange("profile")}
              className="flex justify-center"
            >
              <div className="flex items-center justify-center">
                <HomeIcon className="mr-2 h-5 w-5" />
                <Typography variant="h6" className="font-bold">
                  Profile
                </Typography>
              </div>
            </Tab>
            <Tab
              value="attendance-form"
              onClick={() => handleTabChange("attendance-form")}
              className="flex justify-center"
            >
              <div className="flex items-center justify-center">
                <ClipboardDocumentIcon className="mr-2 h-5 w-5" />
                <Typography variant="h6" className="font-bold">
                  Attendance Form
                </Typography>
              </div>
            </Tab>
            <Tab
              value="attendance-view"
              onClick={() => handleTabChange("attendance-view")}
              className="flex  justify-center"
            >
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="mr-2 h-5 w-5" />
                <Typography variant="h6" className="font-bold">
                  View Attendance
                </Typography>
              </div>
            </Tab>
          </TabsHeader>
        </Tabs>

        <div className="mt-6">
          {activeTab === "profile" && <Profile />}
          {activeTab === "attendance-form" && <AttendanceForm />}
          {activeTab === "attendance-view" && <AttendanceView />}
        </div>
      </CardBody>
    </Card>
  );
}

export default AttendanceFlow;
