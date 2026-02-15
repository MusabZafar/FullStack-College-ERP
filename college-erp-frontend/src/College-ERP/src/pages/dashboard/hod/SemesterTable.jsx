import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// Sample data for semesters
const semesterData = [
  {
    semester: "Semester 1",
    subjects: [
      { code: "CS101", name: "Introduction to Programming", credits: 4, grade: "A", ct1: 18, ct2: 20, theory: 55 },
      { code: "MA101", name: "Calculus", credits: 4, grade: "B+", ct1: 15, ct2: 17, theory: 45 },
      { code: "PH101", name: "Physics", credits: 4, grade: "A-", ct1: 19, ct2: 18, theory: 50 },
      { code: "CH101", name: "Chemistry", credits: 4, grade: "B", ct1: 14, ct2: 15, theory: 40 },
      { code: "CS102", name: "Data Structures", credits: 4, grade: "A+", ct1: 20, ct2: 20, theory: 58 },
      { code: "EN101", name: "English", credits: 4, grade: "A", ct1: 18, ct2: 20, theory: 55 },
    ],
    practicals: [
      { name: "Physics Lab", grade: "A", written: 20, viva: 18 },
      { name: "Chemistry Lab", grade: "B+", written: 18, viva: 16 },
      { name: "CS Lab", grade: "A", written: 20, viva: 19 },
    ],
  },
  {
    semester: "Semester 2",
    subjects: [
      { code: "CS201", name: "Algorithms", credits: 4, grade: "A", ct1: 17, ct2: 18, theory: 50 },
      { code: "MA201", name: "Linear Algebra", credits: 4, grade: "A-", ct1: 18, ct2: 19, theory: 52 },
      { code: "PH201", name: "Electromagnetism", credits: 4, grade: "B+", ct1: 16, ct2: 17, theory: 47 },
      { code: "CH201", name: "Organic Chemistry", credits: 4, grade: "B", ct1: 15, ct2: 14, theory: 42 },
      { code: "CS202", name: "Operating Systems", credits: 4, grade: "A-", ct1: 18, ct2: 19, theory: 53 },
      { code: "EN201", name: "Communication Skills", credits: 4, grade: "A", ct1: 19, ct2: 20, theory: 56 },
    ],
    practicals: [
      { name: "Algorithms Lab", grade: "A", written: 20, viva: 18 },
      { name: "OS Lab", grade: "A-", written: 18, viva: 17 },
      { name: "Chemistry Lab", grade: "B", written: 16, viva: 15 },
    ],
  },
  // Add more semester data as needed...
];

export function SemesterTable() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {semesterData.map((semester, semKey) => (
        <Card key={semKey}>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              {semester.semester} - Subject Information
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Code", "Name", "Credits", "CT-1", "CT-2", "Theory", "Total", "Grade"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {semester.subjects.map((subject, key) => {
                  const total = subject.ct1 + subject.ct2 + subject.theory;
                  const className = `py-3 px-5 ${
                    key === semester.subjects.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={subject.code}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {subject.code}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-600">
                          {subject.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {subject.credits}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {subject.ct1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {subject.ct2}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {subject.theory}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {total}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={total >= 90 ? "green" : total >= 75 ? "blue" : "red"}
                          value={subject.grade}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>

          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              {semester.semester} - Practical Information
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Written", "Viva", "Total", "Grade"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {semester.practicals.map((practical, key) => {
                  const total = practical.written + practical.viva;
                  const className = `py-3 px-5 ${
                    key === semester.practicals.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={practical.name}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {practical.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {practical.written}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {practical.viva}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {total}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={total >= 35 ? "green" : total >= 25 ? "blue" : "red"}
                          value={practical.grade}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default SemesterTable;
