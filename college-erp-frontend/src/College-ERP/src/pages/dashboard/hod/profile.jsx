import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

export function Profile() {
  // Mock student data (replace this with actual data from your backend or state management)
  const student = {
    studentId: "S123456",
    major: "Computer Science",
    year: 3,
    studRollNo: 12045,
    studName: "Chandan",
    studFatherName: "Vinod Jadhav",
    studLastName: "Jadhav",
    studPhoneNumber: 9876543210,
    studentDob: "1998-05-14",
    studCategory: "General",
    studCaste: "Hindu",
    studentAge: 26,
    imageUrl: "/img/student-profile.jpeg",
    user: {
      email: "chandan.jadhav@example.com",
    },
    semesters: [
      {
        id: 1,
        semester: "Semester 1",
        code: "CS101",
        name: "Data Structures",
        credits: 3,
        grade: "A",
      },
      {
        id: 2,
        semester: "Semester 2",
        code: "CS102",
        name: "Algorithms",
        credits: 3,
        grade: "A",
      },
      // Add more semesters as needed
    ],
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/student-background.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={student.imageUrl}
                alt={student.studName}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {`${student.studName} ${student.studLastName}`}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {student.major} - Year {student.year}
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="info">
                <TabsHeader>
                  <Tab value="info">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Info
                  </Tab>
                  <Tab value="semesters">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Semesters
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Personal Information
              </Typography>
              <ProfileInfoCard
                title="Student Details"
                description="Here are the student's personal and academic details."
                details={{
                  "Full Name": `${student.studName} ${student.studLastName}`,
                  "Father's Name": student.studFatherName,
                  "Roll Number": student.studRollNo,
                  "Date of Birth": student.studentDob,
                  Age: student.studentAge,
                  "Phone Number": student.studPhoneNumber,
                  Email: student.user.email,
                  Category: student.studCategory,
                  Caste: student.studCaste,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Information
              </Typography>
              <ul className="flex flex-col gap-6">
                {student.semesters.map((semester) => (
                  <li key={semester.id} className="flex items-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex-1"
                    >
                      {semester.semester}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex-1"
                    >
                      {semester.name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex-1"
                    >
                      Credits: {semester.credits}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex-1"
                    >
                      Grade: {semester.grade}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
